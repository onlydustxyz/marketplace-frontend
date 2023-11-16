import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";
import { OrganizationSessionStorageInterface } from "src/types";

// TODO : clean
export const OrganizationSessionStorageKey = "OrganizationsType";
export const InformationSessionStorageKey = "createProjectInformation";

export const useOrganizationSession = () => {
  const [storedValue, setValue, status, removeValue] = useSessionStorage<OrganizationSessionStorageInterface[]>(
    OrganizationSessionStorageKey,
    []
  );
  return { storedValue, setValue, status, removeValue };
};

export const useInformationSession = <V>() => {
  const [storedValue, setValue, status, removeValue] = useSessionStorage<V | undefined>(
    "createProjectInformation",
    undefined
  );

  return { storedValue, setValue, status, removeValue };
};

export const useResetSession = () => {
  const { removeValue: removeInfo } = useInformationSession<unknown>();
  const { removeValue: removeOrgs } = useOrganizationSession();

  const reset = () => {
    removeInfo();
    removeOrgs();
  };
  return { reset };
};
