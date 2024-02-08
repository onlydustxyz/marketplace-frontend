import { components } from "src/__generated/api";
import { Key } from "src/hooks/useIntl";

import { TIcon } from "components/layout/icon/icon.types";

export namespace ProjectTypes {
  export enum Ownership {
    All = "All",
    Mine = "Mine",
  }

  export enum Sorting {
    Trending = "RANK",
    ProjectName = "NAME",
    ReposCount = "REPO_COUNT",
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
  }

  export type TagsUnion =
    | "BIG_WHALE"
    | "FAST_AND_FURIOUS"
    | "HOT_COMMUNITY"
    | "LIKELY_TO_REWARD"
    | "NEWBIES_WELCOME"
    | "UPDATED_ROADMAP"
    | "WORK_IN_PROGRESS";

  export type Leader = components["schemas"]["RegisteredUserResponse"];
  export type EcoSystem = components["schemas"]["EcosystemResponse"];

  export interface TagMapping {
    icon: TIcon.Props;
    tooltip: Key;
    label: Key;
  }
}
