"use client";

import { useContext } from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import {
  ProjectRecommendationContext,
  ProjectRecommendationContextProvider,
} from "app/signup/onboarding/project-recommendations/context/project-recommendations.context";

import { Paper } from "components/atoms/paper";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { Footer } from "../components/footer/footer";
import { Categories } from "./components/categories/categories";
import { Goals } from "./components/goals/goals";
import { Languages } from "./components/languages/languages";

function SafeProjectRecommendationsPage() {
  const { onSubmit, isInvalid } = useContext(ProjectRecommendationContext);

  return (
    <form onSubmit={onSubmit} className="h-full">
      <SignupTemplate
        header={<AccountAlreadyExist />}
        footer={
          <Footer
            backButtonProps={{}}
            nextButtonProps={{
              type: "submit",
              isDisabled: isInvalid,
            }}
          />
        }
      >
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
