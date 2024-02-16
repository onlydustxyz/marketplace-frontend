"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import GithubLink, { Variant as GithubLinkVariant } from "src/App/Layout/Header/GithubLink";
import { cn } from "src/utils/cn";

import { Avatar } from "components/ds/avatar/avatar";
import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { MenuItem } from "components/layout/sidebar/menu-item/menu-item";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";
import { Sidebar as LayoutSidebar } from "components/layout/sidebar/sidebar";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

import { useCurrentUser } from "hooks/users/useCurrentUser/useCurrentUser";
import { useSettingsError } from "hooks/users/useSettingsError/useSettingsError";
import { TUseSettingsError } from "hooks/users/useSettingsError/useSettingsError.types";

export function Sidebar() {
  const { isAuthenticated } = useAuth0();

  const { user } = useCurrentUser();
  const { error } = useSettingsError();
  const pathname = usePathname();

  const menuItems: TMenuItem.Props[] = useMemo(
    () => [
      {
        label: <Translate token="v2.features.sidebar.settings.publicProfile" />,
        href: NEXT_ROUTER.settings.profile,
      },
      {
        label: <Translate token="v2.features.sidebar.settings.billingProfile" />,
        href: NEXT_ROUTER.settings.billing,
        endIcon:
          error === TUseSettingsError.ERRORS.BILLING_WARNING || error === TUseSettingsError.ERRORS.BILLING_ERROR ? (
            <Icon
              size={16}
              remixName="ri-error-warning-line"
              className={cn({
                "text-orange-500": error === TUseSettingsError.ERRORS.BILLING_WARNING,
                "text-github-red": error === TUseSettingsError.ERRORS.BILLING_ERROR,
              })}
            />
          ) : null,
      },
      {
        label: <Translate token="v2.features.sidebar.settings.paymentMethods" />,
        href: NEXT_ROUTER.settings.payout,
        endIcon:
          error === TUseSettingsError.ERRORS.PAYOUT ? (
            <Icon size={16} remixName="ri-error-warning-line" className="text-orange-500" />
          ) : null,
      },
    ],
    [error]
  );

  return (
    <LayoutSidebar
      mobileHeader={
        <div className="flex items-center gap-3">
          <BaseLink href={NEXT_ROUTER.projects.all}>
            <Button as="div" iconOnly variant={"secondary"} size="s">
              <Icon remixName="ri-arrow-left-line" />
            </Button>
          </BaseLink>
          <div className="flex items-center gap-2 font-belwe text-2xl">
            <Avatar src={user?.avatarUrl || ""} alt={user?.login} size="m" />
            <div className="line-clamp-1">{user?.login}</div>
          </div>
        </div>
      }
    >
      {({ closePanel }) => (
        <div className="flex w-full flex-col gap-4 xl:gap-6">
          <Flex
            alignItems="center"
            className="gap-4 rounded-xl border-1 border-greyscale-50/8 bg-greyscale-900 p-3 shadow-light"
          >
            <img
              src={user?.avatarUrl}
              alt={user?.login}
              className="h-8 w-8 rounded-xl border-2 border-greyscale-50/12"
            />

            <Typography variant="body-l-bold" className="truncate">
              {user?.login}
            </Typography>
          </Flex>

          <div className="align-start flex flex-col gap-4 text-xl font-medium">
            {menuItems.map(menu => (
              <MenuItem {...menu} key={menu.href} onClick={closePanel} isActive={pathname === menu.href} />
            ))}

            {!isAuthenticated ? (
              <div className="border-t border-card-border-medium pt-4 text-base xl:hidden">
                <GithubLink variant={GithubLinkVariant.GreyNoise} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </LayoutSidebar>
  );
}
