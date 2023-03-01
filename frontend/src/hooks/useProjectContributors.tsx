import { gql } from "@apollo/client";
import { uniqBy } from "lodash";
import isDefined from "src/utils/isDefined";
import { ProjectContributorsFragment } from "src/__generated/graphql";

export default function useProjectContributors(project: ProjectContributorsFragment) {
  const contributorsFromRepos =
    project.githubRepos?.flatMap(repo => repo.githubRepoDetails?.content?.contributors).filter(isDefined) || [];

  const contributorsFromPaymentRequests =
    project.budgets
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
