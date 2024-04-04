import { PropsWithChildren } from "react";

export namespace TRolesSelector {
  export enum roleType {
    Admin = "ADMIN",
    Member = "MEMBER",
  }

  export type roleUnion = `${roleType}`;

  export interface Props extends PropsWithChildren {
    activeRole: TRolesSelector.roleUnion;
    isYou: boolean;
    githubUserId: number | undefined;
  }
}
