import React from "react";

import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box bg="#0f0f0f" minH="100vh" as="main">
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
