import { CreateFormDataRepos } from "../types/ProjectCreationType";
import { UseGithubOrganizationsResponse } from "src/api/me/queries";

interface onSyncOrganizationsInterface {
  selectedRepos: CreateFormDataRepos[];
  organizations: UseGithubOrganizationsResponse[];
}
export const onSyncOrganizations = ({ selectedRepos, organizations }: onSyncOrganizationsInterface) => {
  if (selectedRepos?.length && organizations) {
    const organizationIds = new Set(organizations?.map(org => (org.installed ? org.id : null)));
    const filteredRepos = selectedRepos?.filter(repo => organizationIds.has(repo.orgId));
    return filteredRepos;
  }

  return undefined;
};
