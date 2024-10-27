// src/pages/LoginPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../core/hooks/useAuth';
import { usePasswordRecovery } from '../core/hooks/usePasswordRecovery';
import { LoginCredentials, ValidationError } from '../core/types/auth';
import { validateEmail, validatePassword } from '../core/validation/auth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { requestReset, isLoading: isPasswordResetting } = usePasswordRecovery();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<ValidationError>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Real-time validation
  useEffect(() => {
    if (credentials.email || credentials.password) {
      const emailErrors = validateEmail(credentials.email);
      const passwordErrors = validatePassword(credentials.password);
      
      setErrors({
        email: emailErrors,
        password: credentials.password ? passwordErrors : undefined
      });
    }
  }, [credentials.email, credentials.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Final validation before submission
    const emailErrors = validateEmail(credentials.email);
    const passwordErrors = validatePassword(credentials.password);

    if (emailErrors.length > 0 || passwordErrors.length > 0) {
      setErrors({ email: emailErrors, password: passwordErrors });
      return;
    }

    setIsLoading(true);

    try {
      await login(credentials);
      navigate('/');
    } catch {
      setServerError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!credentials.email) {
      setErrors({
        ...errors,
        email: ['Please enter your email to reset password']
      });
      return;
    }

    try {
      await requestReset(credentials.email);
      setServerError(null);
      setErrors({});
      alert('Password reset instructions sent to your email');
    } catch {
      setServerError('Failed to request password reset. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-[400px] bg-white rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-6">Welcome Back</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {serverError && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
              {serverError}
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email?.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password?.map((error, index) => (
              <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={credentials.rememberMe}
                onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                className="w-4 h-4 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">
                Remember me
              </span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isPasswordResetting}
              className="text-sm text-blue-600 hover:underline disabled:opacity-50"
            >
              {isPasswordResetting ? 'Sending...' : 'Forgot password?'}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading || Object.values(errors).some(e => e?.length > 0)}
            className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Create account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;