import Head from "next/head";
import { ComponentType, Fragment } from "react";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { DatabaseHome } from "../../components/DatabaseHome/DatabaseHome";
import { withStrategiesContextProvider } from "../../components/withStrategiesContextProvider/withStrategiesContextProvider";
import { Center, Spinner } from "@chakra-ui/react";

const DatabaseIndex: ComponentType = withStrategiesContextProvider(
  () => (
    <Fragment>
      <Head>
        <title>Database of Adaptive Strategies</title>
      </Head>
      <MainContainer>
        <DatabaseHome />
      </MainContainer>
    </Fragment>
  ),
  <Center>
    <Spinner />
  </Center>
);

export default DatabaseIndex;
