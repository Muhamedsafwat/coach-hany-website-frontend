import React from "react";

import ProtectedRoute from "../../components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute allowedRole="admin">
      <div>Admin</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
