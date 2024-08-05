import { PropsWithChildren } from "react";

export namespace TProfile {
  export interface Props extends PropsWithChildren {
    githubUserId: number;
  }
}
