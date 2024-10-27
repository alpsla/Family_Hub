// src/core/components/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './session/ProtectedRoute';
import { LoginPage } from '../../pages/LoginPage';
import { Dashboard } from '../../pages/Dashboard';
// ... other imports

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Other protected routes */}
      <Route
        path="/health"
        element={
          <ProtectedRoute>
            <Health />
          </ProtectedRoute>
        }
      />
      {/* ... more routes ... */}
    </Routes>
  );
};