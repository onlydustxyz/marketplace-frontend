import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";

export default function Header() {
  const location = useLocation();
  const { githubUserId } = useAuth();
  const { T } = useIntl();

  const { impersonationSet } = useImpersonationClaims();
  const impersonating = !!impersonationSet;

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
      impersonating={impersonating}
      profileCompletionScore={myProfileInfo ? calculateUserCompletionScore(myProfileInfo) : undefined}
    />
  );
}
