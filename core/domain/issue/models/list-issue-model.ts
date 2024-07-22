import { IssueApplicationStatus } from "core/domain/issue/models/issue.types";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface ListIssueInterface extends GithubIssueListItemResponse {
  getApplicationStatus(): IssueApplicationStatus;
  isAssigned(): boolean;
  isApplied(): boolean;
  getFirstAssignee(): GithubIssueListItemResponse["assignees"][0];
}
export class ListIssue extends mapApiToClass<GithubIssueListItemResponse>() implements ListIssueInterface {
  constructor(protected readonly props: GithubIssueListItemResponse) {
    super(props);
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
