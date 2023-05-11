import { VisibleProjectFragment, GithubIssueFragment, WorkItemIdFragment } from "src/__generated/graphql";
import { chain, find, flatMap, some, uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { GithubUserIdFragment } from "src/__generated/graphql";

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

type Project<R> = {
  id: string;
  githubRepos: Array<{
    repoContributors: Array<{
      user: R | null;
    }>;
    repoIssues?: GithubIssueFragment[] | null;
  }> | null;
  budgets: Array<{
    paymentRequests: Array<{ githubRecipient: R | null; workItems?: Array<WorkItemIdFragment | null> }>;
  }>;
};

export function getContributors<R extends GithubUserIdFragment>(
  project?: Project<R | null> | null
): { contributors: R[] } {
  const contributorsFromRepos: R[] =
    project?.githubRepos?.flatMap(repo => repo.repoContributors.map(c => c.user)).filter(isDefined) || [];

  const contributorsFromPaymentRequests: R[] =
    project?.budgets
      ?.flatMap(budget => budget.paymentRequests)
      .map(paymentRequest => paymentRequest?.githubRecipient)
      .filter(isDefined) || [];

  const unpaidMergedPullsByContributor = project ? countUnpaidMergedPullsByContributor(project) : {};

  const contributors = uniqBy([...contributorsFromRepos, ...contributorsFromPaymentRequests], "id").map(c => ({
    ...c,
    unpaidMergedPullsCount: unpaidMergedPullsByContributor[c.id],
  }));

  return { contributors };
}

export const countUnpaidMergedPullsByContributor = (project?: Project<GithubUserIdFragment | null> | null) => {
  const paidItemsByLogin = chain(project?.budgets)
    .flatMap(b => b.paymentRequests)
    .groupBy(p => p.githubRecipient?.id)
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
