"use client";

import { Auth0ClientAdapter } from "core/application/auth0-client-adapter";
import { bootstrap } from "core/bootstrap";
import { UserJoiningReason } from "core/domain/user/models/user.types";
import {
  LOCAL_STORAGE_JOINING_REASON_KEY,
  USER_PROFILE_JOINING_REASON_CONTRIBUTOR,
  USER_PROFILE_JOINING_REASON_MAINTAINER,
} from "core/domain/user/user-constants";
import { useLocalStorage } from "react-use";

import { Cta } from "../../components/cta/cta";

export function SignupCtas() {
  const [, setJoiningReason] = useLocalStorage<UserJoiningReason>(LOCAL_STORAGE_JOINING_REASON_KEY);

  function handleSignup(joiningReason: NonNullable<UserJoiningReason>) {
    const { loginWithRedirect } = bootstrap.getAuthProvider() ?? {};

    if (loginWithRedirect) {
      setJoiningReason(joiningReason);

      Auth0ClientAdapter.helpers.handleLoginWithRedirect(loginWithRedirect);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Cta
        title={"v2.pages.signup.signupSection.contributor.title"}
        subtitle={"v2.pages.signup.signupSection.contributor.subtitle"}
        iconProps={{
          remixName: "ri-github-line",
          className: "bg-brand-2",
        }}
        wrapperProps={{
          as: "button",
          htmlProps: {
            type: "button",
            onClick: () => handleSignup(USER_PROFILE_JOINING_REASON_CONTRIBUTOR),
          },
        }}
      />
      <Cta
        title={"v2.pages.signup.signupSection.maintainer.title"}
        subtitle={"v2.pages.signup.signupSection.maintainer.subtitle"}
        iconProps={{
          remixName: "ri-github-line",
          className: "bg-brand-2",
        }}
        wrapperProps={{
          as: "button",
          htmlProps: {
            type: "button",
            onClick: () => handleSignup(USER_PROFILE_JOINING_REASON_MAINTAINER),
          },
        }}
      />
      <Cta
        title={"v2.pages.signup.signupSection.sponsor.title"}
        subtitle={"v2.pages.signup.signupSection.sponsor.subtitle"}
        iconProps={{
          remixName: "ri-github-line",
          className: "bg-brand-2",
        }}
        wrapperProps={{
          // TODO @mehdi activate once ready
          // as: "button",
          // htmlProps: {
          //   type: "button",
          //   onClick: () => handleSignup(USER_PROFILE_JOINING_REASON_SPONSOR),
          // },
          classNames: { base: "opacity-50" },
        }}
      />
    </div>
  );
}
