import { lazy } from 'react';

export const routes = {
  dashboard: {
    path: '/',
    label: 'Dashboard',
    component: lazy(() => import('../../features/dashboard/pages/Dashboard.tsx'))
  },
  members: {
    path: '/members',
    label: 'Members',
    component: lazy(() => import('../../features/members/pages/Members.tsx'))
  },
  calendar: {
    path: '/calendar',
    label: 'Calendar',
    component: lazy(() => import('../../features/calendar/pages/Calendar'))
  },
  health: {
    path: '/health',
    label: 'Health',
    component: lazy(() => import('../../features/health/pages/Health.tsx'))
  }
};