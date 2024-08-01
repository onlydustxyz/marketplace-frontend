"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";
import { useRouter } from "next/navigation";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { TunnelStep } from "app/signup/onboarding/components/tunnel-step/tunnel-step";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { toast } from "components/atoms/toaster";
import { Translate } from "components/layout/translate/translate";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

function Footer({ isDisabled }: { isDisabled: boolean }) {
  const router = useRouter();
  const { mutateAsync: setMe } = UserReactQueryAdapter.client.useSetMe({
    options: {
      onSuccess: () => {
        router.push(`${NEXT_ROUTER.home.all}?onboardingCompleted`);
      },
      onError: () => {
        toast.error(<Translate token={"v2.pages.signup.onboarding.common.updateProfile.toast.error"} />);
      },
    },
  });

  function handleSubmit() {
    setMe({ hasCompletedOnboarding: true });
  }

  return (
    <div className="flex w-full justify-end">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.skip" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
        onClick={handleSubmit}
        isDisabled={isDisabled}
      />
    </div>
  );
}

function OnboardingPage() {
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};

  const { data: userOnboarding } = UserReactQueryAdapter.client.useGetMyOnboarding({
    options: {
      enabled: isAuthenticated,
    },
  });

  if (!userOnboarding) return null;

  return (
    <SignupTemplate
      header={<AccountAlreadyExist />}
      footer={
        <Footer
          isDisabled={!userOnboarding?.verificationInformationProvided || !userOnboarding?.termsAndConditionsAccepted}
        />
      }
    >
      <Paper container={"2"} classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
        <StepHeader step={2} stepPath={NEXT_ROUTER.signup.onboarding.root} />
        <Title
          title={{ token: "v2.pages.signup.onboarding.tunnel.title" }}
          content={{ token: "v2.pages.signup.onboarding.tunnel.content" }}
        />
        <div className="mt-3 flex w-full flex-col gap-4">
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.information.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.information.content" }}
            icon={{ remixName: "ri-checkbox-circle-line" }}
            type={"mandatory"}
            isDone={userOnboarding.verificationInformationProvided}
            path={NEXT_ROUTER.signup.onboarding.verifyInformation}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.content" }}
            icon={{ remixName: "ri-file-text-line" }}
            type={"mandatory"}
            isDone={userOnboarding.termsAndConditionsAccepted}
            path={NEXT_ROUTER.signup.onboarding.termsAndConditions}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.project.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.project.content" }}
            icon={{ remixName: "ri-medal-2-fill" }}
            type={"recommended"}
            isDone={userOnboarding.projectPreferencesProvided}
            path={NEXT_ROUTER.signup.onboarding.projectRecommendations}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.profile.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.profile.content" }}
            icon={{ remixName: "ri-user-line" }}
            type={"optional"}
            isDone={userOnboarding.profileCompleted}
            path={NEXT_ROUTER.signup.onboarding.completeYourProfile}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.payout.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.payout.content" }}
            icon={{ remixName: "ri-building-line" }}
            type={"optional"}
            isDone={userOnboarding.payoutInformationProvided}
            path={NEXT_ROUTER.signup.onboarding.payoutInformation}
          />
        </div>
      </Paper>
    </SignupTemplate>
  );
}

export default OnboardingPage;
