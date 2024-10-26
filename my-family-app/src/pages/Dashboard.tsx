// src/pages/Dashboard.tsx
import { useAuth } from '../core/hooks/useAuth';

export const Dashboard: React.FC = () => {
  const { user, family } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, {user?.firstName}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Family Members</h3>
          <p className="text-2xl font-bold mt-2">{family?.members.length || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Upcoming Events</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Tasks</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-2xl font-bold mt-2">0</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
        <p className="text-gray-500">No recent activity</p>
      </div>
    </div>
  );
};