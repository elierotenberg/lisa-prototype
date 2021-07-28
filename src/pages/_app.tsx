import type { AppProps } from "next/app";
import type { FunctionComponent } from "react";
import { MdxProvider } from "../components/MdxProvider/MdxProvider";
import { ChakraProvider } from "../components/ChakraProvider/ChakraProvider";

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <MdxProvider>
        <Component {...pageProps} />
      </MdxProvider>
    </ChakraProvider>
  );
};

export default App;
