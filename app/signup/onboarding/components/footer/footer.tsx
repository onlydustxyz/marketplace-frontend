import { UserReactQueryAdapter } from "core/application/react-query-adapter/user";

import { Button } from "components/atoms/button/variants/button-default";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { TFooter } from "./footer.types";

export function Footer({ backButtonProps, nextButtonProps }: TFooter.Props) {
  const { data: user, isLoading } = UserReactQueryAdapter.client.useGetMe({});

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex w-full flex-row justify-end gap-2">
      {backButtonProps && !user?.hasCompletedOnboarding ? (
        <Button
          variant="secondary-light"
          size="l"
          translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.back" }}
          startIcon={{ remixName: "ri-arrow-left-s-line" }}
          as={BaseLink}
          htmlProps={{ href: NEXT_ROUTER.signup.onboarding.root }}
          {...backButtonProps}
        />
      ) : null}

      <Button
        size="l"
        translate={{ token: "v2.pages.signup.onboarding.tunnel.actions.next" }}
        endIcon={{ remixName: "ri-arrow-right-s-line" }}
        {...nextButtonProps}
      />
    </div>
  );
}
