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
  const isSignup = useMatchPath(NEXT_ROUTER.signup.root, { exact: false });

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
      setIsLoading(isLoadingUserOnboarding || isLoadingUserProfile || isPendingSetMyProfile);
      if (
        !isAuthenticated ||
        !userOnboarding ||
        isLoadingUserOnboarding ||
        !userProfile ||
        isLoadingUserProfile ||
        isImpersonating
      ) {
        return;
      }

      if (userOnboarding.completed) {
        if (isSignup) router.push(NEXT_ROUTER.home.all);

        return;
      }

      const joiningReason = searchParams.get("joiningReason") ?? "";

      if (!userProfile?.joiningReason && UserProfile.isValidJoiningReason(joiningReason)) {
        await setMyProfile({
          joiningReason: joiningReason as UserJoiningReason,
        });
      }

      if (!userOnboarding.verificationInformationProvided) {
        router.push(NEXT_ROUTER.signup.onboarding.verifyInformation);
        return;
      }

      if (!userOnboarding.termsAndConditionsAccepted) {
        router.push(NEXT_ROUTER.signup.onboarding.termsAndConditions);
        return;
      }

      router.push(NEXT_ROUTER.signup.onboarding.root);
    })();
  }, [userOnboarding, userProfile, searchParams, isAuthenticated, isLoadingUserOnboarding, isImpersonating, isSignup]);

  return <OnboardingContext.Provider value={{ isLoading }}>{children}</OnboardingContext.Provider>;
}

export const useOnboarding = (): Onboarding => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
