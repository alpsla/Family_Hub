// my-family-app/src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/context/auth/useAuth';
import { LoginCredentials } from '../core/context/auth/authTypes';

const testLoginCredentials = {
  validUser: {
    email: 'john@example.com',
    password: 'password123',
    rememberMe: true
  },
  invalidUser: {
    email: 'wrong@example.com',
    password: 'wrongpassword',
    rememberMe: false
  }
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('Auth state in LoginPage:', { isAuthenticated });
    if (isAuthenticated) {
      console.log('Attempting navigation to dashboard');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Login attempt with:', formData);

    try {
      await login(formData);
      console.log('Login successful, auth state:', { isAuthenticated });
      // Force navigation after successful login
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleTestData = (isValid: boolean) => {
    const testData = isValid ? testLoginCredentials.validUser : testLoginCredentials.invalidUser;
    setFormData(testData);
    console.log('Test data filled:', testData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Debug render
  console.log('LoginPage render:', { formData, error, isAuthenticated });

  return (
    <div className="login-page">
      <h2>Login</h2>
      {/* Add debug info in development */}
      {process.env.NODE_ENV !== 'production' && (
        <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '10px' }}>
          <small>Debug - Auth State: {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}</small>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>
        {error && (
          <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
            {error}
          </div>
        )}
        <button type="submit">Login</button>

        {process.env.NODE_ENV !== 'production' && (
          <div className="test-controls" style={{ marginTop: '20px' }}>
            <button type="button" onClick={() => handleTestData(true)}>
              Fill Valid User
            </button>
            <button type="button" onClick={() => handleTestData(false)}>
              Fill Invalid User
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;