import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { NEXT_ROUTER } from "constants/router";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }

  export const stepMapping: Record<string, { icon: RemixIconsName; link: string }> = {
    // billingProfileVerified
    step1: {
      icon: "ri-user-line",
      link: NEXT_ROUTER.settings.payoutPreferences,
    },
    // companyBillingProfileVerified
    step2: {
      icon: "ri-suitcase-line",
      link: NEXT_ROUTER.settings.payoutPreferences,
    },
    // descriptionUpdated
    step3: {
      icon: "ri-file-edit-line",
      link: NEXT_ROUTER.settings.profile,
    },
    // telegramAdded
    step4: {
      icon: "ri-telegram-line",
      link: NEXT_ROUTER.settings.profile,
    },
    // rewardClaimed
    step5: {
      icon: "ri-git-pull-request-line",
      link: NEXT_ROUTER.projects.allWithParams({ hasGoodFirstIssues: "true" }),
    },
    // rewardReceived
    step6: {
      icon: "ri-medal-2-fill",
      link: NEXT_ROUTER.rewards.all,
    },
  };
}
