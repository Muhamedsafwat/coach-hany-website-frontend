import React from "react";
import { Heading, Box } from "@chakra-ui/react";

import ProtectedRoute from "../../components/ProtectedRoute";
const Plans = () => {
  return (
    <ProtectedRoute allowedRole="admin">
      <Box
        paddingInline={{ base: "1.5rem", md: "3rem", lg: "6rem" }}
        paddingBlock="2rem"
      >
        <Heading mb="2rem">Dashnoard</Heading>
      </Box>
    </ProtectedRoute>
  );
};

export default Plans;
