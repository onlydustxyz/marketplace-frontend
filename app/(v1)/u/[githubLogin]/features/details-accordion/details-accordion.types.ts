import { PropsWithChildren } from "react";

import { TDotsStatus } from "app/(v1)/u/[githubLogin]/components/dots-status/dots-status.types";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { Key } from "hooks/translate/use-translate";

export namespace TDetailsAccordion {
  interface Project {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
  }

  export interface Detail {
    name: string;
    avatarUrl: string;
    contributingStatus: TDotsStatus.Props["status"];
    contributionCount: number;
    projectsCount: number;
    rewardCount: number;
    totalEarnedUsd: number;
    projects: Project[];
    languageId?: string;
    ecosystemId?: string;
  }

  export interface ItemInfoProps {
    icon: RemixIconsName;
    count: number;
    labelToken: Key;
  }
  export interface ProjectAvatarProps extends Project {}
  export interface StartContentProps extends Omit<Detail, "contributions"> {}
  export interface AccordionProps extends PropsWithChildren {
    details: Detail[];
    githubUserId: number;
  }
}
