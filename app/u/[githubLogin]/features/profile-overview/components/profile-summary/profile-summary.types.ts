import { PublicProfileChannelsUnion } from "api-client/resources/users/types";

export namespace TProfileSummary {
  interface Contact {
    channel: PublicProfileChannelsUnion;
    contact: string;
    visibility: "public" | "private";
  }
  export interface Props {
    bio?: string;
    contacts?: Contact[];
    signedUpOnGithubAt?: string;
    signedUpAt?: string;
    htmlUrl?: string;
  }
}
