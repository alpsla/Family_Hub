// my-family-app/src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './core/components/AppRoutes';
import { AuthProvider } from './core/context/auth/AuthProvider';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;