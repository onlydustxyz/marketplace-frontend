"use client";

import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";

import { TAccountAlreadyExist } from "app/(v1)/signup/components/account-already-exist/account-already-exist.types";

import { useLogout } from "src/App/Layout/Header/ProfileButton/Logout.hooks";

import { Button } from "components/atoms/button/variants/button-default";

export function AccountAlreadyExist({ showDisconnectButton = true }: TAccountAlreadyExist.Props) {
  const { handleLogout } = useLogout();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};
  return (
    <div className="flex justify-end">
      {isAuthenticated && showDisconnectButton ? (
        <Button
          variant="secondary-light"
          size="l"
          translate={{ token: "v2.pages.signup.accountAlreadyExist.disconnect" }}
          startIcon={{ remixName: "ri-logout-box-line" }}
          onClick={handleLogout}
        />
      ) : null}
    </div>
  );
}
