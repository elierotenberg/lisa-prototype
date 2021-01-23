import { ComponentType, createElement, ReactElement } from "react";
import { AssessmentsContextProvider } from "../../contexts/AssessmentsContext";

export const withAssessmentsContexProvider = <Props = Record<string, unknown>>(
  Component: ComponentType<Props>,
  pending: ReactElement
): ComponentType<Props> => (props) =>
  createElement(AssessmentsContextProvider, {
    pending,
    children: createElement(Component, props),
  });
