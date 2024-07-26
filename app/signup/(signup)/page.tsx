import { SignupCtas } from "app/signup/(signup)/features/signup-ctas/signup-ctas";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

import { SigninCta } from "./features/signin-cta/signin-cta";

export default function SignupPage() {
  return (
    <SignupTemplate>
      <div className="flex h-full flex-col gap-3">
        <Paper size={"l"} container={"3"} classNames={{ base: "grid gap-6" }}>
          <div className="grid gap-2">
            <Typo
              size={"2xl"}
              variant={"brand"}
              color={"text-1"}
              translate={{ token: "v2.pages.signup.signinSection.title" }}
            />
            <Typo size={"s"} color={"text-2"} translate={{ token: "v2.pages.signup.signinSection.subtitle" }} />
          </div>

          <SigninCta />
        </Paper>
        <Paper size={"l"} container={"3"} classNames={{ base: "flex-1 flex flex-col gap-6" }}>
          <div className="grid gap-2">
            <Typo
              size={"2xl"}
              variant={"brand"}
              color={"text-1"}
              translate={{ token: "v2.pages.signup.signupSection.title" }}
            />
            <Typo size={"s"} color={"text-2"} translate={{ token: "v2.pages.signup.signupSection.subtitle" }} />
          </div>

          <SignupCtas />
        </Paper>
      </div>
    </SignupTemplate>
  );
}
