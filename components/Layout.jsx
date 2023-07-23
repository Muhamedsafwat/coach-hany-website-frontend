import React from "react";

import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <miain>{children}</miain>
      <Footer />
    </>
  );
};

export default Layout;
