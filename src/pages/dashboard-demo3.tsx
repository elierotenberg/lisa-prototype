import Head from "next/head";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import {
  Box,
  Center,
  Heading,
  VStack,
  Button,
  Image,
  SimpleGrid,
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
} from "recharts";
import GaugeChart from "react-gauge-chart";

const DashboardDemo: FunctionComponent = () => {
  const [date, setDate] = useState("29/04/2021");

  useEffect(() => {
    setDate(date);
  }, []);

  const getArcsLength = (errors, value) => {
    console.log(errors[0], " ", errors[1], value, [
      value - errors[0] / 10,
      errors[0] / 10 + errors[1] / 10 + 0.001,
      1 - (value + errors[1] / 10),
    ]);
    return [
      value - errors[0] / 10,
      errors[0] / 10 + errors[1] / 10 + 0.001,
      1 - (value + errors[1] / 10),
    ];
  };

  const getData = () => {
    if (date == "29/04/2021") {
      return [
        {
          "entry-level-score": 3,
          domain: "activity",
          "scaled-follow-up-score": 4,
          "color-intensity-follow-up": 0.9,
          "errors-entry-level": [1, 1],
          "errors-follow-up": [0, 0],
        },
        {
          "entry-level-score": -3,
          domain: "habits and repetitive behaviours",
          "scaled-follow-up-score": 2,
          "color-intensity-follow-up": 0.3,
          "errors-entry-level": [2, 3],
          "errors-follow-up": [1, 4],
        },
        {
          "entry-level-score": 4,
          domain: "impulsivity",
          "errors-entry-level": [0, 1],
        },
        {
          "entry-level-score": 4,
          domain: "risk taking",
          "errors-entry-level": [2, 2],
        },
        {
          "entry-level-score": -2,
          domain: "substance use",
          "scaled-follow-up-score": -4,
          "color-intensity-follow-up": 1,
          "errors-entry-level": [1, 1],
          "errors-follow-up": [0, 3],
        },
      ];
    } else {
      return [
        {
          "entry-level-score": 4,
          domain: "activity",
          "scaled-follow-up-score": 4,
          "color-intensity-follow-up": 1,
          "errors-entry-level": [1, 1],
          "errors-follow-up": [0, 0],
        },
        {
          "entry-level-score": -2,
          domain: "habits and repetitive behaviours",
          "scaled-follow-up-score": 3,
          "color-intensity-follow-up": 0.4,
          "errors-entry-level": [3, 1],
          "errors-follow-up": [1, 2],
        },
        {
          "entry-level-score": 5,
          domain: "impulsivity",
          "errors-entry-level": [0, 1],
        },
        {
          "entry-level-score": 3,
          domain: "risk taking",
          "errors-entry-level": [2, 2],
        },
        {
          "entry-level-score": -3,
          domain: "substance use",
          "scaled-follow-up-score": -4,
          "color-intensity-follow-up": 1,
          "errors-entry-level": [1, 1],
          "errors-follow-up": [0, 3],
        },
      ];
    }
  };

  const firstName = "Student B";
  const data = getData();

  return (
    <Fragment>
      <Head>
        <title>Dashboard Demo</title>
      </Head>
      <MainContainer>
        <VStack spacing={4} alignItems="stretch">
          <Heading as="h2" size="md">
            {firstName}
          </Heading>
          <Box>
            <Heading as="h3" size="sm">
              Behavior
            </Heading>
            <Image src="media/legend-long.png" alt="Legend" />
            <Center overflow="hidden" maxW="100%" fontSize="xs">
              <ResponsiveContainer width="100%" height={600}>
                <BarChart
                  data={data}
                  layout="vertical"
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <ReferenceLine x={0} stroke="blue" label="" />

                  <YAxis dataKey="domain" type="category" orientation="right" />
                  <XAxis type="number" domain={[-5, 5]} hide />
                  <Tooltip />
                  <Bar dataKey="entry-level-score" fill="#228be6">
                    {data.map((entry, key) => {
                      const opacity =
                        entry["entry-level-score"] > 7 ||
                        entry["entry-level-score"] < 3
                          ? 1
                          : (Math.abs(entry["entry-level-score"]) * 2) / 10;
                      return <Cell key={key} fillOpacity={opacity} />;
                    })}
                    <ErrorBar
                      dataKey="errors-entry-level"
                      width={4}
                      strokeWidth={3}
                      stroke="purple"
                      opacity={0.8}
                      direction="x"
                    />
                  </Bar>
                  <Bar dataKey="scaled-follow-up-score" fill="#228be6">
                    {data.map((entry, key) => {
                      return (
                        <Cell
                          key={key}
                          fillOpacity={entry["color-intensity-follow-up"]}
                        />
                      );
                    })}
                    <ErrorBar
                      dataKey="errors-follow-up"
                      width={4}
                      strokeWidth={3}
                      stroke="green"
                      opacity={0.8}
                      direction="x"
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Center>
          </Box>
          <Button
            onClick={() => {
              setDate("29/04/2021");
            }}
          >
            29/04/2021
          </Button>
          <Button
            onClick={() => {
              setDate("02/05/2021");
            }}
          >
            02/05/2021
          </Button>

          <br />
          <br />
          <SimpleGrid columns={2} spacing={10}>
            {data.map((entry) => {
              let result = (
                <Box>
                  <b>{entry["domain"]}</b>
                  <Box>Entry-level</Box>
                  {/* <b>{entry["errors-entry-level"][0]} {entry["errors-entry-level"][1]} {(entry["entry-level-score"]+5)/10}</b> */}
                  <GaugeChart
                    id="gauge-chart-entry"
                    arcsLength={getArcsLength(
                      entry["errors-entry-level"],
                      (entry["entry-level-score"] + 5) / 10
                    )}
                    colors={["#FFC3FF", "#FF5FFF", "#FFC3FF"]}
                    arcWidth={0.3}
                    textColor="464A4F"
                    hideText={true}
                    percent={(entry["entry-level-score"] + 5) / 10 + 0.01}
                    arcPadding={0}
                  />
                </Box>
              );
              if (entry["errors-follow-up"]) {
                result = (
                  <Box>
                    {result}
                    <Box>
                      <Box>Follow-up</Box>
                      {/* <b>{entry["errors-follow-up"][0]} {entry["errors-follow-up"][1]} {(entry["scaled-follow-up-score"]+5)/10}</b> */}
                      <GaugeChart
                        id="gauge-chart-follow-up"
                        arcsLength={getArcsLength(
                          entry["errors-follow-up"],
                          (entry["scaled-follow-up-score"] + 5) / 10
                        )}
                        colors={["#bddffd", "#0286fa", "#bddffd"]}
                        arcWidth={0.3}
                        textColor="464A4F"
                        hideText={true}
                        percent={
                          (entry["scaled-follow-up-score"] + 5) / 10 + 0.01
                        }
                        arcPadding={0}
                      />
                    </Box>
                  </Box>
                );
              }
              return result;
            })}
          </SimpleGrid>
          {/* <b>test test1 {data.length}</b> */}
          {/* <ReactSpeedometer/> */}
          {/* {data.map((entry, index) => {
            //return <ReactSpeedometer/>
            <b>test map</b>
            })
          } */}
          {/* {data.map((entry, index) => {
            console.log(entry)
            return <div>
              <b>{entry["errors-entry-level"][0]} {entry["errors-entry-level"][1]} {(entry["entry-level-score"]+5)/10}</b>
              <ReactSpeedometer/>
            </div>
            })
          } */}
          {/* <b>test test1</b>
          {data.map((entry, index) => {
            var entryLevelGauge = <div>
              <b>{entry["errors-entry-level"][0]} {entry["errors-entry-level"][1]} {(entry["entry-level-score"]+5)/10}</b>
              <ReactSpeedometer  
              segmentColors={["#FFC3FF", "#FF5FFF", "#FFC3FF"]} 
              customSegmentStops={[0, (entry["entry-level-score"]+5)/10 - entry["errors-entry-level"][0],(entry["entry-level-score"]+5)/10 + entry["errors-entry-level"][1], 1]}
              textColor="464A4F"
              value={(entry["entry-level-score"]+5)/10} 
              maxValue={1}
            /></div>
            if (entry["errors-follow-up"]) {
              entryLevelGauge = <div>
              {entryLevelGauge}
              <b>{entry["errors-follow-up"][0]} {entry["errors-follow-up"][1]} {(entry["scaled-follow-up-score"]+5)/10}</b>
              <ReactSpeedometer   
                  customSegmentStops={[0, (entry["scaled-follow-up-score"]+5)/10 - entry["errors-follow-up"][0],(entry["scaled-follow-up-score"]+5)/10 + entry["errors-follow-up"][1], 1]}
                  segmentColors={["#FFC3FF", "#FF5FFF", "#FFC3FF"]} 
                  textColor="464A4F"
                  value={(entry["scaled-follow-up-score"]+5)/10} 
                  maxValue={1}
                /> </div>
            }
            return (entryLevelGauge)
          })} */}
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

export default DashboardDemo;
