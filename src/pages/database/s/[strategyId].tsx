import { Center, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ComponentType, Fragment } from "react";
import { DatabaseStrategy } from "../../../components/DatabaseStrategy/DatabaseStrategy";
import { MainContainer } from "../../../components/MainContainer/MainContainer";
import { withStrategiesContextProvider } from "../../../components/withStrategiesContextProvider/withStrategiesContextProvider";
import { useStrategiesContext } from "../../../contexts/StrategiesContext";

const StrategyId: ComponentType = withStrategiesContextProvider(
  () => {
    const {
      query: { strategyId },
    } = useRouter();

    const strategies = useStrategiesContext();

    if (!strategyId) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }

    return (
      <Fragment>
        <Head>
          <title>
            {
              strategies.find((strategy) => strategy.strategyId === strategyId)
                .label
            }
          </title>
        </Head>
        <MainContainer>
          <DatabaseStrategy
            strategyId={Array.isArray(strategyId) ? strategyId[0] : strategyId}
          />
        </MainContainer>
      </Fragment>
    );
  },
  <Center>
    <Spinner />
  </Center>
);

export default StrategyId;
