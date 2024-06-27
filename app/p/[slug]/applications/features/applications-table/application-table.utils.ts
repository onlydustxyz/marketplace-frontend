import { GetProjectIssuesPageResponse } from "api-client/resources/projects/types";

import { Contribution as ContributionT, GithubContributionType } from "src/types";

export function mapIssueToContribution(issue: GetProjectIssuesPageResponse["issues"][number]): ContributionT {
  return {
    id: String(issue.id),
    githubHtmlUrl: issue.htmlUrl,
    githubStatus: issue.status,
    githubTitle: issue.title,
    githubNumber: issue.number,
    repo: issue.repository,
    createdAt: issue.createdAt,
    lastUpdatedAt: issue.createdAt,

    // Should only show open issues
    status: "IN_PROGRESS",
    type: GithubContributionType.Issue,

    githubAuthor: issue.author,
    contributor: issue.author,
    project: { id: "", slug: "", name: "", shortDescription: "" },
    rewardIds: [],
    links: [],
  };
}
