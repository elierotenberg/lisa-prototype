import Head from "next/head";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import {
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
} from "recharts";

const DashboardDemo: FunctionComponent = () => {
  const [date, setDate] = useState("29/04/2021");

  useEffect(() => {
    setDate(date);
  }, []);

  const getData = () => {
    const obj = {
      A: [
        {
          category: "Language",
          "abs-avg": 2,
        },
        {
          category: "Social Function",
          "abs-avg": 3,
        },
        {
          category: "Behavior",
          "abs-avg": 1.75,
        },
        {
          category: "Emotions",
          "abs-avg": 1.2,
        },
        {
          category: "Personality",
          "abs-avg": 2.875,
        },
        {
          category: "Cognition",
          "abs-avg": 2.8,
        },
        {
          category: "Learning",
          "abs-avg": 1.8,
        },
        {
          category: "Health",
          "abs-avg": 1,
        },
      ],
      B: [
        {
          category: "Language",
          "abs-avg": 3.333333333,
        },
        {
          category: "Social Function",
          "abs-avg": 1.5,
        },
        {
          category: "Behavior",
          "abs-avg": 3.75,
        },
        {
          category: "Emotions",
          "abs-avg": 3,
        },
        {
          category: "Personality",
          "abs-avg": 2,
        },
        {
          category: "Cognition",
          "abs-avg": 2.2,
        },
        {
          category: "Learning",
          "abs-avg": 1.4,
        },
        {
          category: "Health",
          "abs-avg": 1.5,
        },
      ],
      C: [
        {
          category: "Language",
          "abs-avg": 0.3333333333,
        },
        {
          category: "Social Function",
          "abs-avg": 1.5,
        },
        {
          category: "Behavior",
          "abs-avg": 1,
        },
        {
          category: "Emotions",
          "abs-avg": 1.4,
        },
        {
          category: "Personality",
          "abs-avg": 1.125,
        },
        {
          category: "Cognition",
          "abs-avg": 2.2,
        },
        {
          category: "Learning",
          "abs-avg": 1.4,
        },
        {
          category: "Health",
          "abs-avg": 1.666666667,
        },
      ],
      D: [
        {
          category: "Language",
          "abs-avg": 2,
        },
        {
          category: "Social Function",
          "abs-avg": 2.666666667,
        },
        {
          category: "Behavior",
          "abs-avg": 2.25,
        },
        {
          category: "Emotions",
          "abs-avg": 2.2,
        },
        {
          category: "Personality",
          "abs-avg": 2.125,
        },
        {
          category: "Cognition",
          "abs-avg": 1,
        },
        {
          category: "Learning",
          "abs-avg": 2,
        },
        {
          category: "Health",
          "abs-avg": 2,
        },
      ],
      E: [
        {
          category: "Language",
          "abs-avg": 3,
        },
        {
          category: "Social Function",
          "abs-avg": 2.333333333,
        },
        {
          category: "Behavior",
          "abs-avg": 2.75,
        },
        {
          category: "Emotions",
          "abs-avg": 1.2,
        },
        {
          category: "Personality",
          "abs-avg": 1.75,
        },
        {
          category: "Cognition",
          "abs-avg": 1.6,
        },
        {
          category: "Learning",
          "abs-avg": 2.2,
        },
        {
          category: "Health",
          "abs-avg": 1.5,
        },
      ],
      F: [
        {
          category: "Language",
          "abs-avg": 1.333333333,
        },
        {
          category: "Social Function",
          "abs-avg": 2.166666667,
        },
        {
          category: "Behavior",
          "abs-avg": 3,
        },
        {
          category: "Emotions",
          "abs-avg": 2.6,
        },
        {
          category: "Personality",
          "abs-avg": 1.625,
        },
        {
          category: "Cognition",
          "abs-avg": 1.8,
        },
        {
          category: "Learning",
          "abs-avg": 2.4,
        },
        {
          category: "Health",
          "abs-avg": 1.666666667,
        },
      ],
      G: [
        {
          category: "Language",
          "abs-avg": 2.333333333,
        },
        {
          category: "Social Function",
          "abs-avg": 2.833333333,
        },
        {
          category: "Behavior",
          "abs-avg": 2.5,
        },
        {
          category: "Emotions",
          "abs-avg": 2.4,
        },
        {
          category: "Personality",
          "abs-avg": 2.125,
        },
        {
          category: "Cognition",
          "abs-avg": 1.2,
        },
        {
          category: "Learning",
          "abs-avg": 3.4,
        },
        {
          category: "Health",
          "abs-avg": 2.5,
        },
      ],
    };
    if (date == "29/04/2021") {
      return obj;
    } else {
      return obj;
    }
  };

  const data = getData();

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
          <Heading as="h2" size="md">
            B
          </Heading>
          <RadarChart width={730} height={500} data={data["B"]}>
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
          <Heading as="h2" size="md">
            C
          </Heading>
          <RadarChart width={730} height={500} data={data["C"]}>
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
          <Heading as="h2" size="md">
            D
          </Heading>
          <RadarChart width={730} height={500} data={data["D"]}>
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
          <Heading as="h2" size="md">
            E
          </Heading>
          <RadarChart width={730} height={500} data={data["E"]}>
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
          <Heading as="h2" size="md">
            F
          </Heading>
          <RadarChart width={730} height={500} data={data["F"]}>
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
          <Heading as="h2" size="md">
            G
          </Heading>
          <RadarChart width={730} height={500} data={data["G"]}>
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

          {Object.keys(data).map((student) => {
            <Box>
              <Heading as="h2" size="md">
                {student}
              </Heading>
              {console.log(student)}
              {console.log(data[student])}

              <RadarChart width={730} height={500} data={data[student]}>
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
            </Box>;
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
