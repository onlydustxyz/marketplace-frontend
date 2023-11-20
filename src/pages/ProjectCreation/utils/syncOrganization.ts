import { UseOrganizationsByGithubUserIdResponse } from "src/api/Github/queries";
import { CreateFormDataRepos } from "../types/ProjectCreationType";

interface onSyncOrganizationsInterface {
  selectedRepos: CreateFormDataRepos[];
  organizations: UseOrganizationsByGithubUserIdResponse[];
}
export const onSyncOrganizations = ({ selectedRepos, organizations }: onSyncOrganizationsInterface) => {
  if (selectedRepos?.length && organizations) {
    const organizationIds = new Set(organizations?.map(org => org.id));
    const filteredRepos = selectedRepos?.filter(repo => organizationIds.has(repo.orgId));
    return filteredRepos;
  }

  return undefined;
};
