import { GithubUser } from "src/__generated/graphql";
import { GithubContributionType, GithubItemStatus, GithubPullRequestDraft, QueryContribution } from "src/types";

function getDefaultInfo(
  info?: Partial<Record<"type" | "title" | "htmlUrl" | "number" | "status" | "author", unknown>>
) {
  const { type, title, htmlUrl, number, status, author } = info ?? {};

  return {
    type: type ?? "",
    title: title ?? "",
    htmlUrl: htmlUrl ?? "",
    number: number ?? 0,
    status: status ?? "",
    author: author ?? null,
  } as {
    type: GithubContributionType;
    title: string;
    htmlUrl: string;
    number: number;
    status: GithubItemStatus;
    author: GithubUser | null;
  };
}

export function getContributionInfo(
  contribution: Pick<QueryContribution, "githubCodeReview" | "githubIssue" | "githubPullRequest" | "type">
) {
  const { type = "" } = contribution;

  switch (type) {
    case GithubContributionType.Issue: {
      const { githubIssue } = contribution;

      if (githubIssue) {
        const { title, htmlUrl, number, status, author } = githubIssue;

        return getDefaultInfo({ type, title, htmlUrl, number, status, author });
      }

      return getDefaultInfo();
    }

    case GithubContributionType.PullRequest: {
      const { githubPullRequest } = contribution;

      if (githubPullRequest) {
        const { title, htmlUrl, number, status, author, draft } = githubPullRequest;

        return getDefaultInfo({
          type,
          title,
          htmlUrl,
          number,
          status: draft ? GithubPullRequestDraft.Draft : status,
          author,
        });
      }

      return getDefaultInfo();
    }

    case GithubContributionType.CodeReview: {
      const { githubCodeReview } = contribution;

      if (githubCodeReview) {
        const { githubPullRequest, status, reviewer: author } = githubCodeReview;

        if (githubPullRequest) {
          const { title, htmlUrl, number } = githubPullRequest;

          return getDefaultInfo({ type, title, htmlUrl, number, status, author });
        }

        return getDefaultInfo({ type, status, author });
      }

      return getDefaultInfo();
    }

    default:
      return getDefaultInfo();
  }
}
