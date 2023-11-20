import { components } from "src/__generated/api";

export function getOrgsWithUnauthorizedRepos(project: components["schemas"]["ProjectResponse"]) {
  return (
    project.organizations?.filter(
      ({ repos }) => repos?.filter(({ isAuthorizedInGithubApp }) => !isAuthorizedInGithubApp).length
    ) ?? []
  );
}
