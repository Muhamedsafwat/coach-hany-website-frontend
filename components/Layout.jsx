import React from "react";
import Header from "./Header";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box overFlow="hidden">{children}</Box>
    </>
  );
};

export default Layout;
