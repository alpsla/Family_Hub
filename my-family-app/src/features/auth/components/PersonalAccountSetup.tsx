// src/features/auth/components/PersonalAccountSetup.tsx
import { useState } from 'react';
import { useAuth } from '../../../core/hooks/useAuth';

interface PersonalAccountSetupProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const PersonalAccountSetup: React.FC<PersonalAccountSetupProps> = ({
  onComplete,
  onCancel
}) => {
  const { user, familyAccount } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    enablePrivateContent: true
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Create personal account
      const personalAccount: PersonalAccount = {
        accountType: 'personal',
        email: formData.email,
        familyId: familyAccount.familyId,
        familyMemberId: user.familyMemberId,
        linkedToFamilyAccount: familyAccount.id,
        privateContentEnabled: formData.enablePrivateContent,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: crypto.randomUUID()
      };

      // Save account and create relationship
      // This would be an API call in a real application
      await createPersonalAccount(personalAccount, formData.password);
      onComplete();
    } catch (error) {
      setError('Failed to create personal account');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Create Personal Account</h2>
      
      <div className="mb-4 p-4 bg-blue-50 rounded-md">
        <h3 className="font-medium mb-2">Why create a personal account?</h3>
        <ul className="text-sm space-y-1 text-gray-600">
          <li>• Keep certain calendar events private</li>
          <li>• Access age-restricted content</li>
          <li>• Maintain personal health records</li>
          <li>• Create private notes and reminders</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email for Personal Account
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.enablePrivateContent}
            onChange={(e) => setFormData({ ...formData, enablePrivateContent: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Enable private content access
          </label>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Create Personal Account
          </button>
        </div>
      </form>
    </div>
  );
};