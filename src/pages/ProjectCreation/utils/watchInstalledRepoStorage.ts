import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";

interface watchInstalledRepoStorageInterface {
  installedRepo: number[];
  organizations: UseOrganizationsByGithubUserIdResponse[];
}

export const watchInstalledRepoStorage = ({
  installedRepo,
  organizations,
}: watchInstalledRepoStorageInterface): number[] => {
  console.log("1", organizations, installedRepo);
  if (installedRepo?.length && organizations?.length) {
    console.log("2", organizations);
    const installedOrganizations = new Set(
      organizations?.filter(org => (org.installed ? org.id : null)).map(org => org.id)
    );

    console.log("installedOrganizations", installedOrganizations);

    return installedRepo?.filter(repo => !installedOrganizations.has(repo));
  }

  return installedRepo;
};
