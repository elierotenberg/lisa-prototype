import Head from "next/head";
import Chance from "chance";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import {
  Box,
  Center,
  Heading,
  HStack,
  VStack,
  Text,
  Button,
  BoxProps,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { MainNavBar } from "../components/MainNavBar/MainNavBar";

const domains = `
Specific phobias 
Sadness, discouragement or loss of pleasure
Inattention
Hyperactivity / Impulsivity
Irritability
Social contact issues
Inflexible and repetitive behaviors
General Impairment
Depression
Reading
Social Cognition
Social Anxiety
Math
Written Expression Skills
Comprehension and Conceptual Learning
Novel problem Solving
Factual Memory
Working Memory
Processing Speed
Visual-Spatial organization
Sustained Sequential Processing
Conduct/Oppositional Defiance
`
  .split("\n")
  .filter((line) => line.length > 0);
type GradientBarProps = BoxProps & {
  readonly p: number;
  readonly barHeight: string;
};

const GradientBar: FunctionComponent<GradientBarProps> = ({
  p,
  barHeight,
  ...props
}) => (
  <Box alignItems="stretch" position="relative" {...props}>
    <Box
      height={barHeight}
      width="100%"
      bgGradient="linear(-90deg, red, yellow, green)"
    />
    <Box
      position="absolute"
      height="30px"
      width="5px"
      bgColor="black"
      left={`${p * 100}%`}
      top={"-7.5px"}
    />
  </Box>
);

const DashboardDemo: FunctionComponent = () => {
  const [chance, setChance] = useState(new Chance());

  const randomize = useCallback(() => {
    setChance(new Chance());
  }, []);

  useEffect(() => {
    randomize();
  }, []);

  const firstName = useMemo(() => chance.name(), [chance]);
  const data = useMemo(
    () =>
      domains.map((domain) => {
        const p = chance.floating({ min: 0, max: 1 });
        const confidence = chance.pickone([
          "Very low",
          "Low",
          "Good",
          "Very good",
        ]);
        const score = p * 4 - 2;
        const subscales = ["a", "b", "c", "d"].map((subscale) => ({
          subscale,
          p: chance.floating({ min: 0, max: 1 }),
        }));
        return {
          name: domain,
          shortName: domain.length > 14 ? `${domain.slice(0, 11)}...` : domain,
          domain,
          p,
          confidence,
          subscales,
          [firstName]: score,
        };
      }),
    [firstName, chance]
  );

  return (
    <Fragment>
      <Head>
        <title>Dashboard Demo</title>
      </Head>
      <MainNavBar />
      <MainContainer>
        <VStack spacing={4} alignItems="stretch">
          <Button onClick={randomize}>Randomize</Button>
          <Heading as="h2" size="md">
            {firstName}
          </Heading>
          <Box>
            <Heading as="h3" size="sm">
              Overview
            </Heading>
            <Center overflow="hidden" maxW="100%" fontSize="xs">
              <RadarChart
                outerRadius={200}
                width={800}
                height={800}
                data={data}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="shortName" />
                <PolarRadiusAxis domain={[-2, 2]} />
                <Radar
                  name={firstName}
                  dataKey={firstName}
                  fill="#38B2AC"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </Center>
          </Box>
          <Box>
            <Heading as="h3" size="lg" mb={4}>
              Breakdown
            </Heading>
            <VStack spacing={8} alignItems="stretch">
              {data.map((item) => {
                const { p, confidence, subscales } = item;
                return (
                  <Box key={item.domain}>
                    <VStack alignItems="stretch">
                      <HStack>
                        <Heading
                          as="h4"
                          size="md"
                          maxWidth="100%"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          flex={1}
                        >
                          {item.name}
                        </Heading>
                        <GradientBar p={p} flex={1} barHeight="15px" />
                      </HStack>
                      <Accordion allowToggle ml={4}>
                        <AccordionItem>
                          <h5>
                            <AccordionButton>
                              <Box flex={1} textAlign="left">
                                Subscales
                              </Box>
                              <AccordionIcon />
                            </AccordionButton>
                          </h5>
                          <AccordionPanel>
                            <VStack>
                              {subscales.map(({ subscale, p }) => (
                                <HStack key={subscale}>
                                  <Box flex={1}>{subscale}</Box>
                                  <GradientBar
                                    barHeight="5px"
                                    w="100px"
                                    p={p}
                                  />
                                </HStack>
                              ))}
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                      <VStack pl={12} alignItems="stretch">
                        <VStack alignItems="flex-start">
                          <Text>Confidence level</Text>
                          <Text
                            fontWeight="bold"
                            pl={4}
                            style={{
                              color:
                                confidence === "Very low"
                                  ? "red"
                                  : confidence === "Low"
                                  ? "orange"
                                  : confidence === "Good"
                                  ? "blue"
                                  : "green",
                            }}
                          >
                            {confidence}
                          </Text>
                        </VStack>
                        <VStack alignItems="flex-start">
                          <Text>Suggested strategy</Text>
                          {(confidence === "Good" ||
                            confidence === "Very good") && (
                            <Button w="260px">
                              {p < 0.25
                                ? "Level 1 intervention"
                                : p < 0.5
                                ? "Level 2 intervention"
                                : p < 0.75
                                ? "Level 3 intervention"
                                : "Level 4 intervention"}
                            </Button>
                          )}
                          {(confidence === "Very low" ||
                            confidence === "Low") && (
                            <Button w="260px">Take follow-up assessment</Button>
                          )}
                        </VStack>
                      </VStack>
                    </VStack>
                  </Box>
                );
              })}
            </VStack>
          </Box>
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

export default DashboardDemo;
