import { dump } from "js-yaml";
import psc17 from "../../content/assessment/psc-17.yml";

type AssessmentItem = {
  readonly label: string;
  readonly description: string;
  readonly options: {
    readonly label: string;
    readonly weight: number;
  }[];
  readonly scoring: {
    readonly [domain: string]: number;
  };
};

export type Assessment = {
  readonly assessmentId: string;
  readonly revisionId: string;
  readonly title: string;
  readonly description: string;
  readonly items: AssessmentItem[];
  readonly rawSource: string;
};

export type AssessmentResult = {
  readonly assessmentId: string;
  readonly revisionId: string;
  readonly learnerId: string;
  readonly submittedAtMs: number;
  readonly raw: {
    readonly itemLabel: string;
    readonly optionLabel: string;
    readonly domains: { readonly [domain: string]: number };
  }[];
  readonly domains: {
    readonly [domain: string]: {
      readonly min: number;
      readonly max: number;
      readonly current: number;
    };
  };
};

type GroupedAssessmentResults = {
  readonly [learnerId: string]: AssessmentResult[];
};

export const groupAsessmentResults = (
  assessmentResults: AssessmentResult[]
): GroupedAssessmentResults =>
  assessmentResults.reduce(
    (groupedAsessmentResults, assessmentResult): GroupedAssessmentResults => ({
      ...groupedAsessmentResults,
      [assessmentResult.learnerId]: [
        ...(groupedAsessmentResults[assessmentResult.learnerId] ?? []),
        assessmentResult,
      ],
    }),
    {} as GroupedAssessmentResults
  );

export const mergeDomains = (
  assessmentResults: AssessmentResult[]
): AssessmentResult["domains"] => {
  const domains: Record<string, AssessmentResult["domains"][string]> = {};
  for (const assessmentResult of assessmentResults) {
    for (const [domain, value] of Object.entries(assessmentResult.domains)) {
      if (!domains[domain]) {
        domains[domain] = {
          min: 0,
          max: 0,
          current: 0,
        };
      }
      domains[domain] = {
        min: domains[domain].min + value.min,
        max: domains[domain].max + value.max,
        current: domains[domain].current + value.current,
      };
    }
    return domains;
  }
};

export const roundedPercent = (
  value: AssessmentResult["domains"][string]
): number =>
  Math.round(
    (100 * 100 * (value.current - value.min)) / (value.max - value.min)
  ) / 100;

export const loadAssessments = async (): Promise<Assessment[]> => [
  {
    ...(psc17 as Omit<Assessment, "rawSource">),
    rawSource: dump(psc17),
  } as Assessment,
];

export const projectDomains = (
  assessment: Assessment,
  raw: AssessmentResult["raw"]
): AssessmentResult["domains"] => {
  const domains: Record<string, AssessmentResult["domains"][string]> = {};
  for (const item of assessment.items) {
    const optionWeights = item.options.map((option) => option.weight);
    const minOptionWeight = Math.min(...optionWeights);
    const maxOptionWeight = Math.max(...optionWeights);
    for (const [domain, weight] of Object.entries(item.scoring)) {
      if (!domains[domain]) {
        domains[domain] = {
          min: 0,
          max: 0,
          current: 0,
        };
      }
      domains[domain] = {
        min: domains[domain].min + minOptionWeight * weight,
        max: domains[domain].max + maxOptionWeight * weight,
        current: 0,
      };
    }
  }
  for (const { itemLabel, optionLabel } of raw) {
    const item = assessment.items.find((item) => item.label === itemLabel);
    const option = item.options.find((option) => option.label === optionLabel);
    for (const [domain, weight] of Object.entries(item.scoring)) {
      if (domains[domain]) {
        domains[domain] = {
          ...domains[domain],
          current: domains[domain].current + weight * option.weight,
        };
      }
    }
  }
  return domains;
};
