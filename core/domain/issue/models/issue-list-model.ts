import { IssueApplicationStatus } from "core/domain/issue/models/issue.types";

import { components } from "src/__generated/api";

export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface IssueListInterface extends GithubIssueListItemResponse {
  getApplicationStatus(githubUserId: number): IssueApplicationStatus;
  isAssigned(): boolean;
  isUserApplied(githubUserId: number): boolean;
  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0];
  getCurrentUserApplicationId(githubUserId: number): string;
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

  constructor(props: GithubIssueListItemResponse) {
    Object.assign(this, props);
  }

  isAssigned(): boolean {
    return this.assignees.length > 0;
  }

  isUserApplied(githubUserId: number): boolean {
    return this.applicants.some(applicant => applicant.githubUserId === githubUserId);
  }

  getCurrentUserApplicationId(githubUserId: number): string {
    return this.applicants.find(applicant => applicant.githubUserId === githubUserId)?.applicationId ?? "";
  }

  getApplicationStatus(githubUserId: number): IssueApplicationStatus {
    if (this.isAssigned()) {
      return "assigned";
    }

    if (this.isUserApplied(githubUserId)) {
      return "applied";
    }

    return "open";
  }

  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0] {
    return this.assignees[0];
  }
}
