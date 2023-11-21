export interface GetGithubSetupLinkProps {
  login?: string;
  id: number;
  installed?: boolean;
  installationId?: number;
  isAPersonalOrganization?: boolean;
  projectSlug?: string;
}

const baseUrl = "https://github.com/";

export const OAuthGithubConfigLink = `https://github.com/settings/connections/applications/${
  import.meta.env.VITE_GITHUB_INSTALLATION_CONFIG
}`;

export const GithubSetupLinks = {
  alreadyInstalled: (props: { login: string; installationId: number }) =>
    `${baseUrl}organizations/${props.login}/settings/installations/${props.installationId}`,
  alreadyInstalledPersonnal: (props: { installationId: number }) =>
    `${baseUrl}settings/installations/${props.installationId}`,
  shouldInstall: (props: { orgId: number }) =>
    `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${props.orgId}`,
  shouldInstallOnEdit: (props: { orgId: number; projectSlug: string }) =>
    `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${props.orgId}?state=${props.projectSlug}`,
};

export const getGithubSetupLink = ({
  login,
  id,
  installed,
  installationId,
  isAPersonalOrganization,
  projectSlug,
}: GetGithubSetupLinkProps) => {
  if (installed && installationId) {
    if (isAPersonalOrganization) {
      return GithubSetupLinks.alreadyInstalledPersonnal({ installationId });
    }
    if (login) {
      return GithubSetupLinks.alreadyInstalled({ login, installationId });
    }
  }

  if (projectSlug) {
    return GithubSetupLinks.shouldInstallOnEdit({ orgId: id, projectSlug });
  }

  return GithubSetupLinks.shouldInstall({ orgId: id });
};
