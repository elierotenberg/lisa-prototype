import {
  Container,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import { NavLink } from "../NavLink/NavLink";

const items: [href: string, label: string][] = [
  ["/", "About"],
  ["/dashboard", "Dashboard"],
  ["/assessment", "Assessments"],
  ["/database", "Database"],
];

export const MainNavBar: FunctionComponent = () => {
  return (
    <Container alignItems="center" justifyContent="center" my="1em">
      <Flex alignItems="center" justifyContent="center" direction="column">
        <Heading as="h1" size="3xl" mb="0.15em">
          LISA
        </Heading>
        <Text as="em">
          A digital tool to support each child according to its needs
        </Text>
        <Divider my="0.75em" />
        <List as="nav" display="flex" flexWrap="wrap">
          {items.map(([href, label], key) => (
            <ListItem key={key} mx="0.25em" flex={1}>
              <NavLink href={href} fontSize="lg">
                {label}
              </NavLink>
            </ListItem>
          ))}
        </List>
      </Flex>
    </Container>
  );
};
