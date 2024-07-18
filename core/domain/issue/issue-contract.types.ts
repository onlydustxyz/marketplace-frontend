import { components } from "src/__generated/api";

/* ------------------------------- GithubIssuePageResponse ------------------------------ */
export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

/* ------------------------------- GithubIssueResponse ------------------------------ */

// TODO Remove this when backend as aligned types
type _GithubIssueResponse = components["schemas"]["GithubIssueResponse"];
export interface GithubIssueResponse extends _GithubIssueResponse {
  repo: GithubIssueListItemResponse["repo"];
  assignees: GithubIssueListItemResponse["assignees"];
}
