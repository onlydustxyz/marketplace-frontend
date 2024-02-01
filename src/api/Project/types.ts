import { components } from "src/__generated/api";

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

  export type Leader = components["schemas"]["RegisteredUserResponse"];
  export type EcoSystem = components["schemas"]["EcosystemResponse"];
}
