import Head from "next/head";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import {
  Box,
  Center,
  Heading,
  VStack,
  BoxProps,
  Image,
  SimpleGrid,
  Button, ButtonGroup
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
import { quantize, interpolate } from "d3-interpolate";
import GaugeChart from "react-gauge-chart";

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

const nrOfLevels = 20;
const colors = [
  ...quantize(interpolate("#0286fa", "#bddffd"), nrOfLevels / 2),
  ...quantize(interpolate("#bddffd", "#0286fa"), nrOfLevels / 2),
];

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
    let obj = {
      "Averages": 
        {"Behavior": {
            "avg": 4.25,
            "abs-avg": 1.75
          },
          "Cognition": {
            "avg": 3,
            "abs-avg": 2.8
          },
          "Learning": {
            "avg": 4,
            "abs-avg": 1.8
          },
          "Emotions": {
            "avg": 4.6,
            "abs-avg": 1.2
          }, 
          "Health": {
            "avg": 5.666666667,
            "abs-avg": 1
          }, 
          "Language": {
            "avg": 5,
            "abs-avg": 2
          }, 
          "Personality": {
            "avg": 6.875,
            "abs-avg": 2.875
          },
          "Social Function": {
            "avg": 6,
            "abs-avg": 3
          }
        }
      ,
      "Averages-radar": [
        {
          "category": "Behavior",
          "abs-avg": 0.75
        },
        {
          "category": "Cognition",
          "abs-avg": 2
        },{
          "category": "Learning",
          "abs-avg": 1
        },{
          "category": "Emotions",
          "abs-avg": 0.4
        },{
          "category": "Health",
          "abs-avg": 0
        },{
          "category": "Language",
          "abs-avg": 0
        },{
          "category": "Personality",
          "abs-avg": 0
        },{
          "category": "Social Function",
          "abs-avg": 0
        },
        {
          "category": "Behavior ",
          "abs-avg": 0
        },
        {
          "category": "Cognition ",
          "abs-avg": 0
        },{
          "category": "Learning ",
          "abs-avg": 0
        },{
          "category": "Emotions ",
          "abs-avg": 0
        },{
          "category": "Health ",
          "abs-avg": 0.6666666667
        },{
          "category": "Language ",
          "abs-avg": 0
        },{
          "category": "Personality ",
          "abs-avg": 1.875
        },{
          "category": "Social Function ",
          "abs-avg": 1
        },
      ]
      ,
      "Abs-averages": [
        {
          "category": "Behavior",
          "abs-avg": 1.75
        },
        {
          "category": "Cognition",
          "abs-avg": 2.8
        },{
          "category": "Learning",
          "abs-avg": 1.8
        },{
          "category": "Emotions",
          "abs-avg": 1.2
        },{
          "category": "Health",
          "abs-avg": 1
        },{
          "category": "Language",
          "abs-avg": 2
        },{
          "category": "Personality",
          "abs-avg": 2.875
        },{
          "category": "Social Function",
          "abs-avg": 3
        },
      ],
      "Behavior": [
        {
          "entry-level-score": 6,
          "domain": "habits and repetitive behaviours",
        },
        {
          "entry-level-score": 3,
          domain: "risk taking",
        },
        {
          "entry-level-score": 6,
          "domain": "activity",
        }, 
        {
          "entry-level-score": 2,
          domain: "impulsivity",
        }
      ],
      "Cognition": [
        {
          "entry-level-score": 2,
          "domain": "Attention",
        },
        {
          "entry-level-score": 1,
          domain: "Planning and Organization",
        },
        {
          "entry-level-score": 3,
          "domain": "Memory",
        },
        
        {
          "entry-level-score": 7,
          domain: "Abstraction / Generalization",
        },
        {
          "entry-level-score": 2,
          domain: "Thinking / Processing speed",
        },
      ],
      "Learning": [
        {
          "entry-level-score": 3,
          "domain": "Reading",
        },
        {
          "entry-level-score": 3,
          domain: "Writing",
        },
        {
          "entry-level-score": 3,
          "domain": "Mathematics",
        },
        
        {
          "entry-level-score": 4,
          domain: "Learning",
        },
        {
          "entry-level-score": 7,
          domain: "Academic Performance",
        },
      ],
      "Emotions": [
        {
          "entry-level-score": 2,
          "domain": "Irritability",
        },
        {
          "entry-level-score": 5,
          domain: "Mood",
        },
        {
          "entry-level-score": 4,
          "domain": "Emotional Reactivity",
        },
        
        {
          "entry-level-score": 5,
          domain: "Stress level",
        },
        {
          "entry-level-score": 7,
          domain: "Worries",
        },
      ],
      "Health": [
        {
          "entry-level-score": 5,
          "domain": "Diet",
        },
        {
          "entry-level-score": 7,
          domain: "Energy levels",
        },
        {
          "entry-level-score": 5,
          "domain": "Gross motor skills",
        },
        
        {
          "entry-level-score": 4,
          domain: "Fine motor skills",
        },
        {
          "entry-level-score": 6,
          domain: "Complaints of pain",
        },
        {
          "entry-level-score": 7,
          domain: "Hygiene",
        },
      ],
      "Language": [
        {
          "entry-level-score": 3,
          "domain": "Language (including gestures)",
        },
        {
          "entry-level-score": 4,
          domain: "Speech Quantity",
        },
        {
          "entry-level-score": 8,
          "domain": "Speech articulation",
        },
      ],
      "Personality": [
        {
          "entry-level-score": 10,
          "domain": "Temperament",
        },
        {
          "entry-level-score": 3,
          domain: "Confidence",
        },
        {
          "entry-level-score": 6,
          "domain": "Creativity",
        },
        
        {
          "entry-level-score": 10,
          domain: "Responsibility",
        },
        {
          "entry-level-score": 9,
          domain: "Integrity",
        },
        {
          "entry-level-score": 9,
          domain: "Perseverance",
        },
        {
          "entry-level-score": 5,
          domain: "Sexual identity",
        },
        {
          "entry-level-score": 3,
          domain: "Sexual Behaviour",
        },
      ],
      "Social Function": [
        {
          "entry-level-score": 7,
          "domain": "Cooperativeness",
        },
        {
          "entry-level-score": 8,
          domain: "Following rules",
        },
        {
          "entry-level-score": 2,
          "domain": "Bullying",
        },
        
        {
          "entry-level-score": 2,
          domain: "Social interactions",
        },
        {
          "entry-level-score": 9,
          domain: "Social Conformity",
        },
        {
          "entry-level-score": 8,
          domain: "Empathy",
        },
      ],
    }
    if (date == "29/04/2021") {
      
      return obj;
    } else {
      return obj;
    }
  };

  const firstName = "SN–001";
  const data = getData();
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const yAxisWidthInPx = 120;

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

          <RadarChart outerRadius={190} width={730} height={500} data={data["Averages-radar"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>

          <RadarChart outerRadius={190} width={730} height={500} data={data["Abs-averages"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          
          <br />
          <br />
          {Object.keys(data).map((category, index) => {
            
            if (category != "Averages" && category != "Abs-averages" && category != "Averages-radar") {

              let result = <Box>
              <Heading as="h3" size="sm">
              {category}
              </Heading>
              <GaugeChart
                id="gauge-chart-entry"
                colors={colors}
                nrOfLevels={nrOfLevels}
                textColor="464A4F"
                hideText={true}
                percent={(data["Averages"][category]["avg"]) / 10 + 0.01}
              />
              <SimpleGrid columns={2} spacing={10}>
                {data[category].map((entry, index) => {
                  
                  let bgColor = (entry["entry-level-score"] > 3 || entry["entry-level-score"] < -3) ? "#e1f4fc" : "#FFFFFF"
                  let placeholder = "    "
                  let result = (
                    <Box rounded="md"
                  m="2" p="5">
                      <b>{entry["domain"]}</b>
                      <GaugeChart
                        id="gauge-chart-entry"
                        colors={colors}
                        nrOfLevels={nrOfLevels}
                        textColor="464A4F"
                        hideText={true}
                        percent={(entry["entry-level-score"]) / 10 + 0.01}
                      />
                    <Button colorScheme="teal" size="sm">
                      i
                    </Button>
                    {placeholder}
                    <Button colorScheme="teal" size="sm">
                      g
                    </Button>
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
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

export default DashboardDemo;
