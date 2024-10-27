// src/pages/Health.tsx
import { useAuth } from '../core/hooks/useAuth';
import { FamilyMember } from '../core/types/auth';

export const Health: React.FC = () => {
  const { family } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Tracking</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Health Record
        </button>
      </div>

      {/* Family Members Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {family?.members.map((member: FamilyMember) => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">{member.firstName}</h3>
            <div className="space-y-2">
              <p className="text-gray-500">No health records available</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Health;