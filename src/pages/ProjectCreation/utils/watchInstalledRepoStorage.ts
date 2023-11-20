import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";

interface watchInstalledRepoStorageInterface {
  installedRepo: number[];
  organizations: UseOrganizationsByGithubUserIdResponse[];
}

export const watchInstalledRepoStorage = ({
  installedRepo,
  organizations,
}: watchInstalledRepoStorageInterface): number[] => {
  if (installedRepo?.length && organizations?.length) {
    const installedOrganizations = new Set(
      organizations?.filter(org => (org.installed ? org.installationId : null)).map(org => org.installationId)
    );

    return installedRepo?.filter(repo => !installedOrganizations.has(repo));
  }

  return installedRepo;
};
