import { TUseApplications } from "../../hooks/use-applications/use-applications.types";

export namespace TContributorSelect {
  export interface Props {
    search: string;
    setSearch: (search: string) => void;
    selectedUser: number | null;
    handleSelectUser: (githubId: number, applicationId: string) => void;
    newComers: TUseApplications.ApplicationItem;
    projectMembers: TUseApplications.ApplicationItem;
  }
}
