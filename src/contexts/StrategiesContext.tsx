import {
  createContext,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { loadStrategies, Strategy } from "../lib/Strategy";

const StrategiesContext = createContext<Strategy[] | null>(null);

export const useStrategiesContext = (): Strategy[] => {
  const ctx = useContext(StrategiesContext);
  if (!ctx) {
    throw new Error("No StrategiesContext");
  }
  return ctx;
};

export const StrategiesContextProvider: FunctionComponent<{
  readonly pending: ReactElement;
  readonly children: ReactNode;
}> = ({ pending, children }) => {
  const [strategies, setStrategies] = useState<null | Strategy[]>(null);

  useEffect(() => {
    let isAborted = false;
    loadStrategies()
      .then((strategies) => {
        if (!isAborted) {
          setStrategies(strategies);
        }
      })
      .catch((error) => console.error(error));

    return () => {
      isAborted = true;
    };
  }, []);

  if (!strategies) {
    return pending;
  }

  return (
    <StrategiesContext.Provider value={strategies}>
      {children}
    </StrategiesContext.Provider>
  );
};
