"use client";

import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";

import { TAccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist.types";

import { useLogout } from "src/App/Layout/Header/ProfileButton/Logout.hooks";

import { Button } from "components/atoms/button/variants/button-default";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

export function AccountAlreadyExist({ showDisconnectButton = true }: TAccountAlreadyExist.Props) {
  const { handleLogout } = useLogout();

  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();

  const { data: user, isLoading } = UserReactQueryAdapter.client.useGetMe({});

  const { isAuthenticated = false } = authProvider ?? {};

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex justify-end">
      {user?.hasCompletedOnboarding ? (
        <Button
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.home.all }}
          size="l"
          variant="secondary-light"
          hideText
          startIcon={{
            remixName: "ri-close-line",
          }}
        />
      ) : (
        <>
          {isAuthenticated && showDisconnectButton ? (
            <Button
              variant="secondary-light"
              size="l"
              translate={{ token: "v2.pages.signup.accountAlreadyExist.disconnect" }}
              startIcon={{ remixName: "ri-logout-box-line" }}
              onClick={handleLogout}
            />
          ) : null}
        </>
      )}
    </div>
  );
}
