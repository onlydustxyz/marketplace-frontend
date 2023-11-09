import { OrganizationSessionStorageInterface } from "../../../commons/hooks/useProjectCreationSession";

export const getSelectedRepoIds = (orgs: OrganizationSessionStorageInterface[]) => {
  return orgs.reduce((acc, org) => {
    return [
      ...acc,
      ...(org.repos || []).reduce((acc2, repo) => {
        if (repo.selected && repo.githubId) {
          return [...acc2, repo.githubId];
        }

        return acc2;
      }, [] as number[]),
    ];
  }, [] as number[]);
};
