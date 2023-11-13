import { OrganizationSessionStorageInterface } from "src/types";

export const getSelectedRepoIds = (orgs: OrganizationSessionStorageInterface[]) => {
  return orgs.reduce((acc, org) => {
    return [
      ...acc,
      ...(org.organization.repos || []).reduce((acc2, repo) => {
        if (repo.selected && repo.id) {
          return [...acc2, repo.id];
        }

        return acc2;
      }, [] as number[]),
    ];
  }, [] as number[]);
};
