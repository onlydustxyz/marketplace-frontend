import { IssueApplicationStatus } from "core/domain/issue/models/issue.types";

import { components } from "src/__generated/api";

export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface IssueListInterface extends GithubIssueListItemResponse {
  getApplicationStatus(): IssueApplicationStatus;
  isAssigned(): boolean;
  isApplied(): boolean;
  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0];
}
export class IssueList implements IssueListInterface {
  applicants!: GithubIssueListItemResponse["applicants"];
  assignees!: GithubIssueListItemResponse["assignees"];
  author!: GithubIssueListItemResponse["author"];
  body!: GithubIssueListItemResponse["body"];
  closedAt!: GithubIssueListItemResponse["closedAt"];
  createdAt!: GithubIssueListItemResponse["createdAt"];
  currentUserApplication!: GithubIssueListItemResponse["currentUserApplication"];
  htmlUrl!: GithubIssueListItemResponse["htmlUrl"];
  id!: GithubIssueListItemResponse["id"];
  labels!: GithubIssueListItemResponse["labels"];
  number!: GithubIssueListItemResponse["number"];
  repo!: GithubIssueListItemResponse["repo"];
  status!: GithubIssueListItemResponse["status"];
  title!: GithubIssueListItemResponse["title"];

  constructor(props: GithubIssueListItemResponse) {
    Object.assign(this, props);
  }

  isAssigned(): boolean {
    return this.assignees.length > 0;
  }

  isApplied(): boolean {
    return !!this.currentUserApplication;
  }

  getApplicationStatus(): IssueApplicationStatus {
    if (this.isAssigned()) {
      return "assigned";
    }

    if (this.isApplied()) {
      return "applied";
    }

    return "open";
  }

  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0] {
    return this.assignees[0];
  }
}
