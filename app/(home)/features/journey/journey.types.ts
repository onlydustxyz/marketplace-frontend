import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { NEXT_ROUTER } from "constants/router";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }

  export const stepMapping: Record<string, { icon: RemixIconsName; link: string }> = {
    // individualBillingProfileSetup
    step1: {
      icon: "ri-building-line",
      link: NEXT_ROUTER.settings.payoutPreferences,
    },
    // descriptionUpdated
    step2: {
      icon: "ri-user-line",
      link: NEXT_ROUTER.settings.profile,
    },
    // telegramAdded
    step3: {
      icon: "ri-send-plane-2-line",
      link: NEXT_ROUTER.settings.profile,
    },
    // firstContributionMade
    step4: {
      icon: "ri-stack-line",
      link: NEXT_ROUTER.projects.allWithParams({ hasGoodFirstIssues: "true" }),
    },
    // firstRewardClaimed
    step5: {
      icon: "ri-medal-2-fill",
      link: NEXT_ROUTER.rewards.all,
    },
  };
}
