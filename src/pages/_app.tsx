import "./globals.css";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from "@chakra-ui/react";
import MainFrame from "../components/mainFrame";
import MetaHeader from "../components/metaHeader";

const theme = extendTheme({
  textStyles: {
    h1: {
      fontSize: ["20px", "24px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
    h2: {
      fontSize: ["18px", "20px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
    h3: {
      fontSize: ["16px", "18px"],
      fontWeight: "bold",
      lineHeight: "110%",
    },
  },
});

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
