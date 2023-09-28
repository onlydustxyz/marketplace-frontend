import { GithubUser } from "src/__generated/graphql";
import { ContributionBadge } from "src/components/Contribution/ContributionBadge";
import {
  GithubContributionIconStatus,
  GithubContributionIconStatusType,
  GithubContributionType,
  QueryContribution,
} from "src/types";

export function ContributionLinked({
  contribution,
}: {
  contribution: Pick<QueryContribution, "githubCodeReview" | "githubIssue" | "githubPullRequest" | "type">;
}) {
  const { type, githubCodeReview, githubIssue, githubPullRequest } = contribution;

  switch (type) {
    case GithubContributionType.Issue: {
      const { closedByPullRequests } = githubIssue ?? {};

      if (closedByPullRequests?.length) {
        return (
          <>
            {closedByPullRequests.map(({ githubPullRequest }) => {
              const { id, number, status, title, author, htmlUrl, draft } = githubPullRequest ?? {};

              return (
                <ContributionBadge
                  key={id}
                  id={id}
                  number={number}
                  type={GithubContributionType.PullRequest}
                  status={draft ? GithubContributionIconStatus.Draft : (status as GithubContributionIconStatusType)}
                  title={title ?? ""}
                  author={author as GithubUser}
                  url={htmlUrl ?? ""}
                />
              );
            })}
          </>
        );
      }

      return null;
    }

    case GithubContributionType.PullRequest: {
      const { closingIssues, codeReviews } = githubPullRequest ?? {};

      if (closingIssues?.length || codeReviews?.length) {
        return (
          <>
            {closingIssues?.map(({ githubIssue }) => {
              const { id, number, status, title, author, htmlUrl } = githubIssue ?? {};

              return (
                <ContributionBadge
                  key={id}
                  id={id}
                  number={number}
                  type={GithubContributionType.Issue}
                  status={status as GithubContributionIconStatusType}
                  title={title ?? ""}
                  url={htmlUrl ?? ""}
                  author={author as GithubUser}
                />
              );
            })}

            {codeReviews?.map(codeReview => {
              const { id, reviewer, status } = codeReview ?? {};
              const { number, title, htmlUrl } = githubPullRequest ?? {};

              return (
                <ContributionBadge
                  key={id}
                  id={id ?? ""}
                  number={number}
                  type={GithubContributionType.CodeReview}
                  status={status as GithubContributionIconStatusType}
                  title={title ?? ""}
                  url={htmlUrl ?? ""}
                  author={reviewer as GithubUser}
                />
              );
            })}
          </>
        );
      }

      return null;
    }

    case GithubContributionType.CodeReview: {
      const { githubPullRequest } = githubCodeReview ?? {};

      if (githubPullRequest) {
        const { id, number, status, draft, author, title, htmlUrl } = githubPullRequest;

        return (
          <ContributionBadge
            id={id}
            number={number}
            type={GithubContributionType.PullRequest}
            status={draft ? GithubContributionIconStatus.Draft : (status as GithubContributionIconStatusType)}
            title={title ?? ""}
            author={author as GithubUser}
            url={htmlUrl ?? ""}
          />
        );
      }

      return null;
    }
  }

  return null;
}
