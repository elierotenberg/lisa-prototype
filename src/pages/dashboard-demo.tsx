import Head from "next/head";
import Chance from "chance";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Fragment,
  FunctionComponent,
  useCallback,
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
} from "@chakra-ui/react";
import interpolate from "color-interpolate";

const domains = [
  "Anxiety, shyness",
  "Sadness, discouragement",
  "Inattention, impulsivity",
  "Irritability",
  "Social issues",
];

const colorMap = interpolate(["green", "yellow", "red"]);

const DashboardDemo: FunctionComponent = () => {
  const [chance, setChance] = useState(new Chance());

  const randomize = useCallback(() => {
    setChance(new Chance());
  }, []);

  const firstName = useMemo(() => chance.name(), [chance]);
  const data = useMemo(
    () =>
      domains.map((domain) => {
        const p = chance.floating({ min: 0, max: 1 });
        const score = p * 4 - 2;
        const fill = colorMap(p);
        return {
          name: domain,
          domain,
          p,
          [firstName]: score,
          fill,
        };
      }),
    [firstName, chance]
  );

  return (
    <Fragment>
      <Head>
        <title>Dashboard Demo</title>
      </Head>
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
            <Center overflow="hidden" maxW="100%">
              <RadarChart outerRadius={90} width={600} height={400} data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="domain" />
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
            <VStack alignItems="stretch" spacing={4} pl={4}>
              {data.map((item) => {
                const { p } = item;
                const translateY = `${(1 - p) * 140}px`;
                return (
                  <VStack key={item.domain} alignItems="stretch">
                    <Heading as="h4" size="sm">
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
