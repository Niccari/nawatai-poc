import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainFrame from "../components/pages/mainFrame";
import MetaHeader from "../components/pages/metaHeader";
import theme from "../components/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MainFrame>
        <MetaHeader />
        <Component {...pageProps} />
      </MainFrame>
    </ChakraProvider>
  );
}

export default MyApp;
