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
  SimpleGrid,
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
        const score = p * 4 - 2;
        return {
          name: domain,
          shortName: domain.length > 14 ? `${domain.slice(0, 11)}...` : domain,
          domain,
          p,
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
            <Heading as="h3" size="sm" mb={4}>
              Breakdown
            </Heading>
            <SimpleGrid
              minChildWidth="200px"
              alignItems="center"
              justifyContent="center"
              spacing={4}
            >
              {data.map((item) => {
                const { p } = item;
                const translateY = `${(1 - p) * 140}px`;
                return (
                  <Box key={item.domain}>
                    <VStack alignItems="stretch">
                      <Heading
                        as="h4"
                        size="xs"
                        maxWidth="100%"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {item.name}
                      </Heading>
                      <HStack
                        alignItems="stretch"
                        spacing={4}
                        position="relative"
                      >
                        <Box
                          height="140px"
                          width="20px"
                          bgGradient="linear(red, yellow, green)"
                        />
                        <Box
                          position="absolute"
                          height="3px"
                          width="30px"
                          bgColor="#0000FF"
                          left={0}
                          top={0}
                          transform={`translate(-21.5px, ${translateY})`}
                        />
                        <Text>
                          {p < 0.25
                            ? "Level 1 intervention"
                            : p < 0.5
                            ? "Level 2 intervention"
                            : p < 0.75
                            ? "Level 3 intervention"
                            : "Level 4 intervention"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

export default DashboardDemo;
