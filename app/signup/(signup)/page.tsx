"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { UserProfile } from "core/domain/user/models/user-profile-model";
import { UserJoiningReason } from "core/domain/user/models/user.types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { SignupCtas } from "app/signup/(signup)/features/signup-ctas/signup-ctas";
import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { cn } from "src/utils/cn";

import { Paper } from "components/atoms/paper";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { SigninCta } from "./features/signin-cta/signin-cta";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userOnboarding, isPending: isPendingUserOnboarding } = UserReactQueryAdapter.client.useGetMyOnboarding({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { data: userProfile } = UserReactQueryAdapter.client.useGetMyProfile({
    options: {
      enabled: isAuthenticated,
    },
  });

  const { mutateAsync: setMyProfile, isPending: isPendingSetMyProfile } = UserReactQueryAdapter.client.useSetMyProfile(
    {}
  );

  async function handleSignupDispatcher() {
    const joiningReason = searchParams.get("joiningReason") ?? "";

    if (!userProfile?.joiningReason && UserProfile.isValidJoiningReason(joiningReason)) {
      await setMyProfile({
        joiningReason: joiningReason as UserJoiningReason,
      });
    }

    if (!userOnboarding || isPendingUserOnboarding) {
      return;
    }

    if (!userOnboarding?.verificationInformationProvided) {
      router.push(NEXT_ROUTER.signup.onboarding.verificationInformation);
      return;
    }

    if (!userOnboarding?.termsAndConditionsAccepted) {
      router.push(NEXT_ROUTER.signup.onboarding.termsAndConditions);
      return;
    }

    router.push(NEXT_ROUTER.signup.onboarding.root);
  }

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    if (userOnboarding?.completed) {
      router.push(NEXT_ROUTER.home.all);
      return;
    }

    handleSignupDispatcher();
  }, [userOnboarding, userProfile, searchParams, isAuthenticated, isPendingUserOnboarding]);

  return (
    <SignupTemplate header={<AccountAlreadyExist showDisconnectButton={false} />}>
      <div className={cn("flex h-full flex-col gap-3", { "pointer-events-none": isPendingSetMyProfile })}>
        <Paper size={"l"} container={"3"} classNames={{ base: "grid gap-6" }}>
          <Title
            title={{ token: "v2.pages.signup.signinSection.title" }}
            content={{ token: "v2.pages.signup.signinSection.subtitle" }}
          />

          <SigninCta />
        </Paper>
        <Paper size={"l"} container={"2"} classNames={{ base: "flex-1 flex flex-col gap-6" }}>
          <StepHeader step={1} stepPath={NEXT_ROUTER.signup.root} />
          <Title
            title={{ token: "v2.pages.signup.signupSection.title" }}
            content={{ token: "v2.pages.signup.signupSection.subtitle" }}
          />

          <SignupCtas />
        </Paper>
      </div>
    </SignupTemplate>
  );
}
