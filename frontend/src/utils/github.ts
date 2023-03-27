export const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)$/;
export const REGEX_VALID_GITHUB_ISSUE_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)$/;

export const parsePullRequestLink = (link?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoOwner, repoName, prNumber] = link?.match(REGEX_VALID_GITHUB_PULL_REQUEST_URL) || [];
  return { repoOwner, repoName, prNumber: parseInt(prNumber) };
};

export const parseIssueLink = (link?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoOwner, repoName, issueNumber] = link?.match(REGEX_VALID_GITHUB_ISSUE_URL) || [];
  return { repoOwner, repoName, issueNumber: parseInt(issueNumber) };
};
