import { VStack, ListItem, List } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { useStrategiesContext } from "../../contexts/StrategiesContext";
import { NavLink } from "../NavLink/NavLink";
import { PageTitle } from "../PageTitle/PageTitle";

export const DatabaseHome: FunctionComponent = () => {
  const strategies = useStrategiesContext();

  return (
    <VStack alignItems="stretch">
      <PageTitle>Database of Adaptive Strategies</PageTitle>
      <List pl="1em">
        {strategies.map((strategy, key) => (
          <ListItem key={key}>
            <NavLink href={`/database/s/${strategy.strategyId}`}>
              {strategy.label}
            </NavLink>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
