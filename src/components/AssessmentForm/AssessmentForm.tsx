import { CheckIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  FormEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Assessment,
  AssessmentResult,
  projectDomains,
} from "../../lib/Assessment";
import { PageTitle } from "../PageTitle/PageTitle";
import { ToggleRawCode } from "../ToggleRawCode/ToggleRawCode";

type AssessmentFormProps = {
  readonly assessment: Assessment;
  readonly onSubmit: (assessmentResult: AssessmentResult) => void;
};

type AssessmentFormState = {
  readonly learnerId: string;
  readonly values: {
    readonly [itemLabel: string]: string; // option label
  };
};

const DEFAULT_STATE: AssessmentFormState = {
  learnerId: "",
  values: {},
};

export const AssessmentForm: FunctionComponent<AssessmentFormProps> = ({
  assessment,
  onSubmit,
}) => {
  const [state, setState] = useState<AssessmentFormState>(DEFAULT_STATE);
  const [isRawSourceOpen, setIsRawSourceOpen] = useState<boolean>(false);

  useEffect(() => {
    setState(DEFAULT_STATE);
  }, [assessment]);

  const onFormSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const raw = Object.entries(state.values).map(
        ([itemLabel, optionLabel]) => {
          const item = assessment.items.find(
            (item) => item.label === itemLabel
          );
          const option = item.options.find(
            (option) => option.label === optionLabel
          );
          const domains: Record<string, number> = {};
          for (const [domain, weight] of Object.entries(item.scoring)) {
            domains[domain] = weight * option.weight;
          }
          return {
            itemLabel,
            optionLabel,
            domains,
          };
        }
      );
      onSubmit({
        assessmentId: assessment.assessmentId,
        revisionId: assessment.revisionId,
        learnerId: state.learnerId,
        raw,
        domains: projectDomains(assessment, raw),
        submittedAtMs: Date.now(),
      });
    },
    [state, assessment]
  );

  return (
    <VStack as="form" onSubmit={onFormSubmit} w="100%" alignItems="stretch">
      <PageTitle>{assessment.title}</PageTitle>
      {
        <ToggleRawCode
          label="View raw source"
          code={assessment.rawSource}
          isOpened={isRawSourceOpen}
          toggle={() =>
            setIsRawSourceOpen((isRawSourceOpen) => !isRawSourceOpen)
          }
        />
      }
      <VStack my="0.5em" alignItems="flex-start">
        {assessment.description.split("\n").map((line, key) => (
          <Text as="em" key={key}>
            {line}
          </Text>
        ))}
      </VStack>
      <VStack alignItems="stretch">
        <FormControl id="AssessmentForm-learnerId" isRequired>
          <FormLabel size="md" fontWeight="bold">
            Secret learner identifier
          </FormLabel>
          <Input
            value={state.learnerId}
            onChange={({ target: { value } }) =>
              setState((state) => ({
                ...state,
                learnerId: value,
              }))
            }
            placeholder="ifea-092321"
          />
          <FormHelperText>
            This identifier should be opaque. Do not include the real person
            name.
          </FormHelperText>
        </FormControl>
        {assessment.items.map((item, key) => (
          <FormControl
            key={key}
            id={`${assessment.assessmentId}-${key}`}
            isRequired
            as="fieldset"
            my="0.5em"
          >
            <FormLabel as="legend" size="md" fontWeight="bold">
              {item.label}
            </FormLabel>
            <Flex direction={["column", "row-reverse"]} my="0.65em">
              <FormHelperText as="em" pl="0.5em" flex="1" mt={0} mb={["1.5em"]}>
                {item.description}
              </FormHelperText>
              <RadioGroup
                name={`${assessment.assessmentId}-${key}`}
                value={state.values[item.label]}
                onChange={(value) =>
                  setState((state) => ({
                    ...state,
                    values: {
                      ...state.values,
                      [item.label]:
                        typeof value === "string" ? value : undefined,
                    },
                  }))
                }
                pl="1.25em"
                flex="1"
              >
                <VStack alignItems="flex-start">
                  {item.options.map((option, key) => (
                    <Radio
                      key={key}
                      value={option.label}
                      isChecked={state.values[item.label] === option.label}
                    >
                      {option.label}
                    </Radio>
                  ))}
                </VStack>
              </RadioGroup>
            </Flex>
          </FormControl>
        ))}
      </VStack>
      <Flex justifyContent="flex-end">
        <Button type="submit" colorScheme="blue" rightIcon={<CheckIcon />}>
          Submit
        </Button>
      </Flex>
    </VStack>
  );
};
