import { GetApplicationPageResponse } from "api-client/resources/applications/types";

export namespace TContributorSelect {
  type Applications = GetApplicationPageResponse["applications"];

  export interface Props {
    search: string;
    setSearch: (search: string) => void;
    selectedUser: number | null;
    handleSelectUser: (githubId: number, applicationId: string) => void;
    newComersApplications?: Applications;
    projectMembersApplications?: Applications;
  }
}
