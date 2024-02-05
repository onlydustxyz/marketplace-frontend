"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { usePathname } from "next/navigation";

import GithubLink, { Variant as GithubLinkVariant } from "src/App/Layout/Header/GithubLink";
import { useIntl } from "src/hooks/useIntl";

import { Flex } from "components/layout/flex/flex";
import { MenuItem } from "components/layout/sidebar/menu-item/menu-item";
import { Sidebar as LayoutSidebar } from "components/layout/sidebar/sidebar";
import { Typography } from "components/layout/typography/typography";

export function Sidebar() {
  const { isAuthenticated, user } = useAuth0();
  const { T } = useIntl();
  const pathname = usePathname();

  const menuItems = [
    {
      label: T("v2.pages.settings.sidebar.publicProfile"),
      path: "/migration/settings/profile",
    },
    {
      label: T("v2.pages.settings.sidebar.payoutPreferences"),
      path: "/migration/settings/payout",
    },
    {
      label: T("v2.pages.settings.sidebar.verifyAccount"),
      path: "/migration/settings/verify",
    },
  ];

  return (
    <LayoutSidebar
      // TODO: mobile header
      mobileHeader={<div>Mobile header</div>}
    >
      {({ closePanel }) => (
        <div className="flex w-full flex-col gap-4 xl:gap-6">
          <Flex
            alignItems="center"
            className="gap-4 rounded-xl border-1 border-greyscale-50/8 bg-greyscale-900 p-3 shadow-light"
          >
            <img
              src={user?.picture}
              alt={user?.nickname}
              className="h-8 w-8 rounded-xl border-2 border-greyscale-50/12"
            />

            <Typography variant="body-l-bold" className="truncate">
              {user?.nickname}
            </Typography>
          </Flex>

          <div className="align-start flex flex-col gap-4 text-xl font-medium">
            {menuItems.map(({ path, label }) => (
              <MenuItem key={path} href={path} label={label} onClick={closePanel} isActive={pathname === path} />
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
