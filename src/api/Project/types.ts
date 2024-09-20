import { components } from "src/__generated/api";

import { TIcon } from "components/layout/icon/icon.types";

import { Key } from "hooks/translate/use-translate";

export namespace ProjectTypes {
  export enum Sorting {
    Trending = "RANK",
    ProjectName = "NAME",
    ContributorsCount = "CONTRIBUTOR_COUNT",
  }

  export enum Tags {
    BigWhale = "BIG_WHALE",
    FastAndFurious = "FAST_AND_FURIOUS",
    HotCommunity = "HOT_COMMUNITY",
    LikelyToReward = "LIKELY_TO_REWARD",
    NewbiesWelcome = "NEWBIES_WELCOME",
    UpdatedRoadmap = "UPDATED_ROADMAP",
    WorkInProgress = "WORK_IN_PROGRESS",
    HasGoodFirstIssues = "HAS_GOOD_FIRST_ISSUES",
  }

  export type TagsUnion = `${Tags}`;

  export type Leader = components["schemas"]["RegisteredUserResponse"];
  export type EcoSystem = components["schemas"]["EcosystemLinkResponse"];

  export interface TagMapping {
    icon: TIcon.Props;
    tooltip: Key;
    label: Key;
  }
}
