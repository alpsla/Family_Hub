import React from 'react';
import { useAuth } from '../hooks/useAuth';

const TestControls: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="test-controls">
      <h3>Test Controls</h3>
      <div>
        <p>Current User: {user ? `${user.firstName} ${user.lastName}` : 'None'}</p>
      </div>
    </div>
  );
};

export default TestControls;