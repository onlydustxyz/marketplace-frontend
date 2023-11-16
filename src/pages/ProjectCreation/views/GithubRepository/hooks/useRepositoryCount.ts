import { useMemo } from "react";
import { OrganizationSessionStorageInterface } from "src/types";

export const useRepositoryCount = (organizations: OrganizationSessionStorageInterface[]) => {
  return useMemo(() => {
    return {
      selected: organizations.reduce((acc, org) => {
        return acc + (org.organization.repos || []).filter(repo => repo.selected).length;
      }, 0),
      total: organizations.reduce((acc, org) => {
        return acc + (org.organization.repos || []).length;
      }, 0),
    };
  }, [organizations]);
};
