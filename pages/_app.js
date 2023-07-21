import { ChakraProvider } from "@chakra-ui/react";
import theme from "../chakraTheme";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
