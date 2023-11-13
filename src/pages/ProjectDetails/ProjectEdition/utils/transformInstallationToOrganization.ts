import { components } from "src/__generated/api";

export default function transformOrganization(
  input: components["schemas"]["InstallationResponse"] | undefined
): components["schemas"]["ProjectGithubOrganizationResponse"] | undefined {
  if (!input) {
    return undefined;
  }
  const transformedOrganization: components["schemas"]["ProjectGithubOrganizationResponse"] = {
    id: input.organization.id,
    login: input.organization.login,
    avatarUrl: input.organization.avatarUrl,
    htmlUrl: input.organization.htmlUrl,
    name: input.organization.name || input.organization.login,
    installationId: input.id,
    repos: (input.organization.repos || []).map(repo => ({
      id: repo.id,
      owner: repo.owner,
      name: repo.name,
      htmlUrl: repo.htmlUrl,
      description: repo.description,
      stars: 0,
      forkCount: 0,
      hasIssues: false,
      isIncludedInProject: undefined,
    })),
  };

  return transformedOrganization;
}
