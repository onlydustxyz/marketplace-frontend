import { useQuery } from "@apollo/client";
import {
  ContributionCountFragment,
  OwnUserProfileDetailsFragment,
  OwnUserProfileDocument,
  UserProfileDocument,
  UserProfileFragment,
  UserProfileQuery,
  useUserProfileByLoginQuery,
} from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { contextWithCacheHeaders } from "src/utils/headers";
import { ProfileProjectFragment } from "src/__generated/graphql";
import { chain, find, range, slice, sortBy, unionBy } from "lodash";
import onlyDustLogo from "assets/img/onlydust-logo-space.jpg";
import { isProjectVisibleToUser } from "src/hooks/useProjectVisibility";
import isDefined from "src/utils/isDefined";
import { daysFromNow, weekNumber } from "src/utils/date";
import { Project } from "src/hooks/useContributorProfilePanel/ContributorProfileSidePanel/ReadOnlyView/ProjectCard";

export type UserProfile = {
  profile: UserProfileFragment & OwnUserProfileDetailsFragment;
  projects: Project[];
  languages: string[];
  contributionCounts: ContributionCountFragment[];
  contributionCountVariationSinceLastWeek: number;
};

type AugmentedProfileProjectFragment = {
  leadSince?: Date;
} & ProfileProjectFragment;

const MAX_CONTRIBUTION_COUNTS = 13;

const EMPTY_DATA: ContributionCountFragment[] = range(0, MAX_CONTRIBUTION_COUNTS)
  .map(c => daysFromNow(7 * c))
  .map(date => ({
    year: date.getFullYear(),
    week: weekNumber(date),
    codeReviewCount: 0,
    issueCount: 0,
    pullRequestCount: 0,
  }));

export default function useUserProfile({
  githubUserId,
  githubUserLogin,
}: {
  githubUserId?: number;
  githubUserLogin?: string;
}) {
  const { user: currentUser, githubUserId: currentUserGithubId } = useAuth();

  const { data: dataFromUserId, loading: loadingFromUserId } = useQuery<UserProfileQuery>(
    githubUserId !== undefined && currentUserGithubId === githubUserId ? OwnUserProfileDocument : UserProfileDocument,
    { variables: { githubUserId: githubUserId || 0 }, skip: githubUserId === undefined, ...contextWithCacheHeaders }
  );

  const { data: dataFromUserLogin, loading: loadingFromUserLogin } = useUserProfileByLoginQuery({
    variables: { githubUserLogin: githubUserLogin || "" },
    skip: githubUserLogin === undefined,
    ...contextWithCacheHeaders,
  });

  const profile = dataFromUserId?.userProfiles.at(0) || dataFromUserLogin?.userProfiles.at(0);

  const projectLeaded =
    profile?.projectsLeaded
      .map(
        project =>
          ({
            ...project.project,
            leadSince: new Date(project.assignedAt + "Z"),
          } as AugmentedProfileProjectFragment)
      )
      .filter(isDefined) || [];

  const projectsContributed =
    profile?.projectsContributed.filter(isDefined).map(
      project =>
        ({
          ...project.project,
        } as AugmentedProfileProjectFragment)
    ) || [];

  const projects: Project[] = unionBy(projectLeaded, projectsContributed, p => p.id)
    .filter(project =>
      isProjectVisibleToUser({
        project,
        user: { userId: currentUser?.id, githubUserId: currentUserGithubId },
      })
    )
    .map(
      project =>
        ({
          id: project.id,
          key: project.key,
          name: project.name,
          logoUrl: project.logoUrl || onlyDustLogo,
          leadSince: project.leadSince,
          private: project.visibility === "PRIVATE",
          contributionCount: find(profile?.contributionStats, { projectId: project.id })?.totalCount,
          lastContribution: find(profile?.contributionStats, { projectId: project.id })?.maxDate,
          contributorCount: project.contributorsAggregate?.aggregate?.count || 0,
          totalGranted: project.usdBudget?.spentAmount,
        } as Project)
    )
    .filter(project => project.leadSince || project.contributionCount);

  const languages = (profile && sortBy(Object.keys(profile.languages), l => profile.languages[l]).reverse()) || [];

  const contributionCounts =
    (profile &&
      chain(profile.contributionCounts)
        .unionWith(EMPTY_DATA, (e1, e2) => e1.year === e2.year && e1.week === e2.week)
        .sortBy(["year", "week"])
        .reverse()
        .take(MAX_CONTRIBUTION_COUNTS)
        .reverse()
        .value()) ||
    [];

  const [lastWeek, thisWeek] = slice(contributionCounts, -2);
  const variationSinceLastWeek =
    lastWeek && thisWeek
      ? thisWeek.pullRequestCount +
        thisWeek.codeReviewCount +
        thisWeek.issueCount -
        (lastWeek.pullRequestCount + lastWeek.codeReviewCount + lastWeek.issueCount)
      : 0;

  return {
    data: profile && {
      profile: profile as UserProfileFragment & OwnUserProfileDetailsFragment,
      projects,
      languages,
      contributionCounts,
      contributionCountVariationSinceLastWeek: variationSinceLastWeek,
    },
    loading: loadingFromUserId || loadingFromUserLogin,
  };
}
