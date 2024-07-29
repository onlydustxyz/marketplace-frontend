import React from "react";

import { AccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/signup/components/step-header/step-header";
import { Title } from "app/signup/components/title/title";

import { Paper } from "components/atoms/paper";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

export default function PayoutInformationPage() {
  return (
    <form className="h-full">
      <SignupTemplate header={<AccountAlreadyExist showDisconnectButton />}>
        <Paper size={"l"} container={"3"} classNames={{ base: "flex flex-col gap-3 min-h-full" }}>
          <StepHeader
            step={2}
            stepPath={"/signup/onboarding"}
            subStep={{ token: "v2.pages.signup.payoutInformation.stepTitle" }}
          />
          <Title
            title={{ token: "v2.pages.signup.payoutInformation.title" }}
            content={{ token: "v2.pages.signup.payoutInformation.subtitle" }}
          />
        </Paper>
      </SignupTemplate>
    </form>
  );
}
