/**
 * JWT Authentication Configuration
 * TypeScript equivalent to .NET JwtAuthenticationConfiguration
 */

import { InMemoryJwksKeyCache } from './InMemoryJwksKeyCache';
import { RedisJwksKeyCache } from './RedisJwksKeyCache';
import { IJwksKeyCache } from './IJwksKeyCache';
import { JwtAuthenticationService } from './JwtAuthenticationService';
import { JwksRefreshBackgroundService } from './JwksRefreshBackgroundService';
import { logger } from '../../logger/logger';

export class JwtAuthenticationConfiguration {
    private jwtService?: JwtAuthenticationService;
    private backgroundService?: JwksRefreshBackgroundService;
    private jwksCache?: IJwksKeyCache;
    private lastRefresh: Date = new Date(0);

    // Configuration properties
    public readonly authority: string;
    public readonly audience: string;
    public readonly jwksUrl: string;
    public readonly cacheProvider: string;
    public readonly redisConnectionString: string;
    public readonly algorithm: string;
    public readonly secret: string | undefined;
    public readonly kid: string | undefined;
    public readonly skipSignatureVerification: boolean;

    constructor() {
        // Load configuration from environment variables
        this.authority = process.env.JWT_AUTHORITY || 'http://localhost:5000';
        this.audience = process.env.JWT_AUDIENCE || 'shala';
        this.jwksUrl = process.env.JWT_JWKS_URL || `${this.authority}/.well-known/jwks.json`;
        this.cacheProvider = process.env.JWKS_CACHE_PROVIDER || 'local';
        this.redisConnectionString = process.env.REDIS_CONNECTION_STRING || 'redis://localhost:6379';
        this.algorithm = (process.env.JWT_ALGORITHM || 'RS256').toUpperCase();
        this.secret = process.env.JWT_SECRET;
        this.kid = process.env.JWT_KID;
        this.skipSignatureVerification = process.env.JWT_SKIP_SIGNATURE_VERIFICATION === 'true' || process.env.JWT_SKIP_SIGNATURE_VERIFICATION === '1';

        logger.info('🔐 JWT Authentication Configuration:');
        logger.info(`   • Authority: ${this.authority}`);
        logger.info(`   • Audience: ${this.audience}`);
        logger.info(`   • Algorithm: ${this.algorithm}`);
        logger.info(`   • JWKS URL: ${this.jwksUrl}`);
        logger.info(`   • Cache Provider: ${this.cacheProvider}`);
        if (this.algorithm === 'HS256') {
            logger.info(`   • Using HS256 with secret from environment`);
            if (this.kid) {
                logger.info(`   • KID override: ${this.kid}`);
            }
        }
        if (this.skipSignatureVerification) {
            logger.warn('⚠️  JWT signature verification is DISABLED - This should only be used for testing!');
        }
    }

    /**
     * Configure JWKS caching (equivalent to .NET AddJwtAuthenticationAndAuthorization)
     */
    public configureJwksCaching(): IJwksKeyCache {
        // Pluggable cache registration (local or redis)
        if (this.cacheProvider.toLowerCase() === 'redis') {
            try {
                this.jwksCache = new RedisJwksKeyCache(this.redisConnectionString);
                logger.info('🧠 JWKS Cache Provider: Redis');
            } catch (error) {
                logger.warn(`⚠️ Redis cache initialization failed, falling back to in-memory cache: ${error}`);
                this.jwksCache = new InMemoryJwksKeyCache();
                logger.info('🧠 JWKS Cache Provider: InMemory (Fallback)');
            }
        } else {
            this.jwksCache = new InMemoryJwksKeyCache();
            logger.info('🧠 JWKS Cache Provider: InMemory');
        }

        // Initialize JWT service
        this.jwtService = new JwtAuthenticationService(this.jwksUrl, this.jwksCache);

        // Start cleanup timer for in-memory cache
        if (this.jwksCache instanceof InMemoryJwksKeyCache) {
            this.jwksCache.startCleanupTimer();
        }

        return this.jwksCache;
    }

    /**
     * Check if JWT service is initialized
     */
    public isJwtServiceInitialized(): boolean {
        return this.jwtService !== undefined;
    }

