import React from "react";
import Header from "./Header";
import { Box, Text } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box overFlow="hidden">{children}</Box>
      <Box
        borderTop="1px"
        borderTopColor="#333"
        bg="#191919"
        padding="1rem"
        as="footer"
        textAlign="center"
      >
        <Text fontSize=".9rem">
          Copyright ©2023 All rights reserved | This template is made with by
          <Text cursor="pointer" as="span" color="brand">
            {" "}
            Muhamed Safwat
          </Text>
        </Text>
      </Box>
    </>
  );
};

export default Layout;
