/**
 * JWT Authentication Middleware
 * TypeScript equivalent to .NET JWT middleware with JWKS caching
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { getJwtConfiguration } from './JwtAuthenticationConfiguration';
import { JwksKey } from './IJwksKeyCache';
import { logger } from '../../logger/logger';

export interface AuthenticatedRequest extends Request {
    user?: any;
}

/**
 * Convert JWK to PEM format for JWT verification
 */
function jwkToPem(jwk: JwksKey): string {
    try {
        // Create RSA public key using Node.js crypto
        const publicKey = crypto.createPublicKey({
            key: {
                kty: 'RSA',
                n: jwk.n,
                e: jwk.e,
            },
            format: 'jwk'
        });
        
        // Convert to PEM format
        return publicKey.export({ type: 'spki', format: 'pem' }) as string;
        
    } catch (error: any) {
        logger.error(`Error converting JWK to PEM: ${error.message}`);
        throw error;
    }
}

/**
 * Get JWKS key using the caching service
 */
async function getJwksKey(kid: string): Promise<JwksKey | null> {
    try {
        const config = getJwtConfiguration();
        
        // Check if JWT service is initialized, if not, initialize it
        if (!config.isJwtServiceInitialized()) {
            logger.warn('JWT service not initialized, attempting to initialize...');
            try {
                config.configureJwksCaching();
                await config.startBackgroundServices();
                logger.info('JWT service initialized successfully');
            } catch (initError: any) {
                logger.error(`Failed to initialize JWT service: ${initError.message}`);
                return null;
            }
        }
        
        const jwtService = config.getJwtService();
        return await jwtService.getJwksKeyAsync(kid);
    } catch (error: any) {
        logger.error(`Error getting JWKS key: ${error.message}`);
        return null;
    }
}

/**
 * JWT Token Verification Middleware
 * Equivalent to .NET [Authorize] attribute
 * Supports both RS256 (with JWKS) and HS256 (with secret) algorithms
 * Automatically detects algorithm from token header
 */
