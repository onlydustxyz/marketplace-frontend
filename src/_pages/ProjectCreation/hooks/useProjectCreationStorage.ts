import { ProjectCreationSteps } from "../types/ProjectCreationSteps";
import { CreateFormData } from "../types/ProjectCreationType";
import { useLocalStorage } from "src/hooks/useStorage/useStorage";

const STORAGE_KEY = "create-project-";
export const STORAGE_KEY_CREATE_PROJECT_FORM = `${STORAGE_KEY}form`;
export const STORAGE_KEY_CREATE_PROJECT_STEP = `${STORAGE_KEY}step`;
export const STORAGE_KEY_CREATE_PROJECT_INSTALLATED_REPOS = `${STORAGE_KEY}installed-repos`;

export const useProjectCreationFormStorage = () => {
  const storage = useLocalStorage<CreateFormData | undefined>({
    key: STORAGE_KEY_CREATE_PROJECT_FORM,
    initialValue: undefined,
  });

  return storage;
};

export const useProjectCreationStepStorage = () => {
  const storage = useLocalStorage<ProjectCreationSteps>({
    key: STORAGE_KEY_CREATE_PROJECT_STEP,
    initialValue: ProjectCreationSteps.ORGANIZATIONS,
  });

  return storage;
};

export const useProjectCreationInstalledReposStorage = () => {
  const storage = useLocalStorage<number[]>({ key: STORAGE_KEY_CREATE_PROJECT_INSTALLATED_REPOS, initialValue: [] });

  return storage;
};

export const useResetStorage = () => {
  const formStorage = useProjectCreationFormStorage();
  const stepStorage = useProjectCreationStepStorage();
  const installedRepoStorage = useProjectCreationInstalledReposStorage();

  const reset = () => {
    formStorage.removeValue();
    installedRepoStorage.removeValue();
    stepStorage.removeValue();
  };

  return { reset };
};
