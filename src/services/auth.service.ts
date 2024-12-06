import { ApplicationSettings } from '@nativescript/core';

const TEST_CREDENTIALS = {
  username: 'test',
  password: 'test'
};

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = 'https://api.example.com'; // Replace with actual API URL

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Check test credentials
      if (username === TEST_CREDENTIALS.username && password === TEST_CREDENTIALS.password) {
        ApplicationSettings.setString(this.TOKEN_KEY, 'mock_token');
        return true;
      }
      
      // Fallback to demo credentials for backward compatibility
      if (username === 'demo' && password === 'demo') {
        ApplicationSettings.setString(this.TOKEN_KEY, 'mock_token');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  getToken(): string | null {
    return ApplicationSettings.getString(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    ApplicationSettings.remove(this.TOKEN_KEY);
  }
}