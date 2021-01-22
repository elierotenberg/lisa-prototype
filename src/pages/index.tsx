import type { FunctionComponent } from "react";
import { Container } from "@chakra-ui/react";

import About from "../../content/about.mdx";

const Home: FunctionComponent = () => (
  <Container maxW="80ch">
    <About />
  </Container>
);
export default Home;
