import { OrganizationSessionStorageInterface } from "src/types";

/**
 * Returns an array of selected repository IDs from an array of organizations.
 * @param orgs - An array of organizations with repositories.
 * @returns An array of selected repository IDs.
 */
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
