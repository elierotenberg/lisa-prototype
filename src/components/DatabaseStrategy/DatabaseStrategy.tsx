import { FunctionComponent, useMemo } from "react";
import { useStrategiesContext } from "../../contexts/StrategiesContext";

type DatabaseStrategyProps = {
  readonly strategyId: string;
};

export const DatabaseStrategy: FunctionComponent<DatabaseStrategyProps> = ({
  strategyId,
}) => {
  const strategies = useStrategiesContext();
  const { Content } = useMemo(
    () => strategies.find((strategy) => strategy.strategyId === strategyId),
    [strategies, strategyId]
  );
  return <Content />;
};
