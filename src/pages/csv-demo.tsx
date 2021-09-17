import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  VStack,
  Box,
  Heading,
  SimpleGrid,
  Button,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
} from "recharts";
import Head from "next/head";
import { ChangeEvent } from "react";
import { Fragment, FunctionComponent, useCallback, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import GaugeChart from "react-gauge-chart";
import { quantize, interpolate } from "d3-interpolate";

import Papa from "papaparse";

let student = "";

const domainsByCategory = {
  Language: [
    "language (including gestures)",
    "speech quantity",
    "speech articulation",
  ],
  "Social function": [
    "cooperativeness",
    "following rules",
    "bullying",
    "social interactions",
    "social conformity",
    "empathy",
  ],
  Behavior: [
    "habits and repetitive behavior",
    "risk taking",
    "activity",
    "impulsivity",
  ],
  Emotions: [
    "irritability",
    "mood",
    "emotional reactivity",
    "stress level",
    "worries",
  ],
  Personality: [
    "temperament",
    "confidence",
    "creativity",
    "responsibility",
    "integrity",
    "perseverance",
    "sexual identity",
    "sexual behavior",
  ],
  Cognition: [
    "attention",
    "planning and organization",
    "memory",
    "abstraction / generalization",
    "thinking (processing) speed",
  ],
  Learning: [
    "reading",
    "writing",
    "mathematics",
    "learning",
    "academic performance",
  ],
  Health: [
    "diet",
    "energy levels",
    "gross motor skills",
    "fine motor skills",
    "complaints of pain",
    "hygiene",
  ],
};
const nrOfLevels = 20;
const colors = [
  ...quantize(interpolate("#0286fa", "#bddffd"), nrOfLevels / 2),
  ...quantize(interpolate("#bddffd", "#0286fa"), nrOfLevels / 2),
];
const colorsUnipolar = [
  ...quantize(interpolate("#fbeafe", "#d603fb"), nrOfLevels / 2),
];

const CsvDemoVisualization: FunctionComponent<{
  dataPerDomain: DomainResult;
  averagesForRadar: CategoryResult;
  averagesForSpeedometers: Record<string, number>;
}> = ({ dataPerDomain, averagesForRadar, averagesForSpeedometers }) => {
  // Do visualization here
  return (
    <Box>
      <RadarChart width={730} height={500} data={averagesForRadar}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 5]}
          tick={false}
          axisLine={false}
        />
        <Radar
          dataKey="abs-avg"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>

      {Object.keys(dataPerDomain).map((category) => {
        if (
          category != "Averages" &&
          category != "Abs-averages" &&
          category != "Averages-radar"
        ) {
          const result = (
            <Box>
              <Heading as="h3" size="sm">
                {category}
              </Heading>

              <GaugeChart
                id="gauge-chart-entry"
                colors={colorsUnipolar}
                nrOfLevels={nrOfLevels}
                textColor="464A4F"
                hideText={true}
                percent={averagesForSpeedometers[category] / 5 + 0.01}
              />

              <SimpleGrid columns={2} spacing={0}>
                {dataPerDomain[category].map((entry) => {
                  const placeholder = "    ";
                  const result = (
                    <Box rounded="md" m="2" p="5">
                      <b>{entry["domain"]}</b>
                      {placeholder}
                      {placeholder}
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            colorScheme="cyan"
                            size="xs"
                            variant="outline"
                          >
                            i
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            <h3>
                              <b>Information:</b>
                            </h3>
                            <p>
                              &emsp;Many people have habits and repetitive
                              behaviors. In fact, they are often quite adaptive
                              as they help us get through routine tasks quickly
                              and efficiently. However, habits and repetitive
                              behaviors occur along a spectrum. Some individuals
                              are unable to develop these good habits. This
                              forces them to recreate each routine every time
                              they take on a task. This leads to errors and
                              incredible inefficiency. At the other end of the
                              spectrum are individuals who have very many and/or
                              very rigid habits and repetitive behaviors. When
                              the habits are rigid, they &#34;must&#34; use them
                              even when they are not helpful. And, when there
                              are too many, they interfere with the
                              individual&#39;s ability to be flexible and adapt
                              to their environment.
                            </p>
                            <h3>
                              <b>Examples:</b>
                            </h3>
                            <h4>
                              <b>&emsp;Typical:</b>
                            </h4>
                            <p>
                              &emsp;&emsp;When Jacques gets ready to leave the
                              house, he makes sure he checks carefully to be
                              sure that he has his wallet, money and keys. When
                              he gets in the car, he carefully makes sure that
                              his seat and mirrors are appropriately adjusted,
                              and his seatbelt is on before he starts the car
                              and begins driving.
                            </p>
                            <h4>
                              <b>&emsp;Anchor 1:</b>
                            </h4>
                            <p>
                              &emsp;&emsp;Francoise has no routines for leaving
                              the house. She often forgets important items,
                              including her keys. She has locked herself out of
                              the house many times. She also forgets to put on
                              her seatbelt and has been ticketed multiple times
                              for this violation.
                            </p>
                            <h4>
                              <b>&emsp;Anchor 2:</b>
                            </h4>
                            <p>
                              &emsp;&emsp;Etienne has a list that he must check
                              before he leaves the house. He checks carefully,
                              exactly 10 times to be sure that he has his
                              wallet, keys, and money. If he is missing
                              something, he must start his checking all over
                              again. It can sometimes take him an hour to be
                              prepared to leave the house. This happens so often
                              that he frequently misses appointments and is late
                              for work. On some days, he must repeat the
                              patterns so many times that he cannot leave the
                              house at all.
                            </p>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                      {placeholder}
                      <Link href="test-guide.pdf" isExternal>
                        <Button colorScheme="cyan" size="xs" variant="outline">
                          g
                        </Button>
                      </Link>
                      <GaugeChart
                        id="gauge-chart-entry"
                        colors={colors}
                        nrOfLevels={nrOfLevels}
                        textColor="464A4F"
                        hideText={true}
                        percent={entry["score"] / 10 + 0.01}
                      />
                    </Box>
                  );
                  return result;
                })}
              </SimpleGrid>
              <hr />
            </Box>
          );
          return result;
        }
      })}
    </Box>
  );
};

