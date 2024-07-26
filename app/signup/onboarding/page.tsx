"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import React from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";
import { TunnelStep } from "app/signup/onboarding/components/tunnel-step/tunnel-step";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { BaseLink } from "components/layout/base-link/base-link";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

function Footer() {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: "/signup" }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.skip" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
      />
    </div>
  );
}

function OnboardingPage() {
  const { data: user } = UserReactQueryAdapter.client.useGetMe({});

  if (!user) return null;

  return (
    <SignupTemplate header={<AccountAlreadyExist />} footer={<Footer />}>
      <Paper container={"2"} classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
        <StepHeader step={2} stepPath={"/signup/onboarding"} />
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
            isDone={user.isVerificationInformationCompleted()}
            path={"/signup"}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.terms.content" }}
            icon={{ remixName: "ri-file-text-line" }}
            type={"mandatory"}
            isDone={user.isTermsAndConditionsAccepted()}
            path={"/signup"}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.project.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.project.content" }}
            icon={{ remixName: "ri-medal-2-fill" }}
            type={"recommended"}
            isDone={user.isProjectRecommendationCompleted()}
            path={"/signup"}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.profile.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.profile.content" }}
            icon={{ remixName: "ri-user-line" }}
            type={"optional"}
            isDone={user.isProfileCompleted()}
            path={"/signup"}
          />
          <TunnelStep
            title={{ token: "v2.pages.signup.onboarding.tunnel.steps.payout.title" }}
            content={{ token: "v2.pages.signup.onboarding.tunnel.steps.payout.content" }}
            icon={{ remixName: "ri-building-line" }}
            type={"optional"}
            isDone={user.isPayoutInformationCompleted()}
            path={"/signup"}
          />
        </div>
      </Paper>
    </SignupTemplate>
  );
}

export default OnboardingPage;
