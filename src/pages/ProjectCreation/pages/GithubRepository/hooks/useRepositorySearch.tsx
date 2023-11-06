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
          const findRepos = org.repos?.filter(repo => repo.name?.includes(search));
          if (!findRepos || findRepos.length === 0) {
            return undefined;
          }

          return {
            ...org,
            repos: findRepos,
          };
        })
        .filter(org => org !== undefined) as OrganizationSessionStorageInterface[];
    },
    [search]
  );
};
