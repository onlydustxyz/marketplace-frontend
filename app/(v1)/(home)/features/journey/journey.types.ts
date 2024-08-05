import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";

import { NEXT_ROUTER } from "constants/router";

export namespace TJourney {
  export interface JourneyItemProps {
    stepName: string;
    completion: boolean;
  }

  export const stepMapping: Record<string, { icon: RemixIconsName; link: string }> = {
    // Verify information
    step1: {
      icon: "ri-checkbox-circle-line",
      link: NEXT_ROUTER.signup.onboarding.verifyInformation,
    },
    // Terms & conditions
    step2: {
      icon: "ri-file-text-line",
      link: NEXT_ROUTER.signup.onboarding.termsAndConditions,
    },
    // Project recommendations
    step3: {
      icon: "ri-medal-2-fill",
      link: NEXT_ROUTER.signup.onboarding.projectRecommendations,
    },
    // Complete your profile
    step4: {
      icon: "ri-user-line",
      link: NEXT_ROUTER.signup.onboarding.completeYourProfile,
    },
    // Payout information
    step5: {
      icon: "ri-building-line",
      link: NEXT_ROUTER.signup.onboarding.payoutInformation,
    },
  };
}
