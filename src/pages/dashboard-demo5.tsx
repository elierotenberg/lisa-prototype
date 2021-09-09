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
const colorsUnipolar = [
  ...quantize(interpolate("#fbeafe", "#d603fb"), nrOfLevels / 2),
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
      "A": [
        {
          "category": "Language",
          "abs-avg": 2
        },
        {
          "category": "Social Function",
          "abs-avg": 3
        },
        {
          "category": "Behavior",
          "abs-avg": 1.75
        },
        {
          "category": "Emotions",
          "abs-avg": 1.2
        },
        {
          "category": "Personality",
          "abs-avg": 2.875
        },
        {
          "category": "Cognition",
          "abs-avg": 2.8
        },{
          "category": "Learning",
          "abs-avg": 1.8
        },{
          "category": "Health",
          "abs-avg": 1
        },
      ],
      "B": [
        {
          "category": "Language",
          "abs-avg": 3.333333333
        },
        {
          "category": "Social Function",
          "abs-avg": 1.5
        },
        {
          "category": "Behavior",
          "abs-avg": 3.75
        },
        {
          "category": "Emotions",
          "abs-avg": 3
        },
        {
          "category": "Personality",
          "abs-avg": 2
        },
        {
          "category": "Cognition",
          "abs-avg": 2.2
        },{
          "category": "Learning",
          "abs-avg": 1.4
        },{
          "category": "Health",
          "abs-avg": 1.5
        },
      ],
      "C": [
        {
          "category": "Language",
          "abs-avg": 0.3333333333
        },
        {
          "category": "Social Function",
          "abs-avg": 1.5
        },
        {
          "category": "Behavior",
          "abs-avg": 1
        },
        {
          "category": "Emotions",
          "abs-avg": 1.4
        },
        {
          "category": "Personality",
          "abs-avg": 1.125
        },
        {
          "category": "Cognition",
          "abs-avg": 2.2
        },{
          "category": "Learning",
          "abs-avg": 1.4
        },{
          "category": "Health",
          "abs-avg": 1.666666667
        },
      ],
      "D": [
        {
          "category": "Language",
          "abs-avg": 2
        },
        {
          "category": "Social Function",
          "abs-avg": 2.666666667
        },
        {
          "category": "Behavior",
          "abs-avg": 2.25
        },
        {
          "category": "Emotions",
          "abs-avg": 2.2
        },
        {
          "category": "Personality",
          "abs-avg": 2.125
        },
        {
          "category": "Cognition",
          "abs-avg": 1
        },{
          "category": "Learning",
          "abs-avg": 2
        },{
          "category": "Health",
          "abs-avg": 2
        },
      ],
      "E": [
        {
          "category": "Language",
          "abs-avg": 3
        },
        {
          "category": "Social Function",
          "abs-avg": 2.333333333
        },
        {
          "category": "Behavior",
          "abs-avg": 2.75
        },
        {
          "category": "Emotions",
          "abs-avg": 1.2
        },
        {
          "category": "Personality",
          "abs-avg": 1.75
        },
        {
          "category": "Cognition",
          "abs-avg": 1.6
        },{
          "category": "Learning",
          "abs-avg": 2.2
        },{
          "category": "Health",
          "abs-avg": 1.5
        },
      ],
      "F": [
        {
          "category": "Language",
          "abs-avg": 1.333333333
        },
        {
          "category": "Social Function",
          "abs-avg": 2.166666667
        },
        {
          "category": "Behavior",
          "abs-avg": 3
        },
        {
          "category": "Emotions",
          "abs-avg": 2.6
        },
        {
          "category": "Personality",
          "abs-avg": 1.625
        },
        {
          "category": "Cognition",
          "abs-avg": 1.8
        },{
          "category": "Learning",
          "abs-avg": 2.4
        },{
          "category": "Health",
          "abs-avg": 1.666666667
        },
      ],
      "G": [
        {
          "category": "Language",
          "abs-avg": 2.333333333
        },
        {
          "category": "Social Function",
          "abs-avg": 2.833333333
        },
        {
          "category": "Behavior",
          "abs-avg": 2.5
        },
        {
          "category": "Emotions",
          "abs-avg": 2.4
        },
        {
          "category": "Personality",
          "abs-avg": 2.125
        },
        {
          "category": "Cognition",
          "abs-avg": 1.2
        },{
          "category": "Learning",
          "abs-avg": 3.4
        },{
          "category": "Health",
          "abs-avg": 2.5
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

        {console.log("A", data["A"])}
        <Heading as="h2" size="md">
                A
              </Heading>
        <RadarChart width={730} height={500} data={data["A"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
                B
              </Heading>
          <RadarChart width={730} height={500} data={data["B"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
                C
              </Heading>
          <RadarChart width={730} height={500} data={data["C"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
                D
              </Heading>
          <RadarChart width={730} height={500} data={data["D"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
               E
              </Heading>
          <RadarChart width={730} height={500} data={data["E"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
                F
              </Heading>
          <RadarChart width={730} height={500} data={data["F"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>
          <Heading as="h2" size="md">
                G
              </Heading>
          <RadarChart width={730} height={500} data={data["G"]}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
            <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </RadarChart>

          {Object.keys(data).map((student, index) => {
            
            <Box>
              <Heading as="h2" size="md">
                {student}
              </Heading>
              {console.log(student)}
              {console.log(data[student])}

              <RadarChart width={730} height={500} data={data[student]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false}/>
                <Radar dataKey="abs-avg" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </Box>
            
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
