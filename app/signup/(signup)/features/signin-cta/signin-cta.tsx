"use client";

import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { bootstrap } from "core/bootstrap";

import { Cta } from "app/signup/(signup)/components/cta/cta";

export function SigninCta() {
  function handleSignin() {
    const { loginWithRedirect } = bootstrap.getAuthProvider() ?? {};

    if (loginWithRedirect) Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect);
  }

  return (
    <Cta
      title={"v2.pages.signup.signinSection.github.title"}
      subtitle={"v2.pages.signup.signinSection.github.subtitle"}
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
