import { UseGithubOrganizationsResponse } from "src/api/me/queries";

export const REGEX_VALID_GITHUB_PULL_REQUEST_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)$/;
export const REGEX_VALID_GITHUB_ISSUE_URL = /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)$/;

export const parsePullRequestLink = (link?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoOwner, repoName, issueNumber] = link?.match(REGEX_VALID_GITHUB_PULL_REQUEST_URL) || [];
  return { repoOwner, repoName, issueNumber: parseInt(issueNumber) };
};

export const parseIssueLink = (link?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoOwner, repoName, issueNumber] = link?.match(REGEX_VALID_GITHUB_ISSUE_URL) || [];
  return { repoOwner, repoName, issueNumber: parseInt(issueNumber) };
};

export const parsePullRequestOrIssueLink = (link?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, repoOwner, repoName, issueNumber] =
    link?.match(REGEX_VALID_GITHUB_PULL_REQUEST_URL) || link?.match(REGEX_VALID_GITHUB_ISSUE_URL) || [];
  return { repoOwner, repoName, issueNumber: parseInt(issueNumber) };
};

export const getGithubAppLinkUrl = (org: UseGithubOrganizationsResponse) => {
  if (org.installed && org.installationId) {
    return `https://github.com/organizations/${org.login}/settings/installations/${org.installationId}`;
  }

  return `${import.meta.env.VITE_GITHUB_INSTALLATION_URL}/permissions?target_id=${org.id}`;
};
