// src/App.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../core/hooks/useAuth';
import { consentManager } from '../core/services/privacy/ConsentManagementService';
import { ConsentOverlay } from './components/privacy/ConsentOverlay';
import { LoginPage } from './LoginPage';
import { MainApp } from './MainApp';
import { FamilyMember } from '../core/types/family';

export const App = () => {
  const { user, family } = useAuth();
  const [needsConsent, setNeedsConsent] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !family) return;

    // Check if any family member needs consent
    const memberNeedingConsent = family.members.find((member: FamilyMember) => 
      consentManager.needsConsent(user, member, family.id)
    );

    setNeedsConsent(memberNeedingConsent?.id || null);
  }, [user, family]);

  if (!user || !family) {
    return <LoginPage />;
  }

  return (
    <>
      {needsConsent && family && (
        <ConsentOverlay
          familyMember={family.members.find(m => m.id === needsConsent)!}
          familyId={family.id}
          onConsent={() => setNeedsConsent(null)}
        />
      )}
      <MainApp />
    </>
  );
};

export default App;