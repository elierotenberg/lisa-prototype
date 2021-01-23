import {
  CircularProgress,
  CircularProgressLabel,
  HStack,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
} from "@chakra-ui/react";
import { Fragment, FunctionComponent, useMemo } from "react";
import { useAppStateContext } from "../../contexts/AppStateContext";
import { useStrategiesContext } from "../../contexts/StrategiesContext";
import { mergeDomains, roundedPercent } from "../../lib/Assessment";
import { helpers } from "../../lib/Strategy";
import { NavLink } from "../NavLink/NavLink";
import { PageTitle } from "../PageTitle/PageTitle";
import { SectionTitle } from "../SectionTitle/SectionTitle";

type LearnerProfileProps = {
  readonly learnerId: string;
};

export const LearnerProfile: FunctionComponent<LearnerProfileProps> = ({
  learnerId,
}) => {
  const [appState] = useAppStateContext();
  const strategies = useStrategiesContext();
  const assessmentResults = useMemo(
    () =>
      appState.assessmentResults.filter(
        (assessmentResult) => assessmentResult.learnerId === learnerId
      ),
    [appState.assessmentResults, learnerId]
  );
  const domains = useMemo(() => mergeDomains(assessmentResults), [
    learnerId,
    appState.assessmentResults,
  ]);

  const suggestedStrategies = useMemo(
    () =>
      strategies.filter((strategy) => strategy.isRecommended(domains, helpers)),
    [strategies, domains]
  );

  return (
    <VStack alignItems="stretch" spacing={8}>
      <PageTitle>{learnerId}</PageTitle>
      <VStack as="section" alignItems="stretch">
        <SectionTitle>Overview</SectionTitle>
        <HStack flexWrap="wrap" justifyContent="center" spacing={8}>
          {Object.entries(domains).map(([domain, value]) => (
            <VStack key={domain}>
              <CircularProgress
                min={value.min}
                max={value.max}
                value={value.current}
                size="120px"
              >
                <CircularProgressLabel fontSize="md">
                  {roundedPercent(value)}%
                </CircularProgressLabel>
              </CircularProgress>
              <Text>{domain}</Text>
            </VStack>
          ))}
        </HStack>
      </VStack>
      <VStack as="section" alignItems="stretch">
        <SectionTitle>How can I help?</SectionTitle>
        {suggestedStrategies.length === 0 ? (
          <Text>
            We do not have specific recommendations, but you may still browse
            our <NavLink href="/database">database of strategies</NavLink>.
          </Text>
        ) : (
          <Fragment>
            Here are some recommended resources:
            <List pl="1em">
              {suggestedStrategies.map((strategy, key) => (
                <ListItem key={key}>
                  <NavLink href={`/database/s/${strategy.strategyId}`}>
                    {strategy.label}
                  </NavLink>
                </ListItem>
              ))}
            </List>
            <Text>
              You can also browse our{" "}
              <NavLink href="/database">database of strategies</NavLink>.
            </Text>
          </Fragment>
        )}
      </VStack>
      <VStack as="section" alignItems="stretch">
        <SectionTitle>Breakdown</SectionTitle>
        <Table>
          <Thead>
            <Tr>
              <Th>Domain</Th>
              <Th isNumeric>Min</Th>
              <Th isNumeric>Max</Th>
              <Th isNumeric>Actual</Th>
              <Th isNumeric>%</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(domains).map(([domain, value]) => (
              <Tr key={domain}>
                <Td>{domain}</Td>
                <Td isNumeric>{value.min}</Td>
                <Td isNumeric>{value.max}</Td>
                <Td isNumeric>{value.current}</Td>
                <Td isNumeric>{roundedPercent(value)}%</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
      <VStack as="section" alignItems="stretch">
        <SectionTitle>Individual responses</SectionTitle>
        <Table>
          <Thead>
            <Tr>
              <Th>Assessment</Th>
              <Th>Label</Th>
              <Th>Value</Th>
              <Th>Domains</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assessmentResults.map((assessmentResult) =>
              assessmentResult.raw.map((raw) => (
                <Tr
                  key={`${assessmentResult.assessmentId}-${raw.itemLabel}`}
                  fontSize="sm"
                >
                  <Td>{assessmentResult.assessmentId}</Td>
                  <Td>{raw.itemLabel}</Td>
                  <Td>{raw.optionLabel}</Td>
                  <Td>
                    <Table variant="unstyled">
                      <Tbody>
                        {Object.entries(raw.domains).map(([domain, value]) => (
                          <Tr key={domain}>
                            <Td>{domain}</Td>
                            <Td isNumeric>{value}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </VStack>
    </VStack>
  );
};
