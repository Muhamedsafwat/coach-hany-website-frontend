import React from "react";

import { Stack, Spinner, Heading } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Stack h="90vh" align="center" justify="center">
      <Spinner color="brand" size="xl" />
      <Heading size="lg">Loadin, please wait</Heading>
    </Stack>
  );
};

export default Loading;
