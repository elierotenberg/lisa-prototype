import {
  createContext,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AppState,
  createFreshAppState,
  loadAppState,
  saveAppState,
} from "../lib/AppState";

type AppStateContext = [
  state: AppState,
  setState: (update: (state: AppState) => AppState) => void
];

const AppStateContext = createContext<AppStateContext | null>(null);

export const useAppStateContext = (): AppStateContext => {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error("No AppStateContext");
  }
  return ctx;
};

export const AppStateContextProvider: FunctionComponent<{
  readonly pending: ReactElement;
  readonly children: ReactNode;
}> = ({ pending, children }) => {
  const [appState, setAppState] = useState<AppState | null>(null);

  useEffect(() => {
    let isAborted = false;
    loadAppState()
      .then((appState) => {
        if (!isAborted) {
          setAppState(appState ?? createFreshAppState());
        }
      })
      .catch((error) => console.error(error));
    return () => {
      isAborted = true;
    };
  }, []);

  useEffect(() => {
    if (appState) {
      saveAppState(appState).catch((error) => console.error(error));
    }
  }, [appState]);

  const ctx = useMemo((): null | AppStateContext => {
    if (!appState) {
      return null;
    }
    return [appState, setAppState];
  }, [appState]);

  if (!ctx) {
    return pending;
  }

  return (
    <AppStateContext.Provider value={ctx}>{children}</AppStateContext.Provider>
  );
};
