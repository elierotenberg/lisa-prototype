import { Center, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { ComponentType, Fragment } from "react";
import { withAppStateContextProvider } from "../../../components/withAppStateContextProvider/withAppStateContextProvider";
import { withAssessmentsContexProvider } from "../../../components/withAssessmentsContextProvider/withAssessmentsContextProvider";
import { MainContainer } from "../../../components/MainContainer/MainContainer";
import { LearnerProfile } from "../../../components/LearnerProfile/LearnerProfile";
import { withStrategiesContextProvider } from "../../../components/withStrategiesContextProvider/withStrategiesContextProvider";

const LearnerId: ComponentType = withAssessmentsContexProvider(
  withStrategiesContextProvider(
    withAppStateContextProvider(
      () => {
        const {
          query: { learnerId },
        } = useRouter();

        return (
          <Fragment>
            <Head>
              <title>{learnerId}</title>
            </Head>
            <MainContainer>
              {learnerId ? (
                <LearnerProfile
                  learnerId={
                    Array.isArray(learnerId) ? learnerId[0] : learnerId
                  }
                />
              ) : (
                <Center>
                  <Spinner />
                </Center>
              )}
            </MainContainer>
          </Fragment>
        );
      },
      <Center>
        <Spinner />
      </Center>
    ),
    <Center>
      <Spinner />
    </Center>
  ),
  <Center>
    <Spinner />
  </Center>
);

export default LearnerId;
