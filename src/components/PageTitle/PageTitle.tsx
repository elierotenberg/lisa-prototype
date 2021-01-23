import { Heading, HeadingProps } from "@chakra-ui/react";
import { FunctionComponent } from "react";

export const PageTitle: FunctionComponent<HeadingProps> = (props) => (
  <Heading as="h2" size="lg" fontWeight="bold" my="0.5em" {...props} />
);
