// src/core/components/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../features/auth/components/pages/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { routes } from '../config/routeConfig';
import { useAuth } from '../context/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      {Object.values(routes).map(({ path, component: Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <ProtectedRoute>
              <Component />
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;