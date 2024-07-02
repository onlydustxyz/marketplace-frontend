import { UseGithubOrganizationsResponse } from "src/api/me/queries";

import { CreateFormDataRepos } from "../types/ProjectCreationType";

interface onSyncOrganizationsInterface {
  selectedRepos: CreateFormDataRepos[];
  organizations: UseGithubOrganizationsResponse[];
}
export const onSyncOrganizations = ({ selectedRepos, organizations }: onSyncOrganizationsInterface) => {
  if (selectedRepos?.length && organizations) {
    const organizationIds = new Set(
      organizations?.map(org => (org.installationStatus !== "NOT_INSTALLED" ? org.githubUserId : null))
    );
    return selectedRepos?.filter(repo => organizationIds.has(repo.orgId));
  }

  return undefined;
};
