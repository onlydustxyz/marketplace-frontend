import { components } from "src/__generated/api";

export function formatRewardItemToGithubPullRequest(item: components["schemas"]["RewardItemResponse"]) {
  return {
    id: item.id,
    number: item.number,
    title: item.title,
    createdAt: item.createdAt,
    completedAt: item.completedAt,
    status: item.status,
    htmlUrl: item.githubUrl,
    userCommitsCount: item.userCommitsCount,
    commitsCount: item.commitsCount,
    author: {
      id: item.githubAuthorId,
      login: item.authorLogin,
      avatarUrl: item.authorAvatarUrl,
      htmlUrl: item.authorGithubUrl,
      user: null,
    },
  };
}

export function formatRewardItemToGithubIssue(item: components["schemas"]["RewardItemResponse"]) {
  return {
    id: item.id,
    createdAt: item.createdAt,
    completedAt: item.completedAt,
    number: item.number,
    title: item.title,
    htmlUrl: item.githubUrl,
    status: item.status,
    commentsCount: item.commentsCount,
  };
}

export function formatRewardItemToGithubCodeReview(item: components["schemas"]["RewardItemResponse"]) {
  return {
    id: item.id,
    githubPullRequest: {
      number: item.number,
      title: item.title,
      htmlUrl: item.githubUrl,
      createdAt: item.createdAt,
      repoId: null,
      status: null,
      closedAt: null,
      mergedAt: null,
      id: null,
      author: {
        id: null,
        htmlUrl: "",
        avatarUrl: "",
        login: "",
        user: null,
      },
    },
    status: item.status,
    submittedAt: item.createdAt,
    completedAt: item.completedAt,
  };
}
