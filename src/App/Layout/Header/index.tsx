import { useCurrentUser } from "hooks/users/useCurrentUser";
import { useLocation } from "react-router-dom";

import { RoutePaths } from "src/App";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { useIntl } from "src/hooks/useIntl";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

import View from "./View";

export default function Header() {
  const location = useLocation();
  const { githubUserId } = useCurrentUser();
  const { T } = useIntl();

  const { isImpersonating } = useImpersonation();

  const { onboardingInProgress } = useOnboarding();

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const rewardsMenuItem = githubUserId && !onboardingInProgress ? T("navbar.rewards") : undefined;
  const contributionsMenuItem = githubUserId && !onboardingInProgress ? T("navbar.contributions") : undefined;
  const projectsMenuItem =
    (rewardsMenuItem || contributionsMenuItem) && !onboardingInProgress ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.Contributions]: contributionsMenuItem,
        [RoutePaths.Rewards]: rewardsMenuItem,
      }}
      selectedMenuItem={location.pathname}
      impersonating={isImpersonating}
      profileCompletionScore={myProfileInfo ? calculateUserCompletionScore(myProfileInfo) : undefined}
    />
  );
}
