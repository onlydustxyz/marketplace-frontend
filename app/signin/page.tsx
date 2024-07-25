"use client";

import { bootstrap } from "core/bootstrap";

import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Icon } from "components/layout/icon/icon";

export default function SigninPage() {
  function handleSignin() {
    const { loginWithRedirect } = bootstrap.getAuthProvider() ?? {};

    if (loginWithRedirect) handleLoginWithRedirect(loginWithRedirect);
  }

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

        <Paper
          as={"button"}
          htmlProps={{
            type: "button",
            onClick: handleSignin,
          }}
          size={"s"}
          container={"3"}
          classNames={{ base: "flex items-center gap-3 justify-between text-left" }}
        >
          <div className={"flex items-center gap-3"}>
            <div
              className={
                "flex h-16 w-16 items-center justify-center rounded-lg border border-container-stroke-separator p-6"
              }
            >
              <Icon remixName={"ri-github-line"} size={24} />
            </div>

            <div className={"grid"}>
              <Typo
                size={"l"}
                weight={"medium"}
                color={"text-1"}
                translate={{ token: "v2.pages.signin.signinSection.github.title" }}
              />
              <Typo
                size={"s"}
                color={"text-2"}
                translate={{ token: "v2.pages.signin.signinSection.github.subtitle" }}
              />
            </div>
          </div>

          <Icon remixName={"ri-arrow-right-s-line"} />
        </Paper>
      </Paper>
    </div>
  );
}
