import { GetApplicationPageResponse } from "api-client/resources/applications/types";
import { GetIssueResponse } from "api-client/resources/issues/types";

export namespace TUseApplications {
  type Applications = GetApplicationPageResponse["applications"];

  export interface ApplicationItem {
    applications?: Applications;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    isPending: boolean;
  }

  export interface TitleItem {
    content?: string;
    isLoading: boolean;
  }

  export interface Permissions {
    githubAppInstallationStatus?: GetIssueResponse["githubAppInstallationStatus"];
    githubAppInstallationPermissionsUpdateUrl?: string;
  }

  export interface Props {
    search: string;
  }

  export interface Return {
    newComers: ApplicationItem;
    projectMembers: ApplicationItem;
    title: TitleItem;
    permissions: Permissions;
  }
}
