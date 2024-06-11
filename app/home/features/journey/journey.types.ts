import { PropsWithChildren } from "react";

import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { NEXT_ROUTER } from "constants/router";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }
  export interface JourneyPrivateProps extends PropsWithChildren {}

  export const stepMapping: Record<string, { icon: RemixIconsName; link: string }> = {
    step1: {
      icon: "ri-building-line",
      link: NEXT_ROUTER.settings.all,
    },
    step2: {
      icon: "ri-stack-line",
      link: NEXT_ROUTER.contributions.all,
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
