import { gql } from "@apollo/client";
import { VisibleProjectFragment } from "src/__generated/graphql";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { ContributorIdFragment } from "src/__generated/graphql";

export function isVisible(project: VisibleProjectFragment | null) {
  if (!project) {
    return false;
  }

  const hasLeaders = project.projectLeads.length > 0;
  const hasRepos = project.githubRepos.length > 0;
  const hasBudget = project.budgets.length > 0;
  const hasInvitation = project.pendingInvitations.length > 0;

  return hasRepos && hasBudget && (hasLeaders || hasInvitation);
}

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
    }
  }
`;

type Project<R> = {
  githubRepos: Array<{
    githubRepoDetails: {
      content: { contributors: Array<R> };
    } | null;
  }>;
  budgets: Array<{
    paymentRequests: Array<{ githubRecipient: R }>;
  }>;
};

export function getContributors<R extends ContributorIdFragment>(project?: Project<R> | null): { contributors: R[] } {
  const contributorsFromRepos: R[] =
    project?.githubRepos?.flatMap(repo => repo.githubRepoDetails?.content?.contributors).filter(isDefined) || [];

  const contributorsFromPaymentRequests: R[] =
    project?.budgets
      ?.flatMap(budget => budget.paymentRequests)
      .map(paymentRequest => paymentRequest?.githubRecipient)
      .filter(isDefined) || [];

  return { contributors: uniqBy([...contributorsFromRepos, ...contributorsFromPaymentRequests], "id") };
}

export const PROJECT_CONTRIBUTORS_FRAGMENTS = gql`
  fragment ContributorId on User {
    id
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
`;
