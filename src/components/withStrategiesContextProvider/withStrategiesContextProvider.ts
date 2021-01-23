import { ComponentType, createElement, ReactElement } from "react";
import { StrategiesContextProvider } from "../../contexts/StrategiesContext";

export const withStrategiesContextProvider = <Props = Record<string, unknown>>(
  Component: ComponentType<Props>,
  pending: ReactElement
): ComponentType<Props> => (props) =>
  createElement(StrategiesContextProvider, {
    pending,
    children: createElement(Component, props),
  });
