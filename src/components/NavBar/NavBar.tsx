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
  ["/database", "Database"],
];

export const NavBar: FunctionComponent = () => {
  return (
    <Container alignItems="center" justifyContent="center" mb="1em">
      <Flex alignItems="center" justifyContent="center" direction="column">
        <Heading as="h1" size="3xl" mb="0.15em">
          LISA
        </Heading>
        <Text as="em">
          A digital tool to support each child according to its needs
        </Text>
        <Divider my="0.75em" />
        <List as="nav" display="flex">
          {items.map(([href, label], key) => (
            <ListItem key={key} mx="0.25em">
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
