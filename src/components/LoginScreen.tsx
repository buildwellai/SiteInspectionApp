import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Check test credentials
      if (username === 'test' && password === 'test') {
        localStorage.setItem('auth_token', 'mock_token');
        navigate('/projects');
        return;
      }
      
      // Fallback to demo credentials
      if (username === 'demo' && password === 'demo') {
        localStorage.setItem('auth_token', 'mock_token');
        navigate('/projects');
        return;
      }

      throw new Error('Invalid credentials');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <div className="w-24 h-24 header-gradient rounded-2xl mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gradient mb-2">
            BuildwellAI
          </h1>
          <p className="text-lg text-gray-600">Site Inspection Assistant</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input w-full"
              placeholder="Enter your username"
              autoComplete="username"
              autoCapitalize="none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="text-sm text-center text-gray-500 space-y-2">
            <p>Test credentials:</p>
            <p>Username: test</p>
            <p>Password: test</p>
            <p className="pt-4">Version 1.0.0</p>
          </div>
        </form>
      </div>
    </div>
  );
}