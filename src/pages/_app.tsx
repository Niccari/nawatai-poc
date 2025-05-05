import type { AppProps } from "next/app";
import { Provider } from "../components/ui/provider";
import MainFrame from "../components/pages/mainFrame";
import MetaHeader from "../components/pages/metaHeader";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <MainFrame>
        <MetaHeader />
        <Component {...pageProps} />
      </MainFrame>
    </Provider>
  );
}

export default MyApp;
