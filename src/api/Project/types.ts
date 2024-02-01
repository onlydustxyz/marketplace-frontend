import { components } from "src/__generated/api";
import { Key } from "src/hooks/useIntl";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

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
    BeginnersWelcome = "BEGINNERS_WELCOME",
    FastPaced = "FAST_PACED",
    LikelyToSendRewards = "LIKELY_TO_SEND_REWARDS",
    StrongExpertise = "STRONG_EXPERTISE",
  }

  export type TagsUnion = "BEGINNERS_WELCOME" | "FAST_PACED" | "LIKELY_TO_SEND_REWARDS" | "STRONG_EXPERTISE";

  export type Leader = components["schemas"]["RegisteredUserResponse"];
  export type EcoSystem = components["schemas"]["EcosystemResponse"];

  export interface TagMapping {
    icon: RemixIconsName;
    tooltip: Key;
  }
}
