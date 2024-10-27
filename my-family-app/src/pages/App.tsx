// src/pages/App.tsx
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../core/components/AppRoutes';
import { AuthProvider } from '../core/context/AuthContext';
import { SessionProvider } from '../core/context/SessionContext';
import { PrivacyProvider } from '../core/context/PrivacyContext';
import { MainLayout } from '../core/layouts/MainLayout';

export const App = () => {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AuthProvider>
          <PrivacyProvider>
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </PrivacyProvider>
        </AuthProvider>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default App;