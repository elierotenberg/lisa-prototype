import { Center, Spinner, useToast } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";

import Head from "next/head";
import React, { useCallback, Fragment, ComponentType } from "react";
import { AssessmentForm } from "../../components/AssessmentForm/AssessmentForm";

import {
  Assessment,
  AssessmentResult,
  loadAssessments,
} from "../../lib/Assessment";
import { useAppStateContext } from "../../contexts/AppStateContext";
import { withAppStateContextProvider } from "../../components/withAppStateContextProvider/withAppStateContextProvider";
import { useRouter } from "next/router";
import { MainContainer } from "../../components/MainContainer/MainContainer";

type StaticProps = {
  readonly assessment: Assessment;
};

const AssessmentId: ComponentType<StaticProps> = withAppStateContextProvider<StaticProps>(
  ({ assessment }) => {
    const [appState, setAppState] = useAppStateContext();
    const { push } = useRouter();
    const toast = useToast();

    const onSubmit = useCallback(
      (result: AssessmentResult) => {
        setAppState((appState) => ({
          ...appState,
          assessmentResults: [...appState.assessmentResults, result],
        }));
        toast({
          title: "Assessment result saved",
          description: "Assessment result has been successfully recorded.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        push(`/dashboard/learner/${result.learnerId}`);
      },
      [setAppState]
    );
    return (
      <Fragment>
        <Head>
          <title>{assessment.title}</title>
        </Head>
        <MainContainer>
          {!appState ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <AssessmentForm assessment={assessment} onSubmit={onSubmit} />
          )}
        </MainContainer>
      </Fragment>
    );
  },
  <Center>
    <Spinner />
  </Center>
);

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params: { assessmentId },
}) => {
  const assessments = await loadAssessments();
  return {
    props: {
      assessment: assessments.find(
        (assessment) => assessment.assessmentId === assessmentId
      ),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const assessments = await loadAssessments();
  return {
    paths: assessments.map((assessment) => ({
      params: { assessmentId: assessment.assessmentId },
    })),
    fallback: false,
  };
};

export default AssessmentId;
