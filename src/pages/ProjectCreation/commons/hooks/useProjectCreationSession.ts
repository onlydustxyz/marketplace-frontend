import { components } from "src/__generated/api";
import { useInstallationByIdResponse } from "src/api/Github/queries";
import { useSessionStorage } from "src/hooks/useSessionStorage/useSessionStorage";

type organization = components["schemas"]["InstalledGithubOrganizationResponse"] & {
  installationId: string;
};

type repos = components["schemas"]["InstalledGithubRepoResponse"] & {
  selected?: boolean;
};
export interface OrganizationSessionStorageInterface extends useInstallationByIdResponse {
  organization: organization;
  repos: repos[];
}

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
    removeOrgs;
  };
  return { reset };
};
