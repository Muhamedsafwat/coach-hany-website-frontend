import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakraTheme";
import Layout from "../components/Layout";

import Context from "../authContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </ChakraProvider>
  );
}

export default MyApp;
