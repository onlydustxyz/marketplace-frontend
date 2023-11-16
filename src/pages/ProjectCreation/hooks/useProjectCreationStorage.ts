import { ProjectCreationSteps } from "../types/ProjectCreationSteps";
import { CreateFormData } from "../types/ProjectCreationType";
import { useLocalStorage } from "src/hooks/useLocalStorage/useLocalStorage";

const STORAGE_KEY = "create-project-";
export const STORAGE_KEY_CREATE_PROJECT_FORM = `${STORAGE_KEY}form`;
export const STORAGE_KEY_CREATE_PROJECT_STEP = `${STORAGE_KEY}step`;

export const useProjectCreationFormStorage = () => {
  const [storedValue, setValue, status, removeValue, clearSessionPattern] = useLocalStorage<CreateFormData | undefined>(
    STORAGE_KEY_CREATE_PROJECT_FORM,
    undefined
  );

  return {
    storedFormValue: storedValue,
    saveFormData: setValue,
    storedFormStatus: status,
    removeFormValue: removeValue,
    clearFormValue: clearSessionPattern,
  };
};

export const useProjectCreationStepStorage = () => {
  const [storedValue, setValue, status, removeValue, clearSessionPattern] = useLocalStorage<ProjectCreationSteps>(
    STORAGE_KEY_CREATE_PROJECT_STEP,
    ProjectCreationSteps.ORGANIZATIONS
  );

  return {
    storedStepValue: storedValue,
    saveStep: setValue,
    storedStepStatus: status,
    removeStepValue: removeValue,
    clearStepValue: clearSessionPattern,
  };
};

export const useResetStorage = () => {
  const { removeFormValue } = useProjectCreationFormStorage();
  const { removeStepValue } = useProjectCreationStepStorage();

  const reset = () => {
    removeFormValue();
    removeStepValue();
  };

  return { reset };
};
