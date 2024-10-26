// src/pages/MainApp.tsx
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard.tsx';
import { Calendar } from './Calendar.tsx';
import { Health } from './Health.tsx';
import { Members } from './Members.tsx';
import { MainLayout } from '../core/layouts/MainLayout';

export const MainApp: React.FC = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/health" element={<Health />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </MainLayout>
  );
};