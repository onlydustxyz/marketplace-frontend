import { IssueApplicationStatus } from "core/domain/issue/models/issue.types";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

export type GithubIssueListItemResponse = components["schemas"]["GithubIssuePageItemResponse"];

export interface ListIssueInterface extends GithubIssueListItemResponse {
  getIssueApplicationStatus(): IssueApplicationStatus;
}
export class ListIssue extends mapApiToClass<GithubIssueListItemResponse>() implements ListIssueInterface {
  constructor(readonly props: GithubIssueListItemResponse) {
    super(props);
  }

  getIsAssigned(): boolean {
    return this.assignees.length > 0;
  }

  getIsApplied(): boolean {
    return !!this.currentUserApplication;
  }

  getIssueApplicationStatus(): IssueApplicationStatus {
    if (this.getIsAssigned()) {
      return "assigned";
    }

    if (this.getIsApplied()) {
      return "applied";
    }

    return "open";
  }
}
