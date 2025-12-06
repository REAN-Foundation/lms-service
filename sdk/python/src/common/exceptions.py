class APIError(Exception):
    pass

class AuthenticationError(APIError):
    pass

class NotFoundError(APIError):
    pass

class ValidationError(APIError):
    pass
