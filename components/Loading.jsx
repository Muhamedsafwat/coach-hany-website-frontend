import React from "react";

import { Stack, Spinner, Heading } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Stack h="50vh" align="center" justify="center">
      <Spinner color="brand" size="xl" />
      <Heading size="lg">Loading, please wait</Heading>
    </Stack>
  );
};

export default Loading;
