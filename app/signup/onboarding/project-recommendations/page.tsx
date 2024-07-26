import React from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { BaseLink } from "components/layout/base-link/base-link";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

function Footer() {
  return (
    <div className="flex w-full flex-row justify-end gap-2">
      <Button
        variant={"secondary-light"}
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.back" }}
        as={BaseLink}
        htmlProps={{ href: NEXT_ROUTER.signup.onboarding.root }}
        startIcon={{ remixName: "ri-arrow-left-s-line" }}
      />
      <Button
        translate={{ token: "v2.pages.signup.onboarding.projectRecommendations.actions.next" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
      />
    </div>
  );
}
function projectRecommendationsPage() {
  return (
    <SignupTemplate header={<AccountAlreadyExist />} footer={<Footer />}>
      <div className="flex w-full flex-col gap-3">
        <Paper container={"2"}>
          <StepHeader
            step={2}
            stepPath={NEXT_ROUTER.signup.onboarding.root}
            subStep={{ token: "v2.pages.signup.onboarding.tunnel.title" }}
          />
        </Paper>
        <Paper container={"2"} classNames={{ base: "flex flex-col gap-3" }}>
          <Title
            title={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.title" }}
            content={{ token: "v2.pages.signup.onboarding.projectRecommendations.languages.content" }}
          />
        </Paper>
      </div>
    </SignupTemplate>
  );
}

export default projectRecommendationsPage;
