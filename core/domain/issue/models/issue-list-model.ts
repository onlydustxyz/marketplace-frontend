import { IssueApplicationStatus } from "core/domain/issue/models/issue.types";
import { UserInterface } from "core/domain/user/models/user-model";

import { components } from "src/__generated/api";

export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface IssueListInterface extends GithubIssueListItemResponse {
  getApplicationStatus(pendingApplications: UserInterface["pendingApplications"]): IssueApplicationStatus;
  isAssigned(): boolean;
  isUserApplied(pendingApplications: UserInterface["pendingApplications"]): boolean;
  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0];
  getCurrentUserApplicationId(pendingApplications: UserInterface["pendingApplications"]): string;
}
export class IssueList implements IssueListInterface {
  applicants!: GithubIssueListItemResponse["applicants"];
  assignees!: GithubIssueListItemResponse["assignees"];
  author!: GithubIssueListItemResponse["author"];
  body!: GithubIssueListItemResponse["body"];
  closedAt!: GithubIssueListItemResponse["closedAt"];
  createdAt!: GithubIssueListItemResponse["createdAt"];
  htmlUrl!: GithubIssueListItemResponse["htmlUrl"];
  id!: GithubIssueListItemResponse["id"];
  labels!: GithubIssueListItemResponse["labels"];
  number!: GithubIssueListItemResponse["number"];
  repo!: GithubIssueListItemResponse["repo"];
  status!: GithubIssueListItemResponse["status"];
  title!: GithubIssueListItemResponse["title"];
  commentCount!: GithubIssueListItemResponse["commentCount"];

  constructor(props: GithubIssueListItemResponse) {
    Object.assign(this, props);
  }

  isAssigned(): boolean {
    return this.assignees.length > 0;
  }

  isUserApplied(pendingApplications: UserInterface["pendingApplications"]): boolean {
    return pendingApplications?.some(application => application.issue?.id === this.id) ?? false;
  }

  getCurrentUserApplicationId(pendingApplications: UserInterface["pendingApplications"]): string {
    return pendingApplications?.find(application => application.issue?.id === this.id)?.id ?? "";
  }

  getApplicationStatus(pendingApplications: UserInterface["pendingApplications"]): IssueApplicationStatus {
    if (this.isAssigned()) {
      return "assigned";
    }

    if (this.isUserApplied(pendingApplications)) {
      return "applied";
    }

    return "open";
  }

  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0] {
    return this.assignees[0];
  }
}
