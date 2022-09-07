import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainFrame from "../components/mainFrame";
import MetaHeader from "../components/metaHeader";
import theme from "./theme";

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
