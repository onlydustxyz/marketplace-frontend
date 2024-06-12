import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { NEXT_ROUTER } from "constants/router";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }

  export const stepMapping: Record<string, { icon: RemixIconsName; link: string }> = {
    step1: {
      icon: "ri-building-line",
      link: NEXT_ROUTER.settings.payoutPreferences,
    },
    step2: {
      icon: "ri-stack-line",
      link: NEXT_ROUTER.projects.allWithParams({ hasGoodFirstIssues: "true" }),
    },
    step3: {
      icon: "ri-medal-2-fill",
      link: NEXT_ROUTER.rewards.all,
    },
    step4: {
      icon: "ri-user-line",
      link: NEXT_ROUTER.settings.profile,
    },
    step5: {
      icon: "ri-send-plane-2-line",
      link: NEXT_ROUTER.settings.profile,
    },
  };
}
