import { GithubIssueListItemResponse } from "core/domain/issue/issue-contract.types";
import { ApplicationStatus } from "core/domain/issue/models/issue.type";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

export interface ListIssueInterface extends GithubIssueListItemResponse {
  getApplicationStatus(): ApplicationStatus;
}
export class ListIssue extends mapApiToClass<GithubIssueListItemResponse>() implements ListIssueInterface {
  constructor(readonly props: GithubIssueListItemResponse) {
    super(props);
  }

  getApplicationStatus(): ApplicationStatus {
    if (this.assignees.length > 0) {
      return "assigned";
    }

    if (this.currentUserApplication) {
      return "applied";
    }

    return "open";
  }
}
