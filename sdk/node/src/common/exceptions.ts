
export class APIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'APIError';
    }
}

export class AuthenticationError extends APIError {
    constructor(message: string) {
        super(message);
        this.name = 'AuthenticationError';
    }
}

export class NotFoundError extends APIError {
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends APIError {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}