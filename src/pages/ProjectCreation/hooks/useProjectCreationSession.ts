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
  repos?: repos[];
}

export const OrganizationSessionStorageKey = "OrganizationsType";
export const InformationSessionStorageKey = "createProjectInformation";

export const useOrganizationSession = () => {
  return useSessionStorage<OrganizationSessionStorageInterface[]>(OrganizationSessionStorageKey, []);
};

export const useInformationSession = <V>() => {
  return useSessionStorage<V | undefined>("createProjectInformation", undefined);
};
