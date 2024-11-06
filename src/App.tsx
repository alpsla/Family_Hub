// my-family-app/src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '/Users/alpinro/Code Prjects/family-management-app/my-family-app/src/core/components/AppRoutes.tsx';
import { AuthProvider } from '/Users/alpinro/Code Prjects/family-management-app/my-family-app/src/core/context/auth/AuthProvider.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div style={{ 
          minHeight: '100vh',
          backgroundColor: '#f5f7fa',
          margin: 0,
          padding: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}>
          <AppRoutes />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;