"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useMemo } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useBillingProfiles } from "app/migration/settings/hooks/useBillingProfile";
import { useBillingStatus } from "app/migration/settings/hooks/useBillingStatus";

import { RoutePaths } from "src/App";
import GithubLink, { Variant as GithubLinkVariant } from "src/App/Layout/Header/GithubLink";
import { cn } from "src/utils/cn";

import { Button } from "components/ds/button/button";
import { Thumbnail } from "components/ds/thumbnail/thumbnail";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { MenuItem } from "components/layout/sidebar/menu-item/menu-item";
import { TMenuItem } from "components/layout/sidebar/menu-item/menu-item.types";
import { Sidebar as LayoutSidebar } from "components/layout/sidebar/sidebar";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { NEXT_ROUTER } from "constants/router";

export function Sidebar() {
  const { isAuthenticated } = useAuth0();

  const { user } = useCurrentUser();
  const { pathname } = useLocation();
  const { validBillingProfile, billingProfile } = useBillingProfiles();
  const { isWarning, isError } = useBillingStatus(validBillingProfile, billingProfile?.status);

  const menuItems: TMenuItem.Props[] = useMemo(
    () => [
      {
        label: <Translate token="v2.features.sidebar.settings.publicProfile" />,
        href: NEXT_ROUTER.settings.profile,
      },
      {
        label: <Translate token="v2.features.sidebar.settings.payoutPreferences" />,
        href: NEXT_ROUTER.settings.payout,
        endIcon: !user?.hasValidPayoutInfos ? (
          <Icon size={16} remixName="ri-information-line" className="text-orange-500" />
        ) : undefined,
      },
      {
        label: <Translate token="v2.features.sidebar.settings.billingProfile" />,
        href: NEXT_ROUTER.settings.billing,
        endIcon:
          isWarning || isError ? (
            <Icon
              size={16}
              remixName="ri-information-line"
              className={cn({
                "text-orange-500": isWarning,
                "text-github": isError,
              })}
            />
          ) : undefined,
      },
      {
        label: <Translate token="v2.features.sidebar.settings.invoices" />,
        href: NEXT_ROUTER.settings.invoices,
      },
    ],
    [isWarning, isError]
  );

  return (
    <LayoutSidebar
      mobileHeader={
        <div className="flex items-center gap-3">
          <NavLink to={RoutePaths.Projects}>
            <Button as="div" iconOnly variant={"secondary"} size="s">
              <Icon remixName="ri-arrow-left-line" />
            </Button>
          </NavLink>
          <div className="flex items-center gap-2 font-belwe text-2xl">
            <Thumbnail defaultSrc src={user?.avatarUrl || ""} alt="Project Logo" size="m" />
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
