import {
  extendTheme,
  ChakraProvider as BaseChakraProvider,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";

const theme = extendTheme({
  colors: {
    primary: "blue.400",
  },
  textStyles: {
    pseudoLink: {
      color: "blue.400",
      _hover: {
        cursor: "pointer",
        textDecoration: "underline",
        color: "blue.500",
      },
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxW: "80ch",
      },
    },
    Link: {
      baseStyle: {
        color: "blue.400",
        _focus: {
          boxShadow: 0,
        },
      },
      variants: {
        active: {
          color: "blue.500",
        },
      },
    },
  },
});

export const ChakraProvider: FunctionComponent = ({ children }) => (
  <BaseChakraProvider theme={theme}>{children}</BaseChakraProvider>
);
