// src/components/privacy/ConsentOverlay.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../core/hooks/useAuth';
import { usePrivacy } from '../../core/hooks/usePrivacy';
import { consentManager } from '../../core/services/privacy/ConsentManagementService';
import { FamilyMember } from '../../core/types/family';

interface ConsentOverlayProps {
  familyMember: FamilyMember;
  familyId: string;
  onConsent: () => void;
}

export const ConsentOverlay: React.FC<ConsentOverlayProps> = ({
  familyMember,
  familyId,
  onConsent
}) => {
  const { user } = useAuth();
  const { settings } = usePrivacy();
  const [showParentalConsent, setShowParentalConsent] = useState(false);
  const [parentalVerification, setParentalVerification] = useState(false);

  useEffect(() => {
    const age = new Date().getFullYear() - new Date(familyMember.dateOfBirth).getFullYear();
    setShowParentalConsent(age < 18);
  }, [familyMember]);

  const handleConsent = () => {
    if (!user) return;

    consentManager.recordConsent(
      user,
      familyMember,
      familyId,
      showParentalConsent ? parentalVerification : undefined
    );
    onConsent();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Privacy Consent Required</h2>
        
        <div className="prose prose-sm mb-6">
          <p>
            Welcome to Family Hub! Before proceeding, we need your consent to:
          </p>
          <ul>
            <li>Store and process your family's information</li>
            <li>Use necessary cookies for site functionality</li>
            {settings.region === 'EU' && (
              <li>Process data according to GDPR requirements</li>
            )}
          </ul>
        </div>

        {showParentalConsent && (
          <div className="bg-yellow-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium mb-2">Parental Consent Required</h3>
            <p className="text-sm text-gray-600 mb-4">
              Since this account is for a family member under 18, parental consent is required.
            </p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={parentalVerification}
                onChange={(e) => setParentalVerification(e.target.checked)}
                className="rounded text-blue-600"
              />
              <span className="text-sm">
                I confirm I am the parent/guardian and I consent
              </span>
            </label>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Read Privacy Policy
          </a>
          <button
            onClick={handleConsent}
            disabled={showParentalConsent && !parentalVerification}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            I Consent
          </button>
        </div>
      </div>
    </div>
  );
};