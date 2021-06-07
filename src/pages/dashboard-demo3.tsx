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
  Image,
  SimpleGrid
} from "@chakra-ui/react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ErrorBar, ReferenceLine } from 'recharts';
import GaugeChart from 'react-gauge-chart'
import ReactSpeedometer from "react-d3-speedometer"


const domains = `
111Specific phobias 
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
  const [date, setDate] = useState("29/04/2021");

  useEffect(() => {
    setDate(date);
  }, []);

  const getArcsLength = (errors, value) => {
    console.log(errors[0], " ", errors[1], value, [value - errors[0]/10, errors[0]/10 + errors[1]/10 + 0.001, 1 - (value+errors[1]/10)])
    return [value - errors[0]/10, errors[0]/10 + errors[1]/10 + 0.001, 1 - (value+errors[1]/10)]
  }

  const getData = () => {
    if (date == "29/04/2021") {
      return [
        {
            "entry-level-score": 3, 
            "domain": "activity",
            "scaled-follow-up-score": 4,
            "color-intensity-follow-up": 0.9,
            "errors-entry-level": [1, 1],
            "errors-follow-up": [0, 0]
        }, 
        {
            "entry-level-score": -3, 
            "domain": "habits and repetitive behaviours",
            "scaled-follow-up-score": 2,
            "color-intensity-follow-up": 0.3,
            "errors-entry-level": [2, 3],
            "errors-follow-up": [1, 4]
        }, 
        {
            "entry-level-score": 4, 
            "domain": "impulsivity",
            "errors-entry-level": [0, 1],
        }, 
        {
            "entry-level-score": 4, 
            "domain": "risk taking",
            "errors-entry-level": [2, 2],
        }, 
        {
            "entry-level-score": -2, 
            "domain": "substance use",
            "scaled-follow-up-score": -4,
            "color-intensity-follow-up": 1,
            "errors-entry-level": [1, 1],
            "errors-follow-up": [0, 3]
        }
      ];
    } else {
      return [
        {
            "entry-level-score": 4, 
            "domain": "activity",
            "scaled-follow-up-score": 4,
            "color-intensity-follow-up": 1,
            "errors-entry-level": [1, 1],
            "errors-follow-up": [0, 0]
        }, 
        {
            "entry-level-score": -2, 
            "domain": "habits and repetitive behaviours",
            "scaled-follow-up-score": 3,
            "color-intensity-follow-up": 0.4,
            "errors-entry-level": [3, 1],
            "errors-follow-up": [1, 2]
        }, 
        {
            "entry-level-score": 5, 
            "domain": "impulsivity",
            "errors-entry-level": [0, 1],
        }, 
        {
            "entry-level-score": 3, 
            "domain": "risk taking",
            "errors-entry-level": [2, 2],
        }, 
        {
            "entry-level-score": -3, 
            "domain": "substance use",
            "scaled-follow-up-score": -4,
            "color-intensity-follow-up": 1,
            "errors-entry-level": [1, 1],
            "errors-follow-up": [0, 3]
        }
      ];
    }

  }

  const firstName = "Student B";
  const data = getData();
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
            <Image src="media/legend-long.png" alt="Legend"/>
            <Center overflow="hidden" maxW="100%" fontSize="xs">
              
              <BarChart
                width={800}
                height={600}
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
                
                <YAxis 
                  dataKey="domain" 
                  type="category"
                  orientation="right"
                />
                <XAxis 
                  type="number" 
                  domain={[-5, 5]}
                  hide  
                />
                <Tooltip />
                <Bar dataKey="entry-level-score" fill="#228be6" >
                  {
                    data.map((entry, index) => {
                      const opacity = (entry["entry-level-score"] > 7 || entry["entry-level-score"] < 3) ? 1 : Math.abs(entry["entry-level-score"])*2/10;
                      return <Cell fillOpacity={opacity} />;
                    })
                  }
                  <ErrorBar dataKey="errors-entry-level" width={4} strokeWidth={3} stroke="purple" opacity={0.8} direction="x" />
                </Bar>
                <Bar dataKey="scaled-follow-up-score" fill="#228be6" >
                  {
                    data.map((entry, index) => {
                      return <Cell fillOpacity={entry["color-intensity-follow-up"]} />;
                    })
                  }
                  <ErrorBar dataKey="errors-follow-up" width={4} strokeWidth={3} stroke="green" opacity={0.8} direction="x" />
                </Bar>
                
                
              </BarChart>
              
            </Center>
          </Box>
          <Button onClick={()=>{setDate("29/04/2021")}}>29/04/2021</Button>
          <Button onClick={()=>{setDate("02/05/2021")}}>02/05/2021</Button>
          
          <br/><br/>
          <SimpleGrid columns={2} spacing={10}>
            {data.map((entry, index) => {
              var result = 
              <Box>
                <b>{entry["domain"]}</b>
                <Box>Entry-level</Box>
                {/* <b>{entry["errors-entry-level"][0]} {entry["errors-entry-level"][1]} {(entry["entry-level-score"]+5)/10}</b> */}
                <GaugeChart 
                  id="gauge-chart-entry" 
                  arcsLength={getArcsLength(entry["errors-entry-level"], (entry["entry-level-score"]+5)/10)}
                  colors={["#FFC3FF", "#FF5FFF", "#FFC3FF"]} 
                  arcWidth={0.3} 
                  textColor="464A4F"
                  hideText={true}
                  percent={(entry["entry-level-score"]+5)/10+0.01} 
                  arcPadding={0}
                />
              </Box>
              if (entry["errors-follow-up"]) {
                result = <Box >
                  {result}
                  <Box>
                    <Box>Follow-up</Box>
                    {/* <b>{entry["errors-follow-up"][0]} {entry["errors-follow-up"][1]} {(entry["scaled-follow-up-score"]+5)/10}</b> */}
                    <GaugeChart 
                      id="gauge-chart-follow-up" 
                      arcsLength={getArcsLength(entry["errors-follow-up"], (entry["scaled-follow-up-score"]+5)/10)}
                      colors={["#FFC3FF", "#FF5FFF", "#FFC3FF"]} 
                      arcWidth={0.3} 
                      textColor="464A4F"
                      hideText={true}
                      percent={(entry["scaled-follow-up-score"]+5)/10+0.01} 
                      arcPadding={0}
                    /> 
                  </Box>
                </Box>
              }
              return (result)
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
