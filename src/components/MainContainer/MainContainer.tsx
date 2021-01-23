import { ContainerProps, Container } from "@chakra-ui/react";
import { FunctionComponent } from "react";

type MainContainerProps = ContainerProps;

export const MainContainer: FunctionComponent<MainContainerProps> = (props) => (
  <Container as="main" mb="1em" {...props} />
);
