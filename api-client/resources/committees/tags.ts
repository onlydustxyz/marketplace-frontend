import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.committees}-root`,
  project_application: (committeeId: string, projectId?: string) =>
    `${apiResources.hackathons}-project-application-${committeeId}-${projectId ?? ""}`,
  public_committee_by_id: (committeeId: string) => `${apiResources.committees}-public-${committeeId}`,
};
