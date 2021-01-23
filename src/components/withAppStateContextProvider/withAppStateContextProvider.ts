import { ComponentType, createElement, ReactElement } from "react";
import { AppStateContextProvider } from "../../contexts/AppStateContext";

export const withAppStateContextProvider = <Props = Record<string, unknown>>(
  Component: ComponentType<Props>,
  pending: ReactElement
): ComponentType<Props> => (props) =>
  createElement(AppStateContextProvider, {
    pending,
    children: createElement(Component, props),
  });
