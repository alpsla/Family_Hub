// my-family-app/src/core/components/AppRoutes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import Dashboard from '../../features/dashboard/pages/Dashboard';
import { ProtectedRoute } from './ProtectedRoute';
import { useAuth } from '../hooks/useAuth';

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  console.log('AppRoutes - isAuthenticated:', isAuthenticated); // Debug log

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignupPage />} 
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
    </Routes>
  );
};

export default AppRoutes;