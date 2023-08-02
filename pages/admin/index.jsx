import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import ProtectedRoute from "../../components/ProtectedRoute";
const Plans = () => {
  return (
    <ProtectedRoute allowedRole="admin">
      <Box mt="5rem">
        <Heading>Dashboard</Heading>
      </Box>
    </ProtectedRoute>
  );
};

export default Plans;
