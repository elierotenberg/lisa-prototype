import { Center, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { ComponentType, Fragment } from "react";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { withAppStateContextProvider } from "../../components/withAppStateContextProvider/withAppStateContextProvider";
import { DashboardHome } from "../../components/DashboardHome/DashboardHome";

const DashboardIndex: ComponentType = withAppStateContextProvider(
  () => (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <DashboardHome />
      </MainContainer>
    </Fragment>
  ),
  <Center>
    <Spinner />
  </Center>
);

export default DashboardIndex;
