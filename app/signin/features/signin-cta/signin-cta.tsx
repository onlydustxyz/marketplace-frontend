"use client";

import { bootstrap } from "core/bootstrap";

import { Cta } from "app/signin/components/cta/cta";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

export function SigninCta() {
  function handleSignin() {
    const { loginWithRedirect } = bootstrap.getAuthProvider() ?? {};

    if (loginWithRedirect) handleLoginWithRedirect(loginWithRedirect);
  }

  return (
    <Cta
      title={"v2.pages.signin.signinSection.github.title"}
      subtitle={"v2.pages.signin.signinSection.github.subtitle"}
      iconProps={{
        remixName: "ri-github-line",
      }}
      wrapperProps={{
        as: "button",
        htmlProps: {
          type: "button",
          onClick: handleSignin,
        },
      }}
    />
  );
}
