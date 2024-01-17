import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useIntl } from "src/hooks/useIntl";
import View from "./View";
import { useOnboarding } from "src/App/OnboardingProvider";
import MeApi from "src/api/me";
import { calculateUserCompletionScore } from "src/utils/calculateCompletionScore";
import { useAuth0 } from "@auth0/auth0-react";
import { getGithubUserIdFromSub } from "components/features/auth0/utils/getGithubUserIdFromSub.util.ts";
import { useImpersonation } from "components/features/impersonation/use-impersonation.tsx";

export default function Header() {
  const location = useLocation();
  const { user } = useAuth0();
  const { T } = useIntl();

  const { isImpersonating } = useImpersonation();

  const { onboardingInProgress } = useOnboarding();

  const { data: myProfileInfo } = MeApi.queries.useGetMyProfileInfo({});

  const githubUserId = getGithubUserIdFromSub(user?.sub);

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
