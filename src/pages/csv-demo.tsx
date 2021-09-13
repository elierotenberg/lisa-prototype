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
  Link
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
  ReferenceLine,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
  Legend
} from "recharts";
import Head from "next/head";
import { ChangeEvent } from "react";
import { Fragment, FunctionComponent, useCallback, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import GaugeChart from "react-gauge-chart";
import { quantize, interpolate } from "d3-interpolate";

import Papa from "papaparse";
import { domain } from "process";

var student = ""

const domainsByCategory = {
  "Language": ["language (including gestures)", "speech quantity", "speech articulation"],
  "Social function": ["cooperativeness", "following rules", "bullying", "social interactions", "social conformity", "empathy"],
  "Behavior": ["habits and repetitive behavior", "risk taking", "activity", "impulsivity"],
  "Emotions": ["irritability", "mood", "emotional reactivity", "stress level", "worries"],
  "Personality": ["temperament", "confidence", "creativity","responsibility", "integrity","perseverance","sexual identity","sexual behavior"],
  "Cognition": ["attention", "planning and organization", "memory","abstraction / generalization","thinking (processing) speed"],
  "Learning": ["reading", "writing", "mathematics","learning","academic performance"],
  "Health": ["diet","energy levels","gross motor skills","fine motor skills","complaints of pain","hygiene"]
}
const nrOfLevels = 20;
const colors = [
  ...quantize(interpolate("#0286fa", "#bddffd"), nrOfLevels / 2),
  ...quantize(interpolate("#bddffd", "#0286fa"), nrOfLevels / 2),
];
const colorsUnipolar = [
  ...quantize(interpolate("#fbeafe", "#d603fb"), nrOfLevels / 2),
];

const CsvDemoVisualization: FunctionComponent<{ dataPerDomain: unknown[], averagesForRadar: unknown[], averagesForSpeedometers: unknown[] }> = ({
  dataPerDomain, averagesForRadar, averagesForSpeedometers
}) => {
  // Do visualization here
  return <Box>

    <RadarChart width={730} height={500} data={averagesForRadar}>
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
      <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>

    {Object.keys(dataPerDomain).map((category, index) => {
    
    if (category != "Averages" && category != "Abs-averages" && category != "Averages-radar") {

      let result = <Box>
        <Heading as="h3" size="sm">
        {category}
        </Heading>

        <GaugeChart
          id="gauge-chart-entry"
          colors={colorsUnipolar}
          nrOfLevels={nrOfLevels}
          textColor="464A4F"
          hideText={true}
          percent={(averagesForSpeedometers[category]) / 5 + 0.01}
        />

        <SimpleGrid columns={2} spacing={0}>
          {dataPerDomain[category].map((entry, index) => {
            
            let bgColor = (entry["score"] > 3 || entry["score"] < -3) ? "#e1f4fc" : "#FFFFFF"
            let placeholder = "    "
            let result = (
              <Box rounded="md"
            m="2" p="5">
                <b>{entry["domain"]}</b> 
                {placeholder}
                {placeholder}
                <Button colorScheme="cyan" size="xs" variant="outline"> 
                  i
                </Button>
                {placeholder}
                <Link href="test-guide.pdf" isExternal >
                  <Button colorScheme="cyan" size="xs" variant="outline" >
                    g
                  </Button>
                </Link>
                <GaugeChart
                  id="gauge-chart-entry"
                  colors={colors}
                  nrOfLevels={nrOfLevels}
                  textColor="464A4F"
                  hideText={true}
                  percent={(entry["score"]) / 10 + 0.01}
                />
              
              </Box>
            );
            return result;
          })}
        </SimpleGrid>
        <hr/>
      </Box>
    return result;
    }
    
  })}
    <pre>{JSON.stringify(dataPerDomain, null, 2)}</pre>
  </Box>;
};

const CsvDemo: FunctionComponent = () => {
  const [result, setResult] = useState<null | Papa.ParseResult<unknown>>(null);

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
          <h>{student}</h>
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
          {result?.data && <CsvDemoVisualization dataPerDomain={transformData(result.data)} averagesForRadar={transformAveragesForRadar(result.data)} averagesForSpeedometers={transformAveragesForSpeedometers(result.data)}/>}
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

const transformData = (data: unknown[]) => {
  var cleanedData = data

  // remove headers
  cleanedData.shift()

  // get student ID
  student = cleanedData[0][10].split(": ")[1]
  
  // only keep last assessment
  const latestEndTime = cleanedData[0][3]
  cleanedData = cleanedData.filter(item => item[3] == latestEndTime);
  
  // parse value
  cleanedData.map(item => item.push(item[10].split(": ")[1]))

  var result = {}
  Object.keys(domainsByCategory).forEach(categoryName => {
    var categoryArray = []
    domainsByCategory[categoryName].forEach(domainName => {
      var score = getScoreByDomain(cleanedData, domainName)
      var domainObject = {
        "domain": domainName,
        "score": score
      }
      categoryArray.push(domainObject)
    })
    result[categoryName] = categoryArray
  })
  
  return result
}

const getScoreByDomain = (data: unknown[], domainName) => {
  var score = -1
  if (data.filter(item => item[11].trim().toLowerCase() == domainName).length > 0) {
    score = data.filter(item => item[11].trim().toLowerCase() == domainName)[0][15]
  }
  return score
}

const transformAveragesForSpeedometers = (data: unknown[]) => {
  var cleanedData = data

  // remove headers
  cleanedData.shift()

  // get student ID
  student = cleanedData[0][10].split(": ")[1]
  
  // only keep last assessment
  const latestEndTime = cleanedData[0][3]
  cleanedData = cleanedData.filter(item => item[3] == latestEndTime);
  
  // parse value
  cleanedData.map(item => item.push(item[10].split(": ")[1]))

  var result = {}
  Object.keys(domainsByCategory).forEach(categoryName => {
    var sumScorePerCategory = 0
    var nbOfDomainsPerCategory = 0
    domainsByCategory[categoryName].forEach(domainName => {
      var score = getScoreByDomain(cleanedData, domainName)
      console.log("score ", score)
      sumScorePerCategory += Math.abs(parseFloat(score)-5)
      nbOfDomainsPerCategory += 1
    })
    console.log("sum ", sumScorePerCategory, " nb ", nbOfDomainsPerCategory)
    result[categoryName] = sumScorePerCategory / nbOfDomainsPerCategory
  })

  console.log(result)

  return result
}

const transformAveragesForRadar = (data: unknown[]) => {
  var cleanedData = data

  // remove headers
  cleanedData.shift()

  // get student ID
  student = cleanedData[0][10].split(": ")[1]
  
  // only keep last assessment
  const latestEndTime = cleanedData[0][3]
  cleanedData = cleanedData.filter(item => item[3] == latestEndTime);
  
  // parse value
  cleanedData.map(item => item.push(item[10].split(": ")[1]))

  var result = []
  Object.keys(domainsByCategory).forEach(categoryName => {
    var sumScorePerCategory = 0
    var nbOfDomainsPerCategory = 0
    domainsByCategory[categoryName].forEach(domainName => {
      var score = getScoreByDomain(cleanedData, domainName)
      console.log("score ", score)
      sumScorePerCategory += Math.abs(parseFloat(score)-5)
      nbOfDomainsPerCategory += 1
    })
    console.log("sum ", sumScorePerCategory, " nb ", nbOfDomainsPerCategory)
    var absAvg = sumScorePerCategory / nbOfDomainsPerCategory
    var categoryObject = {
      "category": categoryName,
      "abs-avg": absAvg
    }
    result.push(categoryObject)
  })

  console.log(result)

  return result
}

export default CsvDemo;
