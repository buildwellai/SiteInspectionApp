const TOKEN_KEY = 'auth_token';

const TEST_CREDENTIALS = {
  username: 'test',
  password: 'test'
};

export const authService = {
  login: async (username: string, password: string): Promise<boolean> => {
    try {
      // Check test credentials
      if (username === TEST_CREDENTIALS.username && password === TEST_CREDENTIALS.password) {
        localStorage.setItem(TOKEN_KEY, 'mock_token');
        return true;
      }
      
      // Fallback to demo credentials for backward compatibility
      if (username === 'demo' && password === 'demo') {
        localStorage.setItem(TOKEN_KEY, 'mock_token');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  }
};