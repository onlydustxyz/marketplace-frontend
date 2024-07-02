import { components, operations } from "src/__generated/api";

export type IssuePathParams = operations["getIssue"]["parameters"]["path"];

export type GetIssueResponse = components["schemas"]["GithubIssueResponse"];
