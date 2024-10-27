// src/core/config/routeConfig.ts
import { ComponentType, LazyExoticComponent, lazy } from 'react';

export interface RouteDefinition {
  path: string;
  component: LazyExoticComponent<ComponentType>;
  public?: boolean;
}

export const routes: RouteDefinition[] = [
  {
    path: '/login',
    component: lazy(() => import('../../pages/LoginPage')),
    public: true
  },
  {
    path: '/',
    component: lazy(() => import('../../features/dashboard/pages/Dashboard'))
  },
  {
    path: '/members',
    component: lazy(() => import('../../features/members/pages/Members'))
  },
  {
    path: '/calendar',
    component: lazy(() => import('../../features/calendar/pages/Calendar'))
  },
  {
    path: '/health',
    component: lazy(() => import('../../features/health/pages/Health'))
  }
];