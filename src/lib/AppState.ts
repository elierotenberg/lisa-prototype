import { v4 } from "uuid";
import { AssessmentResult } from "./Assessment";
import { download } from "./Browser";

export type AppState = {
  readonly userId: string;
  readonly assessmentResults: AssessmentResult[];
};

export const createFreshAppState = (): AppState => ({
  userId: v4(),
  assessmentResults: [],
});

const localStorageKey = "lisa-prototype-app-state";

type SerializeAppStateOptions = {
  readonly pretty?: boolean;
};

export const serializeAppState = (
  unserializedData: AppState,
  options: SerializeAppStateOptions = {}
): string =>
  JSON.stringify(unserializedData, null, options.pretty ? 2 : undefined);

export const unserializeAppState = (serializedData: string): AppState =>
  JSON.parse(serializedData);

export const saveAppState = async (data: AppState): Promise<void> => {
  localStorage.setItem(localStorageKey, serializeAppState(data));
};

export const loadAppState = async (): Promise<null | AppState> => {
  const serializedData = localStorage.getItem(localStorageKey);
  if (!serializedData) {
    return null;
  }
  return unserializeAppState(serializedData);
};

export const downloadAppState = (appState: AppState): void =>
  download(
    "export.json",
    "text/json",
    serializeAppState(appState, { pretty: true })
  );
