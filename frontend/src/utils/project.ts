import {
  VisibleProjectFragment,
  GithubIssueFragment,
  ProjectContributorsWithPaymentSummaryFragment,
  LastProjectMergedPullRequestsFragment,
  ProjectPaidWorkItemsFragment,
  GithubUserWithPaymentRequestsForProjectFragment,
} from "src/__generated/graphql";
import { chain, find, flatMap, some } from "lodash";
import isDefined from "src/utils/isDefined";
import { Maybe } from "graphql/jsutils/Maybe";

export const isProjectVisible =
  (githubUserId?: number) =>
  <T extends VisibleProjectFragment>(project: T | null): boolean => {
    if (!project) {
      return false;
    }

    const hasLeaders = project.projectLeads.length > 0;
    const hasRepos = project.githubRepos.length > 0;
    const hasBudget = project.budgets.length > 0;
    const hasInvitation =
      githubUserId &&
      project.pendingInvitations.map(pendingInvitation => pendingInvitation.githubUserId).includes(githubUserId);

    return hasRepos && hasBudget && (hasLeaders || !!hasInvitation);
  };

export function getContributors(
  project?: Maybe<ProjectContributorsWithPaymentSummaryFragment> &
    Partial<Maybe<ProjectPaidWorkItemsFragment & LastProjectMergedPullRequestsFragment>>
): (GithubUserWithPaymentRequestsForProjectFragment & { unpaidMergedPullsCount?: number })[] {
  const unpaidMergedPullsByContributor = project ? countUnpaidMergedPullsByContributor(project) : {};

  return (
    project?.contributors
      .map(c => c.githubUser)
      .filter(isDefined)
      .map(user => ({
        ...user,
        unpaidMergedPullsCount: unpaidMergedPullsByContributor[user.id],
      })) || []
  );
}

export const countUnpaidMergedPullsByContributor = (
  project?: Partial<Maybe<ProjectPaidWorkItemsFragment & LastProjectMergedPullRequestsFragment>>
) => {
  const paidItemsByLogin = chain(project?.budgets)
    .flatMap(b => b.paymentRequests)
    .groupBy(p => p.recipientId)
    .mapValues(requests => flatMap(requests, r => r.workItems))
    .value();

  const notPaid = ({ authorId, repoId, issueNumber }: GithubIssueFragment) =>
    !some(paidItemsByLogin[authorId], { repoId, issueNumber });

  const notIgnored = ({ ignoredForProjects }: GithubIssueFragment) =>
    !find(ignoredForProjects, { projectId: project?.id });

  return chain(project?.githubRepos)
    .flatMap(r => r.repoIssues)
    .filter(isDefined)
    .filter(notPaid)
    .filter(notIgnored)
    .countBy(p => p.authorId)
    .value();
};
