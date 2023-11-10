import { useCallback } from "react";
import { OrganizationSessionStorageInterface } from "src/types";

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
