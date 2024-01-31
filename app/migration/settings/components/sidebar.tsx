"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { usePathname } from "next/navigation";

import GithubLink, { Variant as GithubLinkVariant } from "src/App/Layout/Header/GithubLink";
import { useIntl } from "src/hooks/useIntl";

import { MenuItem } from "components/layout/sidebar/menu-item/menu-item";
import { Sidebar as LayoutSidebar } from "components/layout/sidebar/sidebar";

export function Sidebar() {
  const { isAuthenticated } = useAuth0();
  const { T } = useIntl();
  const pathname = usePathname();

  const menuItems = [
    {
      label: T("settings.sidebar.publicProfile"),
      path: "/settings/profile",
    },
    {
      label: T("settings.sidebar.payoutPreferences"),
      path: "/settings/payout",
    },
    {
      label: T("settings.sidebar.verifyAccount"),
      path: "/settings/verify",
    },
  ];

  return (
    <LayoutSidebar
      // TODO
      mobileHeader={<div>Mobile header</div>}
    >
      {({ closePanel }) => (
        <div className="flex w-full flex-col gap-4 divide-neutral-700 xl:gap-6 xl:divide-y">
          <div>{/* TODO user card */}</div>

          <div className="align-start flex flex-col gap-2 pb-2 pt-3 text-xl font-medium">
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
