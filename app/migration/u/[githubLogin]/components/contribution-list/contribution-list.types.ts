import { PropsWithChildren } from "react";

export namespace TContributionList {
  export interface Props extends PropsWithChildren {
    githubUserId: number;
    languageId: string;
    ecosystemId: string;
  }
}
