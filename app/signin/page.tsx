import { SigninCta } from "app/signin/features/signin-cta/signin-cta";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";

export default function SigninPage() {
  return (
    <div>
      <Paper size={"l"} container={"3"} classNames={{ base: "grid gap-6" }}>
        <div className="grid gap-2">
          <Typo
            size={"2xl"}
            variant={"brand"}
            color={"text-1"}
            translate={{ token: "v2.pages.signin.signinSection.title" }}
          />
          <Typo size={"s"} color={"text-2"} translate={{ token: "v2.pages.signin.signinSection.subtitle" }} />
        </div>

        <SigninCta />
      </Paper>
    </div>
  );
}
