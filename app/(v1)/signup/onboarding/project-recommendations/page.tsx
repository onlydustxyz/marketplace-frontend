"use client";

import { useContext } from "react";

import { AccountAlreadyExist } from "app/(v1)/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/(v1)/signup/components/step-header/step-header";
import {
  ProjectRecommendationContext,
  ProjectRecommendationContextProvider,
} from "app/(v1)/signup/onboarding/project-recommendations/context/project-recommendations.context";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { BaseLink } from "components/layout/base-link/base-link";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { Categories } from "./components/categories/categories";
import { Goals } from "./components/goals/goals";
import { Languages } from "./components/languages/languages";

function Footer() {
  const { isInvalid } = useContext(ProjectRecommendationContext);
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        size={"l"}
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.signup.onboarding.root }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        size={"l"}
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.next" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
        type={"submit"}
        isDisabled={isInvalid}
      />
    </div>
  );
}

function SafeProjectRecommendationsPage() {
  const { onSubmit } = useContext(ProjectRecommendationContext);
  return (
    <form onSubmit={onSubmit} className="h-full">
      <SignupTemplate header={<AccountAlreadyExist />} footer={<Footer />}>
        <div className="flex w-full flex-col gap-3">
          <Paper container={"2"}>
            <StepHeader
              step={2}
              stepPath={NEXT_ROUTER.signup.onboarding.root}
              subStep={{ token: "v2.pages.signup.onboarding.tunnel.title" }}
            />
          </Paper>
          <Languages />
          <Goals />
          <Categories />
        </div>
      </SignupTemplate>
    </form>
  );
}
function projectRecommendationsPage() {
  return (
    <ProjectRecommendationContextProvider>
      <SafeProjectRecommendationsPage />
    </ProjectRecommendationContextProvider>
  );
}

export default projectRecommendationsPage;
