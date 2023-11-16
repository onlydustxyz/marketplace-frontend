import { useCallback } from "react";
import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";

export const useRepositorySearch = (search?: string) => {
  return useCallback(
    (value: UseOrganizationsByGithubUserIdResponse[]) => {
      if (!search) {
        return value;
      }

      const searchUppercase = search.toUpperCase();

      return value
        .map(org => {
          const repos = org.repos?.filter(repo => repo.name?.toUpperCase()?.includes(searchUppercase));
          const findOrg = org.name?.toUpperCase()?.includes(searchUppercase);

          if (!findOrg && !repos.length) {
            return null;
          }

          return {
            ...org,
            repos: findOrg && !repos.length ? org.repos : repos,
          };
        })
        .filter(Boolean) as UseOrganizationsByGithubUserIdResponse[];
    },
    [search]
  );
};
