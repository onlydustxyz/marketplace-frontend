"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext } from "react";

import MeApi from "src/api/me";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { NEXT_ROUTER } from "constants/router";

import { useMatchPath } from "hooks/router/useMatchPath";

type Onboarding = {
  onboardingInProgress: boolean;
};

export const OnboardingContext = createContext<Onboarding>({ onboardingInProgress: false });

export default function OnboardingProvider({ children }: PropsWithChildren) {
  const { isImpersonating } = useImpersonation();
  const router = useRouter();

  const { data, isLoading } = MeApi.queries.useGetMe({});

  const isOnboardingPage = useMatchPath(NEXT_ROUTER.onboarding, { exact: false });
  const isTermsPage = useMatchPath(NEXT_ROUTER.termsAndConditions, { exact: false });
  const onboardingInProgress = isOnboardingPage || isTermsPage;

  const skipRedirection = onboardingInProgress || !data?.id || isLoading;

  const showOnboarding = !skipRedirection && !data?.hasSeenOnboardingWizard && !isImpersonating;
  const showTermsAndConditions = !skipRedirection && !data?.hasAcceptedLatestTermsAndConditions && !isImpersonating;

  if (showOnboarding) {
    router.push(NEXT_ROUTER.onboarding);
    return null;
  }

  if (showTermsAndConditions) {
    router.push(NEXT_ROUTER.termsAndConditions);
    return null;
  }

  return <OnboardingContext.Provider value={{ onboardingInProgress }}>{children}</OnboardingContext.Provider>;
}

export const useOnboarding = (): Onboarding => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
