import { GithubIssueListItemResponse, IssueList } from "core/domain/issue/models/issue-list-model";
import { extendClasses } from "core/infrastructure/marketplace-api-client-adapter/mappers/extend-classes";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

// TODO Remove this when backend as aligned types
type _GithubIssueResponse = components["schemas"]["GithubIssueResponse"];
interface GithubIssueResponse extends _GithubIssueResponse {
  repo: GithubIssueListItemResponse["repo"];
  assignees: GithubIssueListItemResponse["assignees"];
}

export interface IssueInterface extends GithubIssueResponse {}
export class Issue extends mapApiToClass<GithubIssueResponse>() implements IssueInterface {
  constructor(protected props: GithubIssueResponse) {
    super(props);
  }
}

extendClasses(Issue, [IssueList]);
