// src/features/auth/components/AccountManager.tsx
import { useState } from "react";
import { useAuth } from "../../../core/context/auth";

export const AccountManager = () => {
  const { isAuthenticated, switchAccount } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountSwitch = async () => {
    try {
      setIsLoading(true);
      await switchAccount();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Account Management</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Status: {isAuthenticated ? 'Active' : 'Inactive'}</span>
          <button
            onClick={handleAccountSwitch}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? 'Switching...' : 'Switch Account'}
          </button>
        </div>
      </div>
    </div>
  );
};