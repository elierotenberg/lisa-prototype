import { BoxProps, Text, Collapse, Code, VStack } from "@chakra-ui/react";
import { UpDownIcon } from "@chakra-ui/icons";
import { FunctionComponent, ReactNode } from "react";

type ToggleRawCodeProps = BoxProps & {
  readonly isOpened: boolean;
  readonly toggle: () => void;
  readonly code: string;
  readonly label: ReactNode;
};

export const ToggleRawCode: FunctionComponent<ToggleRawCodeProps> = ({
  isOpened,
  toggle,
  code,
  label,
}) => (
  <VStack w="100%" alignItems="stretch">
    <Text textStyle="pseudoLink" textAlign="right" my="0.35em" onClick={toggle}>
      {label} <UpDownIcon />
    </Text>
    <Collapse in={isOpened}>
      <Code whiteSpace="pre-wrap" w="100%" p="1em">
        {code}
      </Code>
    </Collapse>
  </VStack>
);
