"use client";

import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";

import { TAccountAlreadyExist } from "app/signup/components/account-already-exist/account-already-exist.types";

import { useLogout } from "src/App/Layout/Header/ProfileButton/Logout.hooks";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

export function AccountAlreadyExist({ showDisconnectButton = true }: TAccountAlreadyExist.Props) {
  const { handleLogout } = useLogout();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { isAuthenticated = false } = authProvider ?? {};
  return (
    <div className="flex justify-between">
      <Typo as="div" size="s" classNames={{ base: "py-2.5" }}>
        <Translate token="v2.pages.signup.accountAlreadyExist.label" as={"span"} />
        &nbsp;
        <BaseLink href={NEXT_ROUTER.signup.root}>
          <Translate
            token="v2.pages.signup.accountAlreadyExist.link"
            className="cursor-pointer text-text-2"
            as={"span"}
          />
        </BaseLink>
      </Typo>
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
