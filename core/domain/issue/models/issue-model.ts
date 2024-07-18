import { GithubIssueResponse } from "core/domain/issue/issue-contract.types";
import { ListIssue, ListIssueInterface } from "core/domain/issue/models/list-issue-model";
import { extendMultipleClasses } from "core/infrastructure/marketplace-api-client-adapter/mappers/extend-multiple-classes";
import { mapApiToClass } from "core/infrastructure/marketplace-api-client-adapter/mappers/map-api-to-class";

export interface IssueInterface extends ListIssueInterface, GithubIssueResponse {}

const ExtendedWithListIssue = extendMultipleClasses(mapApiToClass<GithubIssueResponse>(), ListIssue);

export class Issue extends ExtendedWithListIssue implements IssueInterface {
  constructor(readonly props: GithubIssueResponse) {
    super(props);
  }
}
