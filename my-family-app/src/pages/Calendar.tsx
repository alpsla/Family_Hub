// src/pages/Calendar.tsx
import { useState } from 'react';

export const Calendar: React.FC = () => {
  const [currentDate] = useState(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Family Calendar</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <p className="text-gray-500">Calendar implementation coming soon...</p>
        </div>
      </div>
    </div>
  );
};