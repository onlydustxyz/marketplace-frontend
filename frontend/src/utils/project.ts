import { VisibleProjectFragment, GithubIssueFragment } from "src/__generated/graphql";
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
    githubRepoDetails: {
      content: { contributors: Array<R | null> } | null;
    } | null;
    repoIssues?: GithubIssueFragment[] | null;
  }> | null;
  budgets: Array<{
    paymentRequests: Array<{ githubRecipient: R | null }>;
  }>;
};

export function getContributors<R extends GithubUserIdFragment>(
  project?: Project<R | null> | null
): { contributors: R[] } {
  const contributorsFromRepos: R[] =
    project?.githubRepos?.flatMap(repo => repo.githubRepoDetails?.content?.contributors).filter(isDefined) || [];

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
    .flatMap("paymentRequests")
    .groupBy("githubRecipient.id")
    .mapValues(requests => flatMap(requests, "workItems"))
    .value();

  const notPaid = ({ authorId, repoId, issueNumber }: GithubIssueFragment) =>
    !some(paidItemsByLogin[authorId], { repoId, issueNumber });

  const notIgnored = ({ ignoredForProjects }: GithubIssueFragment) =>
    !find(ignoredForProjects, { projectId: project?.id });

  return chain(project?.githubRepos)
    .flatMap("repoIssues")
    .filter(isDefined)
    .filter(notPaid)
    .filter(notIgnored)
    .countBy("authorId")
    .value();
};
