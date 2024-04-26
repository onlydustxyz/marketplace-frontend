import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

export namespace TProfileCard {
  export interface ProfilStatProps {
    icon: RemixIconsName;
    token: string;
    count: number;
  }
  export interface Props extends PropsWithChildren {
    className?: string;
    avatarUrl?: string;
    login: string;
    qualifier: string;
    contributionCount: number;
    rewardCount: number;
    contributedProjectCount: number;
    leadedProjectCount: number;
    contributorPosition: number;
    contributorRank: string;
  }
}
