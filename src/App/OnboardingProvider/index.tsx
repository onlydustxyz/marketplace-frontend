"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserJoiningReason } from "core/domain/user/models/user.types";
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

  const [isLoading, setIsLoading] = useState(false);

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userOnboarding, isLoading: isLoadingUserOnboarding } = UserReactQueryAdapter.client.useGetMyOnboarding({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { data: userProfile, isLoading: isLoadingUserProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { mutateAsync: setMyProfile, isPending: isPendingSetMyProfile } = UserReactQueryAdapter.client.useSetMyProfile(
    {}
  );

  useEffect(() => {
    (async () => {
      // Add loader to signup/signin CTAs while app redirects
      setIsLoading(isLoadingUserOnboarding || isLoadingUserProfile || isPendingSetMyProfile);

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

      // TODO handle onboarding guard on each page

      if (userOnboarding.completed) {
        // User shouldn't be able to view /signup pages once onboarding completed
        if (isSignup) router.push(NEXT_ROUTER.home.all);

        // Onboarding completed, don't need to redirect
        return;
      }

      if (isSignup) {
        const joiningReason = searchParams.get("joiningReason") ?? "";

        // We can't tell the difference if the user has just logged in or created a new account.
        // So we check if a joiningReason is already present.
        // If user has no joiningReason and one is present in the search params it must be set before continuing
        if (!userProfile?.joiningReason && UserProfile.isValidJoiningReason(joiningReason)) {
          // Must wait for this request before redirecting to the next step or the mutation will be cancelled
          await setMyProfile({
            joiningReason: joiningReason as UserJoiningReason,
          });
        }
      }

      // User must verify information before continuing
      if (!userOnboarding.verificationInformationProvided) {
        router.push(NEXT_ROUTER.signup.onboarding.verifyInformation);
        return;
      }

      // User must accept terms and conditions before continuing
      if (!userOnboarding.termsAndConditionsAccepted) {
        router.push(NEXT_ROUTER.signup.onboarding.termsAndConditions);
        return;
      }

      // Here the user has not completed the onboarding flow
      // If they are not already in the onboarding flow, redirect them to the dispatcher
      if (!isOnboarding) {
        router.push(NEXT_ROUTER.signup.onboarding.root);
      }
    })();
  }, [
    isAuthenticated,
    userOnboarding,
    isLoadingUserOnboarding,
    userProfile,
    isLoadingUserProfile,
    isImpersonating,
    isPendingSetMyProfile,
    searchParams,
    isSignup,
    isOnboarding,
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
