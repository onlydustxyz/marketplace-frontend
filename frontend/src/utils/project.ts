import { gql } from "@apollo/client";
import { PullDetailsFragment, VisibleProjectFragment } from "src/__generated/graphql";
import { chain, flatMap, some, uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { ContributorIdFragment } from "src/__generated/graphql";

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

export const VISIBLE_PROJECT_FRAGMENT = gql`
  fragment VisibleProject on Projects {
    id
    projectLeads {
      userId
    }
    githubRepos {
      githubRepoId
    }
    budgets {
      id
    }
    pendingInvitations {
      id
      githubUserId
    }
  }
`;

type Project<R> = {
  githubRepos: Array<{
    githubRepoDetails: {
      content: { contributors: Array<R | null> } | null;
    } | null;
    repoPulls?: PullDetailsFragment[] | null;
  }> | null;
  budgets: Array<{
    paymentRequests: Array<{ githubRecipient: R | null }>;
  }>;
};

export function getContributors<R extends ContributorIdFragment>(
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

export const countUnpaidMergedPullsByContributor = (project?: Project<ContributorIdFragment | null> | null) => {
  const paidItemsByLogin = chain(project?.budgets)
    .flatMap("paymentRequests")
    .groupBy("githubRecipient.id")
    .mapValues(requests => flatMap(requests, "workItems"))
    .value();

  const notPaid = ({ authorId, repoId, issueNumber }: PullDetailsFragment) =>
    !some(paidItemsByLogin[authorId], { repoId, issueNumber });

  return chain(project?.githubRepos).flatMap("repoPulls").filter(isDefined).filter(notPaid).countBy("authorId").value();
};

gql`
  fragment ContributorId on User {
    id
  }

  fragment PullDetails on GithubPulls {
    id
    repoId
    issueNumber
    authorId
  }

  fragment ProjectContributors on Projects {
    githubRepos {
      githubRepoId
      githubRepoDetails {
        id
        content {
          id
          contributors {
            ...ContributorId
          }
        }
      }
    }
    budgets {
      id
      paymentRequests {
        id
        githubRecipient {
          ...ContributorId
        }
      }
    }
  }

  fragment ProjectContributorsByLeader on Projects {
    githubRepos {
      repoPulls(where: { createdAt: { _gte: $createdSince }, mergedAt: { _isNull: false } }) {
        ...PullDetails
      }
    }
  }
`;
