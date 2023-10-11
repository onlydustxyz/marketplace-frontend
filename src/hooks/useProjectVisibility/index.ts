import { Maybe, ProjectVisibilityDetailsFragment, useGetProjectVisibilityDetailsQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
import { Leader } from "src/types";
import { contextWithCacheHeaders } from "src/utils/headers";

export default function useProjectVisibility(projectId?: string) {
  const { user, githubUserId } = useAuth();

  const { data } = useGetProjectVisibilityDetailsQuery({
    variables: { projectId },
    skip: !projectId,
    ...contextWithCacheHeaders,
  });

  return {
    isCurrentUserMember: isUserMemberOfProject({
      project: data?.projects[0],
      user: { userId: user?.id, githubUserId },
    }),
    visibleToCurrentUser: isProjectVisibleToUser({
      project: data?.projects[0],
      user: { userId: user?.id, githubUserId },
    }),
  };
}

// TODO(Backend): This is a temporary solution until we determine if a user is a member of a project
type ExtendedProjectVisibilityDetailsFragment = ProjectVisibilityDetailsFragment & {
  leaders?: Leader[];
  repoCount?: number;
};

type Props = {
  project?: Maybe<ExtendedProjectVisibilityDetailsFragment>;
  user: {
    userId?: string;
    githubUserId?: number;
  };
};

export const isProjectVisibleToUser = ({ project, user }: Props) => {
  const isInvited = project?.pendingInvitations?.some(i => i.githubUserId === user.githubUserId);
  const hasLeaders = (project?.projectLeads?.length || 0) > 0;
  const hasRepos = (project?.githubReposAggregate?.aggregate?.count || project?.repoCount || 0) > 0;
  const hasBudget = !!project?.usdBudgetId;

  return project?.visibility === "PUBLIC"
    ? hasRepos && hasBudget && (hasLeaders || isInvited)
    : isUserMemberOfProject({ project, user });
};

// TODO(Backend): This is a temporary solution until we determine if a user is a member of a project
export const isUserMemberOfProject = ({ project, user }: Props) => {
  const isContributor = project?.contributors?.some(c => c.githubUserId === user.githubUserId) || false;
  const isPendingContributor = project?.pendingContributors?.some(c => c.githubUserId === user.githubUserId) || false;
  const isRewarded = project?.rewardedUsers?.some(u => u.githubUserId === user.githubUserId) || false;
  const isProjectLead =
    project?.projectLeads?.some(l => l.userId === user?.userId) ||
    project?.leaders?.some(l => l.id === user?.userId) ||
    false;
  const isInvited = project?.pendingInvitations?.some(i => i.githubUserId === user.githubUserId) || false;
  // Dirty hack to make sure that the project is visible to the user, soon the backend will handle this
  const isItHandledInBackend = import.meta.env.VITE_USE_APOLLO === "false";

  return isContributor || isPendingContributor || isRewarded || isProjectLead || isInvited || isItHandledInBackend;
};
