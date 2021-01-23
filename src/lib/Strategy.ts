import * as learnMoreAboutAdhd from "../../content/strategies/learn-more-about-adhd.mdx";
import * as learnMoreAboutBehaviorAndConductDisorders from "../../content/strategies/learn-more-about-behavior-and-conduct-disorders.mdx";

import { AssessmentResult } from "./Assessment";

type StrategyHelpers = {
  readonly ratio: (
    domain: AssessmentResult["domains"][string]
  ) => null | number;
};

export const helpers: StrategyHelpers = {
  ratio: (domain) => (domain.current - domain.min) / (domain.max - domain.min),
};

export type Strategy = {
  readonly Content: () => JSX.Element;
  readonly strategyId: string;
  readonly label: string;
  readonly isRecommended: (
    domains: AssessmentResult["domains"],
    helpers: StrategyHelpers
  ) => boolean;
};

export const loadStrategies = async (): Promise<Strategy[]> =>
  [learnMoreAboutAdhd, learnMoreAboutBehaviorAndConductDisorders].map(
    (module) =>
      ({
        Content: module.default,
        strategyId: module.meta?.strategyId,
        label: module.meta?.label,
        isRecommended: module.meta?.isRecommended,
      } as Strategy)
  );
