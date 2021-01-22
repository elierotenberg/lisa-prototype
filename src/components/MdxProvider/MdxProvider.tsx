import { Heading, Image, Box } from "@chakra-ui/react";
import { MDXProvider as BaseMdxProvider, Components } from "@mdx-js/react";
import { FunctionComponent } from "react";

const components: Components = {
  h1: ({ children }) => (
    <Heading as="h1" size="xl" my="0.25em">
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="lg" my="0.25em">
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="md" my="0.25em">
      {children}
    </Heading>
  ),
  h4: ({ children }) => (
    <Heading as="h4" size="sm" my="0.25em">
      {children}
    </Heading>
  ),
  h5: ({ children }) => (
    <Heading as="h5" size="xs" my="0.25em">
      {children}
    </Heading>
  ),
  h6: ({ children }) => (
    <Heading as="h6" size="xs" my="0.25em">
      {children}
    </Heading>
  ),
  img: ({ src, alt }) => (
    <Image d="block" mx="auto" my="0.5em" src={src} alt={alt} />
  ),
  p: ({ children }) => (
    <Box as="p" my="0.25em">
      {children}
    </Box>
  ),
  wrapper: ({ children }) => (
    <Box fontSize="sm" textAlign="justify">
      {children}
    </Box>
  ),
};

export const MdxProvider: FunctionComponent = ({ children }) => (
  <BaseMdxProvider components={components}>{children}</BaseMdxProvider>
);
