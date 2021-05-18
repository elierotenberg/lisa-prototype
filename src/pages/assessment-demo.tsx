import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/layout";
import { MdGraphicEq } from "react-icons/md";
import { Slider, SliderThumb, SliderTrack } from "@chakra-ui/slider";
import Head from "next/head";
import React, { Fragment, FunctionComponent } from "react";
import { MainContainer } from "../components/MainContainer/MainContainer";

type AssessmentQuestion = {
  readonly title: string;
  readonly info: string;
  readonly labels: [string, string];
};

const questions: AssessmentQuestion[] = [
  {
    title: "Attention",
    info: `
        Par exemple, capacité à rester concentré en classe, ou à passer d'une activité à la suivante.
        `,
    labels: ["Très distrait", "Très focalisé"],
  },
  {
    title: "Planification et organisation",
    info: `
      Par exemple, capacité à anticiper et mettre en oeuvre des moyens flexibles pour réaliser des tâches.
    `,
    labels: ["Très désorganisé", "Très rigide"],
  },
  {
    title: "Prise de risque",
    info: `
      Par exemple, capacité à sortir de sa zone de confort pour apprendre de nouvelles choses, sans se mettre en danger.
    `,
    labels: ["Aucune prise de risque", "Prise de risque importante"],
  },
];

const AssessmentDemo: FunctionComponent = () => {
  return (
    <Fragment>
      <Head>
        <title>Assessment Demo</title>
      </Head>
      <MainContainer>
        <VStack alignItems="flex-start" spacing={4}>
          {questions.map(({ title, info, labels }, key) => (
            <Flex key={key} flexDirection="column" alignItems="stretch" px={4}>
              <Heading mx={-4} size="md">
                {title}
              </Heading>
              <Text my={4} pl={4} fontStyle="italic">
                {info}
              </Text>
              <Slider my={2}>
                <SliderTrack bg="blue.400" />
                <SliderThumb boxSize={6}>
                  <Box color="blue.500" as={MdGraphicEq} />
                </SliderThumb>
              </Slider>
              <Flex
                flexDirection="row"
                w="100%"
                justifyContent="space-between"
                fontWeight="bold"
              >
                <Text textAlign="start" flex={1}>
                  {labels[0]}
                </Text>
                <Text textAlign="end" flex={1}>
                  {labels[1]}
                </Text>
              </Flex>
            </Flex>
          ))}
        </VStack>
      </MainContainer>
    </Fragment>
  );
};

export default AssessmentDemo;
