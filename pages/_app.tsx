import type { AppProps } from "next/app";
import type { FunctionComponent } from "react";
import "../styles/globals.css";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
