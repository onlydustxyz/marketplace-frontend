import { Contribution as ContributionT, GithubContributionType } from "src/types";

type Issue = {
  id: number;
  number: number;
  title: string;
  createdAt: string;
  htmlUrl: string;
  status: "OPEN" | "COMPLETED" | "CANCELLED";
  project?: {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    logoUrl?: string;
    visibility: "PUBLIC" | "PRIVATE";
    languages: { id: string; slug: string; name: string; logoUrl: string; bannerUrl?: string }[];
  };
  repo: {
    id: number;
    owner: string;
    name: string;
    description?: string;
    htmlUrl: string;
  };
  author: { githubUserId: number; login: string; avatarUrl: string; isRegistered: boolean };
};

export function mapIssueToContribution(issue: Issue): ContributionT {
  return {
    id: String(issue.id),
    githubHtmlUrl: issue.htmlUrl,
    githubStatus: issue.status,
    githubTitle: issue.title,
    githubNumber: issue.number,
    repo: issue.repo,
    createdAt: issue.createdAt,
    lastUpdatedAt: issue.createdAt,

    // Should only show open issues
    status: "IN_PROGRESS",
    type: GithubContributionType.Issue,

    githubAuthor: issue.author,
    contributor: issue.author,
    project: issue.project ?? {
      id: "",
      slug: "",
      name: "",
      shortDescription: "",
      visibility: "PRIVATE",
      languages: [
        {
          id: "",
          slug: "",
          name: "",
          logoUrl: "",
        },
      ],
    },
    rewardIds: [],
    links: [],
  };
}
