import json

class AuthenticationService:
    def __init__(self, client):
        self.client = client

    def authenticate_user(self, username, password):
        endpoint = 'users/login-password'
        payload = {
            'UserName': username,
            'Password': password
        }
        response = self.client.make_request('POST', endpoint, data=payload)

        if 'Data' in response and 'AccessToken' in response['Data']:
            self.client.set_access_token(response['Data']['AccessToken'])
        else:
            raise ValueError(f"Token not found in response: {response}")
        
        formatted_response = json.dumps(response, indent=4)
        print("Authenticated : ", formatted_response)
        
        return response
