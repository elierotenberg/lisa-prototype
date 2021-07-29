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
  Button
} from "@chakra-ui/react";
import Head from "next/head";
import { ChangeEvent } from "react";
import { Fragment, FunctionComponent, useCallback, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import GaugeChart from "react-gauge-chart";
import { quantize, interpolate } from "d3-interpolate";

import Papa from "papaparse";

var student = ""

const domainsByCategory = {
  "Behavior": ["habits and repetitive behaviours", "risk taking"],
  "Cognition": ["attention", "planning and organization"],
}
const nrOfLevels = 20;
const colors = [
  ...quantize(interpolate("#0286fa", "#bddffd"), nrOfLevels / 2),
  ...quantize(interpolate("#bddffd", "#0286fa"), nrOfLevels / 2),
];

const CsvDemoVisualization: FunctionComponent<{ data: unknown[] }> = ({
  data,
}) => {
  // Do visualization here
  console.log("data", data)
  return <Box>
    {Object.keys(data).map((category, index) => {
    
    if (category != "Averages" && category != "Abs-averages" && category != "Averages-radar") {

      console.log("category", category)
      console.log("data categroy", data[category])
      console.log("keys", Object.keys(data))
      let result = <Box>
        <Heading as="h3" size="sm">
        {category}
        </Heading>

        <SimpleGrid columns={2} spacing={0}>
          {data[category].map((entry, index) => {
            
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
                <Button colorScheme="cyan" size="xs" variant="outline">
                  g
                </Button>
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
    <pre>{JSON.stringify(data, null, 2)}</pre>
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
          {result?.data && <CsvDemoVisualization data={transformData(result.data)} />}
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
  console.log(cleanedData[0])
  student = cleanedData[0][10]
  
  // only keep last assessment
  const latestEndTime = cleanedData[0][3]
  cleanedData = cleanedData.filter(item => item[3] == latestEndTime);
  
  // parse value
  cleanedData.map(item => item.push(item[10].split(": ")[1]))

  var result = {}
  Object.keys(domainsByCategory).forEach(cateogryName => {
    var cateoryArray = []
    domainsByCategory[cateogryName].forEach(domainName => {
      var score = getScoreByDomain(cleanedData, domainName)
      var domainObject = {
        "domain": domainName,
        "score": score
      }
      cateoryArray.push(domainObject)
    })
    result[cateogryName] = cateoryArray
  })
  
  // don't forget bullying
  return result
}

const getScoreByDomain = (data: unknown[], domainName) => {
  var score = data.filter(item => item[11].toLowerCase() == domainName)[0][15]
  return score
}

export default CsvDemo;
