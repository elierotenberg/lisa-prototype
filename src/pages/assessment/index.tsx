import { ChevronRightIcon } from "@chakra-ui/icons";
import { List, ListItem, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Head from "next/head";
import React, { Fragment, FunctionComponent } from "react";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { MainNavBar } from "../../components/MainNavBar/MainNavBar";
import { NavLink } from "../../components/NavLink/NavLink";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Assessment, loadAssessments } from "../../lib/Assessment";

type StaticProps = {
  readonly assessments: Assessment[];
};

const AssessmentIndex: FunctionComponent<StaticProps> = ({ assessments }) => (
  <Fragment>
    <Head>
      <title>Assessments</title>
    </Head>
    <MainNavBar />
    <MainContainer>
      <VStack alignItems="flex-start">
        <PageTitle>Assessments</PageTitle>
        <List pl="1em">
          {assessments.map((assessment) => (
            <ListItem key={assessment.assessmentId}>
              <NavLink href={`/assessment/${assessment.assessmentId}`}>
                {assessment.title}
                <ChevronRightIcon ml="0.5em" />
              </NavLink>
            </ListItem>
          ))}
        </List>
      </VStack>
    </MainContainer>
  </Fragment>
);

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const assessments = await loadAssessments();
  return {
    props: {
      assessments,
    },
  };
};

export default AssessmentIndex;
