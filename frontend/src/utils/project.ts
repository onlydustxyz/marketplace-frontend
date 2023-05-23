import {
  GithubIssueFragment,
  ProjectContributorsWithPaymentSummaryFragment,
  LastProjectMergedPullRequestsFragment,
  ProjectPaidWorkItemsFragment,
  GithubUserWithPaymentRequestsForProjectFragment,
} from "src/__generated/graphql";
import { chain, find, flatMap, some } from "lodash";
import isDefined from "src/utils/isDefined";
import { Maybe } from "graphql/jsutils/Maybe";

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
