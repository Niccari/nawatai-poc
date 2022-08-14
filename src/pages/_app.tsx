import "./globals.css";
import type { AppProps } from "next/app";
import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from "@chakra-ui/react";

const colors = {
  brand: defaultTheme.colors.red,
};
const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
