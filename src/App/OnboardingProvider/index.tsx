"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter } from "next/navigation";
import { PropsWithChildren, createContext, useContext } from "react";

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

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: user, isLoading } = UserReactQueryAdapter.client.useGetMe({
    options: {
      enabled: isAuthenticated,
    },
  });

  const isOnboardingPage = useMatchPath(NEXT_ROUTER.onboarding, { exact: false });
  const isTermsPage = useMatchPath(NEXT_ROUTER.legalNotice.root, { exact: false });
  const onboardingInProgress = isOnboardingPage || isTermsPage;

  const skipRedirection = onboardingInProgress || !user?.id || isLoading;

  const showOnboarding = !skipRedirection && !user?.hasSeenOnboardingWizard && !isImpersonating;
  const showTermsAndConditions = !skipRedirection && !user?.hasAcceptedLatestTermsAndConditions && !isImpersonating;

  if (showOnboarding) {
    router.push(NEXT_ROUTER.onboarding);
    return null;
  }

  if (showTermsAndConditions) {
    router.push(NEXT_ROUTER.legalNotice.root);
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
