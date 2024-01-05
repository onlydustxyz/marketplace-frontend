import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "../../../../components/features/auth0/utils/getGithubUserIdFromSub.util.ts";

export default function Header() {
  const location = useLocation();
  const { user } = useAuth0();
  const { T } = useIntl();

  const { impersonationSet } = useImpersonationClaims();
  const impersonating = !!impersonationSet;

  const { onboardingInProgress } = useOnboarding();

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const rewardsMenuItem = getGithubUserIdFromSub(user?.sub) && !onboardingInProgress ? T("navbar.rewards") : undefined;
  const contributionsMenuItem =
    getGithubUserIdFromSub(user?.sub) && !onboardingInProgress ? T("navbar.contributions") : undefined;
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
