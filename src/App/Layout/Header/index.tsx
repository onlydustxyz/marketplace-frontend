"use client";

import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import { NEXT_ROUTER } from "constants/router";

import { useCurrentUser } from "hooks/users/useCurrentUser/useCurrentUser";

import View from "./View";

export default function Header() {
  const { githubUserId } = useCurrentUser();
  const { T } = useIntl();

  const { isImpersonating } = useImpersonation();

  const { onboardingInProgress } = useOnboarding();

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const rewardsMenuItem = githubUserId && !onboardingInProgress ? T("v2.features.menu.rewards") : undefined;
  const contributionsMenuItem = githubUserId && !onboardingInProgress ? T("v2.features.menu.contributions") : undefined;
  const projectsMenuItem =
    (rewardsMenuItem || contributionsMenuItem) && !onboardingInProgress ? T("v2.features.menu.projects") : undefined;

  return (
    <View
      menuItems={{
        [NEXT_ROUTER.projects.all]: projectsMenuItem,
        [NEXT_ROUTER.contributions.all]: contributionsMenuItem,
        [NEXT_ROUTER.rewards.all]: rewardsMenuItem,
      }}
      impersonating={isImpersonating}
      profileCompletionScore={myProfileInfo ? calculateUserCompletionScore(myProfileInfo) : undefined}
    />
  );
}
