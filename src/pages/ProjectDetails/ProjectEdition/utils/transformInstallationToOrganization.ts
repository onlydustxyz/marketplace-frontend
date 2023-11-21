import { components } from "src/__generated/api";

export default function transformInstallationToOrganization(
  input: components["schemas"]["InstallationResponse"] | undefined
): components["schemas"]["GithubOrganizationResponse"] | undefined {
  if (input) {
    return {
      id: input.organization.id,
      login: input.organization.login,
      avatarUrl: input.organization.avatarUrl,
      htmlUrl: input.organization.htmlUrl,
      name: input.organization.name || input.organization.login,
      owner: input.organization.owner,
      installed: input.organization.installed,
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
        isIncludedInProject: false,
      })),
    };
  }
  return undefined;
}
