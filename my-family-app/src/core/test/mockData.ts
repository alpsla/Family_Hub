// src/core/test/mockData.ts
export const mockUsers = {
    parent: {
      id: 'user1',
      email: 'parent@test.com',
      password: 'Parent123!',
      role: 'parent',
      familyId: 'family1'
    },
    child: {
      id: 'user2',
      email: 'child@test.com',
      password: 'Child123!',
      role: 'child',
      familyId: 'family1'
    },
    guardian: {
      id: 'user3',
      email: 'guardian@test.com',
      password: 'Guardian123!',
      role: 'guardian',
      familyId: 'family1'
    }
  };
  
  export const mockFamilyData = {
    id: 'family1',
    name: 'Test Family',
    members: [
      {
        id: 'user1',
        name: 'Parent User',
        role: 'parent',
        joinedAt: '2024-01-01'
      },
      {
        id: 'user2',
        name: 'Child User',
        role: 'child',
        joinedAt: '2024-01-01'
      }
    ],
    events: [
      {
        id: 'event1',
        title: 'Family Meeting',
        date: '2024-11-10',
        type: 'recurring'
      }
    ],
    healthRecords: [
      {
        id: 'health1',
        memberId: 'user2',
        type: 'checkup',
        date: '2024-11-01',
        notes: 'Regular checkup'
      }
    ]
  };