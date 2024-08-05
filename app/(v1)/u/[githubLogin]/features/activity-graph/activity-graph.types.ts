import { PropsWithChildren } from "react";

export namespace TActivityGraph {
  export interface Props extends PropsWithChildren {
    githubUserId: number;
    ecosystems: {
      id: string;
      name: string;
      logoUrl: string;
    }[];
    activityGraphOnly?: boolean;
  }
}
