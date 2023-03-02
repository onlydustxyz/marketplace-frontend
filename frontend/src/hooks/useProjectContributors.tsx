import { gql } from "@apollo/client";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { ContributorIdFragment } from "src/__generated/graphql";

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

export default function useProjectContributors<R extends ContributorIdFragment>(
  project?: Project<R> | null
): { contributors: R[] } {
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
