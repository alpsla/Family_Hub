// src/features/auth/components/AccountSwitcher.tsx
import { useState } from 'react';
import { useAuth } from '../../../core/hooks/useAuth';

export const AccountSwitcher: React.FC = () => {
  const { user, switchAccount } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <span>{user.email}</span>
        <span className="text-xs text-gray-500">
          ({user.accountType === 'family' ? 'Family Account' : 'Personal Account'})
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1">
          <div className="px-4 py-2 text-sm text-gray-500">Switch Account</div>
          
          {/* Family Account */}
          <button
            onClick={() => {
              switchAccount('family');
              setShowDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Family Account
            <div className="text-xs text-gray-500">Shared family content</div>
          </button>

          {/* Personal Account */}
          <button
            onClick={() => {
              switchAccount('personal');
              setShowDropdown(false);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Personal Account
            <div className="text-xs text-gray-500">Private content enabled</div>
          </button>

          {/* Create Personal Account */}
          {!user.hasPersonalAccount && (
            <button
              onClick={() => {/* Show personal account setup */}}
              className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
            >
              Create Personal Account
              <div className="text-xs text-gray-500">For private content</div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};