import { useMemo } from "react";
import { OrganizationSessionStorageInterface } from "../../../hooks/useProjectCreationSession";

export const useRepositoryCount = (organizations: OrganizationSessionStorageInterface[]) => {
  return useMemo(() => {
    return {
      selected: organizations.reduce((acc, org) => {
        return acc + (org.repos || []).filter(repo => repo.selected).length;
      }, 0),
      total: organizations.reduce((acc, org) => {
        return acc + (org.repos || []).length;
      }, 0),
    };
  }, [organizations]);
};
