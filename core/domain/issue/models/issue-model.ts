import { GithubIssueListItemResponse, ListIssue, ListIssueInterface } from "core/domain/issue/models/list-issue-model";
import { extendMultipleClasses } from "core/infrastructure/marketplace-api-client-adapter/mappers/extend-multiple-classes";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

import { components } from "src/__generated/api";

// TODO Remove this when backend as aligned types
type _GithubIssueResponse = components["schemas"]["GithubIssueResponse"];
interface GithubIssueResponse extends _GithubIssueResponse {
  repo: GithubIssueListItemResponse["repo"];
  assignees: GithubIssueListItemResponse["assignees"];
}

export interface IssueInterface extends ListIssueInterface, GithubIssueResponse {}

const ExtendedWithListIssue = extendMultipleClasses(mapApiToClass<GithubIssueResponse>(), ListIssue);

export class Issue extends ExtendedWithListIssue implements IssueInterface {
  constructor(readonly props: GithubIssueResponse) {
    super(props);
  }
}
