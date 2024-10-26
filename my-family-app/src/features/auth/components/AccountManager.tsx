// src/features/auth/components/AccountManager.tsx
import { useState } from 'react';
import { useAuth } from '../../../core/hooks/useAuth';

export const AccountManager = () => {
  const { user, switchAccount } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  return (
    <div className="relative">
      {/* Account Button Trigger */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
      >
        <span className="text-sm font-medium">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="text-xs text-gray-500">
          ({user?.accountType === 'family' ? 'Family Account' : 'Personal Account'})
        </span>
      </button>

      {/* Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              aria-hidden="true"
              onClick={() => setIsModalOpen(false)}
            />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              {actionError && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {actionError}
                </div>
              )}

              {!isCreatingAccount ? (
                // Account Switching UI
                <div className="space-y-4">
                  <div className="text-lg font-medium">Switch Account</div>
                  
                  {/* Family Account Option */}
                  <button
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        setActionError(null);
                        await switchAccount('family');
                        setIsModalOpen(false);
                      } catch (err) {
                        setActionError('Failed to switch account');
                        console.error('Switch account error:', err);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    disabled={isLoading}
                    className={`w-full text-left px-4 py-3 rounded-md ${
                      user?.accountType === 'family'
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium">Family Account</div>
                    <div className="text-sm text-gray-500">
                      Shared access for family members
                    </div>
                  </button>

                  {/* Personal Account Option */}
                  {user?.hasPersonalAccount ? (
                    <button
                      onClick={async () => {
                        try {
                          setIsLoading(true);
                          setActionError(null);
                          await switchAccount('personal');
                          setIsModalOpen(false);
                        } catch (err) {
                          setActionError('Failed to switch account');
                          console.error('Switch account error:', err);
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                      disabled={isLoading}
                      className={`w-full text-left px-4 py-3 rounded-md ${
                        user?.accountType === 'personal'
                          ? 'bg-blue-50 text-blue-700'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">Personal Account</div>
                      <div className="text-sm text-gray-500">
                        Private access and content
                      </div>
                    </button>
                  ) : (
                    // Create Personal Account Option
                    <button
                      onClick={() => setIsCreatingAccount(true)}
                      className="w-full text-left px-4 py-3 rounded-md hover:bg-gray-50"
                    >
                      <div className="font-medium text-blue-600">
                        Create Personal Account
                      </div>
                      <div className="text-sm text-gray-500">
                        Set up private access
                      </div>
                    </button>
                  )}
                </div>
              ) : (
                // Personal Account Creation UI
                <div className="space-y-4">
                  <div>
                    <div className="text-lg font-medium">Create Personal Account</div>
                    <p className="text-sm text-gray-500 mt-1">
                      Create a separate account for private content
                    </p>
                  </div>

                  <PersonalAccountSetup 
                    onComplete={() => {
                      setIsCreatingAccount(false);
                      setIsModalOpen(false);
                    }}
                    onCancel={() => setIsCreatingAccount(false)}
                  />
                </div>
              )}

              {/* Modal Actions */}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="w-full text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Personal Account Setup Component
interface PersonalAccountSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

const PersonalAccountSetup: React.FC<PersonalAccountSetupProps> = ({ onComplete, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      setSetupError('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      setSetupError(null);
      // Here you would call your API to create a personal account
      // For now, we'll simulate it
      await new Promise(resolve => setTimeout(resolve, 1000));
      onComplete();
    } catch (err) {
      setSetupError('Failed to create personal account');
      console.error('Create account error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {setupError && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {setupError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};