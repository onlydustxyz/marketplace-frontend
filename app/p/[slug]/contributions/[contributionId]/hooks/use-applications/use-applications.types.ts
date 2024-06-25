import { GetApplicationPageResponse } from "api-client/resources/applications/types";

export namespace TUseApplications {
  type Applications = GetApplicationPageResponse["applications"];

  export interface Props {
    search: string;
  }

  export interface Return {
    newComersApplications?: Applications;
    projectMembersApplications?: Applications;
    title: string;
    newComersApplicationsHasNextPage: boolean;
    projectMembersApplicationsHasNextPage: boolean;
  }
}
