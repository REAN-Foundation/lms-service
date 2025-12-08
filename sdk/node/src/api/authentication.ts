
import { APIClient } from './client';

interface AuthResponse {
    Data: {
        AccessToken: string;
        RefreshToken?: string;
        ExpiresIn?: number;
        TokenType?: string;
    };
    Message?: string;
    Success?: boolean;
}

export default class AuthenticationService {
    private APIClient: APIClient;

    constructor(APIClient: APIClient) {
        this.APIClient = APIClient;
    }

    async authenticateUser(username: string, password: string): Promise<AuthResponse> {
        const endpoint = 'users/login-password';
        const payload = { UserName: username, Password: password };
        
        const response = await this.APIClient.makeRequest<AuthResponse>('POST', endpoint, payload);

        if (response.Data?.AccessToken) {
            this.APIClient.setAccessToken(response.Data.AccessToken);
        } else {
            throw new Error('Authentication failed: Token not found in response.');
        }
        
        console.log('Authentication response:', response);
        return response;
    }
}