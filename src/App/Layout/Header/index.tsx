import { gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { RoutePaths } from "src/App";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import View from "./View";
import { useImpersonationClaims } from "src/hooks/useImpersonationClaims";
import { useOnboarding } from "src/App/OnboardingProvider";
import { parseFlag } from "src/utils/parseFlag";
import MeApi from "src/api/me";
import useQueryParamsSorting from "src/components/RewardTable/useQueryParamsSorting";
import { Fields } from "src/components/UserRewardTable/Headers";
import { calculateCompletionScore } from "src/utils/calculateCompletionScore";

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, githubUserId } = useAuth();
  const { T } = useIntl();
  const dispatchSession = useSessionDispatch();
  const { impersonationSet } = useImpersonationClaims();
  const impersonating = !!impersonationSet;

  const { queryParams } = useQueryParamsSorting({
    field: Fields.Date,
    isAscending: false,
    storageKey: "myRewardsSorting",
  });

  const { data, isLoading, isError } = MeApi.queries.useMyRewardsInfiniteList({
    queryParams,
  });

  const rewards = data?.pages.flatMap(({ rewards }) => rewards) ?? [];
  const hasRewards = rewards.length && !isLoading && !isError;

  const { onboardingInProgress } = useOnboarding();
  const { data: profileData } = MeApi.queries.useGetMyProfile({});

  const rewardsMenuItem = hasRewards && !onboardingInProgress ? T("navbar.rewards") : undefined;
  const contributionsMenuItem =
    parseFlag("VITE_FLAG_ALLOW_CONTRIBUTIONS_LIST") && githubUserId && !onboardingInProgress
      ? T("navbar.contributions")
      : undefined;
  const projectsMenuItem =
    (rewardsMenuItem || contributionsMenuItem) && !onboardingInProgress ? T("navbar.projects") : undefined;

  return (
    <View
      menuItems={{
        [RoutePaths.Projects]: projectsMenuItem,
        [RoutePaths.Contributions]: contributionsMenuItem,
        [RoutePaths.Rewards]: rewardsMenuItem,
      }}
      isLoggedIn={isLoggedIn}
      selectedMenuItem={location.pathname}
      onLogin={() => dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: location.pathname })}
      impersonating={impersonating}
      profileCompletionScore={profileData ? calculateCompletionScore(profileData) : undefined}
    />
  );
}

gql`
  query GetPaymentRequestIds($githubUserId: bigint!) {
    githubUsersByPk(id: $githubUserId) {
      ...GithubUserId
      paymentRequests {
        ...PaymentRequestId
      }
    }
  }
`;
