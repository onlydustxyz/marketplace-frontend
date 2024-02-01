import { ProjectTypes } from "src/api/Project/types";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import TagMapping = ProjectTypes.TagMapping;

export namespace ProjectConstants {
  export const tagMapping: Record<ProjectTypes.TagsUnion, TagMapping> = {
    BEGINNERS_WELCOME: {
      icon: "ri-seedling-line" as RemixIconsName,
      tooltip: "v2.pages.projects.tags.tooltips.beginnersWelcome",
    },
    FAST_PACED: {
      icon: "ri-rocket-2-line" as RemixIconsName,
      tooltip: "v2.pages.projects.tags.tooltips.fastPaced",
    },
    LIKELY_TO_SEND_REWARDS: {
      icon: "ri-hand-coin-line" as RemixIconsName,
      tooltip: "v2.pages.projects.tags.tooltips.likelyToSendRewards",
    },
    STRONG_EXPERTISE: {
      icon: "ri-git-fork-line" as RemixIconsName,
      tooltip: "v2.pages.projects.tags.tooltips.strongExpertise",
    },
  };
}
