// src/core/config/routes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { routes } from './routeConfig';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path}
            element={<Component />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;