// my-family-app/src/features/dashboard/pages/Dashboard.tsx
import React from 'react';
import { useAuth } from '../../../core/context/auth/useAuth';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Dashboard</h1>
        <button onClick={logout} style={{ padding: '8px 16px' }}>Logout</button>
      </header>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Welcome, {user.firstName} {user.lastName}!</h2>
        <p>Email: {user.email}</p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: 'white' 
        }}>
          <h3>Family Members</h3>
          <p>Manage your family members here</p>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: 'white' 
        }}>
          <h3>Tasks</h3>
          <p>View and manage family tasks</p>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: 'white' 
        }}>
          <h3>Calendar</h3>
          <p>Family calendar and events</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;