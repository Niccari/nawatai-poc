import type { AppProps } from "next/app";
import { ThemeProvider } from "@/components/theme-provider";
import MainFrame from "../components/pages/mainFrame";
import MetaHeader from "../components/pages/metaHeader";
import { Toaster } from "@/components/ui/sonner";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="dark">
      <MainFrame>
        <MetaHeader />
        <Component {...pageProps} />
        <Toaster />
      </MainFrame>
    </ThemeProvider>
  );
}

export default MyApp;
