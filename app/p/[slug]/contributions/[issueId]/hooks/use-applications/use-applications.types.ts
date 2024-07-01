import { GetApplicationPageResponse } from "api-client/resources/applications/types";

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

  export interface Props {
    search: string;
  }

  export interface Return {
    newComers: ApplicationItem;
    projectMembers: ApplicationItem;
    title: TitleItem;
    canInteract: boolean;
  }
}
