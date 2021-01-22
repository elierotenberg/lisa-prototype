import {
  extendTheme,
  ChakraProvider as BaseChakraProvider,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: "blue.500",
        _focus: {
          boxShadow: 0,
        },
      },
      variants: {
        active: {
          fontWeight: "bold",
        },
      },
    },
  },
});

export const ChakraProvider: FunctionComponent = ({ children }) => (
  <BaseChakraProvider theme={theme}>{children}</BaseChakraProvider>
);
