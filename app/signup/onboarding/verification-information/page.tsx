import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { SignupTemplate } from "components/templates/signup-template/signup-template";

export default function VerificationInformationPage() {
  return (
    <SignupTemplate>
      <Paper size={"l"} container={"3"} classNames={{ base: "grid gap-6" }}>
        <div className="grid gap-2">
          <Typo
            size={"2xl"}
            variant={"brand"}
            color={"text-1"}
            translate={{ token: "v2.pages.signup.verificationInformation.title" }}
          />
          <Typo size={"s"} color={"text-2"} translate={{ token: "v2.pages.signup.verificationInformation.subtitle" }} />
        </div>
        <Paper size={"s"} container={"transparent"} classNames={{ base: "grid gap-6" }}>
          coucou
        </Paper>
      </Paper>
    </SignupTemplate>
  );
}
