"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { NEXT_ROUTER } from "constants/router";

import { useMatchPath } from "hooks/router/useMatchPath";

type Onboarding = {
  isLoading: boolean;
};

export const OnboardingContext = createContext<Onboarding>({ isLoading: false });

export default function OnboardingProvider({ children }: PropsWithChildren) {
  const { isImpersonating } = useImpersonation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSignup = useMatchPath(NEXT_ROUTER.signup.root);
  const isOnboarding = useMatchPath(NEXT_ROUTER.signup.onboarding.root, { exact: false });
  const isLegalNotice = useMatchPath(NEXT_ROUTER.legalNotice.root, { exact: false });

  const [isLoading, setIsLoading] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userOnboarding, isLoading: isLoadingUserOnboarding } = UserReactQueryAdapter.client.useGetMyOnboarding(
    {}
  );

  const { data: userProfile, isLoading: isLoadingUserProfile } = UserReactQueryAdapter.client.useGetMyProfile({});

  useEffect(() => {
    (async () => {
      // Add loader to signup/signin CTAs while app redirects
      setIsLoading(isLoadingUserOnboarding || isLoadingUserProfile);

      if (
        // If user is not auth there is no onboarding or user profile data
        !isAuthenticated ||
        // Can't redirect if no onboarding data
        !userOnboarding ||
        isLoadingUserOnboarding ||
        // Can't set joiningReason if no user profile data
        !userProfile ||
        isLoadingUserProfile ||
        // No need to show onboarding if impersonating a user
        isImpersonating
      ) {
        return;
      }

      if (userOnboarding.shouldGoToOnboarding(isOnboarding)) {
        if (userOnboarding.shouldGoToOnboardingVerifyInformation()) {
          router.push(NEXT_ROUTER.signup.onboarding.verifyInformation);
          return;
        }

        if (userOnboarding.shouldGoToOnboardingTermsAndConditions()) {
          router.push(NEXT_ROUTER.signup.onboarding.termsAndConditions);
          return;
        }

        router.push(NEXT_ROUTER.signup.onboarding.root);
        return;
      }

      // The case when the terms and conditions have been updated and the user has not yet accepted
      if (userOnboarding.shouldGoToTermsAndConditions(isLegalNotice)) {
        router.push(NEXT_ROUTER.legalNotice.root);
        return;
      }

      if (userOnboarding.shouldGoToHome(isSignup)) {
        router.push(NEXT_ROUTER.home.all);
        return;
      }

      console.error("OnboardingProvider: End of redirection flow, should not be here.", {
        isAuthenticated,
        userOnboarding,
        isLoadingUserOnboarding,
        userProfile,
        isLoadingUserProfile,
        isImpersonating,
      });
    })();
  }, [
    isAuthenticated,
    userOnboarding,
    isLoadingUserOnboarding,
    userProfile,
    isLoadingUserProfile,
    isImpersonating,
    searchParams,
    isSignup,
    isOnboarding,
    isLegalNotice,
  ]);

  return <OnboardingContext.Provider value={{ isLoading }}>{children}</OnboardingContext.Provider>;
}

export const useOnboarding = (): Onboarding => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
