import {
  createContext,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Assessment, loadAssessments } from "../lib/Assessment";

const AssessmentsContext = createContext<Assessment[] | null>(null);

export const useAssessmentsContext = (): Assessment[] => {
  const ctx = useContext(AssessmentsContext);
  if (!ctx) {
    throw new Error("No AssessmentsContext");
  }
  return ctx;
};

export const AssessmentsContextProvider: FunctionComponent<{
  readonly pending: ReactElement;
  readonly children: ReactNode;
}> = ({ pending, children }) => {
  const [assessments, setAssessments] = useState<null | Assessment[]>(null);

  useEffect(() => {
    let isAborted = false;
    loadAssessments()
      .then((assessments) => {
        if (!isAborted) {
          setAssessments(assessments);
        }
      })
      .catch((error) => console.error(error));
    return () => {
      isAborted = true;
    };
  }, []);

  if (!assessments) {
    return pending;
  }

  return (
    <AssessmentsContext.Provider value={assessments}>
      {children}
    </AssessmentsContext.Provider>
  );
};
