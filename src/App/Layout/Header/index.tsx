"use client";

import { useIsClient } from "usehooks-ts";
import { isInMaintenanceMode } from "utils/maintenance/maintenance";

import OnlyDustLogo from "src/App/Layout/Header/OnlyDustLogo";
import OnlyDustTitle from "src/App/Layout/Header/OnlyDustTitle";
import { useOnboarding } from "src/App/OnboardingProvider";

import { Link } from "components/ds/link/link";
import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { NEXT_ROUTER } from "constants/router";

import { useMatchPath } from "hooks/router/useMatchPath";
import { useIntl } from "hooks/translate/use-translate";
import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import View from "./View";

function HeaderClient() {
  const { githubUserId } = useCurrentUser();
  const { T } = useIntl();

  const { isImpersonating } = useImpersonation();

  const { onboardingInProgress } = useOnboarding();

  const homeMenuItem = T("v2.features.menu.home");
  const projectsMenuItem = T("v2.features.menu.projects");
  const ecosystemsMenuItem = T("v2.features.menu.ecosystems");
  const hackathonsMenuItem = T("v2.features.menu.hackathons");
  const contributionsMenuItem = githubUserId && !onboardingInProgress ? T("v2.features.menu.contributions") : undefined;
  const applicationsMenuItem = githubUserId && !onboardingInProgress ? T("v2.features.menu.applications") : undefined;
  const rewardsMenuItem = githubUserId && !onboardingInProgress ? T("v2.features.menu.rewards") : undefined;

  const isMatchMaintenance = useMatchPath(NEXT_ROUTER.maintenance, { exact: false });

  const { inMaintenance } = isInMaintenanceMode();

  if (isMatchMaintenance || inMaintenance) {
    return null;
  }

  return (
    <View
      menuItems={{
        [NEXT_ROUTER.home.all]: homeMenuItem,
        [NEXT_ROUTER.projects.all]: projectsMenuItem,
        [NEXT_ROUTER.ecosystems.root]: ecosystemsMenuItem,
        [NEXT_ROUTER.hackathons.root]: hackathonsMenuItem,
        [NEXT_ROUTER.contributions.all]: contributionsMenuItem,
        [NEXT_ROUTER.applications.all]: applicationsMenuItem,
        [NEXT_ROUTER.rewards.all]: rewardsMenuItem,
      }}
      impersonating={isImpersonating}
    />
  );
}

function Header() {
  const isClient = useIsClient();
  if (!isClient) {
    return (
      <div className="sticky left-0 top-0 z-50 w-full">
        <div className="gap-3 bg-black px-6 py-4 font-walsheim text-xl text-neutral-400 xl:gap-8" data-testid="header">
          <div className="flex items-center justify-center gap-8 xl:justify-start">
            <Link href={NEXT_ROUTER.home.all} className="flex w-fit items-center gap-3 ">
              <OnlyDustLogo />
              <OnlyDustTitle />
            </Link>
            <div className="items-center gap-8 xl:flex xl:flex-1">
              <SkeletonEl width={100} height={20} variant="rounded" className="bg-card-background-light" />
              <SkeletonEl width={100} height={20} variant="rounded" className="bg-card-background-light" />
              <SkeletonEl width={100} height={20} variant="rounded" className="bg-card-background-light" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <HeaderClient />;
}

export default Header;
