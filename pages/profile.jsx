import React from "react";

import ProtectedRoute from "../components/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute allowedRole="user">
      <div>profile</div>
    </ProtectedRoute>
  );
};

export default Profile;
