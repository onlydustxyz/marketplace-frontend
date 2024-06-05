"use client";

import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";

import MenuItem from "src/App/Layout/Header/MenuItem";
import { viewportConfig } from "src/config";

import { Link } from "components/ds/link/link";
import { BaseLink } from "components/layout/base-link/base-link";

import { NEXT_ROUTER } from "constants/router";

import { useBillingProfiles } from "hooks/billings-profiles/use-billing-profiles/use-billing-profiles";
import { useMatchPath } from "hooks/router/useMatchPath";
import { useIntl } from "hooks/translate/use-translate";

import { GithubStatusBanner } from "./GithubStatusBanner";
import OnlyDustLogo from "./OnlyDustLogo";
import OnlyDustTitle from "./OnlyDustTitle";
import { ProfileButtonDisplay } from "./ProfileButton/ProfileButtonDisplay";

interface HeaderViewProps {
  menuItems: {
    [NEXT_ROUTER.projects.all]?: string;
    [NEXT_ROUTER.ecosystems.root]?: string;
    [NEXT_ROUTER.hackathons.root]?: string;
    [NEXT_ROUTER.contributions.all]?: string;
    [NEXT_ROUTER.rewards.all]?: string;
  };
  impersonating?: boolean;
  profileCompletionScore?: number;
}

export default function HeaderView({ menuItems, impersonating = false }: HeaderViewProps) {
  const { T } = useIntl();
  const { isAuthenticated, isLoading } = useAuth0();
  const isXl = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.xl}px)`);
  const isSm = useMediaQuery(`(max-width: ${viewportConfig.breakpoints.sm}px)`);
  const { data: billingProfile } = useBillingProfiles();
  const isMatchProjectDetail = useMatchPath(NEXT_ROUTER.projects.details.root("[slug]"), { exact: false });
  const isMatchSettings = useMatchPath(NEXT_ROUTER.settings.all, { exact: false });
  const hideHeader = (isMatchProjectDetail || isMatchSettings) && !isXl;

  const rewardSum = useMemo(
    () => billingProfile?.billingProfiles?.reduce((acc, profile) => acc + profile.requestableRewardCount, 0),
    [billingProfile]
  );

  const rewardBadgeContent = useMemo(() => {
    if (!rewardSum) {
      return undefined;
    }

    if (rewardSum > 9) {
      return "+9";
    }

    return `${rewardSum}`;
  }, [rewardSum]);

  if (hideHeader) {
    return null;
  }

  return (
    <div className="sticky left-0 top-0 z-50 w-full">
      <div className="gap-3 bg-black px-6 py-4 font-walsheim text-xl text-neutral-400 xl:gap-8" data-testid="header">
        <div className="flex items-center justify-center gap-8 xl:justify-start">
          <Link href={NEXT_ROUTER.projects.all} className="flex w-fit items-center gap-3 ">
            <OnlyDustLogo />
            {!isSm && <OnlyDustTitle />}
          </Link>
          <div className="flex flex-1 items-center justify-center xl:hidden">
            <div className="rounded-xl border border-card-border-medium bg-card-background-light px-4 py-2">
              <BaseLink
                href={NEXT_ROUTER.hackathons.root}
                className="od-text-body-m-bold text-white data-[active=true]:text-spacePurple-500"
              >
                {T("v2.features.menu.hackathons")}
              </BaseLink>
            </div>
          </div>
          <div className="items-center gap-8 xl:flex xl:flex-1">
            {isXl && (
              <>
                {menuItems[NEXT_ROUTER.projects.all] ? (
                  <MenuItem href={NEXT_ROUTER.projects.all}>{menuItems[NEXT_ROUTER.projects.all]}</MenuItem>
                ) : null}
                {/*TODO display once ready*/}
                {/*{menuItems[NEXT_ROUTER.ecosystems.root] ? (*/}
                {/*  <MenuItem href={NEXT_ROUTER.ecosystems.root}>{menuItems[NEXT_ROUTER.ecosystems.root]}</MenuItem>*/}
                {/*) : null}*/}
                {menuItems[NEXT_ROUTER.hackathons.root] ? (
                  <MenuItem href={NEXT_ROUTER.hackathons.root}>{menuItems[NEXT_ROUTER.hackathons.root]}</MenuItem>
                ) : null}
                {menuItems[NEXT_ROUTER.contributions.all] ? (
                  <MenuItem href={NEXT_ROUTER.contributions.all}>{menuItems[NEXT_ROUTER.contributions.all]}</MenuItem>
                ) : null}
                {menuItems[NEXT_ROUTER.rewards.all] ? (
                  <MenuItem href={NEXT_ROUTER.rewards.all} badgeContent={rewardBadgeContent}>
                    {menuItems[NEXT_ROUTER.rewards.all]}
                  </MenuItem>
                ) : null}
                <div className="flex flex-1 justify-center">
                  {impersonating ? (
                    <div
                      className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold uppercase text-white"
                      data-testid="impersonation-banner"
                    >
                      {T("impersonation.banner")}
                    </div>
                  ) : null}
                </div>
              </>
            )}
            <div className="flex flex-row items-center justify-end gap-4">
              <ProfileButtonDisplay isLoading={isLoading} isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </div>

      <GithubStatusBanner />
    </div>
  );
}
