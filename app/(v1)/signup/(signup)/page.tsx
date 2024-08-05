"use client";

import { SignupCtas } from "app/(v1)/signup/(signup)/features/signup-ctas/signup-ctas";
import { AccountAlreadyExist } from "app/(v1)/signup/components/account-already-exist/account-already-exist";
import { StepHeader } from "app/(v1)/signup/components/step-header/step-header";
import { Title } from "app/(v1)/signup/components/title/title";

import { Paper } from "components/atoms/paper";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { NEXT_ROUTER } from "constants/router";

import { SigninCta } from "./features/signin-cta/signin-cta";

export default function SignupPage() {
  return (
    <SignupTemplate header={<AccountAlreadyExist showDisconnectButton={false} />}>
      <div className="flex h-full flex-col gap-3">
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