    /**
     * Get the JWT authentication service instance
     */
    public getJwtService(): JwtAuthenticationService {
        if (!this.jwtService) {
            throw new Error('JWT service not initialized. Call configureJwksCaching() first.');
        }
        return this.jwtService;
    }

    /**
     * Start background services (equivalent to .NET hosted service)
     */
    public async startBackgroundServices(): Promise<void> {
        try {
            if (!this.jwtService) {
                throw new Error('JWT service not initialized. Call configureJwksCaching() first.');
            }

            const refreshIntervalMinutes = parseInt(process.env.JWKS_REFRESH_INTERVAL_MINUTES || '5');
            this.backgroundService = new JwksRefreshBackgroundService(this.jwtService, refreshIntervalMinutes);
            
            await this.backgroundService.startAsync();
            logger.info('✅ JWKS background refresh service started');
        } catch (error: any) {
            logger.error(`❌ Error starting background services: ${error.message}`);
            // Don't throw error for background services - JWT validation can still work
            logger.warn('⚠️ JWT validation will work but background refresh is disabled');
        }
    }

    /**
     * Stop background services
     */
    public async stopBackgroundServices(): Promise<void> {
        try {
            if (this.backgroundService) {
                await this.backgroundService.stopAsync();
                logger.info('✅ JWKS background refresh service stopped');
            }

            // Cleanup Redis connection if using Redis cache
            if (this.jwksCache instanceof RedisJwksKeyCache) {
                await this.jwksCache.disconnect();
                logger.info('✅ Redis connection closed');
            }
        } catch (error: any) {
            logger.error(`❌ Error stopping background services: ${error.message}`);
        }
    }

    /**
     * Get cache statistics
     */
    public getCacheStats(): any {
        const stats: any = {
            provider: this.cacheProvider,
            lastRefresh: this.lastRefresh,
            backgroundServiceStatus: this.backgroundService?.getStatus() || { isRunning: false }
        };

        if (this.jwksCache instanceof InMemoryJwksKeyCache) {
            stats.cacheSize = this.jwksCache.getCacheSize();
        }

        return stats;
    }
}

// Global configuration instance (singleton pattern like .NET)
let jwtConfig: JwtAuthenticationConfiguration | undefined;

export function getJwtConfiguration(): JwtAuthenticationConfiguration {
    if (!jwtConfig) {
        jwtConfig = new JwtAuthenticationConfiguration();
    }
    return jwtConfig;
}

/**
 * Initialize JWT authentication (called from app.ts)
 */
export async function initializeJwtAuthentication(): Promise<void> {
    try {
        const config = getJwtConfiguration();
        
        // Only configure JWKS caching if using RS256 algorithm
        if (config.algorithm === 'RS256') {
            config.configureJwksCaching();
            logger.info('✅ JWKS cache configured');
            
            // Start background services (non-blocking)
            try {
                await config.startBackgroundServices();
            } catch (bgError: any) {
                logger.warn(`⚠️ Background services failed to start, but JWT validation will still work: ${bgError.message}`);
            }
            
            logger.info('🔐 JWT Authentication with JWKS initialized successfully');
        } else if (config.algorithm === 'HS256') {
            if (!config.secret) {
                logger.warn('⚠️ JWT_SECRET not provided for HS256 algorithm. JWT validation may fail.');
            } else {
                logger.info('✅ JWT Authentication with HS256 initialized successfully');
            }
        } else {
            logger.warn(`⚠️ Unsupported algorithm: ${config.algorithm}. Only RS256 and HS256 are supported.`);
        }
    } catch (error: any) {
        logger.error(`❌ Failed to initialize JWT authentication: ${error.message}`);
        // Don't throw error - let the service start and handle JWT errors gracefully
        logger.warn('⚠️ Service will start but JWT validation may not work properly');
    }
}

/**
 * Stop JWT authentication services (called from app.ts)
 */
export async function stopJwtAuthentication(): Promise<void> {
    try {
        const config = getJwtConfiguration();
        await config.stopBackgroundServices();
        logger.info('🔐 JWT Authentication services stopped');
    } catch (error: any) {
        logger.error(`❌ Error stopping JWT authentication services: ${error.message}`);
    }
}