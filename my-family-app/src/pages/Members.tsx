// src/pages/Members.tsx
import { useAuth } from '../core/hooks/useAuth';

export const Members: React.FC = () => {
  const { family } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Family Members</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Member
        </button>
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {family?.members.map(member => (
          <div key={member.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                {member.firstName.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium">{member.firstName} {member.lastName}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};