const CsvDemo: FunctionComponent = () => {
  const [result, setResult] = useState<null | Papa.ParseResult<string[]>>(null);

  const onChangeFile = useCallback(
    ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
      if (files.length > 0) {
        const file = files[0];
        Papa.parse(file, {
          complete: setResult,
        });
      }
    },
    []
  );

  return (
    <Fragment>
      <Head>
        <title>CSV Demo</title>
      </Head>
      <MainContainer pt={4}>
        <VStack spacing={4} alignItems="stretch">
          <h1>{student}</h1>
          <Flex justifyContent="center">
            <input type="file" onChange={onChangeFile} />
          </Flex>
          {result?.errors && (
            <Flex flexDirection="column" justifyContent="stretch">
              {result.errors.map(({ code, message, row, type }, key) => (
                <Alert key={key} status="error">
                  <AlertIcon />
                  <AlertTitle>{message}</AlertTitle>
                  <AlertDescription>
                    <pre>{JSON.stringify({ code, row, type }, null, 2)}</pre>
                  </AlertDescription>
                </Alert>
              ))}
            </Flex>
          )}
          {result?.data && (
            <CsvDemoVisualization
              dataPerDomain={transformData(result.data)}
              averagesForRadar={transformAveragesForRadar(result.data)}
              averagesForSpeedometers={transformAveragesForSpeedometers(
                result.data
              )}
            />
          )}
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

type DomainResultItem = {
  domain: string;
  score: number;
};

type DomainResult = Record<string, DomainResultItem[]>;

const transformData = (data: string[][]): DomainResult => {
  let cleanedData = data;

  // remove headers
  cleanedData.shift();

  // get student ID
  student = cleanedData[0][10].split(": ")[1];

  // only keep last assessment
  const latestEndTime = cleanedData[0][3];
  cleanedData = cleanedData.filter((item) => item[3] == latestEndTime);

  // parse value
  cleanedData.map((item) => item.push(item[10].split(": ")[1]));

  const result: DomainResult = {};
  Object.keys(domainsByCategory).forEach((categoryName) => {
    const categoryArray = [];
    domainsByCategory[categoryName].forEach((domainName) => {
      const score = getScoreByDomain(cleanedData, domainName);
      const domainObject = {
        domain: domainName,
        score: score,
      };
      categoryArray.push(domainObject);
    });
    result[categoryName] = categoryArray;
  });

  return result;
};

const getScoreByDomain = (data: string[][], domainName: string): number => {
  let score = -1;
  if (
    data.filter((item) => item[11].trim().toLowerCase() == domainName).length >
    0
  ) {
    score = parseFloat(
      data.filter((item) => item[11].trim().toLowerCase() == domainName)[0][15]
    );
  }
  return score;
};

const transformAveragesForSpeedometers = (
  data: string[][]
): Record<string, number> => {
  let cleanedData = data;

  // remove headers
  cleanedData.shift();

  // get student ID
  student = cleanedData[0][10].split(": ")[1];

  // only keep last assessment
  const latestEndTime = cleanedData[0][3];
  cleanedData = cleanedData.filter((item) => item[3] == latestEndTime);

  // parse value
  cleanedData.map((item) => item.push(item[10].split(": ")[1]));

  const result: Record<string, number> = {};
  Object.keys(domainsByCategory).forEach((categoryName) => {
    let sumScorePerCategory = 0;
    let nbOfDomainsPerCategory = 0;
    domainsByCategory[categoryName].forEach((domainName) => {
      const score = getScoreByDomain(cleanedData, domainName);
      console.log("score ", score);
      sumScorePerCategory += Math.abs(score - 5);
      nbOfDomainsPerCategory += 1;
    });
    console.log("sum ", sumScorePerCategory, " nb ", nbOfDomainsPerCategory);
    result[categoryName] = sumScorePerCategory / nbOfDomainsPerCategory;
  });

  console.log(result);

  return result;
};

type CategoryResultItem = {
  category: string;
  ["abs-avg"]: number;
};
type CategoryResult = CategoryResultItem[];

const transformAveragesForRadar = (data: string[][]): CategoryResult => {
  let cleanedData = data;

  // remove headers
  cleanedData.shift();

  // get student ID
  student = cleanedData[0][10].split(": ")[1];

  // only keep last assessment
  const latestEndTime = cleanedData[0][3];
  cleanedData = cleanedData.filter((item) => item[3] == latestEndTime);

  // parse value
  cleanedData.map((item) => item.push(item[10].split(": ")[1]));

  const result: CategoryResult = [];
  Object.keys(domainsByCategory).forEach((categoryName) => {
    let sumScorePerCategory = 0;
    let nbOfDomainsPerCategory = 0;
    domainsByCategory[categoryName].forEach((domainName) => {
      const score = getScoreByDomain(cleanedData, domainName);
      console.log("score ", score);
      sumScorePerCategory += Math.abs(score - 5);
      nbOfDomainsPerCategory += 1;
    });
    console.log("sum ", sumScorePerCategory, " nb ", nbOfDomainsPerCategory);
    const absAvg = sumScorePerCategory / nbOfDomainsPerCategory;
    const categoryObject = {
      category: categoryName,
      "abs-avg": absAvg,
    };
    result.push(categoryObject);
  });

  console.log(result);

  return result;
};

export default CsvDemo;
