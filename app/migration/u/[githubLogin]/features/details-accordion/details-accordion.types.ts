import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { Key } from "hooks/translate/use-translate";

export namespace TDetailsAccordion {
  interface Project {
    name: string;
    slug: string;
    avatarUrl: string;
    hasMissingGithubAppInstallation: boolean;
    hasPendingInvitation: boolean;
  }

  interface Detail {
    name: string;
    avatarUrl: string;
    rankStatus: "good" | "neutral" | "bad";
    contributionCount: number;
    projectsCount: number;
    rewardsCount: number;
    earnedUsdAmount: number;
    projects: Project[];
    contributions?: string[];
  }

  export interface ItemInfoProps {
    icon: RemixIconsName;
    count: number;
    labelToken: Key;
  }
  export interface ProjectAvatarProps extends Project {}
  export interface StartContentProps extends Omit<Detail, "contributions"> {}
  export interface AccordionProps {
    details: Detail[];
  }
}
