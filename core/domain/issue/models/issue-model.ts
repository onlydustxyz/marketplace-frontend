import { GithubIssueListItemResponse, IssueList, IssueListInterface } from "core/domain/issue/models/issue-list-model";

import { components } from "src/__generated/api";

// TODO Remove this when backend as aligned types
type _GithubIssueResponse = components["schemas"]["GithubIssueResponse"];

interface GithubIssueResponse extends _GithubIssueResponse {
  repo: GithubIssueListItemResponse["repo"];
  assignees: GithubIssueListItemResponse["assignees"];
}

export interface IssueInterface extends IssueListInterface, GithubIssueResponse {}

export class Issue extends IssueList implements IssueInterface {
  commentCount!: GithubIssueResponse["commentCount"];
  githubAppInstallationPermissionsUpdateUrl!: GithubIssueResponse["githubAppInstallationPermissionsUpdateUrl"];
  githubAppInstallationStatus!: GithubIssueResponse["githubAppInstallationStatus"];
  languages!: GithubIssueResponse["languages"];

  constructor(props: GithubIssueResponse) {
    super(props);
    Object.assign(this, props);
  }
}
