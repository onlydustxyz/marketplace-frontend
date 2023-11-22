export interface GetGithubSetupLinkProps {
  login?: string;
  id: number;
  installed?: boolean;
  installationId?: number;
  isAPersonalOrganization?: boolean;
  projectSlug?: string;
  isClaim?: boolean;
}

const baseUrl = "https://github.com/";

export const OAuthGithubConfigLink = `https://github.com/settings/connections/applications/${
  import.meta.env.VITE_GITHUB_OAUTH_APP_ID
}`;

export const GithubState = {
  claim: "claim-state-",
  edit: "edit-state-",
};
export const GithubSetupLinks = {
  alreadyInstalled: (props: { login: string; installationId: number }) =>
    `${baseUrl}organizations/${props.login}/settings/installations/${props.installationId}`,
  alreadyInstalledPersonnal: (props: { installationId: number }) =>
    `${baseUrl}settings/installations/${props.installationId}`,
  shouldInstall: (props: { orgId: number }) =>
    `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${props.orgId}`,
  shouldInstallOnEdit: (props: { orgId: number; projectSlug: string }) =>
    `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${props.orgId}&state=${GithubState.edit}${
      props.projectSlug
    }`,
  shouldInstallOnClaim: (props: { orgId: number; projectSlug: string }) =>
    `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${props.orgId}&state=${GithubState.claim}${
      props.projectSlug
    }`,
};

export const getGithubSetupLink = ({
  login,
  id,
  installed,
  installationId,
  isAPersonalOrganization,
  projectSlug,
  isClaim,
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
    if (isClaim) {
      return GithubSetupLinks.shouldInstallOnClaim({ orgId: id, projectSlug });
    }
    return GithubSetupLinks.shouldInstallOnEdit({ orgId: id, projectSlug });
  }

  return GithubSetupLinks.shouldInstall({ orgId: id });
};
