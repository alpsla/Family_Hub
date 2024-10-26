// src/core/config/routes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load components
const Dashboard = lazy(() => import('../../features/dashboard/pages/Dashboard.tsx'));
const Members = lazy(() => import('../../features/members/pages/Members.tsx'));
const Calendar = lazy(() => import('../../features/calendar/pages/Calendar.tsx'));
const Health = lazy(() => import('../../features/health/pages/Health.tsx'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/health" element={<Health />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;