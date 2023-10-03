import { Maybe, ProjectVisibilityDetailsFragment, useGetProjectVisibilityDetailsQuery } from "src/__generated/graphql";
import { useAuth } from "src/hooks/useAuth";
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

type Props = {
  project?: Maybe<ProjectVisibilityDetailsFragment>;
  user: {
    userId?: string;
    githubUserId?: number;
  };
};

export const isProjectVisibleToUser = ({ project, user }: Props) => {
  const isInvited = project?.pendingInvitations.some(i => i.githubUserId === user.githubUserId);
  const hasLeaders = (project?.projectLeads.length || 0) > 0;
  const hasRepos = (project?.githubReposAggregate.aggregate?.count || 0) > 0;
  const hasBudget = !!project?.usdBudgetId;

  return project?.visibility === "PUBLIC"
    ? hasRepos && hasBudget && (hasLeaders || isInvited)
    : isUserMemberOfProject({ project, user });
};

export const isUserMemberOfProject = ({ project, user }: Props) => {
  const isContributor = project?.contributors.some(c => c.githubUserId === user.githubUserId);
  const isPendingContributor = project?.pendingContributors.some(c => c.githubUserId === user.githubUserId);
  const isRewarded = project?.rewardedUsers.some(u => u.githubUserId === user.githubUserId);
  const isProjectLead = project?.projectLeads.some(l => l.userId === user?.userId);
  const isInvited = project?.pendingInvitations.some(i => i.githubUserId === user.githubUserId);

  return isContributor || isPendingContributor || isRewarded || isProjectLead || isInvited;
};
