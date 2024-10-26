const Dashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-medium">Family Members</h3>
            <p className="text-2xl font-bold mt-2">4</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;