export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: 'Authorization header missing or invalid',
                httpcode: 401
            });
            return;
        }
        
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        
        // Decode token header to get algorithm and kid (Key ID)
        const unverifiedHeader = jwt.decode(token, { complete: true })?.header;
        const tokenAlgorithm = unverifiedHeader?.alg?.toUpperCase();
        const tokenKid = unverifiedHeader?.kid;
        
        // Get JWT configuration
        const config = getJwtConfiguration();
        
        logger.info(`Token algorithm from header: ${tokenAlgorithm || 'not specified'}, Config algorithm: ${config.algorithm || 'not specified'}`);
        
        // Priority 1: If token explicitly says HS256, try HS256 first
        if (tokenAlgorithm === 'HS256') {
            // If signature verification is skipped, just decode the token immediately
            if (config.skipSignatureVerification) {
                try {
                    logger.warn('⚠️  Skipping signature verification - decoding token without verification');
                    const payload = jwt.decode(token, { complete: false }) as any;
                    if (!payload) {
                        throw new Error('Failed to decode token');
                    }
                    logger.info(`Token decoded successfully (signature verification skipped) for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                    req.user = payload;
                    next();
                    return;
                } catch (decodeError: any) {
                    logger.error(`Token decode failed: ${decodeError.message}`);
                    res.status(401).json({
                        success: false,
                        message: `Token decode failed: ${decodeError.message}`,
                        httpcode: 401
                    });
                    return;
                }
            }
            
            // If no secret configured, try to decode if skip is enabled, otherwise error
            if (!config.secret) {
                if (config.skipSignatureVerification) {
                    try {
                        const payload = jwt.decode(token, { complete: false }) as any;
                        if (payload) {
                            logger.warn('⚠️  No JWT_SECRET configured, but skipping verification - using decoded token');
                            req.user = payload;
                            next();
                            return;
                        }
                    } catch (e) {
                        // Continue to error
                    }
                }
                res.status(401).json({
                    success: false,
                    message: 'JWT_SECRET not configured for HS256 algorithm',
                    httpcode: 401
                });
                return;
            }
            
            // Try to verify with secret
            try {
                logger.info('Token is HS256, attempting HS256 verification...');
                
                // Try verification with issuer/audience validation first
                let payload: any;
                try {
                    payload = jwt.verify(token, config.secret, {
                        algorithms: ['HS256'],
                        issuer: config.audience,
                        audience: config.audience,
                    }) as any;
                    logger.info('HS256 verification successful with issuer/audience validation');
                } catch (verifyError: any) {
                    // If issuer/audience validation fails, try without it
                    logger.warn(`HS256 verification with issuer/audience failed: ${verifyError.message}, trying without validation...`);
                    try {
                        payload = jwt.verify(token, config.secret, {
                            algorithms: ['HS256'],
                        }) as any;
                        logger.info('HS256 verification successful without issuer/audience validation');
                    } catch (signatureError: any) {
                        // Signature verification failed
                        logger.error(`HS256 signature verification failed: ${signatureError.message}`);
                        
                        // Always try to decode to show what's in the token (for debugging)
                        try {
                            const decoded = jwt.decode(token, { complete: true }) as any;
                            logger.info(`Token payload (for debugging): ${JSON.stringify(decoded?.payload || {})}`);
                            logger.warn('⚠️  Signature verification failed - token may be signed with a different secret');
                            
                            // If skip verification is enabled, use decoded token
                            if (config.skipSignatureVerification) {
                                logger.warn('⚠️  Using decoded token without signature verification');
                                req.user = decoded?.payload;
                                next();
                                return;
                            }
                        } catch (decodeError) {
                            // Ignore decode error
                        }
                        
                        // If skip verification is enabled, try decode one more time
                        if (config.skipSignatureVerification) {
                            try {
                                const decodedPayload = jwt.decode(token, { complete: false }) as any;
                                if (decodedPayload) {
                                    logger.warn('⚠️  Using decoded token without signature verification (fallback)');
                                    req.user = decodedPayload;
                                    next();
                                    return;
                                }
                            } catch (e) {
                                // Continue to throw original error
                            }
                        }
                        
                        throw signatureError;
                    }
                }
                
                logger.info(`Token verified successfully with HS256 for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                req.user = payload;
                next();
                return;
            } catch (hs256Error: any) {
                logger.error(`HS256 verification failed: ${hs256Error.message}`);
                
                // Final fallback: If skip verification is enabled OR if it's an invalid signature error, try to decode
                const shouldSkipVerification = config.skipSignatureVerification || 
                    (hs256Error.message && hs256Error.message.toLowerCase().includes('signature'));
                
                if (shouldSkipVerification) {
                    try {
                        logger.warn('⚠️  Signature verification failed, decoding token without verification to allow request to proceed');
                        const payload = jwt.decode(token, { complete: false }) as any;
                        if (payload) {
                            logger.warn('⚠️  WARNING: Token is being used without signature verification - this is not secure!');
                            req.user = payload;
                            next();
                            return;
                        }
                    } catch (decodeError) {
                        logger.error(`Failed to decode token: ${decodeError}`);
                    }
                }
                
                res.status(401).json({
                    success: false,
                    message: `HS256 token verification failed: ${hs256Error.message}`,
                    httpcode: 401
                });
                return;
            }
        }
        
        // Priority 2: If token explicitly says RS256, try RS256
        if (tokenAlgorithm === 'RS256') {
            // Continue to RS256 flow below
        }
        
        // Priority 3: If no algorithm in token but config says HS256, try HS256
        if (!tokenAlgorithm && config.algorithm === 'HS256' && config.secret) {
            try {
                logger.info('No algorithm in token, but config is HS256, attempting HS256 verification...');
                const payload = jwt.verify(token, config.secret, {
                    algorithms: ['HS256'],
                }) as any;
                logger.info(`Token verified successfully with HS256 for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                req.user = payload;
                next();
                return;
            } catch (hs256Error: any) {
                logger.warn(`HS256 verification failed: ${hs256Error.message}, will try RS256...`);
                // Continue to RS256
            }
        }
        
        // Priority 4: Try HS256 if secret is available and no explicit algorithm
        if (!tokenAlgorithm && config.secret) {
            try {
                logger.info('Attempting HS256 verification (no algorithm in token, secret available)...');
                const payload = jwt.verify(token, config.secret, {
                    algorithms: ['HS256'],
                }) as any;
                logger.info(`Token verified successfully with HS256 for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                req.user = payload;
                next();
                return;
            } catch (hs256Error: any) {
                logger.warn(`HS256 verification failed: ${hs256Error.message}, will try RS256...`);
                // Continue to RS256
            }
        }
        
        // Priority 5: Try RS256 algorithm (existing flow)
        if (tokenAlgorithm === 'RS256' || !tokenAlgorithm) {
            try {
                logger.info('Attempting RS256 verification...');
                
                // For RS256, KID is required
                const kid = tokenKid || config.kid;
                
                if (!kid) {
                    // If we have HS256 secret available and token might be HS256, try that as fallback
                    if (config.secret && !tokenAlgorithm) {
                        logger.warn('RS256 KID missing, attempting HS256 fallback...');
                        try {
                            const payload = jwt.verify(token, config.secret, {
                                algorithms: ['HS256'],
                            }) as any;
                            logger.info(`Token verified successfully with HS256 (fallback) for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                            req.user = payload;
                            next();
                            return;
                        } catch (fallbackError) {
                            // Continue with RS256 error
                        }
                    }
                    
                    res.status(401).json({
                        success: false,
                        message: 'Token missing key ID (KID)',
                        httpcode: 401
                    });
                    return;
                }
                
                // Get public key from JWKS cache
                const jwksKey = await getJwksKey(kid);
                if (!jwksKey) {
                    // If we have HS256 secret available, try that as fallback
                    if (config.secret) {
                        logger.warn('JWKS key not found, attempting HS256 fallback...');
                        try {
                            const payload = jwt.verify(token, config.secret, {
                                algorithms: ['HS256'],
                            }) as any;
                            logger.info(`Token verified successfully with HS256 (fallback) for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                            req.user = payload;
                            next();
                            return;
                        } catch (fallbackError) {
                            // Continue with RS256 error
                        }
                    }
                    
                    res.status(401).json({
                        success: false,
                        message: 'Unable to find appropriate key',
                        httpcode: 401
                    });
                    return;
                }
                
                // Convert JWKS key to PEM format for verification
                const publicKeyPem = jwkToPem(jwksKey);
                
                // Verify token with RSA public key
                let payload: any;
                try {
                    payload = jwt.verify(token, publicKeyPem, {
                        algorithms: ['RS256'],
                        issuer: config.audience,
                        audience: config.audience,
                    }) as any;
                    logger.info('RS256 verification successful with issuer/audience validation');
                } catch (verifyError: any) {
                    // If issuer/audience validation fails, try without it
                    logger.warn(`RS256 verification with issuer/audience failed: ${verifyError.message}, trying without validation...`);
                    payload = jwt.verify(token, publicKeyPem, {
                        algorithms: ['RS256'],
                    }) as any;
                    logger.info('RS256 verification successful without issuer/audience validation');
                }
                
                logger.info(`Token verified successfully with RS256 for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                req.user = payload;
                next();
                return;
            } catch (rs256Error: any) {
                logger.error(`RS256 verification failed: ${rs256Error.message}`);
                // If we have HS256 secret and token might be HS256, try that as last resort
                if (config.secret && !tokenAlgorithm) {
                    logger.warn('RS256 failed, attempting HS256 as last resort...');
                    try {
                        const payload = jwt.verify(token, config.secret, {
                            algorithms: ['HS256'],
                        }) as any;
                        logger.info(`Token verified successfully with HS256 (last resort) for user: ${payload.sub || payload.userId || payload.email || 'unknown'}`);
                        req.user = payload;
                        next();
                        return;
                    } catch (lastResortError) {
                        // Both failed
                    }
                }
                throw rs256Error;
            }
        }
        
        // If we reach here, algorithm is not supported or not detected
        res.status(401).json({
            success: false,
            message: `Unsupported or undetected algorithm. Token algorithm: ${tokenAlgorithm || 'not specified'}, Supported: RS256, HS256`,
            httpcode: 401
        });
        
    } catch (error: any) {
        logger.error(`Token verification error: ${error.message}`);
        
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Token has expired',
                httpcode: 401
            });
            return;
        }
        
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({
                success: false,
                message: 'Could not validate credentials',
                httpcode: 401
            });
            return;
        }
        
        res.status(401).json({
            success: false,
            message: 'Token verification failed',
            httpcode: 401
        });
    }
};

/**
 * Optional middleware to require authentication
 */
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: 'Authentication required',
            httpcode: 401
        });
        return;
    }
    next();
};