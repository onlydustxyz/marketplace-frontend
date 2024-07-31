"use client";

import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { bootstrap } from "core/bootstrap";
import { UserJoiningReason } from "core/domain/user/models/user.types";

import { Cta } from "../../components/cta/cta";

export function SigninCta() {
  function handleSignin(joiningReason: NonNullable<UserJoiningReason>) {
    const { loginWithRedirect } = bootstrap.getAuthProvider() ?? {};

    if (loginWithRedirect)
      Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect, { queryParam: { joiningReason } });
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
          onClick: () => handleSignin("CONTRIBUTOR"),
        },
      }}
    />
  );
}
