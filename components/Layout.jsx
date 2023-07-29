import React, { useContext } from "react";

import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";
import AdminLayout from "./AdminLayout";

import { UserInfo } from "../authContext";

const Layout = ({ children }) => {
  const { user } = useContext(UserInfo);

  if (user.username) {
    return <AdminLayout children={children} />;
  } else {
    return (
      <>
        <Header />
        <Box bg="#0f0f0f" minH="100vh" as="main">
          {children}
        </Box>
        <Footer />
      </>
    );
  }
};

export default Layout;
