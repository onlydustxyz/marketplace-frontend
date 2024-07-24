import { ProjectTypes } from "src/api/Project/types";

import TagMapping = ProjectTypes.TagMapping;

export namespace ProjectConstants {
  export const tagMapping: Record<ProjectTypes.TagsUnion, TagMapping> = {
    BIG_WHALE: {
      icon: { customName: "whale" },
      tooltip: "v2.pages.projects.tags.tooltips.BIG_WHALE",
      label: "v2.commons.enums.project.tags.BIG_WHALE",
    },
    FAST_AND_FURIOUS: {
      icon: { remixName: "ri-flashlight-fill" },
      tooltip: "v2.pages.projects.tags.tooltips.FAST_AND_FURIOUS",
      label: "v2.commons.enums.project.tags.FAST_AND_FURIOUS",
    },
    HOT_COMMUNITY: {
      icon: { remixName: "ri-fire-line" },
      tooltip: "v2.pages.projects.tags.tooltips.HOT_COMMUNITY",
      label: "v2.commons.enums.project.tags.HOT_COMMUNITY",
    },
    LIKELY_TO_REWARD: {
      icon: { remixName: "ri-hand-coin-line" },
      tooltip: "v2.pages.projects.tags.tooltips.LIKELY_TO_REWARD",
      label: "v2.commons.enums.project.tags.LIKELY_TO_REWARD",
    },
    NEWBIES_WELCOME: {
      icon: { remixName: "ri-seedling-line" },
      tooltip: "v2.pages.projects.tags.tooltips.NEWBIES_WELCOME",
      label: "v2.commons.enums.project.tags.NEWBIES_WELCOME",
    },
    UPDATED_ROADMAP: {
      icon: { remixName: "ri-git-fork-line" },
      tooltip: "v2.pages.projects.tags.tooltips.UPDATED_ROADMAP",
      label: "v2.commons.enums.project.tags.UPDATED_ROADMAP",
    },
    WORK_IN_PROGRESS: {
      icon: { remixName: "ri-hammer-line" },
      tooltip: "v2.pages.projects.tags.tooltips.WORK_IN_PROGRESS",
      label: "v2.commons.enums.project.tags.WORK_IN_PROGRESS",
    },
    HAS_GOOD_FIRST_ISSUES: {
      icon: { remixName: "ri-thumb-up-line" },
      tooltip: "v2.pages.projects.tags.tooltips.HAS_GOOD_FIRST_ISSUES",
      label: "v2.commons.enums.project.tags.HAS_GOOD_FIRST_ISSUES",
    },
  };
}
