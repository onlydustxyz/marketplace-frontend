import { useMemo } from "react";
import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";

export const useRepositoryCount = (
  organizations: UseOrganizationsByGithubUserIdResponse[],
  selectedRepos: unknown[]
) => {
  return useMemo(() => {
    return {
      selected: selectedRepos?.length || 0,
      total: organizations.reduce((acc, org) => {
        return acc + (org.repos || []).length;
      }, 0),
    };
  }, [organizations, selectedRepos]);
};
