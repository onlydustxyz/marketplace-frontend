import { useCallback } from "react";
import { OrganizationSessionStorageInterface } from "../../../commons/hooks/useProjectCreationSession";

export const useRepositorySearch = (search?: string) => {
  return useCallback(
    (value: OrganizationSessionStorageInterface[]) => {
      if (!search) {
        return value;
      }

      return value
        .map(org => {
          const repos = org.repos?.filter(repo => repo.name?.includes(search));

          if (!repos || repos.length === 0) {
            return null;
          }

          return {
            ...org,
            repos,
          };
        })
        .filter(Boolean) as OrganizationSessionStorageInterface[];
    },
    [search]
  );
};
