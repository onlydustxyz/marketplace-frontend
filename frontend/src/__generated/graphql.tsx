import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Amount: any;
  DateTimeUtc: any;
  /** A `0x` prefixed hexadecimal string representing 20 bytes of data */
  EthereumAddress: any;
  /** A ENS backed domain name */
  EthereumName: any;
  Iban: any;
  Url: any;
  /** Uuid */
  Uuid: any;
  allocated_time: any;
  bigint: any;
  bytea: any;
  citext: any;
  contact_channel: any;
  contribution_status: any;
  contribution_type: any;
  float8: any;
  github_ci_checks: any;
  github_code_review_outcome: any;
  jsonb: any;
  numeric: any;
  profile_cover: any;
  project_visibility: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

export enum AllocatedTime {
  LessThanOneDay = 'LESS_THAN_ONE_DAY',
  MoreThanThreeDays = 'MORE_THAN_THREE_DAYS',
  None = 'NONE',
  OneToThreeDays = 'ONE_TO_THREE_DAYS'
}

/** Boolean expression to compare columns of type "allocated_time". All fields are combined with logical 'AND'. */
export type AllocatedTimeComparisonExp = {
  _eq: InputMaybe<Scalars['allocated_time']>;
  _gt: InputMaybe<Scalars['allocated_time']>;
  _gte: InputMaybe<Scalars['allocated_time']>;
  _in: InputMaybe<Array<Scalars['allocated_time']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['allocated_time']>;
  _lte: InputMaybe<Scalars['allocated_time']>;
  _neq: InputMaybe<Scalars['allocated_time']>;
  _nin: InputMaybe<Array<Scalars['allocated_time']>>;
};

/** columns and relationships of "api.closed_by_pull_requests" */
export type ApiClosedByPullRequests = {
  __typename?: 'ApiClosedByPullRequests';
  githubIssueId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  githubPullRequest: Maybe<GithubPullRequests>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsAggregate = {
  __typename?: 'ApiClosedByPullRequestsAggregate';
  aggregate: Maybe<ApiClosedByPullRequestsAggregateFields>;
  nodes: Array<ApiClosedByPullRequests>;
};

/** aggregate fields of "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsAggregateFields = {
  __typename?: 'ApiClosedByPullRequestsAggregateFields';
  avg: Maybe<ApiClosedByPullRequestsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ApiClosedByPullRequestsMaxFields>;
  min: Maybe<ApiClosedByPullRequestsMinFields>;
  stddev: Maybe<ApiClosedByPullRequestsStddevFields>;
  stddevPop: Maybe<ApiClosedByPullRequestsStddev_PopFields>;
  stddevSamp: Maybe<ApiClosedByPullRequestsStddev_SampFields>;
  sum: Maybe<ApiClosedByPullRequestsSumFields>;
  varPop: Maybe<ApiClosedByPullRequestsVar_PopFields>;
  varSamp: Maybe<ApiClosedByPullRequestsVar_SampFields>;
  variance: Maybe<ApiClosedByPullRequestsVarianceFields>;
};


/** aggregate fields of "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsAggregateOrderBy = {
  avg: InputMaybe<Api_Closed_By_Pull_Requests_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Api_Closed_By_Pull_Requests_Max_Order_By>;
  min: InputMaybe<Api_Closed_By_Pull_Requests_Min_Order_By>;
  stddev: InputMaybe<Api_Closed_By_Pull_Requests_Stddev_Order_By>;
  stddev_pop: InputMaybe<Api_Closed_By_Pull_Requests_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Api_Closed_By_Pull_Requests_Stddev_Samp_Order_By>;
  sum: InputMaybe<Api_Closed_By_Pull_Requests_Sum_Order_By>;
  var_pop: InputMaybe<Api_Closed_By_Pull_Requests_Var_Pop_Order_By>;
  var_samp: InputMaybe<Api_Closed_By_Pull_Requests_Var_Samp_Order_By>;
  variance: InputMaybe<Api_Closed_By_Pull_Requests_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsArrRelInsertInput = {
  data: Array<ApiClosedByPullRequestsInsertInput>;
};

/** aggregate avg on columns */
export type ApiClosedByPullRequestsAvgFields = {
  __typename?: 'ApiClosedByPullRequestsAvgFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.closed_by_pull_requests". All fields are combined with a logical 'AND'. */
export type ApiClosedByPullRequestsBoolExp = {
  _and: InputMaybe<Array<ApiClosedByPullRequestsBoolExp>>;
  _not: InputMaybe<ApiClosedByPullRequestsBoolExp>;
  _or: InputMaybe<Array<ApiClosedByPullRequestsBoolExp>>;
  githubIssueId: InputMaybe<BigintComparisonExp>;
  githubPullRequest: InputMaybe<GithubPullRequestsBoolExp>;
  githubPullRequestId: InputMaybe<BigintComparisonExp>;
};

/** input type for incrementing numeric columns in table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsIncInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsInsertInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequest: InputMaybe<GithubPullRequestsObjRelInsertInput>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type ApiClosedByPullRequestsMaxFields = {
  __typename?: 'ApiClosedByPullRequestsMaxFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type ApiClosedByPullRequestsMinFields = {
  __typename?: 'ApiClosedByPullRequestsMinFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsMutationResponse = {
  __typename?: 'ApiClosedByPullRequestsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ApiClosedByPullRequests>;
};

/** Ordering options when selecting data from "api.closed_by_pull_requests". */
export type ApiClosedByPullRequestsOrderBy = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequest: InputMaybe<GithubPullRequestsOrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** select columns of table "api.closed_by_pull_requests" */
export enum ApiClosedByPullRequestsSelectColumn {
  /** column name */
  GithubIssueId = 'githubIssueId',
  /** column name */
  GithubPullRequestId = 'githubPullRequestId'
}

/** input type for updating data in table "api.closed_by_pull_requests" */
export type ApiClosedByPullRequestsSetInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type ApiClosedByPullRequestsStddevFields = {
  __typename?: 'ApiClosedByPullRequestsStddevFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ApiClosedByPullRequestsStddev_PopFields = {
  __typename?: 'ApiClosedByPullRequestsStddev_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ApiClosedByPullRequestsStddev_SampFields = {
  __typename?: 'ApiClosedByPullRequestsStddev_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ApiClosedByPullRequestsSumFields = {
  __typename?: 'ApiClosedByPullRequestsSumFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

export type ApiClosedByPullRequestsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ApiClosedByPullRequestsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ApiClosedByPullRequestsSetInput>;
  where: ApiClosedByPullRequestsBoolExp;
};

/** aggregate var_pop on columns */
export type ApiClosedByPullRequestsVar_PopFields = {
  __typename?: 'ApiClosedByPullRequestsVar_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ApiClosedByPullRequestsVar_SampFields = {
  __typename?: 'ApiClosedByPullRequestsVar_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ApiClosedByPullRequestsVarianceFields = {
  __typename?: 'ApiClosedByPullRequestsVarianceFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "api.closing_issues" */
export type ApiClosingIssues = {
  __typename?: 'ApiClosingIssues';
  /** An object relationship */
  githubIssue: Maybe<GithubIssues>;
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "api.closing_issues" */
export type ApiClosingIssuesAggregate = {
  __typename?: 'ApiClosingIssuesAggregate';
  aggregate: Maybe<ApiClosingIssuesAggregateFields>;
  nodes: Array<ApiClosingIssues>;
};

/** aggregate fields of "api.closing_issues" */
export type ApiClosingIssuesAggregateFields = {
  __typename?: 'ApiClosingIssuesAggregateFields';
  avg: Maybe<ApiClosingIssuesAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ApiClosingIssuesMaxFields>;
  min: Maybe<ApiClosingIssuesMinFields>;
  stddev: Maybe<ApiClosingIssuesStddevFields>;
  stddevPop: Maybe<ApiClosingIssuesStddev_PopFields>;
  stddevSamp: Maybe<ApiClosingIssuesStddev_SampFields>;
  sum: Maybe<ApiClosingIssuesSumFields>;
  varPop: Maybe<ApiClosingIssuesVar_PopFields>;
  varSamp: Maybe<ApiClosingIssuesVar_SampFields>;
  variance: Maybe<ApiClosingIssuesVarianceFields>;
};


/** aggregate fields of "api.closing_issues" */
export type ApiClosingIssuesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.closing_issues" */
export type ApiClosingIssuesAggregateOrderBy = {
  avg: InputMaybe<Api_Closing_Issues_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Api_Closing_Issues_Max_Order_By>;
  min: InputMaybe<Api_Closing_Issues_Min_Order_By>;
  stddev: InputMaybe<Api_Closing_Issues_Stddev_Order_By>;
  stddev_pop: InputMaybe<Api_Closing_Issues_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Api_Closing_Issues_Stddev_Samp_Order_By>;
  sum: InputMaybe<Api_Closing_Issues_Sum_Order_By>;
  var_pop: InputMaybe<Api_Closing_Issues_Var_Pop_Order_By>;
  var_samp: InputMaybe<Api_Closing_Issues_Var_Samp_Order_By>;
  variance: InputMaybe<Api_Closing_Issues_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.closing_issues" */
export type ApiClosingIssuesArrRelInsertInput = {
  data: Array<ApiClosingIssuesInsertInput>;
};

/** aggregate avg on columns */
export type ApiClosingIssuesAvgFields = {
  __typename?: 'ApiClosingIssuesAvgFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.closing_issues". All fields are combined with a logical 'AND'. */
export type ApiClosingIssuesBoolExp = {
  _and: InputMaybe<Array<ApiClosingIssuesBoolExp>>;
  _not: InputMaybe<ApiClosingIssuesBoolExp>;
  _or: InputMaybe<Array<ApiClosingIssuesBoolExp>>;
  githubIssue: InputMaybe<GithubIssuesBoolExp>;
  githubIssueId: InputMaybe<BigintComparisonExp>;
  githubPullRequestId: InputMaybe<BigintComparisonExp>;
};

/** input type for incrementing numeric columns in table "api.closing_issues" */
export type ApiClosingIssuesIncInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.closing_issues" */
export type ApiClosingIssuesInsertInput = {
  githubIssue: InputMaybe<GithubIssuesObjRelInsertInput>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type ApiClosingIssuesMaxFields = {
  __typename?: 'ApiClosingIssuesMaxFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type ApiClosingIssuesMinFields = {
  __typename?: 'ApiClosingIssuesMinFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "api.closing_issues" */
export type ApiClosingIssuesMutationResponse = {
  __typename?: 'ApiClosingIssuesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ApiClosingIssues>;
};

/** Ordering options when selecting data from "api.closing_issues". */
export type ApiClosingIssuesOrderBy = {
  githubIssue: InputMaybe<GithubIssuesOrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** select columns of table "api.closing_issues" */
export enum ApiClosingIssuesSelectColumn {
  /** column name */
  GithubIssueId = 'githubIssueId',
  /** column name */
  GithubPullRequestId = 'githubPullRequestId'
}

/** input type for updating data in table "api.closing_issues" */
export type ApiClosingIssuesSetInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type ApiClosingIssuesStddevFields = {
  __typename?: 'ApiClosingIssuesStddevFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ApiClosingIssuesStddev_PopFields = {
  __typename?: 'ApiClosingIssuesStddev_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ApiClosingIssuesStddev_SampFields = {
  __typename?: 'ApiClosingIssuesStddev_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ApiClosingIssuesSumFields = {
  __typename?: 'ApiClosingIssuesSumFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
};

export type ApiClosingIssuesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ApiClosingIssuesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ApiClosingIssuesSetInput>;
  where: ApiClosingIssuesBoolExp;
};

/** aggregate var_pop on columns */
export type ApiClosingIssuesVar_PopFields = {
  __typename?: 'ApiClosingIssuesVar_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ApiClosingIssuesVar_SampFields = {
  __typename?: 'ApiClosingIssuesVar_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ApiClosingIssuesVarianceFields = {
  __typename?: 'ApiClosingIssuesVarianceFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "api.completed_contributions" */
export type ApiCompletedContributions = {
  __typename?: 'ApiCompletedContributions';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  /** An array relationship */
  rewardItems: Array<WorkItems>;
  /** An aggregate relationship */
  rewardItemsAggregate: WorkItemsAggregate;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['contribution_type']>;
};


/** columns and relationships of "api.completed_contributions" */
export type ApiCompletedContributionsRewardItemsArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


/** columns and relationships of "api.completed_contributions" */
export type ApiCompletedContributionsRewardItemsAggregateArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** aggregated selection of "api.completed_contributions" */
export type ApiCompletedContributionsAggregate = {
  __typename?: 'ApiCompletedContributionsAggregate';
  aggregate: Maybe<ApiCompletedContributionsAggregateFields>;
  nodes: Array<ApiCompletedContributions>;
};

/** aggregate fields of "api.completed_contributions" */
export type ApiCompletedContributionsAggregateFields = {
  __typename?: 'ApiCompletedContributionsAggregateFields';
  avg: Maybe<ApiCompletedContributionsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ApiCompletedContributionsMaxFields>;
  min: Maybe<ApiCompletedContributionsMinFields>;
  stddev: Maybe<ApiCompletedContributionsStddevFields>;
  stddevPop: Maybe<ApiCompletedContributionsStddev_PopFields>;
  stddevSamp: Maybe<ApiCompletedContributionsStddev_SampFields>;
  sum: Maybe<ApiCompletedContributionsSumFields>;
  varPop: Maybe<ApiCompletedContributionsVar_PopFields>;
  varSamp: Maybe<ApiCompletedContributionsVar_SampFields>;
  variance: Maybe<ApiCompletedContributionsVarianceFields>;
};


/** aggregate fields of "api.completed_contributions" */
export type ApiCompletedContributionsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.completed_contributions" */
export type ApiCompletedContributionsAggregateOrderBy = {
  avg: InputMaybe<Api_Completed_Contributions_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Api_Completed_Contributions_Max_Order_By>;
  min: InputMaybe<Api_Completed_Contributions_Min_Order_By>;
  stddev: InputMaybe<Api_Completed_Contributions_Stddev_Order_By>;
  stddev_pop: InputMaybe<Api_Completed_Contributions_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Api_Completed_Contributions_Stddev_Samp_Order_By>;
  sum: InputMaybe<Api_Completed_Contributions_Sum_Order_By>;
  var_pop: InputMaybe<Api_Completed_Contributions_Var_Pop_Order_By>;
  var_samp: InputMaybe<Api_Completed_Contributions_Var_Samp_Order_By>;
  variance: InputMaybe<Api_Completed_Contributions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.completed_contributions" */
export type ApiCompletedContributionsArrRelInsertInput = {
  data: Array<ApiCompletedContributionsInsertInput>;
};

/** aggregate avg on columns */
export type ApiCompletedContributionsAvgFields = {
  __typename?: 'ApiCompletedContributionsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.completed_contributions". All fields are combined with a logical 'AND'. */
export type ApiCompletedContributionsBoolExp = {
  _and: InputMaybe<Array<ApiCompletedContributionsBoolExp>>;
  _not: InputMaybe<ApiCompletedContributionsBoolExp>;
  _or: InputMaybe<Array<ApiCompletedContributionsBoolExp>>;
  closedAt: InputMaybe<TimestampComparisonExp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  detailsId: InputMaybe<StringComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  rewardItems: InputMaybe<WorkItemsBoolExp>;
  rewardItems_aggregate: InputMaybe<WorkItems_Aggregate_Bool_Exp>;
  status: InputMaybe<ContributionStatusComparisonExp>;
  type: InputMaybe<ContributionTypeComparisonExp>;
};

/** input type for inserting data into table "api.completed_contributions" */
export type ApiCompletedContributionsInsertInput = {
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  detailsId: InputMaybe<Scalars['String']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
  rewardItems: InputMaybe<WorkItemsArrRelInsertInput>;
  status: InputMaybe<Scalars['contribution_status']>;
  type: InputMaybe<Scalars['contribution_type']>;
};

/** aggregate max on columns */
export type ApiCompletedContributionsMaxFields = {
  __typename?: 'ApiCompletedContributionsMaxFields';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['contribution_type']>;
};

/** aggregate min on columns */
export type ApiCompletedContributionsMinFields = {
  __typename?: 'ApiCompletedContributionsMinFields';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['contribution_type']>;
};

/** Ordering options when selecting data from "api.completed_contributions". */
export type ApiCompletedContributionsOrderBy = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  rewardItemsAggregate: InputMaybe<WorkItemsAggregateOrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** select columns of table "api.completed_contributions" */
export enum ApiCompletedContributionsSelectColumn {
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DetailsId = 'detailsId',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type'
}

/** aggregate stddev on columns */
export type ApiCompletedContributionsStddevFields = {
  __typename?: 'ApiCompletedContributionsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ApiCompletedContributionsStddev_PopFields = {
  __typename?: 'ApiCompletedContributionsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ApiCompletedContributionsStddev_SampFields = {
  __typename?: 'ApiCompletedContributionsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ApiCompletedContributionsSumFields = {
  __typename?: 'ApiCompletedContributionsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type ApiCompletedContributionsVar_PopFields = {
  __typename?: 'ApiCompletedContributionsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ApiCompletedContributionsVar_SampFields = {
  __typename?: 'ApiCompletedContributionsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ApiCompletedContributionsVarianceFields = {
  __typename?: 'ApiCompletedContributionsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "applications" */
export type Applications = {
  __typename?: 'Applications';
  applicantId: Scalars['uuid'];
  id: Scalars['uuid'];
  projectId: Scalars['uuid'];
  receivedAt: Scalars['timestamp'];
};

/** aggregated selection of "applications" */
export type ApplicationsAggregate = {
  __typename?: 'ApplicationsAggregate';
  aggregate: Maybe<ApplicationsAggregateFields>;
  nodes: Array<Applications>;
};

/** aggregate fields of "applications" */
export type ApplicationsAggregateFields = {
  __typename?: 'ApplicationsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<ApplicationsMaxFields>;
  min: Maybe<ApplicationsMinFields>;
};


/** aggregate fields of "applications" */
export type ApplicationsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ApplicationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "applications" */
export type ApplicationsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Applications_Max_Order_By>;
  min: InputMaybe<Applications_Min_Order_By>;
};

/** input type for inserting array relation for remote table "applications" */
export type ApplicationsArrRelInsertInput = {
  data: Array<ApplicationsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ApplicationsOnConflict>;
};

/** Boolean expression to filter rows from the table "applications". All fields are combined with a logical 'AND'. */
export type ApplicationsBoolExp = {
  _and: InputMaybe<Array<ApplicationsBoolExp>>;
  _not: InputMaybe<ApplicationsBoolExp>;
  _or: InputMaybe<Array<ApplicationsBoolExp>>;
  applicantId: InputMaybe<UuidComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  receivedAt: InputMaybe<TimestampComparisonExp>;
};

/** unique or primary key constraints on table "applications" */
export enum ApplicationsConstraint {
  /** unique or primary key constraint on columns "id" */
  ApplicationsPkey = 'applications_pkey'
}

/** input type for inserting data into table "applications" */
export type ApplicationsInsertInput = {
  applicantId: InputMaybe<Scalars['uuid']>;
  id: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
  receivedAt: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type ApplicationsMaxFields = {
  __typename?: 'ApplicationsMaxFields';
  applicantId: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
  receivedAt: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type ApplicationsMinFields = {
  __typename?: 'ApplicationsMinFields';
  applicantId: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
  receivedAt: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "applications" */
export type ApplicationsMutationResponse = {
  __typename?: 'ApplicationsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Applications>;
};

/** on_conflict condition type for table "applications" */
export type ApplicationsOnConflict = {
  constraint: ApplicationsConstraint;
  update_columns: Array<ApplicationsUpdateColumn>;
  where: InputMaybe<ApplicationsBoolExp>;
};

/** Ordering options when selecting data from "applications". */
export type ApplicationsOrderBy = {
  applicantId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  receivedAt: InputMaybe<OrderBy>;
};

/** primary key columns input for table: applications */
export type ApplicationsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "applications" */
export enum ApplicationsSelectColumn {
  /** column name */
  ApplicantId = 'applicantId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  ReceivedAt = 'receivedAt'
}

/** input type for updating data in table "applications" */
export type ApplicationsSetInput = {
  applicantId: InputMaybe<Scalars['uuid']>;
  id: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
  receivedAt: InputMaybe<Scalars['timestamp']>;
};

/** update columns of table "applications" */
export enum ApplicationsUpdateColumn {
  /** column name */
  ApplicantId = 'applicantId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  ReceivedAt = 'receivedAt'
}

export type ApplicationsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ApplicationsSetInput>;
  where: ApplicationsBoolExp;
};

/** columns and relationships of "auth.user_github_provider" */
export type AuthUserGithubProvider = {
  __typename?: 'AuthUserGithubProvider';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "auth.user_github_provider" */
export type AuthUserGithubProviderAggregate = {
  __typename?: 'AuthUserGithubProviderAggregate';
  aggregate: Maybe<AuthUserGithubProviderAggregateFields>;
  nodes: Array<AuthUserGithubProvider>;
};

/** aggregate fields of "auth.user_github_provider" */
export type AuthUserGithubProviderAggregateFields = {
  __typename?: 'AuthUserGithubProviderAggregateFields';
  avg: Maybe<AuthUserGithubProviderAvgFields>;
  count: Scalars['Int'];
  max: Maybe<AuthUserGithubProviderMaxFields>;
  min: Maybe<AuthUserGithubProviderMinFields>;
  stddev: Maybe<AuthUserGithubProviderStddevFields>;
  stddevPop: Maybe<AuthUserGithubProviderStddev_PopFields>;
  stddevSamp: Maybe<AuthUserGithubProviderStddev_SampFields>;
  sum: Maybe<AuthUserGithubProviderSumFields>;
  varPop: Maybe<AuthUserGithubProviderVar_PopFields>;
  varSamp: Maybe<AuthUserGithubProviderVar_SampFields>;
  variance: Maybe<AuthUserGithubProviderVarianceFields>;
};


/** aggregate fields of "auth.user_github_provider" */
export type AuthUserGithubProviderAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthUserGithubProviderSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type AuthUserGithubProviderAvgFields = {
  __typename?: 'AuthUserGithubProviderAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "auth.user_github_provider". All fields are combined with a logical 'AND'. */
export type AuthUserGithubProviderBoolExp = {
  _and: InputMaybe<Array<AuthUserGithubProviderBoolExp>>;
  _not: InputMaybe<AuthUserGithubProviderBoolExp>;
  _or: InputMaybe<Array<AuthUserGithubProviderBoolExp>>;
  accessToken: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  providerId: InputMaybe<StringComparisonExp>;
  providerUserId: InputMaybe<StringComparisonExp>;
  refreshToken: InputMaybe<StringComparisonExp>;
  updatedAt: InputMaybe<TimestamptzComparisonExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** input type for incrementing numeric columns in table "auth.user_github_provider" */
export type AuthUserGithubProviderIncInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "auth.user_github_provider" */
export type AuthUserGithubProviderInsertInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserGithubProviderMaxFields = {
  __typename?: 'AuthUserGithubProviderMaxFields';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthUserGithubProviderMinFields = {
  __typename?: 'AuthUserGithubProviderMinFields';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.user_github_provider" */
export type AuthUserGithubProviderMutationResponse = {
  __typename?: 'AuthUserGithubProviderMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserGithubProvider>;
};

/** input type for inserting object relation for remote table "auth.user_github_provider" */
export type AuthUserGithubProviderObjRelInsertInput = {
  data: AuthUserGithubProviderInsertInput;
};

/** Ordering options when selecting data from "auth.user_github_provider". */
export type AuthUserGithubProviderOrderBy = {
  accessToken: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  providerId: InputMaybe<OrderBy>;
  providerUserId: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** select columns of table "auth.user_github_provider" */
export enum AuthUserGithubProviderSelectColumn {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_github_provider" */
export type AuthUserGithubProviderSetInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type AuthUserGithubProviderStddevFields = {
  __typename?: 'AuthUserGithubProviderStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type AuthUserGithubProviderStddev_PopFields = {
  __typename?: 'AuthUserGithubProviderStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type AuthUserGithubProviderStddev_SampFields = {
  __typename?: 'AuthUserGithubProviderStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type AuthUserGithubProviderSumFields = {
  __typename?: 'AuthUserGithubProviderSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

export type AuthUserGithubProviderUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<AuthUserGithubProviderIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthUserGithubProviderSetInput>;
  where: AuthUserGithubProviderBoolExp;
};

/** aggregate var_pop on columns */
export type AuthUserGithubProviderVar_PopFields = {
  __typename?: 'AuthUserGithubProviderVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type AuthUserGithubProviderVar_SampFields = {
  __typename?: 'AuthUserGithubProviderVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type AuthUserGithubProviderVarianceFields = {
  __typename?: 'AuthUserGithubProviderVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

export type BankAddress = {
  BIC: Scalars['String'];
  IBAN: Scalars['Iban'];
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type BigintComparisonExp = {
  _eq: InputMaybe<Scalars['bigint']>;
  _gt: InputMaybe<Scalars['bigint']>;
  _gte: InputMaybe<Scalars['bigint']>;
  _in: InputMaybe<Array<Scalars['bigint']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['bigint']>;
  _lte: InputMaybe<Scalars['bigint']>;
  _neq: InputMaybe<Scalars['bigint']>;
  _nin: InputMaybe<Array<Scalars['bigint']>>;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq: InputMaybe<Scalars['Boolean']>;
  _gt: InputMaybe<Scalars['Boolean']>;
  _gte: InputMaybe<Scalars['Boolean']>;
  _in: InputMaybe<Array<Scalars['Boolean']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['Boolean']>;
  _lte: InputMaybe<Scalars['Boolean']>;
  _neq: InputMaybe<Scalars['Boolean']>;
  _nin: InputMaybe<Array<Scalars['Boolean']>>;
};

/** columns and relationships of "budgets" */
export type Budgets = {
  __typename?: 'Budgets';
  id: Scalars['uuid'];
  initialAmount: Scalars['numeric'];
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Maybe<Scalars['uuid']>;
  remainingAmount: Scalars['numeric'];
  spentAmount: Scalars['numeric'];
};


/** columns and relationships of "budgets" */
export type BudgetsPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


/** columns and relationships of "budgets" */
export type BudgetsPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};

/** aggregated selection of "budgets" */
export type BudgetsAggregate = {
  __typename?: 'BudgetsAggregate';
  aggregate: Maybe<BudgetsAggregateFields>;
  nodes: Array<Budgets>;
};

/** aggregate fields of "budgets" */
export type BudgetsAggregateFields = {
  __typename?: 'BudgetsAggregateFields';
  avg: Maybe<BudgetsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<BudgetsMaxFields>;
  min: Maybe<BudgetsMinFields>;
  stddev: Maybe<BudgetsStddevFields>;
  stddevPop: Maybe<BudgetsStddev_PopFields>;
  stddevSamp: Maybe<BudgetsStddev_SampFields>;
  sum: Maybe<BudgetsSumFields>;
  varPop: Maybe<BudgetsVar_PopFields>;
  varSamp: Maybe<BudgetsVar_SampFields>;
  variance: Maybe<BudgetsVarianceFields>;
};


/** aggregate fields of "budgets" */
export type BudgetsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<BudgetsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "budgets" */
export type BudgetsAggregateOrderBy = {
  avg: InputMaybe<Budgets_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Budgets_Max_Order_By>;
  min: InputMaybe<Budgets_Min_Order_By>;
  stddev: InputMaybe<Budgets_Stddev_Order_By>;
  stddev_pop: InputMaybe<Budgets_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Budgets_Stddev_Samp_Order_By>;
  sum: InputMaybe<Budgets_Sum_Order_By>;
  var_pop: InputMaybe<Budgets_Var_Pop_Order_By>;
  var_samp: InputMaybe<Budgets_Var_Samp_Order_By>;
  variance: InputMaybe<Budgets_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "budgets" */
export type BudgetsArrRelInsertInput = {
  data: Array<BudgetsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<BudgetsOnConflict>;
};

/** aggregate avg on columns */
export type BudgetsAvgFields = {
  __typename?: 'BudgetsAvgFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "budgets". All fields are combined with a logical 'AND'. */
export type BudgetsBoolExp = {
  _and: InputMaybe<Array<BudgetsBoolExp>>;
  _not: InputMaybe<BudgetsBoolExp>;
  _or: InputMaybe<Array<BudgetsBoolExp>>;
  id: InputMaybe<UuidComparisonExp>;
  initialAmount: InputMaybe<NumericComparisonExp>;
  paymentRequests: InputMaybe<PaymentRequestsBoolExp>;
  paymentRequests_aggregate: InputMaybe<Payment_Requests_Aggregate_Bool_Exp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  remainingAmount: InputMaybe<NumericComparisonExp>;
  spentAmount: InputMaybe<NumericComparisonExp>;
};

/** unique or primary key constraints on table "budgets" */
export enum BudgetsConstraint {
  /** unique or primary key constraint on columns "id" */
  BudgetsPkey = 'budgets_pkey'
}

/** input type for incrementing numeric columns in table "budgets" */
export type BudgetsIncInput = {
  initialAmount: InputMaybe<Scalars['numeric']>;
  remainingAmount: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "budgets" */
export type BudgetsInsertInput = {
  id: InputMaybe<Scalars['uuid']>;
  initialAmount: InputMaybe<Scalars['numeric']>;
  paymentRequests: InputMaybe<PaymentRequestsArrRelInsertInput>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  remainingAmount: InputMaybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type BudgetsMaxFields = {
  __typename?: 'BudgetsMaxFields';
  id: Maybe<Scalars['uuid']>;
  initialAmount: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
  remainingAmount: Maybe<Scalars['numeric']>;
  spentAmount: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type BudgetsMinFields = {
  __typename?: 'BudgetsMinFields';
  id: Maybe<Scalars['uuid']>;
  initialAmount: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
  remainingAmount: Maybe<Scalars['numeric']>;
  spentAmount: Maybe<Scalars['numeric']>;
};

/** response of any mutation on the table "budgets" */
export type BudgetsMutationResponse = {
  __typename?: 'BudgetsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Budgets>;
};

/** input type for inserting object relation for remote table "budgets" */
export type BudgetsObjRelInsertInput = {
  data: BudgetsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<BudgetsOnConflict>;
};

/** on_conflict condition type for table "budgets" */
export type BudgetsOnConflict = {
  constraint: BudgetsConstraint;
  update_columns: Array<BudgetsUpdateColumn>;
  where: InputMaybe<BudgetsBoolExp>;
};

/** Ordering options when selecting data from "budgets". */
export type BudgetsOrderBy = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** primary key columns input for table: budgets */
export type BudgetsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "budgets" */
export enum BudgetsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initialAmount',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RemainingAmount = 'remainingAmount',
  /** column name */
  SpentAmount = 'spentAmount'
}

/** input type for updating data in table "budgets" */
export type BudgetsSetInput = {
  id: InputMaybe<Scalars['uuid']>;
  initialAmount: InputMaybe<Scalars['numeric']>;
  projectId: InputMaybe<Scalars['uuid']>;
  remainingAmount: InputMaybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type BudgetsStddevFields = {
  __typename?: 'BudgetsStddevFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type BudgetsStddev_PopFields = {
  __typename?: 'BudgetsStddev_popFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type BudgetsStddev_SampFields = {
  __typename?: 'BudgetsStddev_sampFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type BudgetsSumFields = {
  __typename?: 'BudgetsSumFields';
  initialAmount: Maybe<Scalars['numeric']>;
  remainingAmount: Maybe<Scalars['numeric']>;
  spentAmount: Maybe<Scalars['numeric']>;
};

/** update columns of table "budgets" */
export enum BudgetsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  InitialAmount = 'initialAmount',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RemainingAmount = 'remainingAmount'
}

export type BudgetsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<BudgetsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<BudgetsSetInput>;
  where: BudgetsBoolExp;
};

/** aggregate var_pop on columns */
export type BudgetsVar_PopFields = {
  __typename?: 'BudgetsVar_popFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type BudgetsVar_SampFields = {
  __typename?: 'BudgetsVar_sampFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type BudgetsVarianceFields = {
  __typename?: 'BudgetsVarianceFields';
  initialAmount: Maybe<Scalars['Float']>;
  remainingAmount: Maybe<Scalars['Float']>;
  spentAmount: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "bytea". All fields are combined with logical 'AND'. */
export type ByteaComparisonExp = {
  _eq: InputMaybe<Scalars['bytea']>;
  _gt: InputMaybe<Scalars['bytea']>;
  _gte: InputMaybe<Scalars['bytea']>;
  _in: InputMaybe<Array<Scalars['bytea']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['bytea']>;
  _lte: InputMaybe<Scalars['bytea']>;
  _neq: InputMaybe<Scalars['bytea']>;
  _nin: InputMaybe<Array<Scalars['bytea']>>;
};

export enum Channel {
  Discord = 'DISCORD',
  Email = 'EMAIL',
  LinkedIn = 'LINKED_IN',
  Telegram = 'TELEGRAM',
  Twitter = 'TWITTER',
  Whatsapp = 'WHATSAPP'
}

/** Boolean expression to compare columns of type "citext". All fields are combined with logical 'AND'. */
export type CitextComparisonExp = {
  _eq: InputMaybe<Scalars['citext']>;
  _gt: InputMaybe<Scalars['citext']>;
  _gte: InputMaybe<Scalars['citext']>;
  /** does the column match the given case-insensitive pattern */
  _ilike: InputMaybe<Scalars['citext']>;
  _in: InputMaybe<Array<Scalars['citext']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: InputMaybe<Scalars['citext']>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like: InputMaybe<Scalars['citext']>;
  _lt: InputMaybe<Scalars['citext']>;
  _lte: InputMaybe<Scalars['citext']>;
  _neq: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: InputMaybe<Scalars['citext']>;
  _nin: InputMaybe<Array<Scalars['citext']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given pattern */
  _nlike: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: InputMaybe<Scalars['citext']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: InputMaybe<Scalars['citext']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: InputMaybe<Scalars['citext']>;
  /** does the column match the given SQL regular expression */
  _similar: InputMaybe<Scalars['citext']>;
};

/** columns and relationships of "api.commands" */
export type Commands = {
  __typename?: 'Commands';
  createdAt: Maybe<Scalars['timestamp']>;
  id: Maybe<Scalars['uuid']>;
  processingCount: Maybe<Scalars['Int']>;
  projectId: Maybe<Scalars['uuid']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "api.commands" */
export type CommandsAggregate = {
  __typename?: 'CommandsAggregate';
  aggregate: Maybe<CommandsAggregateFields>;
  nodes: Array<Commands>;
};

/** aggregate fields of "api.commands" */
export type CommandsAggregateFields = {
  __typename?: 'CommandsAggregateFields';
  avg: Maybe<CommandsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<CommandsMaxFields>;
  min: Maybe<CommandsMinFields>;
  stddev: Maybe<CommandsStddevFields>;
  stddevPop: Maybe<CommandsStddev_PopFields>;
  stddevSamp: Maybe<CommandsStddev_SampFields>;
  sum: Maybe<CommandsSumFields>;
  varPop: Maybe<CommandsVar_PopFields>;
  varSamp: Maybe<CommandsVar_SampFields>;
  variance: Maybe<CommandsVarianceFields>;
};


/** aggregate fields of "api.commands" */
export type CommandsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<CommandsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type CommandsAvgFields = {
  __typename?: 'CommandsAvgFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.commands". All fields are combined with a logical 'AND'. */
export type CommandsBoolExp = {
  _and: InputMaybe<Array<CommandsBoolExp>>;
  _not: InputMaybe<CommandsBoolExp>;
  _or: InputMaybe<Array<CommandsBoolExp>>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  processingCount: InputMaybe<IntComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  updatedAt: InputMaybe<TimestampComparisonExp>;
};

/** aggregate max on columns */
export type CommandsMaxFields = {
  __typename?: 'CommandsMaxFields';
  createdAt: Maybe<Scalars['timestamp']>;
  id: Maybe<Scalars['uuid']>;
  processingCount: Maybe<Scalars['Int']>;
  projectId: Maybe<Scalars['uuid']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type CommandsMinFields = {
  __typename?: 'CommandsMinFields';
  createdAt: Maybe<Scalars['timestamp']>;
  id: Maybe<Scalars['uuid']>;
  processingCount: Maybe<Scalars['Int']>;
  projectId: Maybe<Scalars['uuid']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** Ordering options when selecting data from "api.commands". */
export type CommandsOrderBy = {
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  processingCount: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

/** select columns of table "api.commands" */
export enum CommandsSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProcessingCount = 'processingCount',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate stddev on columns */
export type CommandsStddevFields = {
  __typename?: 'CommandsStddevFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type CommandsStddev_PopFields = {
  __typename?: 'CommandsStddev_popFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type CommandsStddev_SampFields = {
  __typename?: 'CommandsStddev_sampFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type CommandsSumFields = {
  __typename?: 'CommandsSumFields';
  processingCount: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type CommandsVar_PopFields = {
  __typename?: 'CommandsVar_popFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type CommandsVar_SampFields = {
  __typename?: 'CommandsVar_sampFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type CommandsVarianceFields = {
  __typename?: 'CommandsVarianceFields';
  processingCount: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "Commands" */
export type Commands_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Commands_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Commands_StreamCursorValueInput = {
  createdAt: InputMaybe<Scalars['timestamp']>;
  id: InputMaybe<Scalars['uuid']>;
  processingCount: InputMaybe<Scalars['Int']>;
  projectId: InputMaybe<Scalars['uuid']>;
  updatedAt: InputMaybe<Scalars['timestamp']>;
};

export type CompanyIdentity = {
  identificationNumber: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<PersonIdentity>;
};

/** Boolean expression to compare columns of type "contact_channel". All fields are combined with logical 'AND'. */
export type ContactChannelComparisonExp = {
  _eq: InputMaybe<Scalars['contact_channel']>;
  _gt: InputMaybe<Scalars['contact_channel']>;
  _gte: InputMaybe<Scalars['contact_channel']>;
  _in: InputMaybe<Array<Scalars['contact_channel']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['contact_channel']>;
  _lte: InputMaybe<Scalars['contact_channel']>;
  _neq: InputMaybe<Scalars['contact_channel']>;
  _nin: InputMaybe<Array<Scalars['contact_channel']>>;
};

/** columns and relationships of "api.contact_informations" */
export type ContactInformations = {
  __typename?: 'ContactInformations';
  channel: Maybe<Scalars['contact_channel']>;
  contact: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  public: Maybe<Scalars['Boolean']>;
};

/** aggregated selection of "api.contact_informations" */
export type ContactInformationsAggregate = {
  __typename?: 'ContactInformationsAggregate';
  aggregate: Maybe<ContactInformationsAggregateFields>;
  nodes: Array<ContactInformations>;
};

/** aggregate fields of "api.contact_informations" */
export type ContactInformationsAggregateFields = {
  __typename?: 'ContactInformationsAggregateFields';
  avg: Maybe<ContactInformationsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ContactInformationsMaxFields>;
  min: Maybe<ContactInformationsMinFields>;
  stddev: Maybe<ContactInformationsStddevFields>;
  stddevPop: Maybe<ContactInformationsStddev_PopFields>;
  stddevSamp: Maybe<ContactInformationsStddev_SampFields>;
  sum: Maybe<ContactInformationsSumFields>;
  varPop: Maybe<ContactInformationsVar_PopFields>;
  varSamp: Maybe<ContactInformationsVar_SampFields>;
  variance: Maybe<ContactInformationsVarianceFields>;
};


/** aggregate fields of "api.contact_informations" */
export type ContactInformationsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ContactInformationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.contact_informations" */
export type ContactInformationsAggregateOrderBy = {
  avg: InputMaybe<ContactInformations_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<ContactInformations_Max_Order_By>;
  min: InputMaybe<ContactInformations_Min_Order_By>;
  stddev: InputMaybe<ContactInformations_Stddev_Order_By>;
  stddev_pop: InputMaybe<ContactInformations_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<ContactInformations_Stddev_Samp_Order_By>;
  sum: InputMaybe<ContactInformations_Sum_Order_By>;
  var_pop: InputMaybe<ContactInformations_Var_Pop_Order_By>;
  var_samp: InputMaybe<ContactInformations_Var_Samp_Order_By>;
  variance: InputMaybe<ContactInformations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.contact_informations" */
export type ContactInformationsArrRelInsertInput = {
  data: Array<ContactInformationsInsertInput>;
};

/** aggregate avg on columns */
export type ContactInformationsAvgFields = {
  __typename?: 'ContactInformationsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.contact_informations". All fields are combined with a logical 'AND'. */
export type ContactInformationsBoolExp = {
  _and: InputMaybe<Array<ContactInformationsBoolExp>>;
  _not: InputMaybe<ContactInformationsBoolExp>;
  _or: InputMaybe<Array<ContactInformationsBoolExp>>;
  channel: InputMaybe<ContactChannelComparisonExp>;
  contact: InputMaybe<StringComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  public: InputMaybe<BooleanComparisonExp>;
};

/** input type for inserting data into table "api.contact_informations" */
export type ContactInformationsInsertInput = {
  channel: InputMaybe<Scalars['contact_channel']>;
  contact: InputMaybe<Scalars['String']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  public: InputMaybe<Scalars['Boolean']>;
};

/** aggregate max on columns */
export type ContactInformationsMaxFields = {
  __typename?: 'ContactInformationsMaxFields';
  channel: Maybe<Scalars['contact_channel']>;
  contact: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type ContactInformationsMinFields = {
  __typename?: 'ContactInformationsMinFields';
  channel: Maybe<Scalars['contact_channel']>;
  contact: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
};

/** Ordering options when selecting data from "api.contact_informations". */
export type ContactInformationsOrderBy = {
  channel: InputMaybe<OrderBy>;
  contact: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  public: InputMaybe<OrderBy>;
};

/** select columns of table "api.contact_informations" */
export enum ContactInformationsSelectColumn {
  /** column name */
  Channel = 'channel',
  /** column name */
  Contact = 'contact',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Public = 'public'
}

/** aggregate stddev on columns */
export type ContactInformationsStddevFields = {
  __typename?: 'ContactInformationsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ContactInformationsStddev_PopFields = {
  __typename?: 'ContactInformationsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ContactInformationsStddev_SampFields = {
  __typename?: 'ContactInformationsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ContactInformationsSumFields = {
  __typename?: 'ContactInformationsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type ContactInformationsVar_PopFields = {
  __typename?: 'ContactInformationsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ContactInformationsVar_SampFields = {
  __typename?: 'ContactInformationsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ContactInformationsVarianceFields = {
  __typename?: 'ContactInformationsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

export type ContactInformations_Aggregate_Bool_Exp = {
  bool_and: InputMaybe<ContactInformations_Aggregate_Bool_Exp_Bool_And>;
  bool_or: InputMaybe<ContactInformations_Aggregate_Bool_Exp_Bool_Or>;
  count: InputMaybe<ContactInformations_Aggregate_Bool_Exp_Count>;
};

export type ContactInformations_Aggregate_Bool_Exp_Bool_And = {
  arguments: ContactInformations_Select_Column_ContactInformations_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContactInformationsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ContactInformations_Aggregate_Bool_Exp_Bool_Or = {
  arguments: ContactInformations_Select_Column_ContactInformations_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContactInformationsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type ContactInformations_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ContactInformationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContactInformationsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.contact_informations" */
export type ContactInformations_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.contact_informations" */
export type ContactInformations_Max_Order_By = {
  channel: InputMaybe<OrderBy>;
  contact: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.contact_informations" */
export type ContactInformations_Min_Order_By = {
  channel: InputMaybe<OrderBy>;
  contact: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
};

/** select "ContactInformations_aggregate_bool_exp_bool_and_arguments_columns" columns of table "api.contact_informations" */
export enum ContactInformations_Select_Column_ContactInformations_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Public = 'public'
}

/** select "ContactInformations_aggregate_bool_exp_bool_or_arguments_columns" columns of table "api.contact_informations" */
export enum ContactInformations_Select_Column_ContactInformations_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Public = 'public'
}

/** order by stddev() on columns of table "api.contact_informations" */
export type ContactInformations_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.contact_informations" */
export type ContactInformations_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.contact_informations" */
export type ContactInformations_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ContactInformations" */
export type ContactInformations_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ContactInformations_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ContactInformations_StreamCursorValueInput = {
  channel: InputMaybe<Scalars['contact_channel']>;
  contact: InputMaybe<Scalars['String']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  public: InputMaybe<Scalars['Boolean']>;
};

/** order by sum() on columns of table "api.contact_informations" */
export type ContactInformations_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.contact_informations" */
export type ContactInformations_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.contact_informations" */
export type ContactInformations_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.contact_informations" */
export type ContactInformations_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

export type Contacts = {
  __typename?: 'Contacts';
  discord: Maybe<ContactInformations>;
  email: Maybe<ContactInformations>;
  linkedin: Maybe<ContactInformations>;
  telegram: Maybe<ContactInformations>;
  twitter: Maybe<ContactInformations>;
  whatsapp: Maybe<ContactInformations>;
};

/** columns and relationships of "api.contribution_counts" */
export type ContributionCounts = {
  __typename?: 'ContributionCounts';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregated selection of "api.contribution_counts" */
export type ContributionCountsAggregate = {
  __typename?: 'ContributionCountsAggregate';
  aggregate: Maybe<ContributionCountsAggregateFields>;
  nodes: Array<ContributionCounts>;
};

/** aggregate fields of "api.contribution_counts" */
export type ContributionCountsAggregateFields = {
  __typename?: 'ContributionCountsAggregateFields';
  avg: Maybe<ContributionCountsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ContributionCountsMaxFields>;
  min: Maybe<ContributionCountsMinFields>;
  stddev: Maybe<ContributionCountsStddevFields>;
  stddevPop: Maybe<ContributionCountsStddev_PopFields>;
  stddevSamp: Maybe<ContributionCountsStddev_SampFields>;
  sum: Maybe<ContributionCountsSumFields>;
  varPop: Maybe<ContributionCountsVar_PopFields>;
  varSamp: Maybe<ContributionCountsVar_SampFields>;
  variance: Maybe<ContributionCountsVarianceFields>;
};


/** aggregate fields of "api.contribution_counts" */
export type ContributionCountsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ContributionCountsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.contribution_counts" */
export type ContributionCountsAggregateOrderBy = {
  avg: InputMaybe<ContributionCounts_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<ContributionCounts_Max_Order_By>;
  min: InputMaybe<ContributionCounts_Min_Order_By>;
  stddev: InputMaybe<ContributionCounts_Stddev_Order_By>;
  stddev_pop: InputMaybe<ContributionCounts_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<ContributionCounts_Stddev_Samp_Order_By>;
  sum: InputMaybe<ContributionCounts_Sum_Order_By>;
  var_pop: InputMaybe<ContributionCounts_Var_Pop_Order_By>;
  var_samp: InputMaybe<ContributionCounts_Var_Samp_Order_By>;
  variance: InputMaybe<ContributionCounts_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.contribution_counts" */
export type ContributionCountsArrRelInsertInput = {
  data: Array<ContributionCountsInsertInput>;
};

/** aggregate avg on columns */
export type ContributionCountsAvgFields = {
  __typename?: 'ContributionCountsAvgFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.contribution_counts". All fields are combined with a logical 'AND'. */
export type ContributionCountsBoolExp = {
  _and: InputMaybe<Array<ContributionCountsBoolExp>>;
  _not: InputMaybe<ContributionCountsBoolExp>;
  _or: InputMaybe<Array<ContributionCountsBoolExp>>;
  codeReviewCount: InputMaybe<BigintComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  issueCount: InputMaybe<BigintComparisonExp>;
  pullRequestCount: InputMaybe<BigintComparisonExp>;
  week: InputMaybe<Float8ComparisonExp>;
  year: InputMaybe<Float8ComparisonExp>;
};

/** input type for inserting data into table "api.contribution_counts" */
export type ContributionCountsInsertInput = {
  codeReviewCount: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  issueCount: InputMaybe<Scalars['bigint']>;
  pullRequestCount: InputMaybe<Scalars['bigint']>;
  week: InputMaybe<Scalars['float8']>;
  year: InputMaybe<Scalars['float8']>;
};

/** aggregate max on columns */
export type ContributionCountsMaxFields = {
  __typename?: 'ContributionCountsMaxFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregate min on columns */
export type ContributionCountsMinFields = {
  __typename?: 'ContributionCountsMinFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** Ordering options when selecting data from "api.contribution_counts". */
export type ContributionCountsOrderBy = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** select columns of table "api.contribution_counts" */
export enum ContributionCountsSelectColumn {
  /** column name */
  CodeReviewCount = 'codeReviewCount',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  IssueCount = 'issueCount',
  /** column name */
  PullRequestCount = 'pullRequestCount',
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** aggregate stddev on columns */
export type ContributionCountsStddevFields = {
  __typename?: 'ContributionCountsStddevFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ContributionCountsStddev_PopFields = {
  __typename?: 'ContributionCountsStddev_popFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ContributionCountsStddev_SampFields = {
  __typename?: 'ContributionCountsStddev_sampFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ContributionCountsSumFields = {
  __typename?: 'ContributionCountsSumFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregate var_pop on columns */
export type ContributionCountsVar_PopFields = {
  __typename?: 'ContributionCountsVar_popFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ContributionCountsVar_SampFields = {
  __typename?: 'ContributionCountsVar_sampFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ContributionCountsVarianceFields = {
  __typename?: 'ContributionCountsVarianceFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

export type ContributionCounts_Aggregate_Bool_Exp = {
  avg: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Avg>;
  corr: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Corr>;
  count: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Count>;
  covar_samp: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Covar_Samp>;
  max: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Max>;
  min: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Min>;
  stddev_samp: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Stddev_Samp>;
  sum: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Sum>;
  var_samp: InputMaybe<ContributionCounts_Aggregate_Bool_Exp_Var_Samp>;
};

export type ContributionCounts_Aggregate_Bool_Exp_Avg = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Avg_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Corr = {
  arguments: ContributionCounts_Aggregate_Bool_Exp_Corr_Arguments;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Corr_Arguments = {
  X: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Corr_Arguments_Columns;
  Y: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Corr_Arguments_Columns;
};

export type ContributionCounts_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ContributionCountsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: IntComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Covar_Samp = {
  arguments: ContributionCounts_Aggregate_Bool_Exp_Covar_Samp_Arguments;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Covar_Samp_Arguments = {
  X: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
  Y: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns;
};

export type ContributionCounts_Aggregate_Bool_Exp_Max = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Max_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Min = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Min_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Stddev_Samp = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Sum = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Sum_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

export type ContributionCounts_Aggregate_Bool_Exp_Var_Samp = {
  arguments: ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionCountsBoolExp>;
  predicate: Float8ComparisonExp;
};

/** order by avg() on columns of table "api.contribution_counts" */
export type ContributionCounts_Avg_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.contribution_counts" */
export type ContributionCounts_Max_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.contribution_counts" */
export type ContributionCounts_Min_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** select "ContributionCounts_aggregate_bool_exp_avg_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Avg_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_corr_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Corr_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_covar_samp_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Covar_Samp_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_max_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Max_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_min_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Min_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_stddev_samp_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Stddev_Samp_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_sum_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Sum_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** select "ContributionCounts_aggregate_bool_exp_var_samp_arguments_columns" columns of table "api.contribution_counts" */
export enum ContributionCounts_Select_Column_ContributionCounts_Aggregate_Bool_Exp_Var_Samp_Arguments_Columns {
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** order by stddev() on columns of table "api.contribution_counts" */
export type ContributionCounts_Stddev_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.contribution_counts" */
export type ContributionCounts_Stddev_Pop_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.contribution_counts" */
export type ContributionCounts_Stddev_Samp_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ContributionCounts" */
export type ContributionCounts_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ContributionCounts_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ContributionCounts_StreamCursorValueInput = {
  codeReviewCount: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  issueCount: InputMaybe<Scalars['bigint']>;
  pullRequestCount: InputMaybe<Scalars['bigint']>;
  week: InputMaybe<Scalars['float8']>;
  year: InputMaybe<Scalars['float8']>;
};

/** order by sum() on columns of table "api.contribution_counts" */
export type ContributionCounts_Sum_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.contribution_counts" */
export type ContributionCounts_Var_Pop_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.contribution_counts" */
export type ContributionCounts_Var_Samp_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.contribution_counts" */
export type ContributionCounts_Variance_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** columns and relationships of "api.contribution_stats" */
export type ContributionStats = {
  __typename?: 'ContributionStats';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  maxDate: Maybe<Scalars['timestamp']>;
  minDate: Maybe<Scalars['timestamp']>;
  projectId: Maybe<Scalars['uuid']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  totalCount: Maybe<Scalars['bigint']>;
};

/** aggregated selection of "api.contribution_stats" */
export type ContributionStatsAggregate = {
  __typename?: 'ContributionStatsAggregate';
  aggregate: Maybe<ContributionStatsAggregateFields>;
  nodes: Array<ContributionStats>;
};

/** aggregate fields of "api.contribution_stats" */
export type ContributionStatsAggregateFields = {
  __typename?: 'ContributionStatsAggregateFields';
  avg: Maybe<ContributionStatsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ContributionStatsMaxFields>;
  min: Maybe<ContributionStatsMinFields>;
  stddev: Maybe<ContributionStatsStddevFields>;
  stddevPop: Maybe<ContributionStatsStddev_PopFields>;
  stddevSamp: Maybe<ContributionStatsStddev_SampFields>;
  sum: Maybe<ContributionStatsSumFields>;
  varPop: Maybe<ContributionStatsVar_PopFields>;
  varSamp: Maybe<ContributionStatsVar_SampFields>;
  variance: Maybe<ContributionStatsVarianceFields>;
};


/** aggregate fields of "api.contribution_stats" */
export type ContributionStatsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ContributionStatsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.contribution_stats" */
export type ContributionStatsAggregateOrderBy = {
  avg: InputMaybe<ContributionStats_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<ContributionStats_Max_Order_By>;
  min: InputMaybe<ContributionStats_Min_Order_By>;
  stddev: InputMaybe<ContributionStats_Stddev_Order_By>;
  stddev_pop: InputMaybe<ContributionStats_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<ContributionStats_Stddev_Samp_Order_By>;
  sum: InputMaybe<ContributionStats_Sum_Order_By>;
  var_pop: InputMaybe<ContributionStats_Var_Pop_Order_By>;
  var_samp: InputMaybe<ContributionStats_Var_Samp_Order_By>;
  variance: InputMaybe<ContributionStats_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.contribution_stats" */
export type ContributionStatsArrRelInsertInput = {
  data: Array<ContributionStatsInsertInput>;
};

/** aggregate avg on columns */
export type ContributionStatsAvgFields = {
  __typename?: 'ContributionStatsAvgFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.contribution_stats". All fields are combined with a logical 'AND'. */
export type ContributionStatsBoolExp = {
  _and: InputMaybe<Array<ContributionStatsBoolExp>>;
  _not: InputMaybe<ContributionStatsBoolExp>;
  _or: InputMaybe<Array<ContributionStatsBoolExp>>;
  codeReviewCount: InputMaybe<BigintComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  issueCount: InputMaybe<BigintComparisonExp>;
  maxDate: InputMaybe<TimestampComparisonExp>;
  minDate: InputMaybe<TimestampComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  pullRequestCount: InputMaybe<BigintComparisonExp>;
  totalCount: InputMaybe<BigintComparisonExp>;
};

/** input type for inserting data into table "api.contribution_stats" */
export type ContributionStatsInsertInput = {
  codeReviewCount: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  issueCount: InputMaybe<Scalars['bigint']>;
  maxDate: InputMaybe<Scalars['timestamp']>;
  minDate: InputMaybe<Scalars['timestamp']>;
  projectId: InputMaybe<Scalars['uuid']>;
  pullRequestCount: InputMaybe<Scalars['bigint']>;
  totalCount: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type ContributionStatsMaxFields = {
  __typename?: 'ContributionStatsMaxFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  maxDate: Maybe<Scalars['timestamp']>;
  minDate: Maybe<Scalars['timestamp']>;
  projectId: Maybe<Scalars['uuid']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  totalCount: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type ContributionStatsMinFields = {
  __typename?: 'ContributionStatsMinFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  maxDate: Maybe<Scalars['timestamp']>;
  minDate: Maybe<Scalars['timestamp']>;
  projectId: Maybe<Scalars['uuid']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  totalCount: Maybe<Scalars['bigint']>;
};

/** Ordering options when selecting data from "api.contribution_stats". */
export type ContributionStatsOrderBy = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  maxDate: InputMaybe<OrderBy>;
  minDate: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** select columns of table "api.contribution_stats" */
export enum ContributionStatsSelectColumn {
  /** column name */
  CodeReviewCount = 'codeReviewCount',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  IssueCount = 'issueCount',
  /** column name */
  MaxDate = 'maxDate',
  /** column name */
  MinDate = 'minDate',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  PullRequestCount = 'pullRequestCount',
  /** column name */
  TotalCount = 'totalCount'
}

/** aggregate stddev on columns */
export type ContributionStatsStddevFields = {
  __typename?: 'ContributionStatsStddevFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ContributionStatsStddev_PopFields = {
  __typename?: 'ContributionStatsStddev_popFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ContributionStatsStddev_SampFields = {
  __typename?: 'ContributionStatsStddev_sampFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ContributionStatsSumFields = {
  __typename?: 'ContributionStatsSumFields';
  codeReviewCount: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  issueCount: Maybe<Scalars['bigint']>;
  pullRequestCount: Maybe<Scalars['bigint']>;
  totalCount: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type ContributionStatsVar_PopFields = {
  __typename?: 'ContributionStatsVar_popFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ContributionStatsVar_SampFields = {
  __typename?: 'ContributionStatsVar_sampFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ContributionStatsVarianceFields = {
  __typename?: 'ContributionStatsVarianceFields';
  codeReviewCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  issueCount: Maybe<Scalars['Float']>;
  pullRequestCount: Maybe<Scalars['Float']>;
  totalCount: Maybe<Scalars['Float']>;
};

export type ContributionStats_Aggregate_Bool_Exp = {
  count: InputMaybe<ContributionStats_Aggregate_Bool_Exp_Count>;
};

export type ContributionStats_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ContributionStatsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionStatsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.contribution_stats" */
export type ContributionStats_Avg_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.contribution_stats" */
export type ContributionStats_Max_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  maxDate: InputMaybe<OrderBy>;
  minDate: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.contribution_stats" */
export type ContributionStats_Min_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  maxDate: InputMaybe<OrderBy>;
  minDate: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.contribution_stats" */
export type ContributionStats_Stddev_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.contribution_stats" */
export type ContributionStats_Stddev_Pop_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.contribution_stats" */
export type ContributionStats_Stddev_Samp_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ContributionStats" */
export type ContributionStats_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: ContributionStats_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type ContributionStats_StreamCursorValueInput = {
  codeReviewCount: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  issueCount: InputMaybe<Scalars['bigint']>;
  maxDate: InputMaybe<Scalars['timestamp']>;
  minDate: InputMaybe<Scalars['timestamp']>;
  projectId: InputMaybe<Scalars['uuid']>;
  pullRequestCount: InputMaybe<Scalars['bigint']>;
  totalCount: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "api.contribution_stats" */
export type ContributionStats_Sum_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.contribution_stats" */
export type ContributionStats_Var_Pop_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.contribution_stats" */
export type ContributionStats_Var_Samp_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.contribution_stats" */
export type ContributionStats_Variance_Order_By = {
  codeReviewCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  issueCount: InputMaybe<OrderBy>;
  pullRequestCount: InputMaybe<OrderBy>;
  totalCount: InputMaybe<OrderBy>;
};

/** Boolean expression to compare columns of type "contribution_status". All fields are combined with logical 'AND'. */
export type ContributionStatusComparisonExp = {
  _eq: InputMaybe<Scalars['contribution_status']>;
  _gt: InputMaybe<Scalars['contribution_status']>;
  _gte: InputMaybe<Scalars['contribution_status']>;
  _in: InputMaybe<Array<Scalars['contribution_status']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['contribution_status']>;
  _lte: InputMaybe<Scalars['contribution_status']>;
  _neq: InputMaybe<Scalars['contribution_status']>;
  _nin: InputMaybe<Array<Scalars['contribution_status']>>;
};

/** Boolean expression to compare columns of type "contribution_type". All fields are combined with logical 'AND'. */
export type ContributionTypeComparisonExp = {
  _eq: InputMaybe<Scalars['contribution_type']>;
  _gt: InputMaybe<Scalars['contribution_type']>;
  _gte: InputMaybe<Scalars['contribution_type']>;
  _in: InputMaybe<Array<Scalars['contribution_type']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['contribution_type']>;
  _lte: InputMaybe<Scalars['contribution_type']>;
  _neq: InputMaybe<Scalars['contribution_type']>;
  _nin: InputMaybe<Array<Scalars['contribution_type']>>;
};

/** columns and relationships of "api.contributions" */
export type Contributions = {
  __typename?: 'Contributions';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  /** An object relationship */
  githubCodeReview: Maybe<GithubPullRequestReviews>;
  githubCodeReviewId: Maybe<Scalars['String']>;
  /** An object relationship */
  githubIssue: Maybe<GithubIssues>;
  githubIssueId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  githubPullRequest: Maybe<GithubPullRequests>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  githubRepo: Maybe<GithubRepos>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  ignored: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  /** An array relationship */
  rewardItems: Array<WorkItems>;
  /** An aggregate relationship */
  rewardItemsAggregate: WorkItemsAggregate;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['String']>;
};


/** columns and relationships of "api.contributions" */
export type ContributionsRewardItemsArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


/** columns and relationships of "api.contributions" */
export type ContributionsRewardItemsAggregateArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** aggregated selection of "api.contributions" */
export type ContributionsAggregate = {
  __typename?: 'ContributionsAggregate';
  aggregate: Maybe<ContributionsAggregateFields>;
  nodes: Array<Contributions>;
};

/** aggregate fields of "api.contributions" */
export type ContributionsAggregateFields = {
  __typename?: 'ContributionsAggregateFields';
  avg: Maybe<ContributionsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ContributionsMaxFields>;
  min: Maybe<ContributionsMinFields>;
  stddev: Maybe<ContributionsStddevFields>;
  stddevPop: Maybe<ContributionsStddev_PopFields>;
  stddevSamp: Maybe<ContributionsStddev_SampFields>;
  sum: Maybe<ContributionsSumFields>;
  varPop: Maybe<ContributionsVar_PopFields>;
  varSamp: Maybe<ContributionsVar_SampFields>;
  variance: Maybe<ContributionsVarianceFields>;
};


/** aggregate fields of "api.contributions" */
export type ContributionsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ContributionsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.contributions" */
export type ContributionsAggregateOrderBy = {
  avg: InputMaybe<Contributions_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Contributions_Max_Order_By>;
  min: InputMaybe<Contributions_Min_Order_By>;
  stddev: InputMaybe<Contributions_Stddev_Order_By>;
  stddev_pop: InputMaybe<Contributions_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Contributions_Stddev_Samp_Order_By>;
  sum: InputMaybe<Contributions_Sum_Order_By>;
  var_pop: InputMaybe<Contributions_Var_Pop_Order_By>;
  var_samp: InputMaybe<Contributions_Var_Samp_Order_By>;
  variance: InputMaybe<Contributions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.contributions" */
export type ContributionsArrRelInsertInput = {
  data: Array<ContributionsInsertInput>;
};

/** aggregate avg on columns */
export type ContributionsAvgFields = {
  __typename?: 'ContributionsAvgFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.contributions". All fields are combined with a logical 'AND'. */
export type ContributionsBoolExp = {
  _and: InputMaybe<Array<ContributionsBoolExp>>;
  _not: InputMaybe<ContributionsBoolExp>;
  _or: InputMaybe<Array<ContributionsBoolExp>>;
  closedAt: InputMaybe<TimestampComparisonExp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  detailsId: InputMaybe<StringComparisonExp>;
  githubCodeReview: InputMaybe<GithubPullRequestReviewsBoolExp>;
  githubCodeReviewId: InputMaybe<StringComparisonExp>;
  githubIssue: InputMaybe<GithubIssuesBoolExp>;
  githubIssueId: InputMaybe<BigintComparisonExp>;
  githubPullRequest: InputMaybe<GithubPullRequestsBoolExp>;
  githubPullRequestId: InputMaybe<BigintComparisonExp>;
  githubRepo: InputMaybe<GithubReposBoolExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  ignored: InputMaybe<BooleanComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  rewardItems: InputMaybe<WorkItemsBoolExp>;
  rewardItems_aggregate: InputMaybe<WorkItems_Aggregate_Bool_Exp>;
  status: InputMaybe<ContributionStatusComparisonExp>;
  type: InputMaybe<StringComparisonExp>;
};

/** input type for inserting data into table "api.contributions" */
export type ContributionsInsertInput = {
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  detailsId: InputMaybe<Scalars['String']>;
  githubCodeReview: InputMaybe<GithubPullRequestReviewsObjRelInsertInput>;
  githubCodeReviewId: InputMaybe<Scalars['String']>;
  githubIssue: InputMaybe<GithubIssuesObjRelInsertInput>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequest: InputMaybe<GithubPullRequestsObjRelInsertInput>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  githubRepo: InputMaybe<GithubReposObjRelInsertInput>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  ignored: InputMaybe<Scalars['Boolean']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
  rewardItems: InputMaybe<WorkItemsArrRelInsertInput>;
  status: InputMaybe<Scalars['contribution_status']>;
  type: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type ContributionsMaxFields = {
  __typename?: 'ContributionsMaxFields';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  githubCodeReviewId: Maybe<Scalars['String']>;
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ContributionsMinFields = {
  __typename?: 'ContributionsMinFields';
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  detailsId: Maybe<Scalars['String']>;
  githubCodeReviewId: Maybe<Scalars['String']>;
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['contribution_status']>;
  type: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "api.contributions". */
export type ContributionsOrderBy = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubCodeReview: InputMaybe<GithubPullRequestReviewsOrderBy>;
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssue: InputMaybe<GithubIssuesOrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequest: InputMaybe<GithubPullRequestsOrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubRepo: InputMaybe<GithubReposOrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  ignored: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  rewardItemsAggregate: InputMaybe<WorkItemsAggregateOrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** select columns of table "api.contributions" */
export enum ContributionsSelectColumn {
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  DetailsId = 'detailsId',
  /** column name */
  GithubCodeReviewId = 'githubCodeReviewId',
  /** column name */
  GithubIssueId = 'githubIssueId',
  /** column name */
  GithubPullRequestId = 'githubPullRequestId',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Id = 'id',
  /** column name */
  Ignored = 'ignored',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Type = 'type'
}

/** aggregate stddev on columns */
export type ContributionsStddevFields = {
  __typename?: 'ContributionsStddevFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ContributionsStddev_PopFields = {
  __typename?: 'ContributionsStddev_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ContributionsStddev_SampFields = {
  __typename?: 'ContributionsStddev_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ContributionsSumFields = {
  __typename?: 'ContributionsSumFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type ContributionsVar_PopFields = {
  __typename?: 'ContributionsVar_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ContributionsVar_SampFields = {
  __typename?: 'ContributionsVar_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ContributionsVarianceFields = {
  __typename?: 'ContributionsVarianceFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

export type Contributions_Aggregate_Bool_Exp = {
  bool_and: InputMaybe<Contributions_Aggregate_Bool_Exp_Bool_And>;
  bool_or: InputMaybe<Contributions_Aggregate_Bool_Exp_Bool_Or>;
  count: InputMaybe<Contributions_Aggregate_Bool_Exp_Count>;
};

export type Contributions_Aggregate_Bool_Exp_Bool_And = {
  arguments: Contributions_Select_Column_Contributions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type Contributions_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Contributions_Select_Column_Contributions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionsBoolExp>;
  predicate: BooleanComparisonExp;
};

export type Contributions_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ContributionsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ContributionsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.contributions" */
export type Contributions_Avg_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.contributions" */
export type Contributions_Max_Order_By = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.contributions" */
export type Contributions_Min_Order_By = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** select "Contributions_aggregate_bool_exp_bool_and_arguments_columns" columns of table "api.contributions" */
export enum Contributions_Select_Column_Contributions_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Ignored = 'ignored'
}

/** select "Contributions_aggregate_bool_exp_bool_or_arguments_columns" columns of table "api.contributions" */
export enum Contributions_Select_Column_Contributions_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Ignored = 'ignored'
}

/** order by stddev() on columns of table "api.contributions" */
export type Contributions_Stddev_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.contributions" */
export type Contributions_Stddev_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.contributions" */
export type Contributions_Stddev_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "Contributions" */
export type Contributions_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Contributions_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Contributions_StreamCursorValueInput = {
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  detailsId: InputMaybe<Scalars['String']>;
  githubCodeReviewId: InputMaybe<Scalars['String']>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  ignored: InputMaybe<Scalars['Boolean']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['contribution_status']>;
  type: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "api.contributions" */
export type Contributions_Sum_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.contributions" */
export type Contributions_Var_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.contributions" */
export type Contributions_Var_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.contributions" */
export type Contributions_Variance_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export type EthereumIdentityInput = {
  optEthAddress: InputMaybe<Scalars['EthereumAddress']>;
  optEthName: InputMaybe<Scalars['EthereumName']>;
  type: EthereumIdentityType;
};

export enum EthereumIdentityType {
  EthereumAddress = 'ETHEREUM_ADDRESS',
  EthereumName = 'ETHEREUM_NAME'
}

/** Boolean expression to compare columns of type "float8". All fields are combined with logical 'AND'. */
export type Float8ComparisonExp = {
  _eq: InputMaybe<Scalars['float8']>;
  _gt: InputMaybe<Scalars['float8']>;
  _gte: InputMaybe<Scalars['float8']>;
  _in: InputMaybe<Array<Scalars['float8']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['float8']>;
  _lte: InputMaybe<Scalars['float8']>;
  _neq: InputMaybe<Scalars['float8']>;
  _nin: InputMaybe<Array<Scalars['float8']>>;
};

/** Boolean expression to compare columns of type "github_ci_checks". All fields are combined with logical 'AND'. */
export type GithubCiChecksComparisonExp = {
  _eq: InputMaybe<Scalars['github_ci_checks']>;
  _gt: InputMaybe<Scalars['github_ci_checks']>;
  _gte: InputMaybe<Scalars['github_ci_checks']>;
  _in: InputMaybe<Array<Scalars['github_ci_checks']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['github_ci_checks']>;
  _lte: InputMaybe<Scalars['github_ci_checks']>;
  _neq: InputMaybe<Scalars['github_ci_checks']>;
  _nin: InputMaybe<Array<Scalars['github_ci_checks']>>;
};

/** Boolean expression to compare columns of type "github_code_review_outcome". All fields are combined with logical 'AND'. */
export type GithubCodeReviewOutcomeComparisonExp = {
  _eq: InputMaybe<Scalars['github_code_review_outcome']>;
  _gt: InputMaybe<Scalars['github_code_review_outcome']>;
  _gte: InputMaybe<Scalars['github_code_review_outcome']>;
  _in: InputMaybe<Array<Scalars['github_code_review_outcome']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['github_code_review_outcome']>;
  _lte: InputMaybe<Scalars['github_code_review_outcome']>;
  _neq: InputMaybe<Scalars['github_code_review_outcome']>;
  _nin: InputMaybe<Array<Scalars['github_code_review_outcome']>>;
};

export type GithubIssue = {
  __typename?: 'GithubIssue';
  author: GithubUser;
  closedAt: Maybe<Scalars['DateTimeUtc']>;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['DateTimeUtc'];
  htmlUrl: Scalars['Url'];
  id: Scalars['Int'];
  number: Scalars['Int'];
  repoId: Scalars['Int'];
  status: GithubIssueStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTimeUtc'];
};

export enum GithubIssueStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Open = 'OPEN'
}

/** columns and relationships of "api.github_issues" */
export type GithubIssues = {
  __typename?: 'GithubIssues';
  assigneeIds: Maybe<Scalars['jsonb']>;
  authorId: Maybe<Scalars['bigint']>;
  closedAt: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  closedByPullRequests: Array<ApiClosedByPullRequests>;
  /** An aggregate relationship */
  closedByPullRequestsAggregate: ApiClosedByPullRequestsAggregate;
  commentsCount: Maybe<Scalars['bigint']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  /** An object relationship */
  repo: Maybe<GithubRepos>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};


/** columns and relationships of "api.github_issues" */
export type GithubIssuesAssigneeIdsArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "api.github_issues" */
export type GithubIssuesClosedByPullRequestsArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


/** columns and relationships of "api.github_issues" */
export type GithubIssuesClosedByPullRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};

/** aggregated selection of "api.github_issues" */
export type GithubIssuesAggregate = {
  __typename?: 'GithubIssuesAggregate';
  aggregate: Maybe<GithubIssuesAggregateFields>;
  nodes: Array<GithubIssues>;
};

/** aggregate fields of "api.github_issues" */
export type GithubIssuesAggregateFields = {
  __typename?: 'GithubIssuesAggregateFields';
  avg: Maybe<GithubIssuesAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubIssuesMaxFields>;
  min: Maybe<GithubIssuesMinFields>;
  stddev: Maybe<GithubIssuesStddevFields>;
  stddevPop: Maybe<GithubIssuesStddev_PopFields>;
  stddevSamp: Maybe<GithubIssuesStddev_SampFields>;
  sum: Maybe<GithubIssuesSumFields>;
  varPop: Maybe<GithubIssuesVar_PopFields>;
  varSamp: Maybe<GithubIssuesVar_SampFields>;
  variance: Maybe<GithubIssuesVarianceFields>;
};


/** aggregate fields of "api.github_issues" */
export type GithubIssuesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.github_issues" */
export type GithubIssuesAggregateOrderBy = {
  avg: InputMaybe<GithubIssues_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<GithubIssues_Max_Order_By>;
  min: InputMaybe<GithubIssues_Min_Order_By>;
  stddev: InputMaybe<GithubIssues_Stddev_Order_By>;
  stddev_pop: InputMaybe<GithubIssues_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<GithubIssues_Stddev_Samp_Order_By>;
  sum: InputMaybe<GithubIssues_Sum_Order_By>;
  var_pop: InputMaybe<GithubIssues_Var_Pop_Order_By>;
  var_samp: InputMaybe<GithubIssues_Var_Samp_Order_By>;
  variance: InputMaybe<GithubIssues_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type GithubIssuesAppendInput = {
  assigneeIds: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "api.github_issues" */
export type GithubIssuesArrRelInsertInput = {
  data: Array<GithubIssuesInsertInput>;
};

/** aggregate avg on columns */
export type GithubIssuesAvgFields = {
  __typename?: 'GithubIssuesAvgFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.github_issues". All fields are combined with a logical 'AND'. */
export type GithubIssuesBoolExp = {
  _and: InputMaybe<Array<GithubIssuesBoolExp>>;
  _not: InputMaybe<GithubIssuesBoolExp>;
  _or: InputMaybe<Array<GithubIssuesBoolExp>>;
  assigneeIds: InputMaybe<JsonbComparisonExp>;
  authorId: InputMaybe<BigintComparisonExp>;
  closedAt: InputMaybe<TimestampComparisonExp>;
  closedByPullRequests: InputMaybe<ApiClosedByPullRequestsBoolExp>;
  closedByPullRequests_aggregate: InputMaybe<Api_Closed_By_Pull_Requests_Aggregate_Bool_Exp>;
  commentsCount: InputMaybe<BigintComparisonExp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  number: InputMaybe<BigintComparisonExp>;
  repo: InputMaybe<GithubReposBoolExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  status: InputMaybe<StringComparisonExp>;
  title: InputMaybe<StringComparisonExp>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GithubIssuesDeleteAtPathInput = {
  assigneeIds: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GithubIssuesDeleteElemInput = {
  assigneeIds: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GithubIssuesDeleteKeyInput = {
  assigneeIds: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "api.github_issues" */
export type GithubIssuesIncInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  commentsCount: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.github_issues" */
export type GithubIssuesInsertInput = {
  assigneeIds: InputMaybe<Scalars['jsonb']>;
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  closedByPullRequests: InputMaybe<ApiClosedByPullRequestsArrRelInsertInput>;
  commentsCount: InputMaybe<Scalars['bigint']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  repo: InputMaybe<GithubReposObjRelInsertInput>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GithubIssuesMaxFields = {
  __typename?: 'GithubIssuesMaxFields';
  authorId: Maybe<Scalars['bigint']>;
  closedAt: Maybe<Scalars['timestamp']>;
  commentsCount: Maybe<Scalars['bigint']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GithubIssuesMinFields = {
  __typename?: 'GithubIssuesMinFields';
  authorId: Maybe<Scalars['bigint']>;
  closedAt: Maybe<Scalars['timestamp']>;
  commentsCount: Maybe<Scalars['bigint']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "api.github_issues" */
export type GithubIssuesMutationResponse = {
  __typename?: 'GithubIssuesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubIssues>;
};

/** input type for inserting object relation for remote table "api.github_issues" */
export type GithubIssuesObjRelInsertInput = {
  data: GithubIssuesInsertInput;
};

/** Ordering options when selecting data from "api.github_issues". */
export type GithubIssuesOrderBy = {
  assigneeIds: InputMaybe<OrderBy>;
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  closedByPullRequestsAggregate: InputMaybe<ApiClosedByPullRequestsAggregateOrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repo: InputMaybe<GithubReposOrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GithubIssuesPrependInput = {
  assigneeIds: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "api.github_issues" */
export enum GithubIssuesSelectColumn {
  /** column name */
  AssigneeIds = 'assigneeIds',
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CommentsCount = 'commentsCount',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "api.github_issues" */
export type GithubIssuesSetInput = {
  assigneeIds: InputMaybe<Scalars['jsonb']>;
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  commentsCount: InputMaybe<Scalars['bigint']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GithubIssuesStddevFields = {
  __typename?: 'GithubIssuesStddevFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubIssuesStddev_PopFields = {
  __typename?: 'GithubIssuesStddev_popFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubIssuesStddev_SampFields = {
  __typename?: 'GithubIssuesStddev_sampFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubIssuesSumFields = {
  __typename?: 'GithubIssuesSumFields';
  authorId: Maybe<Scalars['bigint']>;
  commentsCount: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

export type GithubIssuesUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<GithubIssuesAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<GithubIssuesDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<GithubIssuesDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<GithubIssuesDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubIssuesIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<GithubIssuesPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubIssuesSetInput>;
  where: GithubIssuesBoolExp;
};

/** aggregate var_pop on columns */
export type GithubIssuesVar_PopFields = {
  __typename?: 'GithubIssuesVar_popFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubIssuesVar_SampFields = {
  __typename?: 'GithubIssuesVar_sampFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubIssuesVarianceFields = {
  __typename?: 'GithubIssuesVarianceFields';
  authorId: Maybe<Scalars['Float']>;
  commentsCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

export type GithubIssues_Aggregate_Bool_Exp = {
  count: InputMaybe<GithubIssues_Aggregate_Bool_Exp_Count>;
};

export type GithubIssues_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<GithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<GithubIssuesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.github_issues" */
export type GithubIssues_Avg_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.github_issues" */
export type GithubIssues_Max_Order_By = {
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.github_issues" */
export type GithubIssues_Min_Order_By = {
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.github_issues" */
export type GithubIssues_Stddev_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.github_issues" */
export type GithubIssues_Stddev_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.github_issues" */
export type GithubIssues_Stddev_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "GithubIssues" */
export type GithubIssues_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GithubIssues_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GithubIssues_StreamCursorValueInput = {
  assigneeIds: InputMaybe<Scalars['jsonb']>;
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  commentsCount: InputMaybe<Scalars['bigint']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "api.github_issues" */
export type GithubIssues_Sum_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.github_issues" */
export type GithubIssues_Var_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.github_issues" */
export type GithubIssues_Var_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.github_issues" */
export type GithubIssues_Variance_Order_By = {
  authorId: InputMaybe<OrderBy>;
  commentsCount: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

export type GithubPullRequest = {
  __typename?: 'GithubPullRequest';
  author: GithubUser;
  closedAt: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  htmlUrl: Scalars['Url'];
  id: Scalars['Int'];
  mergedAt: Maybe<Scalars['DateTimeUtc']>;
  number: Scalars['Int'];
  repoId: Scalars['Int'];
  status: GithubPullRequestStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTimeUtc'];
};

/** columns and relationships of "github_pull_request_commits" */
export type GithubPullRequestCommits = {
  __typename?: 'GithubPullRequestCommits';
  /** An object relationship */
  author: Maybe<GithubUsers>;
  authorId: Scalars['bigint'];
  htmlUrl: Scalars['String'];
  pullRequestId: Scalars['bigint'];
  sha: Scalars['String'];
};

/** aggregated selection of "github_pull_request_commits" */
export type GithubPullRequestCommitsAggregate = {
  __typename?: 'GithubPullRequestCommitsAggregate';
  aggregate: Maybe<GithubPullRequestCommitsAggregateFields>;
  nodes: Array<GithubPullRequestCommits>;
};

/** aggregate fields of "github_pull_request_commits" */
export type GithubPullRequestCommitsAggregateFields = {
  __typename?: 'GithubPullRequestCommitsAggregateFields';
  avg: Maybe<GithubPullRequestCommitsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubPullRequestCommitsMaxFields>;
  min: Maybe<GithubPullRequestCommitsMinFields>;
  stddev: Maybe<GithubPullRequestCommitsStddevFields>;
  stddevPop: Maybe<GithubPullRequestCommitsStddev_PopFields>;
  stddevSamp: Maybe<GithubPullRequestCommitsStddev_SampFields>;
  sum: Maybe<GithubPullRequestCommitsSumFields>;
  varPop: Maybe<GithubPullRequestCommitsVar_PopFields>;
  varSamp: Maybe<GithubPullRequestCommitsVar_SampFields>;
  variance: Maybe<GithubPullRequestCommitsVarianceFields>;
};


/** aggregate fields of "github_pull_request_commits" */
export type GithubPullRequestCommitsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "github_pull_request_commits" */
export type GithubPullRequestCommitsAggregateOrderBy = {
  avg: InputMaybe<Github_Pull_Request_Commits_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Github_Pull_Request_Commits_Max_Order_By>;
  min: InputMaybe<Github_Pull_Request_Commits_Min_Order_By>;
  stddev: InputMaybe<Github_Pull_Request_Commits_Stddev_Order_By>;
  stddev_pop: InputMaybe<Github_Pull_Request_Commits_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Github_Pull_Request_Commits_Stddev_Samp_Order_By>;
  sum: InputMaybe<Github_Pull_Request_Commits_Sum_Order_By>;
  var_pop: InputMaybe<Github_Pull_Request_Commits_Var_Pop_Order_By>;
  var_samp: InputMaybe<Github_Pull_Request_Commits_Var_Samp_Order_By>;
  variance: InputMaybe<Github_Pull_Request_Commits_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "github_pull_request_commits" */
export type GithubPullRequestCommitsArrRelInsertInput = {
  data: Array<GithubPullRequestCommitsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<GithubPullRequestCommitsOnConflict>;
};

/** aggregate avg on columns */
export type GithubPullRequestCommitsAvgFields = {
  __typename?: 'GithubPullRequestCommitsAvgFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "github_pull_request_commits". All fields are combined with a logical 'AND'. */
export type GithubPullRequestCommitsBoolExp = {
  _and: InputMaybe<Array<GithubPullRequestCommitsBoolExp>>;
  _not: InputMaybe<GithubPullRequestCommitsBoolExp>;
  _or: InputMaybe<Array<GithubPullRequestCommitsBoolExp>>;
  author: InputMaybe<GithubUsersBoolExp>;
  authorId: InputMaybe<BigintComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  pullRequestId: InputMaybe<BigintComparisonExp>;
  sha: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "github_pull_request_commits" */
export enum GithubPullRequestCommitsConstraint {
  /** unique or primary key constraint on columns "sha", "pull_request_id" */
  GithubPullRequestCommitsPkey = 'github_pull_request_commits_pkey'
}

/** input type for incrementing numeric columns in table "github_pull_request_commits" */
export type GithubPullRequestCommitsIncInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "github_pull_request_commits" */
export type GithubPullRequestCommitsInsertInput = {
  author: InputMaybe<GithubUsersObjRelInsertInput>;
  authorId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  sha: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GithubPullRequestCommitsMaxFields = {
  __typename?: 'GithubPullRequestCommitsMaxFields';
  authorId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  pullRequestId: Maybe<Scalars['bigint']>;
  sha: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GithubPullRequestCommitsMinFields = {
  __typename?: 'GithubPullRequestCommitsMinFields';
  authorId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  pullRequestId: Maybe<Scalars['bigint']>;
  sha: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "github_pull_request_commits" */
export type GithubPullRequestCommitsMutationResponse = {
  __typename?: 'GithubPullRequestCommitsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubPullRequestCommits>;
};

/** on_conflict condition type for table "github_pull_request_commits" */
export type GithubPullRequestCommitsOnConflict = {
  constraint: GithubPullRequestCommitsConstraint;
  update_columns: Array<GithubPullRequestCommitsUpdateColumn>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};

/** Ordering options when selecting data from "github_pull_request_commits". */
export type GithubPullRequestCommitsOrderBy = {
  author: InputMaybe<GithubUsersOrderBy>;
  authorId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
  sha: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_pull_request_commits */
export type GithubPullRequestCommitsPkColumnsInput = {
  pullRequestId: Scalars['bigint'];
  sha: Scalars['String'];
};

/** select columns of table "github_pull_request_commits" */
export enum GithubPullRequestCommitsSelectColumn {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  PullRequestId = 'pullRequestId',
  /** column name */
  Sha = 'sha'
}

/** input type for updating data in table "github_pull_request_commits" */
export type GithubPullRequestCommitsSetInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  sha: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GithubPullRequestCommitsStddevFields = {
  __typename?: 'GithubPullRequestCommitsStddevFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubPullRequestCommitsStddev_PopFields = {
  __typename?: 'GithubPullRequestCommitsStddev_popFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubPullRequestCommitsStddev_SampFields = {
  __typename?: 'GithubPullRequestCommitsStddev_sampFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubPullRequestCommitsSumFields = {
  __typename?: 'GithubPullRequestCommitsSumFields';
  authorId: Maybe<Scalars['bigint']>;
  pullRequestId: Maybe<Scalars['bigint']>;
};

/** update columns of table "github_pull_request_commits" */
export enum GithubPullRequestCommitsUpdateColumn {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  PullRequestId = 'pullRequestId',
  /** column name */
  Sha = 'sha'
}

export type GithubPullRequestCommitsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubPullRequestCommitsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubPullRequestCommitsSetInput>;
  where: GithubPullRequestCommitsBoolExp;
};

/** aggregate var_pop on columns */
export type GithubPullRequestCommitsVar_PopFields = {
  __typename?: 'GithubPullRequestCommitsVar_popFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubPullRequestCommitsVar_SampFields = {
  __typename?: 'GithubPullRequestCommitsVar_sampFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubPullRequestCommitsVarianceFields = {
  __typename?: 'GithubPullRequestCommitsVarianceFields';
  authorId: Maybe<Scalars['Float']>;
  pullRequestId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "api.github_pull_request_reviews" */
export type GithubPullRequestReviews = {
  __typename?: 'GithubPullRequestReviews';
  /** An object relationship */
  githubPullRequest: Maybe<GithubPullRequests>;
  id: Maybe<Scalars['String']>;
  outcome: Maybe<Scalars['github_code_review_outcome']>;
  pullRequestId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  reviewer: Maybe<GithubUsers>;
  reviewerId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  submittedAt: Maybe<Scalars['timestamp']>;
};

/** aggregated selection of "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsAggregate = {
  __typename?: 'GithubPullRequestReviewsAggregate';
  aggregate: Maybe<GithubPullRequestReviewsAggregateFields>;
  nodes: Array<GithubPullRequestReviews>;
};

/** aggregate fields of "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsAggregateFields = {
  __typename?: 'GithubPullRequestReviewsAggregateFields';
  avg: Maybe<GithubPullRequestReviewsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubPullRequestReviewsMaxFields>;
  min: Maybe<GithubPullRequestReviewsMinFields>;
  stddev: Maybe<GithubPullRequestReviewsStddevFields>;
  stddevPop: Maybe<GithubPullRequestReviewsStddev_PopFields>;
  stddevSamp: Maybe<GithubPullRequestReviewsStddev_SampFields>;
  sum: Maybe<GithubPullRequestReviewsSumFields>;
  varPop: Maybe<GithubPullRequestReviewsVar_PopFields>;
  varSamp: Maybe<GithubPullRequestReviewsVar_SampFields>;
  variance: Maybe<GithubPullRequestReviewsVarianceFields>;
};


/** aggregate fields of "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubPullRequestReviewsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GithubPullRequestReviewsAvgFields = {
  __typename?: 'GithubPullRequestReviewsAvgFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.github_pull_request_reviews". All fields are combined with a logical 'AND'. */
export type GithubPullRequestReviewsBoolExp = {
  _and: InputMaybe<Array<GithubPullRequestReviewsBoolExp>>;
  _not: InputMaybe<GithubPullRequestReviewsBoolExp>;
  _or: InputMaybe<Array<GithubPullRequestReviewsBoolExp>>;
  githubPullRequest: InputMaybe<GithubPullRequestsBoolExp>;
  id: InputMaybe<StringComparisonExp>;
  outcome: InputMaybe<GithubCodeReviewOutcomeComparisonExp>;
  pullRequestId: InputMaybe<BigintComparisonExp>;
  reviewer: InputMaybe<GithubUsersBoolExp>;
  reviewerId: InputMaybe<BigintComparisonExp>;
  status: InputMaybe<StringComparisonExp>;
  submittedAt: InputMaybe<TimestampComparisonExp>;
};

/** input type for incrementing numeric columns in table "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsIncInput = {
  pullRequestId: InputMaybe<Scalars['bigint']>;
  reviewerId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsInsertInput = {
  githubPullRequest: InputMaybe<GithubPullRequestsObjRelInsertInput>;
  id: InputMaybe<Scalars['String']>;
  outcome: InputMaybe<Scalars['github_code_review_outcome']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  reviewer: InputMaybe<GithubUsersObjRelInsertInput>;
  reviewerId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  submittedAt: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type GithubPullRequestReviewsMaxFields = {
  __typename?: 'GithubPullRequestReviewsMaxFields';
  id: Maybe<Scalars['String']>;
  outcome: Maybe<Scalars['github_code_review_outcome']>;
  pullRequestId: Maybe<Scalars['bigint']>;
  reviewerId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  submittedAt: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type GithubPullRequestReviewsMinFields = {
  __typename?: 'GithubPullRequestReviewsMinFields';
  id: Maybe<Scalars['String']>;
  outcome: Maybe<Scalars['github_code_review_outcome']>;
  pullRequestId: Maybe<Scalars['bigint']>;
  reviewerId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  submittedAt: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsMutationResponse = {
  __typename?: 'GithubPullRequestReviewsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubPullRequestReviews>;
};

/** input type for inserting object relation for remote table "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsObjRelInsertInput = {
  data: GithubPullRequestReviewsInsertInput;
};

/** Ordering options when selecting data from "api.github_pull_request_reviews". */
export type GithubPullRequestReviewsOrderBy = {
  githubPullRequest: InputMaybe<GithubPullRequestsOrderBy>;
  id: InputMaybe<OrderBy>;
  outcome: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
  reviewer: InputMaybe<GithubUsersOrderBy>;
  reviewerId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  submittedAt: InputMaybe<OrderBy>;
};

/** select columns of table "api.github_pull_request_reviews" */
export enum GithubPullRequestReviewsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Outcome = 'outcome',
  /** column name */
  PullRequestId = 'pullRequestId',
  /** column name */
  ReviewerId = 'reviewerId',
  /** column name */
  Status = 'status',
  /** column name */
  SubmittedAt = 'submittedAt'
}

/** input type for updating data in table "api.github_pull_request_reviews" */
export type GithubPullRequestReviewsSetInput = {
  id: InputMaybe<Scalars['String']>;
  outcome: InputMaybe<Scalars['github_code_review_outcome']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  reviewerId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  submittedAt: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type GithubPullRequestReviewsStddevFields = {
  __typename?: 'GithubPullRequestReviewsStddevFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubPullRequestReviewsStddev_PopFields = {
  __typename?: 'GithubPullRequestReviewsStddev_popFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubPullRequestReviewsStddev_SampFields = {
  __typename?: 'GithubPullRequestReviewsStddev_sampFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubPullRequestReviewsSumFields = {
  __typename?: 'GithubPullRequestReviewsSumFields';
  pullRequestId: Maybe<Scalars['bigint']>;
  reviewerId: Maybe<Scalars['bigint']>;
};

export type GithubPullRequestReviewsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubPullRequestReviewsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubPullRequestReviewsSetInput>;
  where: GithubPullRequestReviewsBoolExp;
};

/** aggregate var_pop on columns */
export type GithubPullRequestReviewsVar_PopFields = {
  __typename?: 'GithubPullRequestReviewsVar_popFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubPullRequestReviewsVar_SampFields = {
  __typename?: 'GithubPullRequestReviewsVar_sampFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubPullRequestReviewsVarianceFields = {
  __typename?: 'GithubPullRequestReviewsVarianceFields';
  pullRequestId: Maybe<Scalars['Float']>;
  reviewerId: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "GithubPullRequestReviews" */
export type GithubPullRequestReviews_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GithubPullRequestReviews_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GithubPullRequestReviews_StreamCursorValueInput = {
  id: InputMaybe<Scalars['String']>;
  outcome: InputMaybe<Scalars['github_code_review_outcome']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  reviewerId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  submittedAt: InputMaybe<Scalars['timestamp']>;
};

export enum GithubPullRequestStatus {
  Closed = 'CLOSED',
  Merged = 'MERGED',
  Open = 'OPEN'
}

/** columns and relationships of "api.github_pull_requests" */
export type GithubPullRequests = {
  __typename?: 'GithubPullRequests';
  /** An object relationship */
  author: Maybe<GithubUsers>;
  authorId: Maybe<Scalars['bigint']>;
  ciChecks: Maybe<Scalars['github_ci_checks']>;
  closedAt: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  closingIssues: Array<ApiClosingIssues>;
  /** An aggregate relationship */
  closingIssuesAggregate: ApiClosingIssuesAggregate;
  /** An array relationship */
  commits: Array<GithubPullRequestCommits>;
  /** An aggregate relationship */
  commitsAggregate: GithubPullRequestCommitsAggregate;
  createdAt: Maybe<Scalars['timestamp']>;
  draft: Maybe<Scalars['Boolean']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  mergedAt: Maybe<Scalars['timestamp']>;
  number: Maybe<Scalars['bigint']>;
  /** An object relationship */
  repo: Maybe<GithubRepos>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};


/** columns and relationships of "api.github_pull_requests" */
export type GithubPullRequestsClosingIssuesArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


/** columns and relationships of "api.github_pull_requests" */
export type GithubPullRequestsClosingIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


/** columns and relationships of "api.github_pull_requests" */
export type GithubPullRequestsCommitsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


/** columns and relationships of "api.github_pull_requests" */
export type GithubPullRequestsCommitsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};

/** aggregated selection of "api.github_pull_requests" */
export type GithubPullRequestsAggregate = {
  __typename?: 'GithubPullRequestsAggregate';
  aggregate: Maybe<GithubPullRequestsAggregateFields>;
  nodes: Array<GithubPullRequests>;
};

/** aggregate fields of "api.github_pull_requests" */
export type GithubPullRequestsAggregateFields = {
  __typename?: 'GithubPullRequestsAggregateFields';
  avg: Maybe<GithubPullRequestsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubPullRequestsMaxFields>;
  min: Maybe<GithubPullRequestsMinFields>;
  stddev: Maybe<GithubPullRequestsStddevFields>;
  stddevPop: Maybe<GithubPullRequestsStddev_PopFields>;
  stddevSamp: Maybe<GithubPullRequestsStddev_SampFields>;
  sum: Maybe<GithubPullRequestsSumFields>;
  varPop: Maybe<GithubPullRequestsVar_PopFields>;
  varSamp: Maybe<GithubPullRequestsVar_SampFields>;
  variance: Maybe<GithubPullRequestsVarianceFields>;
};


/** aggregate fields of "api.github_pull_requests" */
export type GithubPullRequestsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubPullRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GithubPullRequestsAvgFields = {
  __typename?: 'GithubPullRequestsAvgFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.github_pull_requests". All fields are combined with a logical 'AND'. */
export type GithubPullRequestsBoolExp = {
  _and: InputMaybe<Array<GithubPullRequestsBoolExp>>;
  _not: InputMaybe<GithubPullRequestsBoolExp>;
  _or: InputMaybe<Array<GithubPullRequestsBoolExp>>;
  author: InputMaybe<GithubUsersBoolExp>;
  authorId: InputMaybe<BigintComparisonExp>;
  ciChecks: InputMaybe<GithubCiChecksComparisonExp>;
  closedAt: InputMaybe<TimestampComparisonExp>;
  closingIssues: InputMaybe<ApiClosingIssuesBoolExp>;
  closingIssues_aggregate: InputMaybe<Api_Closing_Issues_Aggregate_Bool_Exp>;
  commits: InputMaybe<GithubPullRequestCommitsBoolExp>;
  commits_aggregate: InputMaybe<Github_Pull_Request_Commits_Aggregate_Bool_Exp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  draft: InputMaybe<BooleanComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  mergedAt: InputMaybe<TimestampComparisonExp>;
  number: InputMaybe<BigintComparisonExp>;
  repo: InputMaybe<GithubReposBoolExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  status: InputMaybe<StringComparisonExp>;
  title: InputMaybe<StringComparisonExp>;
};

/** input type for incrementing numeric columns in table "api.github_pull_requests" */
export type GithubPullRequestsIncInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.github_pull_requests" */
export type GithubPullRequestsInsertInput = {
  author: InputMaybe<GithubUsersObjRelInsertInput>;
  authorId: InputMaybe<Scalars['bigint']>;
  ciChecks: InputMaybe<Scalars['github_ci_checks']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  closingIssues: InputMaybe<ApiClosingIssuesArrRelInsertInput>;
  commits: InputMaybe<GithubPullRequestCommitsArrRelInsertInput>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  draft: InputMaybe<Scalars['Boolean']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  number: InputMaybe<Scalars['bigint']>;
  repo: InputMaybe<GithubReposObjRelInsertInput>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GithubPullRequestsMaxFields = {
  __typename?: 'GithubPullRequestsMaxFields';
  authorId: Maybe<Scalars['bigint']>;
  ciChecks: Maybe<Scalars['github_ci_checks']>;
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  mergedAt: Maybe<Scalars['timestamp']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GithubPullRequestsMinFields = {
  __typename?: 'GithubPullRequestsMinFields';
  authorId: Maybe<Scalars['bigint']>;
  ciChecks: Maybe<Scalars['github_ci_checks']>;
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  mergedAt: Maybe<Scalars['timestamp']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  status: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "api.github_pull_requests" */
export type GithubPullRequestsMutationResponse = {
  __typename?: 'GithubPullRequestsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubPullRequests>;
};

/** input type for inserting object relation for remote table "api.github_pull_requests" */
export type GithubPullRequestsObjRelInsertInput = {
  data: GithubPullRequestsInsertInput;
};

/** Ordering options when selecting data from "api.github_pull_requests". */
export type GithubPullRequestsOrderBy = {
  author: InputMaybe<GithubUsersOrderBy>;
  authorId: InputMaybe<OrderBy>;
  ciChecks: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  closingIssuesAggregate: InputMaybe<ApiClosingIssuesAggregateOrderBy>;
  commitsAggregate: InputMaybe<GithubPullRequestCommitsAggregateOrderBy>;
  createdAt: InputMaybe<OrderBy>;
  draft: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  mergedAt: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  repo: InputMaybe<GithubReposOrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** select columns of table "api.github_pull_requests" */
export enum GithubPullRequestsSelectColumn {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  CiChecks = 'ciChecks',
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Draft = 'draft',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  MergedAt = 'mergedAt',
  /** column name */
  Number = 'number',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title'
}

/** input type for updating data in table "api.github_pull_requests" */
export type GithubPullRequestsSetInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  ciChecks: InputMaybe<Scalars['github_ci_checks']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  draft: InputMaybe<Scalars['Boolean']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GithubPullRequestsStddevFields = {
  __typename?: 'GithubPullRequestsStddevFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubPullRequestsStddev_PopFields = {
  __typename?: 'GithubPullRequestsStddev_popFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubPullRequestsStddev_SampFields = {
  __typename?: 'GithubPullRequestsStddev_sampFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubPullRequestsSumFields = {
  __typename?: 'GithubPullRequestsSumFields';
  authorId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

export type GithubPullRequestsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubPullRequestsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubPullRequestsSetInput>;
  where: GithubPullRequestsBoolExp;
};

/** aggregate var_pop on columns */
export type GithubPullRequestsVar_PopFields = {
  __typename?: 'GithubPullRequestsVar_popFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubPullRequestsVar_SampFields = {
  __typename?: 'GithubPullRequestsVar_sampFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubPullRequestsVarianceFields = {
  __typename?: 'GithubPullRequestsVarianceFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "GithubPullRequests" */
export type GithubPullRequests_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GithubPullRequests_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GithubPullRequests_StreamCursorValueInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  ciChecks: InputMaybe<Scalars['github_ci_checks']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  draft: InputMaybe<Scalars['Boolean']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  number: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "api.github_repos" */
export type GithubRepos = {
  __typename?: 'GithubRepos';
  description: Maybe<Scalars['String']>;
  forkCount: Maybe<Scalars['Int']>;
  hasIssues: Maybe<Scalars['Boolean']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  indexedAt: Maybe<Scalars['timestamp']>;
  languages: Maybe<Scalars['jsonb']>;
  name: Maybe<Scalars['String']>;
  owner: Maybe<Scalars['String']>;
  parentId: Maybe<Scalars['bigint']>;
  /** An array relationship */
  projects: Array<ProjectGithubRepos>;
  /** An aggregate relationship */
  projectsAggregate: ProjectGithubReposAggregate;
  stars: Maybe<Scalars['Int']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "api.github_repos" */
export type GithubReposLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "api.github_repos" */
export type GithubReposProjectsArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


/** columns and relationships of "api.github_repos" */
export type GithubReposProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};

/** aggregated selection of "api.github_repos" */
export type GithubReposAggregate = {
  __typename?: 'GithubReposAggregate';
  aggregate: Maybe<GithubReposAggregateFields>;
  nodes: Array<GithubRepos>;
};

/** aggregate fields of "api.github_repos" */
export type GithubReposAggregateFields = {
  __typename?: 'GithubReposAggregateFields';
  avg: Maybe<GithubReposAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubReposMaxFields>;
  min: Maybe<GithubReposMinFields>;
  stddev: Maybe<GithubReposStddevFields>;
  stddevPop: Maybe<GithubReposStddev_PopFields>;
  stddevSamp: Maybe<GithubReposStddev_SampFields>;
  sum: Maybe<GithubReposSumFields>;
  varPop: Maybe<GithubReposVar_PopFields>;
  varSamp: Maybe<GithubReposVar_SampFields>;
  variance: Maybe<GithubReposVarianceFields>;
};


/** aggregate fields of "api.github_repos" */
export type GithubReposAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubReposSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GithubReposAvgFields = {
  __typename?: 'GithubReposAvgFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.github_repos". All fields are combined with a logical 'AND'. */
export type GithubReposBoolExp = {
  _and: InputMaybe<Array<GithubReposBoolExp>>;
  _not: InputMaybe<GithubReposBoolExp>;
  _or: InputMaybe<Array<GithubReposBoolExp>>;
  description: InputMaybe<StringComparisonExp>;
  forkCount: InputMaybe<IntComparisonExp>;
  hasIssues: InputMaybe<BooleanComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  indexedAt: InputMaybe<TimestampComparisonExp>;
  languages: InputMaybe<JsonbComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  owner: InputMaybe<StringComparisonExp>;
  parentId: InputMaybe<BigintComparisonExp>;
  projects: InputMaybe<ProjectGithubReposBoolExp>;
  projects_aggregate: InputMaybe<Project_Github_Repos_Aggregate_Bool_Exp>;
  stars: InputMaybe<IntComparisonExp>;
  updatedAt: InputMaybe<TimestampComparisonExp>;
};

/** input type for inserting data into table "api.github_repos" */
export type GithubReposInsertInput = {
  description: InputMaybe<Scalars['String']>;
  forkCount: InputMaybe<Scalars['Int']>;
  hasIssues: InputMaybe<Scalars['Boolean']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  indexedAt: InputMaybe<Scalars['timestamp']>;
  languages: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
  parentId: InputMaybe<Scalars['bigint']>;
  projects: InputMaybe<ProjectGithubReposArrRelInsertInput>;
  stars: InputMaybe<Scalars['Int']>;
  updatedAt: InputMaybe<Scalars['timestamp']>;
};

/** aggregate max on columns */
export type GithubReposMaxFields = {
  __typename?: 'GithubReposMaxFields';
  description: Maybe<Scalars['String']>;
  forkCount: Maybe<Scalars['Int']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  indexedAt: Maybe<Scalars['timestamp']>;
  name: Maybe<Scalars['String']>;
  owner: Maybe<Scalars['String']>;
  parentId: Maybe<Scalars['bigint']>;
  stars: Maybe<Scalars['Int']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** aggregate min on columns */
export type GithubReposMinFields = {
  __typename?: 'GithubReposMinFields';
  description: Maybe<Scalars['String']>;
  forkCount: Maybe<Scalars['Int']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  indexedAt: Maybe<Scalars['timestamp']>;
  name: Maybe<Scalars['String']>;
  owner: Maybe<Scalars['String']>;
  parentId: Maybe<Scalars['bigint']>;
  stars: Maybe<Scalars['Int']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** input type for inserting object relation for remote table "api.github_repos" */
export type GithubReposObjRelInsertInput = {
  data: GithubReposInsertInput;
};

/** Ordering options when selecting data from "api.github_repos". */
export type GithubReposOrderBy = {
  description: InputMaybe<OrderBy>;
  forkCount: InputMaybe<OrderBy>;
  hasIssues: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  indexedAt: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  owner: InputMaybe<OrderBy>;
  parentId: InputMaybe<OrderBy>;
  projectsAggregate: InputMaybe<ProjectGithubReposAggregateOrderBy>;
  stars: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

/** select columns of table "api.github_repos" */
export enum GithubReposSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  ForkCount = 'forkCount',
  /** column name */
  HasIssues = 'hasIssues',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  IndexedAt = 'indexedAt',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner',
  /** column name */
  ParentId = 'parentId',
  /** column name */
  Stars = 'stars',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate stddev on columns */
export type GithubReposStddevFields = {
  __typename?: 'GithubReposStddevFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubReposStddev_PopFields = {
  __typename?: 'GithubReposStddev_popFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubReposStddev_SampFields = {
  __typename?: 'GithubReposStddev_sampFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubReposSumFields = {
  __typename?: 'GithubReposSumFields';
  forkCount: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  parentId: Maybe<Scalars['bigint']>;
  stars: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type GithubReposVar_PopFields = {
  __typename?: 'GithubReposVar_popFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubReposVar_SampFields = {
  __typename?: 'GithubReposVar_sampFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubReposVarianceFields = {
  __typename?: 'GithubReposVarianceFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  parentId: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "GithubRepos" */
export type GithubRepos_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: GithubRepos_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type GithubRepos_StreamCursorValueInput = {
  description: InputMaybe<Scalars['String']>;
  forkCount: InputMaybe<Scalars['Int']>;
  hasIssues: InputMaybe<Scalars['Boolean']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  indexedAt: InputMaybe<Scalars['timestamp']>;
  languages: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
  parentId: InputMaybe<Scalars['bigint']>;
  stars: InputMaybe<Scalars['Int']>;
  updatedAt: InputMaybe<Scalars['timestamp']>;
};

export type GithubUser = {
  __typename?: 'GithubUser';
  avatarUrl: Scalars['Url'];
  htmlUrl: Scalars['Url'];
  id: Scalars['Int'];
  login: Scalars['String'];
  user: Maybe<RegisteredUsers>;
};

/** columns and relationships of "github_users" */
export type GithubUsers = {
  __typename?: 'GithubUsers';
  avatarUrl: Scalars['String'];
  bio: Maybe<Scalars['String']>;
  htmlUrl: Scalars['String'];
  id: Scalars['bigint'];
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Scalars['String'];
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  /** An object relationship */
  user: Maybe<RegisteredUsers>;
  website: Maybe<Scalars['String']>;
};


/** columns and relationships of "github_users" */
export type GithubUsersPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


/** columns and relationships of "github_users" */
export type GithubUsersPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};

/** aggregated selection of "github_users" */
export type GithubUsersAggregate = {
  __typename?: 'GithubUsersAggregate';
  aggregate: Maybe<GithubUsersAggregateFields>;
  nodes: Array<GithubUsers>;
};

/** aggregate fields of "github_users" */
export type GithubUsersAggregateFields = {
  __typename?: 'GithubUsersAggregateFields';
  avg: Maybe<GithubUsersAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubUsersMaxFields>;
  min: Maybe<GithubUsersMinFields>;
  stddev: Maybe<GithubUsersStddevFields>;
  stddevPop: Maybe<GithubUsersStddev_PopFields>;
  stddevSamp: Maybe<GithubUsersStddev_SampFields>;
  sum: Maybe<GithubUsersSumFields>;
  varPop: Maybe<GithubUsersVar_PopFields>;
  varSamp: Maybe<GithubUsersVar_SampFields>;
  variance: Maybe<GithubUsersVarianceFields>;
};


/** aggregate fields of "github_users" */
export type GithubUsersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubUsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type GithubUsersAvgFields = {
  __typename?: 'GithubUsersAvgFields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "github_users". All fields are combined with a logical 'AND'. */
export type GithubUsersBoolExp = {
  _and: InputMaybe<Array<GithubUsersBoolExp>>;
  _not: InputMaybe<GithubUsersBoolExp>;
  _or: InputMaybe<Array<GithubUsersBoolExp>>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  bio: InputMaybe<StringComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  linkedin: InputMaybe<StringComparisonExp>;
  location: InputMaybe<StringComparisonExp>;
  login: InputMaybe<StringComparisonExp>;
  paymentRequests: InputMaybe<PaymentRequestsBoolExp>;
  paymentRequests_aggregate: InputMaybe<Payment_Requests_Aggregate_Bool_Exp>;
  telegram: InputMaybe<StringComparisonExp>;
  twitter: InputMaybe<StringComparisonExp>;
  user: InputMaybe<RegisteredUsersBoolExp>;
  website: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "github_users" */
export enum GithubUsersConstraint {
  /** unique or primary key constraint on columns "id" */
  GithubUsersPkey = 'github_users_pkey'
}

/** input type for incrementing numeric columns in table "github_users" */
export type GithubUsersIncInput = {
  id: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "github_users" */
export type GithubUsersInsertInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  paymentRequests: InputMaybe<PaymentRequestsArrRelInsertInput>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  user: InputMaybe<RegisteredUsersObjRelInsertInput>;
  website: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type GithubUsersMaxFields = {
  __typename?: 'GithubUsersMaxFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GithubUsersMinFields = {
  __typename?: 'GithubUsersMinFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "github_users" */
export type GithubUsersMutationResponse = {
  __typename?: 'GithubUsersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubUsers>;
};

/** input type for inserting object relation for remote table "github_users" */
export type GithubUsersObjRelInsertInput = {
  data: GithubUsersInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<GithubUsersOnConflict>;
};

/** on_conflict condition type for table "github_users" */
export type GithubUsersOnConflict = {
  constraint: GithubUsersConstraint;
  update_columns: Array<GithubUsersUpdateColumn>;
  where: InputMaybe<GithubUsersBoolExp>;
};

/** Ordering options when selecting data from "github_users". */
export type GithubUsersOrderBy = {
  avatarUrl: InputMaybe<OrderBy>;
  bio: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  linkedin: InputMaybe<OrderBy>;
  location: InputMaybe<OrderBy>;
  login: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  telegram: InputMaybe<OrderBy>;
  twitter: InputMaybe<OrderBy>;
  user: InputMaybe<RegisteredUsersOrderBy>;
  website: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_users */
export type GithubUsersPkColumnsInput = {
  id: Scalars['bigint'];
};

/** select columns of table "github_users" */
export enum GithubUsersSelectColumn {
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  Bio = 'bio',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Location = 'location',
  /** column name */
  Login = 'login',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Website = 'website'
}

/** input type for updating data in table "github_users" */
export type GithubUsersSetInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type GithubUsersStddevFields = {
  __typename?: 'GithubUsersStddevFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubUsersStddev_PopFields = {
  __typename?: 'GithubUsersStddev_popFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubUsersStddev_SampFields = {
  __typename?: 'GithubUsersStddev_sampFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubUsersSumFields = {
  __typename?: 'GithubUsersSumFields';
  id: Maybe<Scalars['bigint']>;
};

/** update columns of table "github_users" */
export enum GithubUsersUpdateColumn {
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  Bio = 'bio',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  Linkedin = 'linkedin',
  /** column name */
  Location = 'location',
  /** column name */
  Login = 'login',
  /** column name */
  Telegram = 'telegram',
  /** column name */
  Twitter = 'twitter',
  /** column name */
  Website = 'website'
}

export type GithubUsersUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubUsersIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubUsersSetInput>;
  where: GithubUsersBoolExp;
};

/** aggregate var_pop on columns */
export type GithubUsersVar_PopFields = {
  __typename?: 'GithubUsersVar_popFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubUsersVar_SampFields = {
  __typename?: 'GithubUsersVar_sampFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubUsersVarianceFields = {
  __typename?: 'GithubUsersVarianceFields';
  id: Maybe<Scalars['Float']>;
};

export type IdentityInput = {
  optCompany: InputMaybe<CompanyIdentity>;
  optPerson: InputMaybe<PersonIdentity>;
  type: IdentityType;
};

export enum IdentityType {
  Company = 'COMPANY',
  Person = 'PERSON'
}

export type Information = {
  channel: Channel;
  contact: Scalars['String'];
  public: Scalars['Boolean'];
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq: InputMaybe<Scalars['Int']>;
  _gt: InputMaybe<Scalars['Int']>;
  _gte: InputMaybe<Scalars['Int']>;
  _in: InputMaybe<Array<Scalars['Int']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['Int']>;
  _lte: InputMaybe<Scalars['Int']>;
  _neq: InputMaybe<Scalars['Int']>;
  _nin: InputMaybe<Array<Scalars['Int']>>;
};

export type JsonbCastExp = {
  String: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains: InputMaybe<Scalars['jsonb']>;
  _eq: InputMaybe<Scalars['jsonb']>;
  _gt: InputMaybe<Scalars['jsonb']>;
  _gte: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _hasKey: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny: InputMaybe<Array<Scalars['String']>>;
  _in: InputMaybe<Array<Scalars['jsonb']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['jsonb']>;
  _lte: InputMaybe<Scalars['jsonb']>;
  _neq: InputMaybe<Scalars['jsonb']>;
  _nin: InputMaybe<Array<Scalars['jsonb']>>;
};

export type Language = {
  name: Scalars['String'];
  weight: Scalars['Int'];
};

export type Location = {
  address: InputMaybe<Scalars['String']>;
  city: InputMaybe<Scalars['String']>;
  country: InputMaybe<Scalars['String']>;
  postCode: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type NumericComparisonExp = {
  _eq: InputMaybe<Scalars['numeric']>;
  _gt: InputMaybe<Scalars['numeric']>;
  _gte: InputMaybe<Scalars['numeric']>;
  _in: InputMaybe<Array<Scalars['numeric']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['numeric']>;
  _lte: InputMaybe<Scalars['numeric']>;
  _neq: InputMaybe<Scalars['numeric']>;
  _nin: InputMaybe<Array<Scalars['numeric']>>;
};

/** columns and relationships of "onboardings" */
export type Onboardings = {
  __typename?: 'Onboardings';
  profileWizardDisplayDate: Maybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: Maybe<Scalars['timestamp']>;
  userId: Scalars['uuid'];
};

/** aggregated selection of "onboardings" */
export type OnboardingsAggregate = {
  __typename?: 'OnboardingsAggregate';
  aggregate: Maybe<OnboardingsAggregateFields>;
  nodes: Array<Onboardings>;
};

/** aggregate fields of "onboardings" */
export type OnboardingsAggregateFields = {
  __typename?: 'OnboardingsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<OnboardingsMaxFields>;
  min: Maybe<OnboardingsMinFields>;
};


/** aggregate fields of "onboardings" */
export type OnboardingsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<OnboardingsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "onboardings". All fields are combined with a logical 'AND'. */
export type OnboardingsBoolExp = {
  _and: InputMaybe<Array<OnboardingsBoolExp>>;
  _not: InputMaybe<OnboardingsBoolExp>;
  _or: InputMaybe<Array<OnboardingsBoolExp>>;
  profileWizardDisplayDate: InputMaybe<TimestampComparisonExp>;
  termsAndConditionsAcceptanceDate: InputMaybe<TimestampComparisonExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "onboardings" */
export enum OnboardingsConstraint {
  /** unique or primary key constraint on columns "user_id" */
  TermsAndConditionsAcceptancesPkey = 'terms_and_conditions_acceptances_pkey'
}

/** input type for inserting data into table "onboardings" */
export type OnboardingsInsertInput = {
  profileWizardDisplayDate: InputMaybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: InputMaybe<Scalars['timestamp']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type OnboardingsMaxFields = {
  __typename?: 'OnboardingsMaxFields';
  profileWizardDisplayDate: Maybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: Maybe<Scalars['timestamp']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type OnboardingsMinFields = {
  __typename?: 'OnboardingsMinFields';
  profileWizardDisplayDate: Maybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: Maybe<Scalars['timestamp']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "onboardings" */
export type OnboardingsMutationResponse = {
  __typename?: 'OnboardingsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Onboardings>;
};

/** on_conflict condition type for table "onboardings" */
export type OnboardingsOnConflict = {
  constraint: OnboardingsConstraint;
  update_columns: Array<OnboardingsUpdateColumn>;
  where: InputMaybe<OnboardingsBoolExp>;
};

/** Ordering options when selecting data from "onboardings". */
export type OnboardingsOrderBy = {
  profileWizardDisplayDate: InputMaybe<OrderBy>;
  termsAndConditionsAcceptanceDate: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: onboardings */
export type OnboardingsPkColumnsInput = {
  userId: Scalars['uuid'];
};

/** select columns of table "onboardings" */
export enum OnboardingsSelectColumn {
  /** column name */
  ProfileWizardDisplayDate = 'profileWizardDisplayDate',
  /** column name */
  TermsAndConditionsAcceptanceDate = 'termsAndConditionsAcceptanceDate',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "onboardings" */
export type OnboardingsSetInput = {
  profileWizardDisplayDate: InputMaybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: InputMaybe<Scalars['timestamp']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "onboardings" */
export enum OnboardingsUpdateColumn {
  /** column name */
  ProfileWizardDisplayDate = 'profileWizardDisplayDate',
  /** column name */
  TermsAndConditionsAcceptanceDate = 'termsAndConditionsAcceptanceDate',
  /** column name */
  UserId = 'userId'
}

export type OnboardingsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<OnboardingsSetInput>;
  where: OnboardingsBoolExp;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Amount'];
  budgetId: Scalars['Uuid'];
  commandId: Scalars['Uuid'];
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
};

export type PaymentReference = {
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
};

/** columns and relationships of "payment_requests" */
export type PaymentRequests = {
  __typename?: 'PaymentRequests';
  amountInUsd: Scalars['bigint'];
  /** An object relationship */
  budget: Maybe<Budgets>;
  budgetId: Scalars['uuid'];
  /** An object relationship */
  githubRecipient: Maybe<GithubUsers>;
  hoursWorked: Scalars['Int'];
  id: Scalars['uuid'];
  invoiceReceivedAt: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  payments: Array<Payments>;
  /** An aggregate relationship */
  paymentsAggregate: PaymentsAggregate;
  /** An object relationship */
  recipient: Maybe<RegisteredUsers>;
  recipientId: Scalars['bigint'];
  requestedAt: Scalars['timestamp'];
  /** An object relationship */
  requestor: Maybe<RegisteredUsers>;
  requestorId: Scalars['uuid'];
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** An aggregate relationship */
  workItemsAggregate: WorkItemsAggregate;
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsPaymentsArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsPaymentsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsWorkItemsArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


/** columns and relationships of "payment_requests" */
export type PaymentRequestsWorkItemsAggregateArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** aggregated selection of "payment_requests" */
export type PaymentRequestsAggregate = {
  __typename?: 'PaymentRequestsAggregate';
  aggregate: Maybe<PaymentRequestsAggregateFields>;
  nodes: Array<PaymentRequests>;
};

/** aggregate fields of "payment_requests" */
export type PaymentRequestsAggregateFields = {
  __typename?: 'PaymentRequestsAggregateFields';
  avg: Maybe<PaymentRequestsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<PaymentRequestsMaxFields>;
  min: Maybe<PaymentRequestsMinFields>;
  stddev: Maybe<PaymentRequestsStddevFields>;
  stddevPop: Maybe<PaymentRequestsStddev_PopFields>;
  stddevSamp: Maybe<PaymentRequestsStddev_SampFields>;
  sum: Maybe<PaymentRequestsSumFields>;
  varPop: Maybe<PaymentRequestsVar_PopFields>;
  varSamp: Maybe<PaymentRequestsVar_SampFields>;
  variance: Maybe<PaymentRequestsVarianceFields>;
};


/** aggregate fields of "payment_requests" */
export type PaymentRequestsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payment_requests" */
export type PaymentRequestsAggregateOrderBy = {
  avg: InputMaybe<Payment_Requests_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Payment_Requests_Max_Order_By>;
  min: InputMaybe<Payment_Requests_Min_Order_By>;
  stddev: InputMaybe<Payment_Requests_Stddev_Order_By>;
  stddev_pop: InputMaybe<Payment_Requests_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Payment_Requests_Stddev_Samp_Order_By>;
  sum: InputMaybe<Payment_Requests_Sum_Order_By>;
  var_pop: InputMaybe<Payment_Requests_Var_Pop_Order_By>;
  var_samp: InputMaybe<Payment_Requests_Var_Samp_Order_By>;
  variance: InputMaybe<Payment_Requests_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment_requests" */
export type PaymentRequestsArrRelInsertInput = {
  data: Array<PaymentRequestsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<PaymentRequestsOnConflict>;
};

/** aggregate avg on columns */
export type PaymentRequestsAvgFields = {
  __typename?: 'PaymentRequestsAvgFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "payment_requests". All fields are combined with a logical 'AND'. */
export type PaymentRequestsBoolExp = {
  _and: InputMaybe<Array<PaymentRequestsBoolExp>>;
  _not: InputMaybe<PaymentRequestsBoolExp>;
  _or: InputMaybe<Array<PaymentRequestsBoolExp>>;
  amountInUsd: InputMaybe<BigintComparisonExp>;
  budget: InputMaybe<BudgetsBoolExp>;
  budgetId: InputMaybe<UuidComparisonExp>;
  githubRecipient: InputMaybe<GithubUsersBoolExp>;
  hoursWorked: InputMaybe<IntComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  invoiceReceivedAt: InputMaybe<TimestampComparisonExp>;
  payments: InputMaybe<PaymentsBoolExp>;
  payments_aggregate: InputMaybe<Payments_Aggregate_Bool_Exp>;
  recipient: InputMaybe<RegisteredUsersBoolExp>;
  recipientId: InputMaybe<BigintComparisonExp>;
  requestedAt: InputMaybe<TimestampComparisonExp>;
  requestor: InputMaybe<RegisteredUsersBoolExp>;
  requestorId: InputMaybe<UuidComparisonExp>;
  workItems: InputMaybe<WorkItemsBoolExp>;
  workItems_aggregate: InputMaybe<WorkItems_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "payment_requests" */
export enum PaymentRequestsConstraint {
  /** unique or primary key constraint on columns "id" */
  PaymentRequestsPkey1 = 'payment_requests_pkey1'
}

/** input type for incrementing numeric columns in table "payment_requests" */
export type PaymentRequestsIncInput = {
  amountInUsd: InputMaybe<Scalars['bigint']>;
  hoursWorked: InputMaybe<Scalars['Int']>;
  recipientId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "payment_requests" */
export type PaymentRequestsInsertInput = {
  amountInUsd: InputMaybe<Scalars['bigint']>;
  budget: InputMaybe<BudgetsObjRelInsertInput>;
  budgetId: InputMaybe<Scalars['uuid']>;
  githubRecipient: InputMaybe<GithubUsersObjRelInsertInput>;
  hoursWorked: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['uuid']>;
  invoiceReceivedAt: InputMaybe<Scalars['timestamp']>;
  payments: InputMaybe<PaymentsArrRelInsertInput>;
  recipient: InputMaybe<RegisteredUsersObjRelInsertInput>;
  recipientId: InputMaybe<Scalars['bigint']>;
  requestedAt: InputMaybe<Scalars['timestamp']>;
  requestor: InputMaybe<RegisteredUsersObjRelInsertInput>;
  requestorId: InputMaybe<Scalars['uuid']>;
  workItems: InputMaybe<WorkItemsArrRelInsertInput>;
};

/** aggregate max on columns */
export type PaymentRequestsMaxFields = {
  __typename?: 'PaymentRequestsMaxFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  budgetId: Maybe<Scalars['uuid']>;
  hoursWorked: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['uuid']>;
  invoiceReceivedAt: Maybe<Scalars['timestamp']>;
  recipientId: Maybe<Scalars['bigint']>;
  requestedAt: Maybe<Scalars['timestamp']>;
  requestorId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type PaymentRequestsMinFields = {
  __typename?: 'PaymentRequestsMinFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  budgetId: Maybe<Scalars['uuid']>;
  hoursWorked: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['uuid']>;
  invoiceReceivedAt: Maybe<Scalars['timestamp']>;
  recipientId: Maybe<Scalars['bigint']>;
  requestedAt: Maybe<Scalars['timestamp']>;
  requestorId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "payment_requests" */
export type PaymentRequestsMutationResponse = {
  __typename?: 'PaymentRequestsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<PaymentRequests>;
};

/** input type for inserting object relation for remote table "payment_requests" */
export type PaymentRequestsObjRelInsertInput = {
  data: PaymentRequestsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<PaymentRequestsOnConflict>;
};

/** on_conflict condition type for table "payment_requests" */
export type PaymentRequestsOnConflict = {
  constraint: PaymentRequestsConstraint;
  update_columns: Array<PaymentRequestsUpdateColumn>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};

/** Ordering options when selecting data from "payment_requests". */
export type PaymentRequestsOrderBy = {
  amountInUsd: InputMaybe<OrderBy>;
  budget: InputMaybe<BudgetsOrderBy>;
  budgetId: InputMaybe<OrderBy>;
  githubRecipient: InputMaybe<GithubUsersOrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  invoiceReceivedAt: InputMaybe<OrderBy>;
  paymentsAggregate: InputMaybe<PaymentsAggregateOrderBy>;
  recipient: InputMaybe<RegisteredUsersOrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestor: InputMaybe<RegisteredUsersOrderBy>;
  requestorId: InputMaybe<OrderBy>;
  workItemsAggregate: InputMaybe<WorkItemsAggregateOrderBy>;
};

/** primary key columns input for table: payment_requests */
export type PaymentRequestsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "payment_requests" */
export enum PaymentRequestsSelectColumn {
  /** column name */
  AmountInUsd = 'amountInUsd',
  /** column name */
  BudgetId = 'budgetId',
  /** column name */
  HoursWorked = 'hoursWorked',
  /** column name */
  Id = 'id',
  /** column name */
  InvoiceReceivedAt = 'invoiceReceivedAt',
  /** column name */
  RecipientId = 'recipientId',
  /** column name */
  RequestedAt = 'requestedAt',
  /** column name */
  RequestorId = 'requestorId'
}

/** input type for updating data in table "payment_requests" */
export type PaymentRequestsSetInput = {
  amountInUsd: InputMaybe<Scalars['bigint']>;
  budgetId: InputMaybe<Scalars['uuid']>;
  hoursWorked: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['uuid']>;
  invoiceReceivedAt: InputMaybe<Scalars['timestamp']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  requestedAt: InputMaybe<Scalars['timestamp']>;
  requestorId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type PaymentRequestsStddevFields = {
  __typename?: 'PaymentRequestsStddevFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PaymentRequestsStddev_PopFields = {
  __typename?: 'PaymentRequestsStddev_popFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PaymentRequestsStddev_SampFields = {
  __typename?: 'PaymentRequestsStddev_sampFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PaymentRequestsSumFields = {
  __typename?: 'PaymentRequestsSumFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  hoursWorked: Maybe<Scalars['Int']>;
  recipientId: Maybe<Scalars['bigint']>;
};

/** update columns of table "payment_requests" */
export enum PaymentRequestsUpdateColumn {
  /** column name */
  AmountInUsd = 'amountInUsd',
  /** column name */
  BudgetId = 'budgetId',
  /** column name */
  HoursWorked = 'hoursWorked',
  /** column name */
  Id = 'id',
  /** column name */
  InvoiceReceivedAt = 'invoiceReceivedAt',
  /** column name */
  RecipientId = 'recipientId',
  /** column name */
  RequestedAt = 'requestedAt',
  /** column name */
  RequestorId = 'requestorId'
}

export type PaymentRequestsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<PaymentRequestsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<PaymentRequestsSetInput>;
  where: PaymentRequestsBoolExp;
};

/** aggregate var_pop on columns */
export type PaymentRequestsVar_PopFields = {
  __typename?: 'PaymentRequestsVar_popFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PaymentRequestsVar_SampFields = {
  __typename?: 'PaymentRequestsVar_sampFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PaymentRequestsVarianceFields = {
  __typename?: 'PaymentRequestsVarianceFields';
  amountInUsd: Maybe<Scalars['Float']>;
  hoursWorked: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "payment_stats" */
export type PaymentStats = {
  __typename?: 'PaymentStats';
  githubUserId: Maybe<Scalars['bigint']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "payment_stats" */
export type PaymentStatsAggregate = {
  __typename?: 'PaymentStatsAggregate';
  aggregate: Maybe<PaymentStatsAggregateFields>;
  nodes: Array<PaymentStats>;
};

/** aggregate fields of "payment_stats" */
export type PaymentStatsAggregateFields = {
  __typename?: 'PaymentStatsAggregateFields';
  avg: Maybe<PaymentStatsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<PaymentStatsMaxFields>;
  min: Maybe<PaymentStatsMinFields>;
  stddev: Maybe<PaymentStatsStddevFields>;
  stddevPop: Maybe<PaymentStatsStddev_PopFields>;
  stddevSamp: Maybe<PaymentStatsStddev_SampFields>;
  sum: Maybe<PaymentStatsSumFields>;
  varPop: Maybe<PaymentStatsVar_PopFields>;
  varSamp: Maybe<PaymentStatsVar_SampFields>;
  variance: Maybe<PaymentStatsVarianceFields>;
};


/** aggregate fields of "payment_stats" */
export type PaymentStatsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<PaymentStatsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payment_stats" */
export type PaymentStatsAggregateOrderBy = {
  avg: InputMaybe<Payment_Stats_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Payment_Stats_Max_Order_By>;
  min: InputMaybe<Payment_Stats_Min_Order_By>;
  stddev: InputMaybe<Payment_Stats_Stddev_Order_By>;
  stddev_pop: InputMaybe<Payment_Stats_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Payment_Stats_Stddev_Samp_Order_By>;
  sum: InputMaybe<Payment_Stats_Sum_Order_By>;
  var_pop: InputMaybe<Payment_Stats_Var_Pop_Order_By>;
  var_samp: InputMaybe<Payment_Stats_Var_Samp_Order_By>;
  variance: InputMaybe<Payment_Stats_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "payment_stats" */
export type PaymentStatsArrRelInsertInput = {
  data: Array<PaymentStatsInsertInput>;
};

/** aggregate avg on columns */
export type PaymentStatsAvgFields = {
  __typename?: 'PaymentStatsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "payment_stats". All fields are combined with a logical 'AND'. */
export type PaymentStatsBoolExp = {
  _and: InputMaybe<Array<PaymentStatsBoolExp>>;
  _not: InputMaybe<PaymentStatsBoolExp>;
  _or: InputMaybe<Array<PaymentStatsBoolExp>>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  moneyGranted: InputMaybe<NumericComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
};

/** input type for inserting data into table "payment_stats" */
export type PaymentStatsInsertInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  moneyGranted: InputMaybe<Scalars['numeric']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type PaymentStatsMaxFields = {
  __typename?: 'PaymentStatsMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type PaymentStatsMinFields = {
  __typename?: 'PaymentStatsMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "payment_stats". */
export type PaymentStatsOrderBy = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** select columns of table "payment_stats" */
export enum PaymentStatsSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  MoneyGranted = 'moneyGranted',
  /** column name */
  ProjectId = 'projectId'
}

/** aggregate stddev on columns */
export type PaymentStatsStddevFields = {
  __typename?: 'PaymentStatsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PaymentStatsStddev_PopFields = {
  __typename?: 'PaymentStatsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PaymentStatsStddev_SampFields = {
  __typename?: 'PaymentStatsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PaymentStatsSumFields = {
  __typename?: 'PaymentStatsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
  moneyGranted: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type PaymentStatsVar_PopFields = {
  __typename?: 'PaymentStatsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PaymentStatsVar_SampFields = {
  __typename?: 'PaymentStatsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PaymentStatsVarianceFields = {
  __typename?: 'PaymentStatsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** columns and relationships of "payments" */
export type Payments = {
  __typename?: 'Payments';
  amount: Scalars['numeric'];
  currencyCode: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  paymentRequest: Maybe<PaymentRequests>;
  processedAt: Scalars['timestamp'];
  receipt: Scalars['jsonb'];
  requestId: Scalars['uuid'];
};


/** columns and relationships of "payments" */
export type PaymentsReceiptArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "payments" */
export type PaymentsAggregate = {
  __typename?: 'PaymentsAggregate';
  aggregate: Maybe<PaymentsAggregateFields>;
  nodes: Array<Payments>;
};

/** aggregate fields of "payments" */
export type PaymentsAggregateFields = {
  __typename?: 'PaymentsAggregateFields';
  avg: Maybe<PaymentsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<PaymentsMaxFields>;
  min: Maybe<PaymentsMinFields>;
  stddev: Maybe<PaymentsStddevFields>;
  stddevPop: Maybe<PaymentsStddev_PopFields>;
  stddevSamp: Maybe<PaymentsStddev_SampFields>;
  sum: Maybe<PaymentsSumFields>;
  varPop: Maybe<PaymentsVar_PopFields>;
  varSamp: Maybe<PaymentsVar_SampFields>;
  variance: Maybe<PaymentsVarianceFields>;
};


/** aggregate fields of "payments" */
export type PaymentsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<PaymentsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "payments" */
export type PaymentsAggregateOrderBy = {
  avg: InputMaybe<Payments_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Payments_Max_Order_By>;
  min: InputMaybe<Payments_Min_Order_By>;
  stddev: InputMaybe<Payments_Stddev_Order_By>;
  stddev_pop: InputMaybe<Payments_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Payments_Stddev_Samp_Order_By>;
  sum: InputMaybe<Payments_Sum_Order_By>;
  var_pop: InputMaybe<Payments_Var_Pop_Order_By>;
  var_samp: InputMaybe<Payments_Var_Samp_Order_By>;
  variance: InputMaybe<Payments_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type PaymentsAppendInput = {
  receipt: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "payments" */
export type PaymentsArrRelInsertInput = {
  data: Array<PaymentsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<PaymentsOnConflict>;
};

/** aggregate avg on columns */
export type PaymentsAvgFields = {
  __typename?: 'PaymentsAvgFields';
  amount: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "payments". All fields are combined with a logical 'AND'. */
export type PaymentsBoolExp = {
  _and: InputMaybe<Array<PaymentsBoolExp>>;
  _not: InputMaybe<PaymentsBoolExp>;
  _or: InputMaybe<Array<PaymentsBoolExp>>;
  amount: InputMaybe<NumericComparisonExp>;
  currencyCode: InputMaybe<StringComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  paymentRequest: InputMaybe<PaymentRequestsBoolExp>;
  processedAt: InputMaybe<TimestampComparisonExp>;
  receipt: InputMaybe<JsonbComparisonExp>;
  requestId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "payments" */
export enum PaymentsConstraint {
  /** unique or primary key constraint on columns "id" */
  PaymentsPkey = 'payments_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type PaymentsDeleteAtPathInput = {
  receipt: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type PaymentsDeleteElemInput = {
  receipt: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type PaymentsDeleteKeyInput = {
  receipt: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "payments" */
export type PaymentsIncInput = {
  amount: InputMaybe<Scalars['numeric']>;
};

/** input type for inserting data into table "payments" */
export type PaymentsInsertInput = {
  amount: InputMaybe<Scalars['numeric']>;
  currencyCode: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  paymentRequest: InputMaybe<PaymentRequestsObjRelInsertInput>;
  processedAt: InputMaybe<Scalars['timestamp']>;
  receipt: InputMaybe<Scalars['jsonb']>;
  requestId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type PaymentsMaxFields = {
  __typename?: 'PaymentsMaxFields';
  amount: Maybe<Scalars['numeric']>;
  currencyCode: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  processedAt: Maybe<Scalars['timestamp']>;
  requestId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type PaymentsMinFields = {
  __typename?: 'PaymentsMinFields';
  amount: Maybe<Scalars['numeric']>;
  currencyCode: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  processedAt: Maybe<Scalars['timestamp']>;
  requestId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "payments" */
export type PaymentsMutationResponse = {
  __typename?: 'PaymentsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Payments>;
};

/** on_conflict condition type for table "payments" */
export type PaymentsOnConflict = {
  constraint: PaymentsConstraint;
  update_columns: Array<PaymentsUpdateColumn>;
  where: InputMaybe<PaymentsBoolExp>;
};

/** Ordering options when selecting data from "payments". */
export type PaymentsOrderBy = {
  amount: InputMaybe<OrderBy>;
  currencyCode: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  paymentRequest: InputMaybe<PaymentRequestsOrderBy>;
  processedAt: InputMaybe<OrderBy>;
  receipt: InputMaybe<OrderBy>;
  requestId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: payments */
export type PaymentsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type PaymentsPrependInput = {
  receipt: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "payments" */
export enum PaymentsSelectColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  CurrencyCode = 'currencyCode',
  /** column name */
  Id = 'id',
  /** column name */
  ProcessedAt = 'processedAt',
  /** column name */
  Receipt = 'receipt',
  /** column name */
  RequestId = 'requestId'
}

/** input type for updating data in table "payments" */
export type PaymentsSetInput = {
  amount: InputMaybe<Scalars['numeric']>;
  currencyCode: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  processedAt: InputMaybe<Scalars['timestamp']>;
  receipt: InputMaybe<Scalars['jsonb']>;
  requestId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type PaymentsStddevFields = {
  __typename?: 'PaymentsStddevFields';
  amount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PaymentsStddev_PopFields = {
  __typename?: 'PaymentsStddev_popFields';
  amount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PaymentsStddev_SampFields = {
  __typename?: 'PaymentsStddev_sampFields';
  amount: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PaymentsSumFields = {
  __typename?: 'PaymentsSumFields';
  amount: Maybe<Scalars['numeric']>;
};

/** update columns of table "payments" */
export enum PaymentsUpdateColumn {
  /** column name */
  Amount = 'amount',
  /** column name */
  CurrencyCode = 'currencyCode',
  /** column name */
  Id = 'id',
  /** column name */
  ProcessedAt = 'processedAt',
  /** column name */
  Receipt = 'receipt',
  /** column name */
  RequestId = 'requestId'
}

export type PaymentsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<PaymentsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<PaymentsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<PaymentsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<PaymentsDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<PaymentsIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<PaymentsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<PaymentsSetInput>;
  where: PaymentsBoolExp;
};

/** aggregate var_pop on columns */
export type PaymentsVar_PopFields = {
  __typename?: 'PaymentsVar_popFields';
  amount: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PaymentsVar_SampFields = {
  __typename?: 'PaymentsVar_sampFields';
  amount: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PaymentsVarianceFields = {
  __typename?: 'PaymentsVarianceFields';
  amount: Maybe<Scalars['Float']>;
};

export type PayoutSettingsInput = {
  optBankAddress: InputMaybe<BankAddress>;
  optEthAddress: InputMaybe<Scalars['EthereumAddress']>;
  optEthName: InputMaybe<Scalars['EthereumName']>;
  type: PayoutSettingsType;
};

export enum PayoutSettingsType {
  BankAddress = 'BANK_ADDRESS',
  EthereumAddress = 'ETHEREUM_ADDRESS',
  EthereumName = 'ETHEREUM_NAME'
}

/** columns and relationships of "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitations = {
  __typename?: 'PendingProjectLeaderInvitations';
  githubUserId: Scalars['bigint'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user: Maybe<RegisteredUsers>;
};

/** aggregated selection of "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsAggregate = {
  __typename?: 'PendingProjectLeaderInvitationsAggregate';
  aggregate: Maybe<PendingProjectLeaderInvitationsAggregateFields>;
  nodes: Array<PendingProjectLeaderInvitations>;
};

/** aggregate fields of "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsAggregateFields = {
  __typename?: 'PendingProjectLeaderInvitationsAggregateFields';
  avg: Maybe<PendingProjectLeaderInvitationsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<PendingProjectLeaderInvitationsMaxFields>;
  min: Maybe<PendingProjectLeaderInvitationsMinFields>;
  stddev: Maybe<PendingProjectLeaderInvitationsStddevFields>;
  stddevPop: Maybe<PendingProjectLeaderInvitationsStddev_PopFields>;
  stddevSamp: Maybe<PendingProjectLeaderInvitationsStddev_SampFields>;
  sum: Maybe<PendingProjectLeaderInvitationsSumFields>;
  varPop: Maybe<PendingProjectLeaderInvitationsVar_PopFields>;
  varSamp: Maybe<PendingProjectLeaderInvitationsVar_SampFields>;
  variance: Maybe<PendingProjectLeaderInvitationsVarianceFields>;
};


/** aggregate fields of "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsAggregateOrderBy = {
  avg: InputMaybe<Pending_Project_Leader_Invitations_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Pending_Project_Leader_Invitations_Max_Order_By>;
  min: InputMaybe<Pending_Project_Leader_Invitations_Min_Order_By>;
  stddev: InputMaybe<Pending_Project_Leader_Invitations_Stddev_Order_By>;
  stddev_pop: InputMaybe<Pending_Project_Leader_Invitations_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Pending_Project_Leader_Invitations_Stddev_Samp_Order_By>;
  sum: InputMaybe<Pending_Project_Leader_Invitations_Sum_Order_By>;
  var_pop: InputMaybe<Pending_Project_Leader_Invitations_Var_Pop_Order_By>;
  var_samp: InputMaybe<Pending_Project_Leader_Invitations_Var_Samp_Order_By>;
  variance: InputMaybe<Pending_Project_Leader_Invitations_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsArrRelInsertInput = {
  data: Array<PendingProjectLeaderInvitationsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<PendingProjectLeaderInvitationsOnConflict>;
};

/** aggregate avg on columns */
export type PendingProjectLeaderInvitationsAvgFields = {
  __typename?: 'PendingProjectLeaderInvitationsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "pending_project_leader_invitations". All fields are combined with a logical 'AND'. */
export type PendingProjectLeaderInvitationsBoolExp = {
  _and: InputMaybe<Array<PendingProjectLeaderInvitationsBoolExp>>;
  _not: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  _or: InputMaybe<Array<PendingProjectLeaderInvitationsBoolExp>>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  user: InputMaybe<RegisteredUsersBoolExp>;
};

/** unique or primary key constraints on table "pending_project_leader_invitations" */
export enum PendingProjectLeaderInvitationsConstraint {
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  PendingProjectLeaderInvitationGithubUserIdProjectIdIdx = 'pending_project_leader_invitation_github_user_id_project_id_idx',
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  PendingProjectLeaderInvitationProjectIdGithubUserIdKey = 'pending_project_leader_invitation_project_id_github_user_id_key',
  /** unique or primary key constraint on columns "id" */
  PendingProjectLeaderInvitationsPkey = 'pending_project_leader_invitations_pkey'
}

/** input type for incrementing numeric columns in table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsIncInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsInsertInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  user: InputMaybe<RegisteredUsersObjRelInsertInput>;
};

/** aggregate max on columns */
export type PendingProjectLeaderInvitationsMaxFields = {
  __typename?: 'PendingProjectLeaderInvitationsMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type PendingProjectLeaderInvitationsMinFields = {
  __typename?: 'PendingProjectLeaderInvitationsMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsMutationResponse = {
  __typename?: 'PendingProjectLeaderInvitationsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<PendingProjectLeaderInvitations>;
};

/** on_conflict condition type for table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsOnConflict = {
  constraint: PendingProjectLeaderInvitationsConstraint;
  update_columns: Array<PendingProjectLeaderInvitationsUpdateColumn>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};

/** Ordering options when selecting data from "pending_project_leader_invitations". */
export type PendingProjectLeaderInvitationsOrderBy = {
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  user: InputMaybe<RegisteredUsersOrderBy>;
};

/** primary key columns input for table: pending_project_leader_invitations */
export type PendingProjectLeaderInvitationsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "pending_project_leader_invitations" */
export enum PendingProjectLeaderInvitationsSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId'
}

/** input type for updating data in table "pending_project_leader_invitations" */
export type PendingProjectLeaderInvitationsSetInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type PendingProjectLeaderInvitationsStddevFields = {
  __typename?: 'PendingProjectLeaderInvitationsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PendingProjectLeaderInvitationsStddev_PopFields = {
  __typename?: 'PendingProjectLeaderInvitationsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PendingProjectLeaderInvitationsStddev_SampFields = {
  __typename?: 'PendingProjectLeaderInvitationsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PendingProjectLeaderInvitationsSumFields = {
  __typename?: 'PendingProjectLeaderInvitationsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** update columns of table "pending_project_leader_invitations" */
export enum PendingProjectLeaderInvitationsUpdateColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Id = 'id',
  /** column name */
  ProjectId = 'projectId'
}

export type PendingProjectLeaderInvitationsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<PendingProjectLeaderInvitationsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<PendingProjectLeaderInvitationsSetInput>;
  where: PendingProjectLeaderInvitationsBoolExp;
};

/** aggregate var_pop on columns */
export type PendingProjectLeaderInvitationsVar_PopFields = {
  __typename?: 'PendingProjectLeaderInvitationsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PendingProjectLeaderInvitationsVar_SampFields = {
  __typename?: 'PendingProjectLeaderInvitationsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PendingProjectLeaderInvitationsVarianceFields = {
  __typename?: 'PendingProjectLeaderInvitationsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

export type PersonIdentity = {
  firstname: InputMaybe<Scalars['String']>;
  lastname: InputMaybe<Scalars['String']>;
};

export enum ProfileCover {
  Blue = 'BLUE',
  Cyan = 'CYAN',
  Magenta = 'MAGENTA',
  Yellow = 'YELLOW'
}

/** Boolean expression to compare columns of type "profile_cover". All fields are combined with logical 'AND'. */
export type ProfileCoverComparisonExp = {
  _eq: InputMaybe<Scalars['profile_cover']>;
  _gt: InputMaybe<Scalars['profile_cover']>;
  _gte: InputMaybe<Scalars['profile_cover']>;
  _in: InputMaybe<Array<Scalars['profile_cover']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['profile_cover']>;
  _lte: InputMaybe<Scalars['profile_cover']>;
  _neq: InputMaybe<Scalars['profile_cover']>;
  _nin: InputMaybe<Array<Scalars['profile_cover']>>;
};

/** columns and relationships of "project_github_repos" */
export type ProjectGithubRepos = {
  __typename?: 'ProjectGithubRepos';
  githubRepoId: Scalars['bigint'];
  projectId: Scalars['uuid'];
  /** An object relationship */
  repo: Maybe<GithubRepos>;
  /** An array relationship */
  repoIssues: Array<GithubIssues>;
  /** An aggregate relationship */
  repoIssuesAggregate: GithubIssuesAggregate;
};


/** columns and relationships of "project_github_repos" */
export type ProjectGithubReposRepoIssuesArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


/** columns and relationships of "project_github_repos" */
export type ProjectGithubReposRepoIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};

/** aggregated selection of "project_github_repos" */
export type ProjectGithubReposAggregate = {
  __typename?: 'ProjectGithubReposAggregate';
  aggregate: Maybe<ProjectGithubReposAggregateFields>;
  nodes: Array<ProjectGithubRepos>;
};

/** aggregate fields of "project_github_repos" */
export type ProjectGithubReposAggregateFields = {
  __typename?: 'ProjectGithubReposAggregateFields';
  avg: Maybe<ProjectGithubReposAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectGithubReposMaxFields>;
  min: Maybe<ProjectGithubReposMinFields>;
  stddev: Maybe<ProjectGithubReposStddevFields>;
  stddevPop: Maybe<ProjectGithubReposStddev_PopFields>;
  stddevSamp: Maybe<ProjectGithubReposStddev_SampFields>;
  sum: Maybe<ProjectGithubReposSumFields>;
  varPop: Maybe<ProjectGithubReposVar_PopFields>;
  varSamp: Maybe<ProjectGithubReposVar_SampFields>;
  variance: Maybe<ProjectGithubReposVarianceFields>;
};


/** aggregate fields of "project_github_repos" */
export type ProjectGithubReposAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_github_repos" */
export type ProjectGithubReposAggregateOrderBy = {
  avg: InputMaybe<Project_Github_Repos_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Project_Github_Repos_Max_Order_By>;
  min: InputMaybe<Project_Github_Repos_Min_Order_By>;
  stddev: InputMaybe<Project_Github_Repos_Stddev_Order_By>;
  stddev_pop: InputMaybe<Project_Github_Repos_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Project_Github_Repos_Stddev_Samp_Order_By>;
  sum: InputMaybe<Project_Github_Repos_Sum_Order_By>;
  var_pop: InputMaybe<Project_Github_Repos_Var_Pop_Order_By>;
  var_samp: InputMaybe<Project_Github_Repos_Var_Samp_Order_By>;
  variance: InputMaybe<Project_Github_Repos_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "project_github_repos" */
export type ProjectGithubReposArrRelInsertInput = {
  data: Array<ProjectGithubReposInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectGithubReposOnConflict>;
};

/** aggregate avg on columns */
export type ProjectGithubReposAvgFields = {
  __typename?: 'ProjectGithubReposAvgFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "project_github_repos". All fields are combined with a logical 'AND'. */
export type ProjectGithubReposBoolExp = {
  _and: InputMaybe<Array<ProjectGithubReposBoolExp>>;
  _not: InputMaybe<ProjectGithubReposBoolExp>;
  _or: InputMaybe<Array<ProjectGithubReposBoolExp>>;
  githubRepoId: InputMaybe<BigintComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  repo: InputMaybe<GithubReposBoolExp>;
  repoIssues: InputMaybe<GithubIssuesBoolExp>;
  repoIssues_aggregate: InputMaybe<GithubIssues_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "project_github_repos" */
export enum ProjectGithubReposConstraint {
  /** unique or primary key constraint on columns "github_repo_id", "project_id" */
  ProjectGithubReposGithubRepoIdProjectIdIdx = 'project_github_repos_github_repo_id_project_id_idx',
  /** unique or primary key constraint on columns "github_repo_id", "project_id" */
  ProjectGithubReposPkey = 'project_github_repos_pkey'
}

/** input type for incrementing numeric columns in table "project_github_repos" */
export type ProjectGithubReposIncInput = {
  githubRepoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "project_github_repos" */
export type ProjectGithubReposInsertInput = {
  githubRepoId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repo: InputMaybe<GithubReposObjRelInsertInput>;
  repoIssues: InputMaybe<GithubIssuesArrRelInsertInput>;
};

/** aggregate max on columns */
export type ProjectGithubReposMaxFields = {
  __typename?: 'ProjectGithubReposMaxFields';
  githubRepoId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectGithubReposMinFields = {
  __typename?: 'ProjectGithubReposMinFields';
  githubRepoId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "project_github_repos" */
export type ProjectGithubReposMutationResponse = {
  __typename?: 'ProjectGithubReposMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectGithubRepos>;
};

/** on_conflict condition type for table "project_github_repos" */
export type ProjectGithubReposOnConflict = {
  constraint: ProjectGithubReposConstraint;
  update_columns: Array<ProjectGithubReposUpdateColumn>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};

/** Ordering options when selecting data from "project_github_repos". */
export type ProjectGithubReposOrderBy = {
  githubRepoId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repo: InputMaybe<GithubReposOrderBy>;
  repoIssuesAggregate: InputMaybe<GithubIssuesAggregateOrderBy>;
};

/** primary key columns input for table: project_github_repos */
export type ProjectGithubReposPkColumnsInput = {
  githubRepoId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};

/** select columns of table "project_github_repos" */
export enum ProjectGithubReposSelectColumn {
  /** column name */
  GithubRepoId = 'githubRepoId',
  /** column name */
  ProjectId = 'projectId'
}

/** input type for updating data in table "project_github_repos" */
export type ProjectGithubReposSetInput = {
  githubRepoId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type ProjectGithubReposStddevFields = {
  __typename?: 'ProjectGithubReposStddevFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectGithubReposStddev_PopFields = {
  __typename?: 'ProjectGithubReposStddev_popFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectGithubReposStddev_SampFields = {
  __typename?: 'ProjectGithubReposStddev_sampFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectGithubReposSumFields = {
  __typename?: 'ProjectGithubReposSumFields';
  githubRepoId: Maybe<Scalars['bigint']>;
};

/** update columns of table "project_github_repos" */
export enum ProjectGithubReposUpdateColumn {
  /** column name */
  GithubRepoId = 'githubRepoId',
  /** column name */
  ProjectId = 'projectId'
}

export type ProjectGithubReposUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ProjectGithubReposIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectGithubReposSetInput>;
  where: ProjectGithubReposBoolExp;
};

/** aggregate var_pop on columns */
export type ProjectGithubReposVar_PopFields = {
  __typename?: 'ProjectGithubReposVar_popFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectGithubReposVar_SampFields = {
  __typename?: 'ProjectGithubReposVar_sampFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectGithubReposVarianceFields = {
  __typename?: 'ProjectGithubReposVarianceFields';
  githubRepoId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "project_leads" */
export type ProjectLeads = {
  __typename?: 'ProjectLeads';
  assignedAt: Scalars['timestamp'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user: Maybe<RegisteredUsers>;
  userId: Scalars['uuid'];
};

/** aggregated selection of "project_leads" */
export type ProjectLeadsAggregate = {
  __typename?: 'ProjectLeadsAggregate';
  aggregate: Maybe<ProjectLeadsAggregateFields>;
  nodes: Array<ProjectLeads>;
};

/** aggregate fields of "project_leads" */
export type ProjectLeadsAggregateFields = {
  __typename?: 'ProjectLeadsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<ProjectLeadsMaxFields>;
  min: Maybe<ProjectLeadsMinFields>;
};


/** aggregate fields of "project_leads" */
export type ProjectLeadsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "project_leads" */
export type ProjectLeadsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Project_Leads_Max_Order_By>;
  min: InputMaybe<Project_Leads_Min_Order_By>;
};

/** input type for inserting array relation for remote table "project_leads" */
export type ProjectLeadsArrRelInsertInput = {
  data: Array<ProjectLeadsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectLeadsOnConflict>;
};

/** Boolean expression to filter rows from the table "project_leads". All fields are combined with a logical 'AND'. */
export type ProjectLeadsBoolExp = {
  _and: InputMaybe<Array<ProjectLeadsBoolExp>>;
  _not: InputMaybe<ProjectLeadsBoolExp>;
  _or: InputMaybe<Array<ProjectLeadsBoolExp>>;
  assignedAt: InputMaybe<TimestampComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  user: InputMaybe<RegisteredUsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "project_leads" */
export enum ProjectLeadsConstraint {
  /** unique or primary key constraint on columns "project_id", "user_id" */
  ProjectLeadsPkey = 'project_leads_pkey',
  /** unique or primary key constraint on columns "project_id", "user_id" */
  ProjectLeadsUserIdProjectIdIdx = 'project_leads_user_id_project_id_idx'
}

/** input type for inserting data into table "project_leads" */
export type ProjectLeadsInsertInput = {
  assignedAt: InputMaybe<Scalars['timestamp']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  user: InputMaybe<RegisteredUsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectLeadsMaxFields = {
  __typename?: 'ProjectLeadsMaxFields';
  assignedAt: Maybe<Scalars['timestamp']>;
  projectId: Maybe<Scalars['uuid']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectLeadsMinFields = {
  __typename?: 'ProjectLeadsMinFields';
  assignedAt: Maybe<Scalars['timestamp']>;
  projectId: Maybe<Scalars['uuid']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "project_leads" */
export type ProjectLeadsMutationResponse = {
  __typename?: 'ProjectLeadsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectLeads>;
};

/** on_conflict condition type for table "project_leads" */
export type ProjectLeadsOnConflict = {
  constraint: ProjectLeadsConstraint;
  update_columns: Array<ProjectLeadsUpdateColumn>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};

/** Ordering options when selecting data from "project_leads". */
export type ProjectLeadsOrderBy = {
  assignedAt: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  user: InputMaybe<RegisteredUsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: project_leads */
export type ProjectLeadsPkColumnsInput = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};

/** select columns of table "project_leads" */
export enum ProjectLeadsSelectColumn {
  /** column name */
  AssignedAt = 'assignedAt',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "project_leads" */
export type ProjectLeadsSetInput = {
  assignedAt: InputMaybe<Scalars['timestamp']>;
  projectId: InputMaybe<Scalars['uuid']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "project_leads" */
export enum ProjectLeadsUpdateColumn {
  /** column name */
  AssignedAt = 'assignedAt',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  UserId = 'userId'
}

export type ProjectLeadsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectLeadsSetInput>;
  where: ProjectLeadsBoolExp;
};

/** Boolean expression to compare columns of type "project_visibility". All fields are combined with logical 'AND'. */
export type ProjectVisibilityComparisonExp = {
  _eq: InputMaybe<Scalars['project_visibility']>;
  _gt: InputMaybe<Scalars['project_visibility']>;
  _gte: InputMaybe<Scalars['project_visibility']>;
  _in: InputMaybe<Array<Scalars['project_visibility']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['project_visibility']>;
  _lte: InputMaybe<Scalars['project_visibility']>;
  _neq: InputMaybe<Scalars['project_visibility']>;
  _nin: InputMaybe<Array<Scalars['project_visibility']>>;
};

/** columns and relationships of "api.projects" */
export type Projects = {
  __typename?: 'Projects';
  /** An array relationship */
  applications: Array<Applications>;
  /** An aggregate relationship */
  applicationsAggregate: ApplicationsAggregate;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** An array relationship */
  contributors: Array<ProjectsContributors>;
  /** An aggregate relationship */
  contributorsAggregate: ProjectsContributorsAggregate;
  /** An array relationship */
  githubRepos: Array<ProjectGithubRepos>;
  /** An aggregate relationship */
  githubReposAggregate: ProjectGithubReposAggregate;
  hiring: Maybe<Scalars['Boolean']>;
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Maybe<Scalars['String']>;
  moreInfoLink: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  /** An array relationship */
  pendingContributors: Array<ProjectsPendingContributors>;
  /** An aggregate relationship */
  pendingContributorsAggregate: ProjectsPendingContributorsAggregate;
  /** An array relationship */
  pendingInvitations: Array<PendingProjectLeaderInvitations>;
  /** An aggregate relationship */
  pendingInvitationsAggregate: PendingProjectLeaderInvitationsAggregate;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectLeadsAggregate: ProjectLeadsAggregate;
  rank: Maybe<Scalars['Int']>;
  /** An array relationship */
  rewardedUsers: Array<ProjectsRewardedUsers>;
  /** An aggregate relationship */
  rewardedUsersAggregate: ProjectsRewardedUsersAggregate;
  shortDescription: Maybe<Scalars['String']>;
  /** An array relationship */
  sponsors: Array<ProjectsSponsors>;
  /** An aggregate relationship */
  sponsorsAggregate: ProjectsSponsorsAggregate;
  visibility: Maybe<Scalars['project_visibility']>;
};


/** columns and relationships of "api.projects" */
export type ProjectsApplicationsArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsApplicationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsBudgetsArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsBudgetsAggregateArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsGithubReposArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsPendingContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsPendingContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsPendingInvitationsArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsPendingInvitationsAggregateArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsProjectLeadsArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsProjectLeadsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsRewardedUsersArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsRewardedUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsSponsorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


/** columns and relationships of "api.projects" */
export type ProjectsSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};

/** aggregated selection of "api.projects" */
export type ProjectsAggregate = {
  __typename?: 'ProjectsAggregate';
  aggregate: Maybe<ProjectsAggregateFields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "api.projects" */
export type ProjectsAggregateFields = {
  __typename?: 'ProjectsAggregateFields';
  avg: Maybe<ProjectsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectsMaxFields>;
  min: Maybe<ProjectsMinFields>;
  stddev: Maybe<ProjectsStddevFields>;
  stddevPop: Maybe<ProjectsStddev_PopFields>;
  stddevSamp: Maybe<ProjectsStddev_SampFields>;
  sum: Maybe<ProjectsSumFields>;
  varPop: Maybe<ProjectsVar_PopFields>;
  varSamp: Maybe<ProjectsVar_SampFields>;
  variance: Maybe<ProjectsVarianceFields>;
};


/** aggregate fields of "api.projects" */
export type ProjectsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type ProjectsAvgFields = {
  __typename?: 'ProjectsAvgFields';
  rank: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and: InputMaybe<Array<ProjectsBoolExp>>;
  _not: InputMaybe<ProjectsBoolExp>;
  _or: InputMaybe<Array<ProjectsBoolExp>>;
  applications: InputMaybe<ApplicationsBoolExp>;
  applications_aggregate: InputMaybe<Applications_Aggregate_Bool_Exp>;
  budgets: InputMaybe<BudgetsBoolExp>;
  budgets_aggregate: InputMaybe<Budgets_Aggregate_Bool_Exp>;
  contributors: InputMaybe<ProjectsContributorsBoolExp>;
  contributors_aggregate: InputMaybe<Projects_Contributors_Aggregate_Bool_Exp>;
  githubRepos: InputMaybe<ProjectGithubReposBoolExp>;
  githubRepos_aggregate: InputMaybe<Project_Github_Repos_Aggregate_Bool_Exp>;
  hiring: InputMaybe<BooleanComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  key: InputMaybe<StringComparisonExp>;
  logoUrl: InputMaybe<StringComparisonExp>;
  longDescription: InputMaybe<StringComparisonExp>;
  moreInfoLink: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  pendingContributors: InputMaybe<ProjectsPendingContributorsBoolExp>;
  pendingContributors_aggregate: InputMaybe<Projects_Pending_Contributors_Aggregate_Bool_Exp>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  pendingInvitations_aggregate: InputMaybe<Pending_Project_Leader_Invitations_Aggregate_Bool_Exp>;
  projectLeads: InputMaybe<ProjectLeadsBoolExp>;
  projectLeads_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  rank: InputMaybe<IntComparisonExp>;
  rewardedUsers: InputMaybe<ProjectsRewardedUsersBoolExp>;
  rewardedUsers_aggregate: InputMaybe<Projects_Rewarded_Users_Aggregate_Bool_Exp>;
  shortDescription: InputMaybe<StringComparisonExp>;
  sponsors: InputMaybe<ProjectsSponsorsBoolExp>;
  sponsors_aggregate: InputMaybe<Projects_Sponsors_Aggregate_Bool_Exp>;
  visibility: InputMaybe<ProjectVisibilityComparisonExp>;
};

/** columns and relationships of "projects_contributors" */
export type ProjectsContributors = {
  __typename?: 'ProjectsContributors';
  /** An object relationship */
  githubUser: Maybe<GithubUsers>;
  githubUserId: Scalars['bigint'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user: Maybe<UserProfiles>;
};

/** aggregated selection of "projects_contributors" */
export type ProjectsContributorsAggregate = {
  __typename?: 'ProjectsContributorsAggregate';
  aggregate: Maybe<ProjectsContributorsAggregateFields>;
  nodes: Array<ProjectsContributors>;
};

/** aggregate fields of "projects_contributors" */
export type ProjectsContributorsAggregateFields = {
  __typename?: 'ProjectsContributorsAggregateFields';
  avg: Maybe<ProjectsContributorsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectsContributorsMaxFields>;
  min: Maybe<ProjectsContributorsMinFields>;
  stddev: Maybe<ProjectsContributorsStddevFields>;
  stddevPop: Maybe<ProjectsContributorsStddev_PopFields>;
  stddevSamp: Maybe<ProjectsContributorsStddev_SampFields>;
  sum: Maybe<ProjectsContributorsSumFields>;
  varPop: Maybe<ProjectsContributorsVar_PopFields>;
  varSamp: Maybe<ProjectsContributorsVar_SampFields>;
  variance: Maybe<ProjectsContributorsVarianceFields>;
};


/** aggregate fields of "projects_contributors" */
export type ProjectsContributorsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_contributors" */
export type ProjectsContributorsAggregateOrderBy = {
  avg: InputMaybe<Projects_Contributors_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Contributors_Max_Order_By>;
  min: InputMaybe<Projects_Contributors_Min_Order_By>;
  stddev: InputMaybe<Projects_Contributors_Stddev_Order_By>;
  stddev_pop: InputMaybe<Projects_Contributors_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Projects_Contributors_Stddev_Samp_Order_By>;
  sum: InputMaybe<Projects_Contributors_Sum_Order_By>;
  var_pop: InputMaybe<Projects_Contributors_Var_Pop_Order_By>;
  var_samp: InputMaybe<Projects_Contributors_Var_Samp_Order_By>;
  variance: InputMaybe<Projects_Contributors_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "projects_contributors" */
export type ProjectsContributorsArrRelInsertInput = {
  data: Array<ProjectsContributorsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectsContributorsOnConflict>;
};

/** aggregate avg on columns */
export type ProjectsContributorsAvgFields = {
  __typename?: 'ProjectsContributorsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "projects_contributors". All fields are combined with a logical 'AND'. */
export type ProjectsContributorsBoolExp = {
  _and: InputMaybe<Array<ProjectsContributorsBoolExp>>;
  _not: InputMaybe<ProjectsContributorsBoolExp>;
  _or: InputMaybe<Array<ProjectsContributorsBoolExp>>;
  githubUser: InputMaybe<GithubUsersBoolExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  user: InputMaybe<UserProfilesBoolExp>;
};

/** unique or primary key constraints on table "projects_contributors" */
export enum ProjectsContributorsConstraint {
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  ProjectsContributorsGithubUserIdProjectIdIdx = 'projects_contributors_github_user_id_project_id_idx',
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  ProjectsContributorsPkey = 'projects_contributors_pkey'
}

/** input type for incrementing numeric columns in table "projects_contributors" */
export type ProjectsContributorsIncInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "projects_contributors" */
export type ProjectsContributorsInsertInput = {
  githubUser: InputMaybe<GithubUsersObjRelInsertInput>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  user: InputMaybe<UserProfilesObjRelInsertInput>;
};

/** aggregate max on columns */
export type ProjectsContributorsMaxFields = {
  __typename?: 'ProjectsContributorsMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectsContributorsMinFields = {
  __typename?: 'ProjectsContributorsMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "projects_contributors" */
export type ProjectsContributorsMutationResponse = {
  __typename?: 'ProjectsContributorsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectsContributors>;
};

/** on_conflict condition type for table "projects_contributors" */
export type ProjectsContributorsOnConflict = {
  constraint: ProjectsContributorsConstraint;
  update_columns: Array<ProjectsContributorsUpdateColumn>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};

/** Ordering options when selecting data from "projects_contributors". */
export type ProjectsContributorsOrderBy = {
  githubUser: InputMaybe<GithubUsersOrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  user: InputMaybe<UserProfilesOrderBy>;
};

/** primary key columns input for table: projects_contributors */
export type ProjectsContributorsPkColumnsInput = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};

/** select columns of table "projects_contributors" */
export enum ProjectsContributorsSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId'
}

/** input type for updating data in table "projects_contributors" */
export type ProjectsContributorsSetInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type ProjectsContributorsStddevFields = {
  __typename?: 'ProjectsContributorsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectsContributorsStddev_PopFields = {
  __typename?: 'ProjectsContributorsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectsContributorsStddev_SampFields = {
  __typename?: 'ProjectsContributorsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectsContributorsSumFields = {
  __typename?: 'ProjectsContributorsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** update columns of table "projects_contributors" */
export enum ProjectsContributorsUpdateColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId'
}

export type ProjectsContributorsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ProjectsContributorsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectsContributorsSetInput>;
  where: ProjectsContributorsBoolExp;
};

/** aggregate var_pop on columns */
export type ProjectsContributorsVar_PopFields = {
  __typename?: 'ProjectsContributorsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectsContributorsVar_SampFields = {
  __typename?: 'ProjectsContributorsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectsContributorsVarianceFields = {
  __typename?: 'ProjectsContributorsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** input type for inserting data into table "api.projects" */
export type ProjectsInsertInput = {
  applications: InputMaybe<ApplicationsArrRelInsertInput>;
  budgets: InputMaybe<BudgetsArrRelInsertInput>;
  contributors: InputMaybe<ProjectsContributorsArrRelInsertInput>;
  githubRepos: InputMaybe<ProjectGithubReposArrRelInsertInput>;
  hiring: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  key: InputMaybe<Scalars['String']>;
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  moreInfoLink: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  pendingContributors: InputMaybe<ProjectsPendingContributorsArrRelInsertInput>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsArrRelInsertInput>;
  projectLeads: InputMaybe<ProjectLeadsArrRelInsertInput>;
  rank: InputMaybe<Scalars['Int']>;
  rewardedUsers: InputMaybe<ProjectsRewardedUsersArrRelInsertInput>;
  shortDescription: InputMaybe<Scalars['String']>;
  sponsors: InputMaybe<ProjectsSponsorsArrRelInsertInput>;
  visibility: InputMaybe<Scalars['project_visibility']>;
};

/** aggregate max on columns */
export type ProjectsMaxFields = {
  __typename?: 'ProjectsMaxFields';
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Maybe<Scalars['String']>;
  moreInfoLink: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  rank: Maybe<Scalars['Int']>;
  shortDescription: Maybe<Scalars['String']>;
  visibility: Maybe<Scalars['project_visibility']>;
};

/** aggregate min on columns */
export type ProjectsMinFields = {
  __typename?: 'ProjectsMinFields';
  id: Maybe<Scalars['uuid']>;
  key: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Maybe<Scalars['String']>;
  moreInfoLink: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  rank: Maybe<Scalars['Int']>;
  shortDescription: Maybe<Scalars['String']>;
  visibility: Maybe<Scalars['project_visibility']>;
};

/** input type for inserting object relation for remote table "api.projects" */
export type ProjectsObjRelInsertInput = {
  data: ProjectsInsertInput;
};

/** Ordering options when selecting data from "api.projects". */
export type ProjectsOrderBy = {
  applicationsAggregate: InputMaybe<ApplicationsAggregateOrderBy>;
  budgetsAggregate: InputMaybe<BudgetsAggregateOrderBy>;
  contributorsAggregate: InputMaybe<ProjectsContributorsAggregateOrderBy>;
  githubReposAggregate: InputMaybe<ProjectGithubReposAggregateOrderBy>;
  hiring: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  key: InputMaybe<OrderBy>;
  logoUrl: InputMaybe<OrderBy>;
  longDescription: InputMaybe<OrderBy>;
  moreInfoLink: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  pendingContributorsAggregate: InputMaybe<ProjectsPendingContributorsAggregateOrderBy>;
  pendingInvitationsAggregate: InputMaybe<PendingProjectLeaderInvitationsAggregateOrderBy>;
  projectLeadsAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  rank: InputMaybe<OrderBy>;
  rewardedUsersAggregate: InputMaybe<ProjectsRewardedUsersAggregateOrderBy>;
  shortDescription: InputMaybe<OrderBy>;
  sponsorsAggregate: InputMaybe<ProjectsSponsorsAggregateOrderBy>;
  visibility: InputMaybe<OrderBy>;
};

/** columns and relationships of "projects_pending_contributors" */
export type ProjectsPendingContributors = {
  __typename?: 'ProjectsPendingContributors';
  /** An object relationship */
  githubUser: Maybe<GithubUsers>;
  githubUserId: Scalars['bigint'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user: Maybe<UserProfiles>;
};

/** aggregated selection of "projects_pending_contributors" */
export type ProjectsPendingContributorsAggregate = {
  __typename?: 'ProjectsPendingContributorsAggregate';
  aggregate: Maybe<ProjectsPendingContributorsAggregateFields>;
  nodes: Array<ProjectsPendingContributors>;
};

/** aggregate fields of "projects_pending_contributors" */
export type ProjectsPendingContributorsAggregateFields = {
  __typename?: 'ProjectsPendingContributorsAggregateFields';
  avg: Maybe<ProjectsPendingContributorsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectsPendingContributorsMaxFields>;
  min: Maybe<ProjectsPendingContributorsMinFields>;
  stddev: Maybe<ProjectsPendingContributorsStddevFields>;
  stddevPop: Maybe<ProjectsPendingContributorsStddev_PopFields>;
  stddevSamp: Maybe<ProjectsPendingContributorsStddev_SampFields>;
  sum: Maybe<ProjectsPendingContributorsSumFields>;
  varPop: Maybe<ProjectsPendingContributorsVar_PopFields>;
  varSamp: Maybe<ProjectsPendingContributorsVar_SampFields>;
  variance: Maybe<ProjectsPendingContributorsVarianceFields>;
};


/** aggregate fields of "projects_pending_contributors" */
export type ProjectsPendingContributorsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_pending_contributors" */
export type ProjectsPendingContributorsAggregateOrderBy = {
  avg: InputMaybe<Projects_Pending_Contributors_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Pending_Contributors_Max_Order_By>;
  min: InputMaybe<Projects_Pending_Contributors_Min_Order_By>;
  stddev: InputMaybe<Projects_Pending_Contributors_Stddev_Order_By>;
  stddev_pop: InputMaybe<Projects_Pending_Contributors_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Projects_Pending_Contributors_Stddev_Samp_Order_By>;
  sum: InputMaybe<Projects_Pending_Contributors_Sum_Order_By>;
  var_pop: InputMaybe<Projects_Pending_Contributors_Var_Pop_Order_By>;
  var_samp: InputMaybe<Projects_Pending_Contributors_Var_Samp_Order_By>;
  variance: InputMaybe<Projects_Pending_Contributors_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "projects_pending_contributors" */
export type ProjectsPendingContributorsArrRelInsertInput = {
  data: Array<ProjectsPendingContributorsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectsPendingContributorsOnConflict>;
};

/** aggregate avg on columns */
export type ProjectsPendingContributorsAvgFields = {
  __typename?: 'ProjectsPendingContributorsAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "projects_pending_contributors". All fields are combined with a logical 'AND'. */
export type ProjectsPendingContributorsBoolExp = {
  _and: InputMaybe<Array<ProjectsPendingContributorsBoolExp>>;
  _not: InputMaybe<ProjectsPendingContributorsBoolExp>;
  _or: InputMaybe<Array<ProjectsPendingContributorsBoolExp>>;
  githubUser: InputMaybe<GithubUsersBoolExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  user: InputMaybe<UserProfilesBoolExp>;
};

/** unique or primary key constraints on table "projects_pending_contributors" */
export enum ProjectsPendingContributorsConstraint {
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  ProjectsPendingContributorsPkey = 'projects_pending_contributors_pkey'
}

/** input type for incrementing numeric columns in table "projects_pending_contributors" */
export type ProjectsPendingContributorsIncInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "projects_pending_contributors" */
export type ProjectsPendingContributorsInsertInput = {
  githubUser: InputMaybe<GithubUsersObjRelInsertInput>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  user: InputMaybe<UserProfilesObjRelInsertInput>;
};

/** aggregate max on columns */
export type ProjectsPendingContributorsMaxFields = {
  __typename?: 'ProjectsPendingContributorsMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectsPendingContributorsMinFields = {
  __typename?: 'ProjectsPendingContributorsMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "projects_pending_contributors" */
export type ProjectsPendingContributorsMutationResponse = {
  __typename?: 'ProjectsPendingContributorsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectsPendingContributors>;
};

/** on_conflict condition type for table "projects_pending_contributors" */
export type ProjectsPendingContributorsOnConflict = {
  constraint: ProjectsPendingContributorsConstraint;
  update_columns: Array<ProjectsPendingContributorsUpdateColumn>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};

/** Ordering options when selecting data from "projects_pending_contributors". */
export type ProjectsPendingContributorsOrderBy = {
  githubUser: InputMaybe<GithubUsersOrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  user: InputMaybe<UserProfilesOrderBy>;
};

/** primary key columns input for table: projects_pending_contributors */
export type ProjectsPendingContributorsPkColumnsInput = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};

/** select columns of table "projects_pending_contributors" */
export enum ProjectsPendingContributorsSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId'
}

/** input type for updating data in table "projects_pending_contributors" */
export type ProjectsPendingContributorsSetInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type ProjectsPendingContributorsStddevFields = {
  __typename?: 'ProjectsPendingContributorsStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectsPendingContributorsStddev_PopFields = {
  __typename?: 'ProjectsPendingContributorsStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectsPendingContributorsStddev_SampFields = {
  __typename?: 'ProjectsPendingContributorsStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectsPendingContributorsSumFields = {
  __typename?: 'ProjectsPendingContributorsSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** update columns of table "projects_pending_contributors" */
export enum ProjectsPendingContributorsUpdateColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId'
}

export type ProjectsPendingContributorsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ProjectsPendingContributorsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectsPendingContributorsSetInput>;
  where: ProjectsPendingContributorsBoolExp;
};

/** aggregate var_pop on columns */
export type ProjectsPendingContributorsVar_PopFields = {
  __typename?: 'ProjectsPendingContributorsVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectsPendingContributorsVar_SampFields = {
  __typename?: 'ProjectsPendingContributorsVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectsPendingContributorsVarianceFields = {
  __typename?: 'ProjectsPendingContributorsVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "projects_rewarded_users" */
export type ProjectsRewardedUsers = {
  __typename?: 'ProjectsRewardedUsers';
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
  rewardCount: Scalars['Int'];
};

/** aggregated selection of "projects_rewarded_users" */
export type ProjectsRewardedUsersAggregate = {
  __typename?: 'ProjectsRewardedUsersAggregate';
  aggregate: Maybe<ProjectsRewardedUsersAggregateFields>;
  nodes: Array<ProjectsRewardedUsers>;
};

/** aggregate fields of "projects_rewarded_users" */
export type ProjectsRewardedUsersAggregateFields = {
  __typename?: 'ProjectsRewardedUsersAggregateFields';
  avg: Maybe<ProjectsRewardedUsersAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectsRewardedUsersMaxFields>;
  min: Maybe<ProjectsRewardedUsersMinFields>;
  stddev: Maybe<ProjectsRewardedUsersStddevFields>;
  stddevPop: Maybe<ProjectsRewardedUsersStddev_PopFields>;
  stddevSamp: Maybe<ProjectsRewardedUsersStddev_SampFields>;
  sum: Maybe<ProjectsRewardedUsersSumFields>;
  varPop: Maybe<ProjectsRewardedUsersVar_PopFields>;
  varSamp: Maybe<ProjectsRewardedUsersVar_SampFields>;
  variance: Maybe<ProjectsRewardedUsersVarianceFields>;
};


/** aggregate fields of "projects_rewarded_users" */
export type ProjectsRewardedUsersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_rewarded_users" */
export type ProjectsRewardedUsersAggregateOrderBy = {
  avg: InputMaybe<Projects_Rewarded_Users_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Rewarded_Users_Max_Order_By>;
  min: InputMaybe<Projects_Rewarded_Users_Min_Order_By>;
  stddev: InputMaybe<Projects_Rewarded_Users_Stddev_Order_By>;
  stddev_pop: InputMaybe<Projects_Rewarded_Users_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Projects_Rewarded_Users_Stddev_Samp_Order_By>;
  sum: InputMaybe<Projects_Rewarded_Users_Sum_Order_By>;
  var_pop: InputMaybe<Projects_Rewarded_Users_Var_Pop_Order_By>;
  var_samp: InputMaybe<Projects_Rewarded_Users_Var_Samp_Order_By>;
  variance: InputMaybe<Projects_Rewarded_Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "projects_rewarded_users" */
export type ProjectsRewardedUsersArrRelInsertInput = {
  data: Array<ProjectsRewardedUsersInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectsRewardedUsersOnConflict>;
};

/** aggregate avg on columns */
export type ProjectsRewardedUsersAvgFields = {
  __typename?: 'ProjectsRewardedUsersAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "projects_rewarded_users". All fields are combined with a logical 'AND'. */
export type ProjectsRewardedUsersBoolExp = {
  _and: InputMaybe<Array<ProjectsRewardedUsersBoolExp>>;
  _not: InputMaybe<ProjectsRewardedUsersBoolExp>;
  _or: InputMaybe<Array<ProjectsRewardedUsersBoolExp>>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  rewardCount: InputMaybe<IntComparisonExp>;
};

/** unique or primary key constraints on table "projects_rewarded_users" */
export enum ProjectsRewardedUsersConstraint {
  /** unique or primary key constraint on columns "project_id", "github_user_id" */
  ProjectsRewardedUsersPkey = 'projects_rewarded_users_pkey'
}

/** input type for incrementing numeric columns in table "projects_rewarded_users" */
export type ProjectsRewardedUsersIncInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  rewardCount: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "projects_rewarded_users" */
export type ProjectsRewardedUsersInsertInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rewardCount: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type ProjectsRewardedUsersMaxFields = {
  __typename?: 'ProjectsRewardedUsersMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
  rewardCount: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type ProjectsRewardedUsersMinFields = {
  __typename?: 'ProjectsRewardedUsersMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
  rewardCount: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "projects_rewarded_users" */
export type ProjectsRewardedUsersMutationResponse = {
  __typename?: 'ProjectsRewardedUsersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectsRewardedUsers>;
};

/** on_conflict condition type for table "projects_rewarded_users" */
export type ProjectsRewardedUsersOnConflict = {
  constraint: ProjectsRewardedUsersConstraint;
  update_columns: Array<ProjectsRewardedUsersUpdateColumn>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};

/** Ordering options when selecting data from "projects_rewarded_users". */
export type ProjectsRewardedUsersOrderBy = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** primary key columns input for table: projects_rewarded_users */
export type ProjectsRewardedUsersPkColumnsInput = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};

/** select columns of table "projects_rewarded_users" */
export enum ProjectsRewardedUsersSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RewardCount = 'rewardCount'
}

/** input type for updating data in table "projects_rewarded_users" */
export type ProjectsRewardedUsersSetInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rewardCount: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type ProjectsRewardedUsersStddevFields = {
  __typename?: 'ProjectsRewardedUsersStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectsRewardedUsersStddev_PopFields = {
  __typename?: 'ProjectsRewardedUsersStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectsRewardedUsersStddev_SampFields = {
  __typename?: 'ProjectsRewardedUsersStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectsRewardedUsersSumFields = {
  __typename?: 'ProjectsRewardedUsersSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
  rewardCount: Maybe<Scalars['Int']>;
};

/** update columns of table "projects_rewarded_users" */
export enum ProjectsRewardedUsersUpdateColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RewardCount = 'rewardCount'
}

export type ProjectsRewardedUsersUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ProjectsRewardedUsersIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectsRewardedUsersSetInput>;
  where: ProjectsRewardedUsersBoolExp;
};

/** aggregate var_pop on columns */
export type ProjectsRewardedUsersVar_PopFields = {
  __typename?: 'ProjectsRewardedUsersVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectsRewardedUsersVar_SampFields = {
  __typename?: 'ProjectsRewardedUsersVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectsRewardedUsersVarianceFields = {
  __typename?: 'ProjectsRewardedUsersVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
  rewardCount: Maybe<Scalars['Float']>;
};

/** select columns of table "api.projects" */
export enum ProjectsSelectColumn {
  /** column name */
  Hiring = 'hiring',
  /** column name */
  Id = 'id',
  /** column name */
  Key = 'key',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  LongDescription = 'longDescription',
  /** column name */
  MoreInfoLink = 'moreInfoLink',
  /** column name */
  Name = 'name',
  /** column name */
  Rank = 'rank',
  /** column name */
  ShortDescription = 'shortDescription',
  /** column name */
  Visibility = 'visibility'
}

/** columns and relationships of "projects_sponsors" */
export type ProjectsSponsors = {
  __typename?: 'ProjectsSponsors';
  projectId: Scalars['uuid'];
  /** An object relationship */
  sponsor: Sponsors;
  sponsorId: Scalars['uuid'];
};

/** aggregated selection of "projects_sponsors" */
export type ProjectsSponsorsAggregate = {
  __typename?: 'ProjectsSponsorsAggregate';
  aggregate: Maybe<ProjectsSponsorsAggregateFields>;
  nodes: Array<ProjectsSponsors>;
};

/** aggregate fields of "projects_sponsors" */
export type ProjectsSponsorsAggregateFields = {
  __typename?: 'ProjectsSponsorsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<ProjectsSponsorsMaxFields>;
  min: Maybe<ProjectsSponsorsMinFields>;
};


/** aggregate fields of "projects_sponsors" */
export type ProjectsSponsorsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_sponsors" */
export type ProjectsSponsorsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Sponsors_Max_Order_By>;
  min: InputMaybe<Projects_Sponsors_Min_Order_By>;
};

/** input type for inserting array relation for remote table "projects_sponsors" */
export type ProjectsSponsorsArrRelInsertInput = {
  data: Array<ProjectsSponsorsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<ProjectsSponsorsOnConflict>;
};

/** Boolean expression to filter rows from the table "projects_sponsors". All fields are combined with a logical 'AND'. */
export type ProjectsSponsorsBoolExp = {
  _and: InputMaybe<Array<ProjectsSponsorsBoolExp>>;
  _not: InputMaybe<ProjectsSponsorsBoolExp>;
  _or: InputMaybe<Array<ProjectsSponsorsBoolExp>>;
  projectId: InputMaybe<UuidComparisonExp>;
  sponsor: InputMaybe<SponsorsBoolExp>;
  sponsorId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "projects_sponsors" */
export enum ProjectsSponsorsConstraint {
  /** unique or primary key constraint on columns "project_id", "sponsor_id" */
  ProjectsSponsorsPkey = 'projects_sponsors_pkey',
  /** unique or primary key constraint on columns "project_id", "sponsor_id" */
  ProjectsSponsorsProjectIdSponsorIdKey = 'projects_sponsors_project_id_sponsor_id_key'
}

/** input type for inserting data into table "projects_sponsors" */
export type ProjectsSponsorsInsertInput = {
  projectId: InputMaybe<Scalars['uuid']>;
  sponsor: InputMaybe<SponsorsObjRelInsertInput>;
  sponsorId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectsSponsorsMaxFields = {
  __typename?: 'ProjectsSponsorsMaxFields';
  projectId: Maybe<Scalars['uuid']>;
  sponsorId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectsSponsorsMinFields = {
  __typename?: 'ProjectsSponsorsMinFields';
  projectId: Maybe<Scalars['uuid']>;
  sponsorId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "projects_sponsors" */
export type ProjectsSponsorsMutationResponse = {
  __typename?: 'ProjectsSponsorsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectsSponsors>;
};

/** on_conflict condition type for table "projects_sponsors" */
export type ProjectsSponsorsOnConflict = {
  constraint: ProjectsSponsorsConstraint;
  update_columns: Array<ProjectsSponsorsUpdateColumn>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};

/** Ordering options when selecting data from "projects_sponsors". */
export type ProjectsSponsorsOrderBy = {
  projectId: InputMaybe<OrderBy>;
  sponsor: InputMaybe<SponsorsOrderBy>;
  sponsorId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: projects_sponsors */
export type ProjectsSponsorsPkColumnsInput = {
  projectId: Scalars['uuid'];
  sponsorId: Scalars['uuid'];
};

/** select columns of table "projects_sponsors" */
export enum ProjectsSponsorsSelectColumn {
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  SponsorId = 'sponsorId'
}

/** input type for updating data in table "projects_sponsors" */
export type ProjectsSponsorsSetInput = {
  projectId: InputMaybe<Scalars['uuid']>;
  sponsorId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "projects_sponsors" */
export enum ProjectsSponsorsUpdateColumn {
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  SponsorId = 'sponsorId'
}

export type ProjectsSponsorsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectsSponsorsSetInput>;
  where: ProjectsSponsorsBoolExp;
};

/** aggregate stddev on columns */
export type ProjectsStddevFields = {
  __typename?: 'ProjectsStddevFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectsStddev_PopFields = {
  __typename?: 'ProjectsStddev_popFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectsStddev_SampFields = {
  __typename?: 'ProjectsStddev_sampFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectsSumFields = {
  __typename?: 'ProjectsSumFields';
  rank: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type ProjectsVar_PopFields = {
  __typename?: 'ProjectsVar_popFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectsVar_SampFields = {
  __typename?: 'ProjectsVar_sampFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectsVarianceFields = {
  __typename?: 'ProjectsVarianceFields';
  rank: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "Projects" */
export type Projects_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_StreamCursorValueInput = {
  hiring: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  key: InputMaybe<Scalars['String']>;
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  moreInfoLink: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: InputMaybe<Scalars['String']>;
  visibility: InputMaybe<Scalars['project_visibility']>;
};

export type Reason = {
  workItems: Array<WorkItem>;
};

/** columns and relationships of "registered_users" */
export type RegisteredUsers = {
  __typename?: 'RegisteredUsers';
  admin: Maybe<Scalars['Boolean']>;
  avatarUrl: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  login: Maybe<Scalars['String']>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** An array relationship */
  projectsLeaded: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectsLeadedAggregate: ProjectLeadsAggregate;
  /** An object relationship */
  userPayoutInfo: Maybe<UserPayoutInfo>;
};


/** columns and relationships of "registered_users" */
export type RegisteredUsersPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


/** columns and relationships of "registered_users" */
export type RegisteredUsersPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


/** columns and relationships of "registered_users" */
export type RegisteredUsersProjectsLeadedArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "registered_users" */
export type RegisteredUsersProjectsLeadedAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};

/** aggregated selection of "registered_users" */
export type RegisteredUsersAggregate = {
  __typename?: 'RegisteredUsersAggregate';
  aggregate: Maybe<RegisteredUsersAggregateFields>;
  nodes: Array<RegisteredUsers>;
};

/** aggregate fields of "registered_users" */
export type RegisteredUsersAggregateFields = {
  __typename?: 'RegisteredUsersAggregateFields';
  avg: Maybe<RegisteredUsersAvgFields>;
  count: Scalars['Int'];
  max: Maybe<RegisteredUsersMaxFields>;
  min: Maybe<RegisteredUsersMinFields>;
  stddev: Maybe<RegisteredUsersStddevFields>;
  stddevPop: Maybe<RegisteredUsersStddev_PopFields>;
  stddevSamp: Maybe<RegisteredUsersStddev_SampFields>;
  sum: Maybe<RegisteredUsersSumFields>;
  varPop: Maybe<RegisteredUsersVar_PopFields>;
  varSamp: Maybe<RegisteredUsersVar_SampFields>;
  variance: Maybe<RegisteredUsersVarianceFields>;
};


/** aggregate fields of "registered_users" */
export type RegisteredUsersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<RegisteredUsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type RegisteredUsersAvgFields = {
  __typename?: 'RegisteredUsersAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "registered_users". All fields are combined with a logical 'AND'. */
export type RegisteredUsersBoolExp = {
  _and: InputMaybe<Array<RegisteredUsersBoolExp>>;
  _not: InputMaybe<RegisteredUsersBoolExp>;
  _or: InputMaybe<Array<RegisteredUsersBoolExp>>;
  admin: InputMaybe<BooleanComparisonExp>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  email: InputMaybe<CitextComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  lastSeen: InputMaybe<TimestampComparisonExp>;
  login: InputMaybe<StringComparisonExp>;
  paymentRequests: InputMaybe<PaymentRequestsBoolExp>;
  paymentRequests_aggregate: InputMaybe<Payment_Requests_Aggregate_Bool_Exp>;
  projectsLeaded: InputMaybe<ProjectLeadsBoolExp>;
  projectsLeaded_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  userPayoutInfo: InputMaybe<UserPayoutInfoBoolExp>;
};

/** input type for inserting data into table "registered_users" */
export type RegisteredUsersInsertInput = {
  admin: InputMaybe<Scalars['Boolean']>;
  avatarUrl: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  lastSeen: InputMaybe<Scalars['timestamp']>;
  login: InputMaybe<Scalars['String']>;
  paymentRequests: InputMaybe<PaymentRequestsArrRelInsertInput>;
  projectsLeaded: InputMaybe<ProjectLeadsArrRelInsertInput>;
  userPayoutInfo: InputMaybe<UserPayoutInfoObjRelInsertInput>;
};

/** aggregate max on columns */
export type RegisteredUsersMaxFields = {
  __typename?: 'RegisteredUsersMaxFields';
  avatarUrl: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  login: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type RegisteredUsersMinFields = {
  __typename?: 'RegisteredUsersMinFields';
  avatarUrl: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  login: Maybe<Scalars['String']>;
};

/** input type for inserting object relation for remote table "registered_users" */
export type RegisteredUsersObjRelInsertInput = {
  data: RegisteredUsersInsertInput;
};

/** Ordering options when selecting data from "registered_users". */
export type RegisteredUsersOrderBy = {
  admin: InputMaybe<OrderBy>;
  avatarUrl: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  login: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  projectsLeadedAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  userPayoutInfo: InputMaybe<UserPayoutInfoOrderBy>;
};

/** select columns of table "registered_users" */
export enum RegisteredUsersSelectColumn {
  /** column name */
  Admin = 'admin',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  Email = 'email',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Login = 'login'
}

/** aggregate stddev on columns */
export type RegisteredUsersStddevFields = {
  __typename?: 'RegisteredUsersStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type RegisteredUsersStddev_PopFields = {
  __typename?: 'RegisteredUsersStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type RegisteredUsersStddev_SampFields = {
  __typename?: 'RegisteredUsersStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type RegisteredUsersSumFields = {
  __typename?: 'RegisteredUsersSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type RegisteredUsersVar_PopFields = {
  __typename?: 'RegisteredUsersVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type RegisteredUsersVar_SampFields = {
  __typename?: 'RegisteredUsersVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type RegisteredUsersVarianceFields = {
  __typename?: 'RegisteredUsersVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "sponsors" */
export type Sponsors = {
  __typename?: 'Sponsors';
  id: Scalars['uuid'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  sponsorProjects: Array<ProjectsSponsors>;
  /** An aggregate relationship */
  sponsorProjectsAggregate: ProjectsSponsorsAggregate;
  url: Maybe<Scalars['String']>;
};


/** columns and relationships of "sponsors" */
export type SponsorsSponsorProjectsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


/** columns and relationships of "sponsors" */
export type SponsorsSponsorProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};

/** aggregated selection of "sponsors" */
export type SponsorsAggregate = {
  __typename?: 'SponsorsAggregate';
  aggregate: Maybe<SponsorsAggregateFields>;
  nodes: Array<Sponsors>;
};

/** aggregate fields of "sponsors" */
export type SponsorsAggregateFields = {
  __typename?: 'SponsorsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<SponsorsMaxFields>;
  min: Maybe<SponsorsMinFields>;
};


/** aggregate fields of "sponsors" */
export type SponsorsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<SponsorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "sponsors". All fields are combined with a logical 'AND'. */
export type SponsorsBoolExp = {
  _and: InputMaybe<Array<SponsorsBoolExp>>;
  _not: InputMaybe<SponsorsBoolExp>;
  _or: InputMaybe<Array<SponsorsBoolExp>>;
  id: InputMaybe<UuidComparisonExp>;
  logoUrl: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  sponsorProjects: InputMaybe<ProjectsSponsorsBoolExp>;
  sponsorProjects_aggregate: InputMaybe<Projects_Sponsors_Aggregate_Bool_Exp>;
  url: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "sponsors" */
export enum SponsorsConstraint {
  /** unique or primary key constraint on columns "name" */
  SponsorsNameKey = 'sponsors_name_key',
  /** unique or primary key constraint on columns "id" */
  SponsorsPkey = 'sponsors_pkey'
}

/** input type for inserting data into table "sponsors" */
export type SponsorsInsertInput = {
  id: InputMaybe<Scalars['uuid']>;
  logoUrl: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  sponsorProjects: InputMaybe<ProjectsSponsorsArrRelInsertInput>;
  url: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type SponsorsMaxFields = {
  __typename?: 'SponsorsMaxFields';
  id: Maybe<Scalars['uuid']>;
  logoUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type SponsorsMinFields = {
  __typename?: 'SponsorsMinFields';
  id: Maybe<Scalars['uuid']>;
  logoUrl: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  url: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "sponsors" */
export type SponsorsMutationResponse = {
  __typename?: 'SponsorsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Sponsors>;
};

/** input type for inserting object relation for remote table "sponsors" */
export type SponsorsObjRelInsertInput = {
  data: SponsorsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<SponsorsOnConflict>;
};

/** on_conflict condition type for table "sponsors" */
export type SponsorsOnConflict = {
  constraint: SponsorsConstraint;
  update_columns: Array<SponsorsUpdateColumn>;
  where: InputMaybe<SponsorsBoolExp>;
};

/** Ordering options when selecting data from "sponsors". */
export type SponsorsOrderBy = {
  id: InputMaybe<OrderBy>;
  logoUrl: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  sponsorProjectsAggregate: InputMaybe<ProjectsSponsorsAggregateOrderBy>;
  url: InputMaybe<OrderBy>;
};

/** primary key columns input for table: sponsors */
export type SponsorsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "sponsors" */
export enum SponsorsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "sponsors" */
export type SponsorsSetInput = {
  id: InputMaybe<Scalars['uuid']>;
  logoUrl: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  url: InputMaybe<Scalars['String']>;
};

/** update columns of table "sponsors" */
export enum SponsorsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  Name = 'name',
  /** column name */
  Url = 'url'
}

export type SponsorsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<SponsorsSetInput>;
  where: SponsorsBoolExp;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq: InputMaybe<Scalars['String']>;
  _gt: InputMaybe<Scalars['String']>;
  _gte: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike: InputMaybe<Scalars['String']>;
  _in: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex: InputMaybe<Scalars['String']>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like: InputMaybe<Scalars['String']>;
  _lt: InputMaybe<Scalars['String']>;
  _lte: InputMaybe<Scalars['String']>;
  _neq: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike: InputMaybe<Scalars['String']>;
  _nin: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "api.technologies" */
export type Technologies = {
  __typename?: 'Technologies';
  technology: Maybe<Scalars['String']>;
};

/** aggregated selection of "api.technologies" */
export type TechnologiesAggregate = {
  __typename?: 'TechnologiesAggregate';
  aggregate: Maybe<TechnologiesAggregateFields>;
  nodes: Array<Technologies>;
};

/** aggregate fields of "api.technologies" */
export type TechnologiesAggregateFields = {
  __typename?: 'TechnologiesAggregateFields';
  count: Scalars['Int'];
  max: Maybe<TechnologiesMaxFields>;
  min: Maybe<TechnologiesMinFields>;
};


/** aggregate fields of "api.technologies" */
export type TechnologiesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<TechnologiesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "api.technologies". All fields are combined with a logical 'AND'. */
export type TechnologiesBoolExp = {
  _and: InputMaybe<Array<TechnologiesBoolExp>>;
  _not: InputMaybe<TechnologiesBoolExp>;
  _or: InputMaybe<Array<TechnologiesBoolExp>>;
  technology: InputMaybe<StringComparisonExp>;
};

/** input type for inserting data into table "api.technologies" */
export type TechnologiesInsertInput = {
  technology: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type TechnologiesMaxFields = {
  __typename?: 'TechnologiesMaxFields';
  technology: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type TechnologiesMinFields = {
  __typename?: 'TechnologiesMinFields';
  technology: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "api.technologies" */
export type TechnologiesMutationResponse = {
  __typename?: 'TechnologiesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Technologies>;
};

/** Ordering options when selecting data from "api.technologies". */
export type TechnologiesOrderBy = {
  technology: InputMaybe<OrderBy>;
};

/** select columns of table "api.technologies" */
export enum TechnologiesSelectColumn {
  /** column name */
  Technology = 'technology'
}

/** input type for updating data in table "api.technologies" */
export type TechnologiesSetInput = {
  technology: InputMaybe<Scalars['String']>;
};

export type TechnologiesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<TechnologiesSetInput>;
  where: TechnologiesBoolExp;
};

/** Streaming cursor of the table "Technologies" */
export type Technologies_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Technologies_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Technologies_StreamCursorValueInput = {
  technology: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type TimestampComparisonExp = {
  _eq: InputMaybe<Scalars['timestamp']>;
  _gt: InputMaybe<Scalars['timestamp']>;
  _gte: InputMaybe<Scalars['timestamp']>;
  _in: InputMaybe<Array<Scalars['timestamp']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['timestamp']>;
  _lte: InputMaybe<Scalars['timestamp']>;
  _neq: InputMaybe<Scalars['timestamp']>;
  _nin: InputMaybe<Array<Scalars['timestamp']>>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq: InputMaybe<Scalars['timestamptz']>;
  _gt: InputMaybe<Scalars['timestamptz']>;
  _gte: InputMaybe<Scalars['timestamptz']>;
  _in: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['timestamptz']>;
  _lte: InputMaybe<Scalars['timestamptz']>;
  _neq: InputMaybe<Scalars['timestamptz']>;
  _nin: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "user_payout_info" */
export type UserPayoutInfo = {
  __typename?: 'UserPayoutInfo';
  arePayoutSettingsValid: Scalars['Boolean'];
  identity: Maybe<Scalars['jsonb']>;
  location: Maybe<Scalars['jsonb']>;
  payoutSettings: Maybe<Scalars['jsonb']>;
  userId: Scalars['uuid'];
};


/** columns and relationships of "user_payout_info" */
export type UserPayoutInfoIdentityArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_payout_info" */
export type UserPayoutInfoLocationArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_payout_info" */
export type UserPayoutInfoPayoutSettingsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "user_payout_info" */
export type UserPayoutInfoAggregate = {
  __typename?: 'UserPayoutInfoAggregate';
  aggregate: Maybe<UserPayoutInfoAggregateFields>;
  nodes: Array<UserPayoutInfo>;
};

/** aggregate fields of "user_payout_info" */
export type UserPayoutInfoAggregateFields = {
  __typename?: 'UserPayoutInfoAggregateFields';
  count: Scalars['Int'];
  max: Maybe<UserPayoutInfoMaxFields>;
  min: Maybe<UserPayoutInfoMinFields>;
};


/** aggregate fields of "user_payout_info" */
export type UserPayoutInfoAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserPayoutInfoSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserPayoutInfoAppendInput = {
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "user_payout_info". All fields are combined with a logical 'AND'. */
export type UserPayoutInfoBoolExp = {
  _and: InputMaybe<Array<UserPayoutInfoBoolExp>>;
  _not: InputMaybe<UserPayoutInfoBoolExp>;
  _or: InputMaybe<Array<UserPayoutInfoBoolExp>>;
  arePayoutSettingsValid: InputMaybe<BooleanComparisonExp>;
  identity: InputMaybe<JsonbComparisonExp>;
  location: InputMaybe<JsonbComparisonExp>;
  payoutSettings: InputMaybe<JsonbComparisonExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "user_payout_info" */
export enum UserPayoutInfoConstraint {
  /** unique or primary key constraint on columns "user_id" */
  UserInfoPkey = 'user_info_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserPayoutInfoDeleteAtPathInput = {
  identity: InputMaybe<Array<Scalars['String']>>;
  location: InputMaybe<Array<Scalars['String']>>;
  payoutSettings: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserPayoutInfoDeleteElemInput = {
  identity: InputMaybe<Scalars['Int']>;
  location: InputMaybe<Scalars['Int']>;
  payoutSettings: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserPayoutInfoDeleteKeyInput = {
  identity: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  payoutSettings: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "user_payout_info" */
export type UserPayoutInfoInsertInput = {
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type UserPayoutInfoMaxFields = {
  __typename?: 'UserPayoutInfoMaxFields';
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type UserPayoutInfoMinFields = {
  __typename?: 'UserPayoutInfoMinFields';
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "user_payout_info" */
export type UserPayoutInfoMutationResponse = {
  __typename?: 'UserPayoutInfoMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserPayoutInfo>;
};

/** input type for inserting object relation for remote table "user_payout_info" */
export type UserPayoutInfoObjRelInsertInput = {
  data: UserPayoutInfoInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<UserPayoutInfoOnConflict>;
};

/** on_conflict condition type for table "user_payout_info" */
export type UserPayoutInfoOnConflict = {
  constraint: UserPayoutInfoConstraint;
  update_columns: Array<UserPayoutInfoUpdateColumn>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};

/** Ordering options when selecting data from "user_payout_info". */
export type UserPayoutInfoOrderBy = {
  arePayoutSettingsValid: InputMaybe<OrderBy>;
  identity: InputMaybe<OrderBy>;
  location: InputMaybe<OrderBy>;
  payoutSettings: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: user_payout_info */
export type UserPayoutInfoPkColumnsInput = {
  userId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserPayoutInfoPrependInput = {
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "user_payout_info" */
export enum UserPayoutInfoSelectColumn {
  /** column name */
  ArePayoutSettingsValid = 'arePayoutSettingsValid',
  /** column name */
  Identity = 'identity',
  /** column name */
  Location = 'location',
  /** column name */
  PayoutSettings = 'payoutSettings',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "user_payout_info" */
export type UserPayoutInfoSetInput = {
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_payout_info" */
export enum UserPayoutInfoUpdateColumn {
  /** column name */
  Identity = 'identity',
  /** column name */
  Location = 'location',
  /** column name */
  PayoutSettings = 'payoutSettings',
  /** column name */
  UserId = 'userId'
}

export type UserPayoutInfoUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<UserPayoutInfoAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<UserPayoutInfoDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<UserPayoutInfoDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<UserPayoutInfoDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<UserPayoutInfoPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<UserPayoutInfoSetInput>;
  where: UserPayoutInfoBoolExp;
};

/** columns and relationships of "api.user_profiles" */
export type UserProfiles = {
  __typename?: 'UserProfiles';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  /** An array relationship */
  completedContributions: Array<ApiCompletedContributions>;
  /** An aggregate relationship */
  completedContributionsAggregate: ApiCompletedContributionsAggregate;
  completionScore: Scalars['Int'];
  /** An array relationship */
  contactInformations: Array<ContactInformations>;
  /** An aggregate relationship */
  contactInformationsAggregate: ContactInformationsAggregate;
  contacts: Contacts;
  /** An array relationship */
  contributionCounts: Array<ContributionCounts>;
  /** An aggregate relationship */
  contributionCountsAggregate: ContributionCountsAggregate;
  /** An array relationship */
  contributionStats: Array<ContributionStats>;
  /** An aggregate relationship */
  contributionStatsAggregate: ContributionStatsAggregate;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributionsAggregate: ContributionsAggregate;
  cover: Maybe<Scalars['profile_cover']>;
  createdAt: Maybe<Scalars['timestamp']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  languages: Maybe<Scalars['jsonb']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  lookingForAJob: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  paymentStats: Array<PaymentStats>;
  /** An aggregate relationship */
  paymentStatsAggregate: PaymentStatsAggregate;
  /** An array relationship */
  projectsContributed: Array<ProjectsContributors>;
  /** An aggregate relationship */
  projectsContributedAggregate: ProjectsContributorsAggregate;
  /** An array relationship */
  projectsLeaded: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectsLeadedAggregate: ProjectLeadsAggregate;
  /** An array relationship */
  projectsRewarded: Array<ProjectsRewardedUsers>;
  /** An aggregate relationship */
  projectsRewardedAggregate: ProjectsRewardedUsersAggregate;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
  weeklyAllocatedTime: Maybe<Scalars['allocated_time']>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesCompletedContributionsArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesCompletedContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContactInformationsArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContactInformationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionCountsArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionCountsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionStatsArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionsArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesPaymentStatsArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesPaymentStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsContributedArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsContributedAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsLeadedArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsLeadedAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsRewardedArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


/** columns and relationships of "api.user_profiles" */
export type UserProfilesProjectsRewardedAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};

/** aggregated selection of "api.user_profiles" */
export type UserProfilesAggregate = {
  __typename?: 'UserProfilesAggregate';
  aggregate: Maybe<UserProfilesAggregateFields>;
  nodes: Array<UserProfiles>;
};

/** aggregate fields of "api.user_profiles" */
export type UserProfilesAggregateFields = {
  __typename?: 'UserProfilesAggregateFields';
  avg: Maybe<UserProfilesAvgFields>;
  count: Scalars['Int'];
  max: Maybe<UserProfilesMaxFields>;
  min: Maybe<UserProfilesMinFields>;
  stddev: Maybe<UserProfilesStddevFields>;
  stddevPop: Maybe<UserProfilesStddev_PopFields>;
  stddevSamp: Maybe<UserProfilesStddev_SampFields>;
  sum: Maybe<UserProfilesSumFields>;
  varPop: Maybe<UserProfilesVar_PopFields>;
  varSamp: Maybe<UserProfilesVar_SampFields>;
  variance: Maybe<UserProfilesVarianceFields>;
};


/** aggregate fields of "api.user_profiles" */
export type UserProfilesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserProfilesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type UserProfilesAvgFields = {
  __typename?: 'UserProfilesAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.user_profiles". All fields are combined with a logical 'AND'. */
export type UserProfilesBoolExp = {
  _and: InputMaybe<Array<UserProfilesBoolExp>>;
  _not: InputMaybe<UserProfilesBoolExp>;
  _or: InputMaybe<Array<UserProfilesBoolExp>>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  bio: InputMaybe<StringComparisonExp>;
  completedContributions: InputMaybe<ApiCompletedContributionsBoolExp>;
  completedContributions_aggregate: InputMaybe<Api_Completed_Contributions_Aggregate_Bool_Exp>;
  contactInformations: InputMaybe<ContactInformationsBoolExp>;
  contactInformations_aggregate: InputMaybe<ContactInformations_Aggregate_Bool_Exp>;
  contributionCounts: InputMaybe<ContributionCountsBoolExp>;
  contributionCounts_aggregate: InputMaybe<ContributionCounts_Aggregate_Bool_Exp>;
  contributionStats: InputMaybe<ContributionStatsBoolExp>;
  contributionStats_aggregate: InputMaybe<ContributionStats_Aggregate_Bool_Exp>;
  contributions: InputMaybe<ContributionsBoolExp>;
  contributions_aggregate: InputMaybe<Contributions_Aggregate_Bool_Exp>;
  cover: InputMaybe<ProfileCoverComparisonExp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  languages: InputMaybe<JsonbComparisonExp>;
  lastSeen: InputMaybe<TimestampComparisonExp>;
  location: InputMaybe<StringComparisonExp>;
  login: InputMaybe<StringComparisonExp>;
  lookingForAJob: InputMaybe<BooleanComparisonExp>;
  paymentStats: InputMaybe<PaymentStatsBoolExp>;
  paymentStats_aggregate: InputMaybe<Payment_Stats_Aggregate_Bool_Exp>;
  projectsContributed: InputMaybe<ProjectsContributorsBoolExp>;
  projectsContributed_aggregate: InputMaybe<Projects_Contributors_Aggregate_Bool_Exp>;
  projectsLeaded: InputMaybe<ProjectLeadsBoolExp>;
  projectsLeaded_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  projectsRewarded: InputMaybe<ProjectsRewardedUsersBoolExp>;
  projectsRewarded_aggregate: InputMaybe<Projects_Rewarded_Users_Aggregate_Bool_Exp>;
  userId: InputMaybe<UuidComparisonExp>;
  website: InputMaybe<StringComparisonExp>;
  weeklyAllocatedTime: InputMaybe<AllocatedTimeComparisonExp>;
};

/** input type for inserting data into table "api.user_profiles" */
export type UserProfilesInsertInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  completedContributions: InputMaybe<ApiCompletedContributionsArrRelInsertInput>;
  contactInformations: InputMaybe<ContactInformationsArrRelInsertInput>;
  contributionCounts: InputMaybe<ContributionCountsArrRelInsertInput>;
  contributionStats: InputMaybe<ContributionStatsArrRelInsertInput>;
  contributions: InputMaybe<ContributionsArrRelInsertInput>;
  cover: InputMaybe<Scalars['profile_cover']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  languages: InputMaybe<Scalars['jsonb']>;
  lastSeen: InputMaybe<Scalars['timestamp']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  lookingForAJob: InputMaybe<Scalars['Boolean']>;
  paymentStats: InputMaybe<PaymentStatsArrRelInsertInput>;
  projectsContributed: InputMaybe<ProjectsContributorsArrRelInsertInput>;
  projectsLeaded: InputMaybe<ProjectLeadsArrRelInsertInput>;
  projectsRewarded: InputMaybe<ProjectsRewardedUsersArrRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
  website: InputMaybe<Scalars['String']>;
  weeklyAllocatedTime: InputMaybe<Scalars['allocated_time']>;
};

/** aggregate max on columns */
export type UserProfilesMaxFields = {
  __typename?: 'UserProfilesMaxFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  cover: Maybe<Scalars['profile_cover']>;
  createdAt: Maybe<Scalars['timestamp']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
  weeklyAllocatedTime: Maybe<Scalars['allocated_time']>;
};

/** aggregate min on columns */
export type UserProfilesMinFields = {
  __typename?: 'UserProfilesMinFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  cover: Maybe<Scalars['profile_cover']>;
  createdAt: Maybe<Scalars['timestamp']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  lastSeen: Maybe<Scalars['timestamp']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
  weeklyAllocatedTime: Maybe<Scalars['allocated_time']>;
};

/** input type for inserting object relation for remote table "api.user_profiles" */
export type UserProfilesObjRelInsertInput = {
  data: UserProfilesInsertInput;
};

/** Ordering options when selecting data from "api.user_profiles". */
export type UserProfilesOrderBy = {
  avatarUrl: InputMaybe<OrderBy>;
  bio: InputMaybe<OrderBy>;
  completedContributionsAggregate: InputMaybe<ApiCompletedContributionsAggregateOrderBy>;
  contactInformationsAggregate: InputMaybe<ContactInformationsAggregateOrderBy>;
  contributionCountsAggregate: InputMaybe<ContributionCountsAggregateOrderBy>;
  contributionStatsAggregate: InputMaybe<ContributionStatsAggregateOrderBy>;
  contributionsAggregate: InputMaybe<ContributionsAggregateOrderBy>;
  cover: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  location: InputMaybe<OrderBy>;
  login: InputMaybe<OrderBy>;
  lookingForAJob: InputMaybe<OrderBy>;
  paymentStatsAggregate: InputMaybe<PaymentStatsAggregateOrderBy>;
  projectsContributedAggregate: InputMaybe<ProjectsContributorsAggregateOrderBy>;
  projectsLeadedAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  projectsRewardedAggregate: InputMaybe<ProjectsRewardedUsersAggregateOrderBy>;
  userId: InputMaybe<OrderBy>;
  website: InputMaybe<OrderBy>;
  weeklyAllocatedTime: InputMaybe<OrderBy>;
};

/** select columns of table "api.user_profiles" */
export enum UserProfilesSelectColumn {
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  Bio = 'bio',
  /** column name */
  Cover = 'cover',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Languages = 'languages',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Location = 'location',
  /** column name */
  Login = 'login',
  /** column name */
  LookingForAJob = 'lookingForAJob',
  /** column name */
  UserId = 'userId',
  /** column name */
  Website = 'website',
  /** column name */
  WeeklyAllocatedTime = 'weeklyAllocatedTime'
}

/** aggregate stddev on columns */
export type UserProfilesStddevFields = {
  __typename?: 'UserProfilesStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UserProfilesStddev_PopFields = {
  __typename?: 'UserProfilesStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UserProfilesStddev_SampFields = {
  __typename?: 'UserProfilesStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UserProfilesSumFields = {
  __typename?: 'UserProfilesSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type UserProfilesVar_PopFields = {
  __typename?: 'UserProfilesVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UserProfilesVar_SampFields = {
  __typename?: 'UserProfilesVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UserProfilesVarianceFields = {
  __typename?: 'UserProfilesVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Streaming cursor of the table "UserProfiles" */
export type UserProfiles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserProfiles_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserProfiles_StreamCursorValueInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  cover: InputMaybe<Scalars['profile_cover']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  languages: InputMaybe<Scalars['jsonb']>;
  lastSeen: InputMaybe<Scalars['timestamp']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  lookingForAJob: InputMaybe<Scalars['Boolean']>;
  userId: InputMaybe<Scalars['uuid']>;
  website: InputMaybe<Scalars['String']>;
  weeklyAllocatedTime: InputMaybe<Scalars['allocated_time']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq: InputMaybe<Scalars['uuid']>;
  _gt: InputMaybe<Scalars['uuid']>;
  _gte: InputMaybe<Scalars['uuid']>;
  _in: InputMaybe<Array<Scalars['uuid']>>;
  _isNull: InputMaybe<Scalars['Boolean']>;
  _lt: InputMaybe<Scalars['uuid']>;
  _lte: InputMaybe<Scalars['uuid']>;
  _neq: InputMaybe<Scalars['uuid']>;
  _nin: InputMaybe<Array<Scalars['uuid']>>;
};

export enum Visibility {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type WorkItem = {
  id: Scalars['String'];
  number: Scalars['Int'];
  repoId: Scalars['Int'];
  type: WorkItemType;
};

export enum WorkItemType {
  CodeReview = 'CODE_REVIEW',
  Issue = 'ISSUE',
  PullRequest = 'PULL_REQUEST'
}

/** columns and relationships of "api.work_items" */
export type WorkItems = {
  __typename?: 'WorkItems';
  /** An object relationship */
  githubCodeReview: Maybe<GithubPullRequestReviews>;
  githubCodeReviewId: Maybe<Scalars['String']>;
  /** An object relationship */
  githubIssue: Maybe<GithubIssues>;
  githubIssueId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  githubPullRequest: Maybe<GithubPullRequests>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  number: Maybe<Scalars['bigint']>;
  paymentId: Maybe<Scalars['uuid']>;
  /** An object relationship */
  paymentRequest: Maybe<PaymentRequests>;
  projectId: Maybe<Scalars['uuid']>;
  recipientId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  type: Maybe<Scalars['contribution_type']>;
};

/** aggregated selection of "api.work_items" */
export type WorkItemsAggregate = {
  __typename?: 'WorkItemsAggregate';
  aggregate: Maybe<WorkItemsAggregateFields>;
  nodes: Array<WorkItems>;
};

/** aggregate fields of "api.work_items" */
export type WorkItemsAggregateFields = {
  __typename?: 'WorkItemsAggregateFields';
  avg: Maybe<WorkItemsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<WorkItemsMaxFields>;
  min: Maybe<WorkItemsMinFields>;
  stddev: Maybe<WorkItemsStddevFields>;
  stddevPop: Maybe<WorkItemsStddev_PopFields>;
  stddevSamp: Maybe<WorkItemsStddev_SampFields>;
  sum: Maybe<WorkItemsSumFields>;
  varPop: Maybe<WorkItemsVar_PopFields>;
  varSamp: Maybe<WorkItemsVar_SampFields>;
  variance: Maybe<WorkItemsVarianceFields>;
};


/** aggregate fields of "api.work_items" */
export type WorkItemsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<WorkItemsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "api.work_items" */
export type WorkItemsAggregateOrderBy = {
  avg: InputMaybe<WorkItems_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<WorkItems_Max_Order_By>;
  min: InputMaybe<WorkItems_Min_Order_By>;
  stddev: InputMaybe<WorkItems_Stddev_Order_By>;
  stddev_pop: InputMaybe<WorkItems_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<WorkItems_Stddev_Samp_Order_By>;
  sum: InputMaybe<WorkItems_Sum_Order_By>;
  var_pop: InputMaybe<WorkItems_Var_Pop_Order_By>;
  var_samp: InputMaybe<WorkItems_Var_Samp_Order_By>;
  variance: InputMaybe<WorkItems_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "api.work_items" */
export type WorkItemsArrRelInsertInput = {
  data: Array<WorkItemsInsertInput>;
};

/** aggregate avg on columns */
export type WorkItemsAvgFields = {
  __typename?: 'WorkItemsAvgFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "api.work_items". All fields are combined with a logical 'AND'. */
export type WorkItemsBoolExp = {
  _and: InputMaybe<Array<WorkItemsBoolExp>>;
  _not: InputMaybe<WorkItemsBoolExp>;
  _or: InputMaybe<Array<WorkItemsBoolExp>>;
  githubCodeReview: InputMaybe<GithubPullRequestReviewsBoolExp>;
  githubCodeReviewId: InputMaybe<StringComparisonExp>;
  githubIssue: InputMaybe<GithubIssuesBoolExp>;
  githubIssueId: InputMaybe<BigintComparisonExp>;
  githubPullRequest: InputMaybe<GithubPullRequestsBoolExp>;
  githubPullRequestId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<StringComparisonExp>;
  number: InputMaybe<BigintComparisonExp>;
  paymentId: InputMaybe<UuidComparisonExp>;
  paymentRequest: InputMaybe<PaymentRequestsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  recipientId: InputMaybe<BigintComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  type: InputMaybe<ContributionTypeComparisonExp>;
};

/** input type for incrementing numeric columns in table "api.work_items" */
export type WorkItemsIncInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  number: InputMaybe<Scalars['bigint']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "api.work_items" */
export type WorkItemsInsertInput = {
  githubCodeReview: InputMaybe<GithubPullRequestReviewsObjRelInsertInput>;
  githubCodeReviewId: InputMaybe<Scalars['String']>;
  githubIssue: InputMaybe<GithubIssuesObjRelInsertInput>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequest: InputMaybe<GithubPullRequestsObjRelInsertInput>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  number: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  paymentRequest: InputMaybe<PaymentRequestsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  type: InputMaybe<Scalars['contribution_type']>;
};

/** aggregate max on columns */
export type WorkItemsMaxFields = {
  __typename?: 'WorkItemsMaxFields';
  githubCodeReviewId: Maybe<Scalars['String']>;
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  number: Maybe<Scalars['bigint']>;
  paymentId: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
  recipientId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  type: Maybe<Scalars['contribution_type']>;
};

/** aggregate min on columns */
export type WorkItemsMinFields = {
  __typename?: 'WorkItemsMinFields';
  githubCodeReviewId: Maybe<Scalars['String']>;
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['String']>;
  number: Maybe<Scalars['bigint']>;
  paymentId: Maybe<Scalars['uuid']>;
  projectId: Maybe<Scalars['uuid']>;
  recipientId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
  type: Maybe<Scalars['contribution_type']>;
};

/** response of any mutation on the table "api.work_items" */
export type WorkItemsMutationResponse = {
  __typename?: 'WorkItemsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkItems>;
};

/** Ordering options when selecting data from "api.work_items". */
export type WorkItemsOrderBy = {
  githubCodeReview: InputMaybe<GithubPullRequestReviewsOrderBy>;
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssue: InputMaybe<GithubIssuesOrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequest: InputMaybe<GithubPullRequestsOrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  paymentRequest: InputMaybe<PaymentRequestsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** select columns of table "api.work_items" */
export enum WorkItemsSelectColumn {
  /** column name */
  GithubCodeReviewId = 'githubCodeReviewId',
  /** column name */
  GithubIssueId = 'githubIssueId',
  /** column name */
  GithubPullRequestId = 'githubPullRequestId',
  /** column name */
  Id = 'id',
  /** column name */
  Number = 'number',
  /** column name */
  PaymentId = 'paymentId',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RecipientId = 'recipientId',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "api.work_items" */
export type WorkItemsSetInput = {
  githubCodeReviewId: InputMaybe<Scalars['String']>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  number: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  type: InputMaybe<Scalars['contribution_type']>;
};

/** aggregate stddev on columns */
export type WorkItemsStddevFields = {
  __typename?: 'WorkItemsStddevFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type WorkItemsStddev_PopFields = {
  __typename?: 'WorkItemsStddev_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type WorkItemsStddev_SampFields = {
  __typename?: 'WorkItemsStddev_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type WorkItemsSumFields = {
  __typename?: 'WorkItemsSumFields';
  githubIssueId: Maybe<Scalars['bigint']>;
  githubPullRequestId: Maybe<Scalars['bigint']>;
  number: Maybe<Scalars['bigint']>;
  recipientId: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

export type WorkItemsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<WorkItemsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<WorkItemsSetInput>;
  where: WorkItemsBoolExp;
};

/** aggregate var_pop on columns */
export type WorkItemsVar_PopFields = {
  __typename?: 'WorkItemsVar_popFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type WorkItemsVar_SampFields = {
  __typename?: 'WorkItemsVar_sampFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type WorkItemsVarianceFields = {
  __typename?: 'WorkItemsVarianceFields';
  githubIssueId: Maybe<Scalars['Float']>;
  githubPullRequestId: Maybe<Scalars['Float']>;
  number: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

export type WorkItems_Aggregate_Bool_Exp = {
  count: InputMaybe<WorkItems_Aggregate_Bool_Exp_Count>;
};

export type WorkItems_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<WorkItemsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<WorkItemsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.work_items" */
export type WorkItems_Avg_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.work_items" */
export type WorkItems_Max_Order_By = {
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.work_items" */
export type WorkItems_Min_Order_By = {
  githubCodeReviewId: InputMaybe<OrderBy>;
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.work_items" */
export type WorkItems_Stddev_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.work_items" */
export type WorkItems_Stddev_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.work_items" */
export type WorkItems_Stddev_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "WorkItems" */
export type WorkItems_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkItems_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkItems_StreamCursorValueInput = {
  githubCodeReviewId: InputMaybe<Scalars['String']>;
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  number: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
  type: InputMaybe<Scalars['contribution_type']>;
};

/** order by sum() on columns of table "api.work_items" */
export type WorkItems_Sum_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.work_items" */
export type WorkItems_Var_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.work_items" */
export type WorkItems_Var_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.work_items" */
export type WorkItems_Variance_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
  number: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

export type Api_Closed_By_Pull_Requests_Aggregate_Bool_Exp = {
  count: InputMaybe<Api_Closed_By_Pull_Requests_Aggregate_Bool_Exp_Count>;
};

export type Api_Closed_By_Pull_Requests_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ApiClosedByPullRequestsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Avg_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Max_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Min_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Stddev_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Stddev_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Stddev_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "api_closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Api_Closed_By_Pull_Requests_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Api_Closed_By_Pull_Requests_StreamCursorValueInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Sum_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Var_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Var_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.closed_by_pull_requests" */
export type Api_Closed_By_Pull_Requests_Variance_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

export type Api_Closing_Issues_Aggregate_Bool_Exp = {
  count: InputMaybe<Api_Closing_Issues_Aggregate_Bool_Exp_Count>;
};

export type Api_Closing_Issues_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ApiClosingIssuesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Avg_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Max_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Min_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Stddev_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Stddev_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Stddev_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "api_closing_issues" */
export type Api_Closing_Issues_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Api_Closing_Issues_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Api_Closing_Issues_StreamCursorValueInput = {
  githubIssueId: InputMaybe<Scalars['bigint']>;
  githubPullRequestId: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Sum_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Var_Pop_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Var_Samp_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.closing_issues" */
export type Api_Closing_Issues_Variance_Order_By = {
  githubIssueId: InputMaybe<OrderBy>;
  githubPullRequestId: InputMaybe<OrderBy>;
};

export type Api_Completed_Contributions_Aggregate_Bool_Exp = {
  count: InputMaybe<Api_Completed_Contributions_Aggregate_Bool_Exp_Count>;
};

export type Api_Completed_Contributions_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ApiCompletedContributionsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Max_Order_By = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Min_Order_By = {
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  detailsId: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "api_completed_contributions" */
export type Api_Completed_Contributions_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Api_Completed_Contributions_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Api_Completed_Contributions_StreamCursorValueInput = {
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  detailsId: InputMaybe<Scalars['String']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['contribution_status']>;
  type: InputMaybe<Scalars['contribution_type']>;
};

/** order by sum() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "api.completed_contributions" */
export type Api_Completed_Contributions_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

export type Applications_Aggregate_Bool_Exp = {
  count: InputMaybe<Applications_Aggregate_Bool_Exp_Count>;
};

export type Applications_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ApplicationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ApplicationsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "applications" */
export type Applications_Max_Order_By = {
  applicantId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  receivedAt: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "applications" */
export type Applications_Min_Order_By = {
  applicantId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  receivedAt: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "applications" */
export type Applications_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Applications_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Applications_StreamCursorValueInput = {
  applicantId: InputMaybe<Scalars['uuid']>;
  id: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
  receivedAt: InputMaybe<Scalars['timestamp']>;
};

/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequests = {
  __typename?: 'authProviderRequests';
  id: Scalars['uuid'];
  options: Maybe<Scalars['jsonb']>;
};


/** Oauth requests, inserted before redirecting to the provider's site. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviderRequestsOptionsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "auth.provider_requests" */
export type AuthProviderRequestsAggregate = {
  __typename?: 'authProviderRequestsAggregate';
  aggregate: Maybe<AuthProviderRequestsAggregateFields>;
  nodes: Array<AuthProviderRequests>;
};

/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequestsAggregateFields = {
  __typename?: 'authProviderRequestsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthProviderRequestsMaxFields>;
  min: Maybe<AuthProviderRequestsMinFields>;
};


/** aggregate fields of "auth.provider_requests" */
export type AuthProviderRequestsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthProviderRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequestsAppendInput = {
  options: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "auth.provider_requests". All fields are combined with a logical 'AND'. */
export type AuthProviderRequestsBoolExp = {
  _and: InputMaybe<Array<AuthProviderRequestsBoolExp>>;
  _not: InputMaybe<AuthProviderRequestsBoolExp>;
  _or: InputMaybe<Array<AuthProviderRequestsBoolExp>>;
  id: InputMaybe<UuidComparisonExp>;
  options: InputMaybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "auth.provider_requests" */
export enum AuthProviderRequestsConstraint {
  /** unique or primary key constraint on columns "id" */
  ProviderRequestsPkey = 'provider_requests_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type AuthProviderRequestsDeleteAtPathInput = {
  options: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type AuthProviderRequestsDeleteElemInput = {
  options: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type AuthProviderRequestsDeleteKeyInput = {
  options: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.provider_requests" */
export type AuthProviderRequestsInsertInput = {
  id: InputMaybe<Scalars['uuid']>;
  options: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type AuthProviderRequestsMaxFields = {
  __typename?: 'authProviderRequestsMaxFields';
  id: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthProviderRequestsMinFields = {
  __typename?: 'authProviderRequestsMinFields';
  id: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.provider_requests" */
export type AuthProviderRequestsMutationResponse = {
  __typename?: 'authProviderRequestsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviderRequests>;
};

/** on_conflict condition type for table "auth.provider_requests" */
export type AuthProviderRequestsOnConflict = {
  constraint: AuthProviderRequestsConstraint;
  update_columns: Array<AuthProviderRequestsUpdateColumn>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};

/** Ordering options when selecting data from "auth.provider_requests". */
export type AuthProviderRequestsOrderBy = {
  id: InputMaybe<OrderBy>;
  options: InputMaybe<OrderBy>;
};

/** primary key columns input for table: auth.provider_requests */
export type AuthProviderRequestsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type AuthProviderRequestsPrependInput = {
  options: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.provider_requests" */
export enum AuthProviderRequestsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

/** input type for updating data in table "auth.provider_requests" */
export type AuthProviderRequestsSetInput = {
  id: InputMaybe<Scalars['uuid']>;
  options: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "auth.provider_requests" */
export enum AuthProviderRequestsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Options = 'options'
}

export type AuthProviderRequestsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<AuthProviderRequestsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<AuthProviderRequestsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<AuthProviderRequestsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<AuthProviderRequestsDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<AuthProviderRequestsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthProviderRequestsSetInput>;
  where: AuthProviderRequestsBoolExp;
};

/** Streaming cursor of the table "authProviderRequests" */
export type AuthProviderRequests_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthProviderRequests_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviderRequests_StreamCursorValueInput = {
  id: InputMaybe<Scalars['uuid']>;
  options: InputMaybe<Scalars['jsonb']>;
};

/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProviders = {
  __typename?: 'authProviders';
  id: Scalars['String'];
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProvidersAggregate: AuthUserProvidersAggregate;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


/** List of available Oauth providers. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthProvidersUserProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};

/** aggregated selection of "auth.providers" */
export type AuthProvidersAggregate = {
  __typename?: 'authProvidersAggregate';
  aggregate: Maybe<AuthProvidersAggregateFields>;
  nodes: Array<AuthProviders>;
};

/** aggregate fields of "auth.providers" */
export type AuthProvidersAggregateFields = {
  __typename?: 'authProvidersAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthProvidersMaxFields>;
  min: Maybe<AuthProvidersMinFields>;
};


/** aggregate fields of "auth.providers" */
export type AuthProvidersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthProvidersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.providers". All fields are combined with a logical 'AND'. */
export type AuthProvidersBoolExp = {
  _and: InputMaybe<Array<AuthProvidersBoolExp>>;
  _not: InputMaybe<AuthProvidersBoolExp>;
  _or: InputMaybe<Array<AuthProvidersBoolExp>>;
  id: InputMaybe<StringComparisonExp>;
  userProviders: InputMaybe<AuthUserProvidersBoolExp>;
  userProviders_aggregate: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.providers" */
export enum AuthProvidersConstraint {
  /** unique or primary key constraint on columns "id" */
  ProvidersPkey = 'providers_pkey'
}

/** input type for inserting data into table "auth.providers" */
export type AuthProvidersInsertInput = {
  id: InputMaybe<Scalars['String']>;
  userProviders: InputMaybe<AuthUserProvidersArrRelInsertInput>;
};

/** aggregate max on columns */
export type AuthProvidersMaxFields = {
  __typename?: 'authProvidersMaxFields';
  id: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthProvidersMinFields = {
  __typename?: 'authProvidersMinFields';
  id: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.providers" */
export type AuthProvidersMutationResponse = {
  __typename?: 'authProvidersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthProviders>;
};

/** input type for inserting object relation for remote table "auth.providers" */
export type AuthProvidersObjRelInsertInput = {
  data: AuthProvidersInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<AuthProvidersOnConflict>;
};

/** on_conflict condition type for table "auth.providers" */
export type AuthProvidersOnConflict = {
  constraint: AuthProvidersConstraint;
  update_columns: Array<AuthProvidersUpdateColumn>;
  where: InputMaybe<AuthProvidersBoolExp>;
};

/** Ordering options when selecting data from "auth.providers". */
export type AuthProvidersOrderBy = {
  id: InputMaybe<OrderBy>;
  userProvidersAggregate: InputMaybe<AuthUserProvidersAggregateOrderBy>;
};

/** primary key columns input for table: auth.providers */
export type AuthProvidersPkColumnsInput = {
  id: Scalars['String'];
};

/** select columns of table "auth.providers" */
export enum AuthProvidersSelectColumn {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "auth.providers" */
export type AuthProvidersSetInput = {
  id: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.providers" */
export enum AuthProvidersUpdateColumn {
  /** column name */
  Id = 'id'
}

export type AuthProvidersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthProvidersSetInput>;
  where: AuthProvidersBoolExp;
};

/** Streaming cursor of the table "authProviders" */
export type AuthProviders_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthProviders_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthProviders_StreamCursorValueInput = {
  id: InputMaybe<Scalars['String']>;
};

/** User refresh tokens. Hasura auth uses them to rotate new access tokens as long as the refresh token is not expired. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRefreshTokens = {
  __typename?: 'authRefreshTokens';
  createdAt: Scalars['timestamptz'];
  expiresAt: Scalars['timestamptz'];
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: Scalars['uuid'];
  refreshTokenHash: Maybe<Scalars['String']>;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregate = {
  __typename?: 'authRefreshTokensAggregate';
  aggregate: Maybe<AuthRefreshTokensAggregateFields>;
  nodes: Array<AuthRefreshTokens>;
};

/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateFields = {
  __typename?: 'authRefreshTokensAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthRefreshTokensMaxFields>;
  min: Maybe<AuthRefreshTokensMinFields>;
};


/** aggregate fields of "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.refresh_tokens" */
export type AuthRefreshTokensAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AuthRefreshTokens_Max_Order_By>;
  min: InputMaybe<AuthRefreshTokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.refresh_tokens" */
export type AuthRefreshTokensArrRelInsertInput = {
  data: Array<AuthRefreshTokensInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<AuthRefreshTokensOnConflict>;
};

/** Boolean expression to filter rows from the table "auth.refresh_tokens". All fields are combined with a logical 'AND'. */
export type AuthRefreshTokensBoolExp = {
  _and: InputMaybe<Array<AuthRefreshTokensBoolExp>>;
  _not: InputMaybe<AuthRefreshTokensBoolExp>;
  _or: InputMaybe<Array<AuthRefreshTokensBoolExp>>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  expiresAt: InputMaybe<TimestamptzComparisonExp>;
  refreshToken: InputMaybe<UuidComparisonExp>;
  refreshTokenHash: InputMaybe<StringComparisonExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "auth.refresh_tokens" */
export enum AuthRefreshTokensConstraint {
  /** unique or primary key constraint on columns "refresh_token" */
  RefreshTokensPkey = 'refresh_tokens_pkey'
}

/** input type for inserting data into table "auth.refresh_tokens" */
export type AuthRefreshTokensInsertInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  expiresAt: InputMaybe<Scalars['timestamptz']>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: InputMaybe<Scalars['uuid']>;
  user: InputMaybe<UsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthRefreshTokensMaxFields = {
  __typename?: 'authRefreshTokensMaxFields';
  createdAt: Maybe<Scalars['timestamptz']>;
  expiresAt: Maybe<Scalars['timestamptz']>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: Maybe<Scalars['uuid']>;
  refreshTokenHash: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthRefreshTokensMinFields = {
  __typename?: 'authRefreshTokensMinFields';
  createdAt: Maybe<Scalars['timestamptz']>;
  expiresAt: Maybe<Scalars['timestamptz']>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: Maybe<Scalars['uuid']>;
  refreshTokenHash: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.refresh_tokens" */
export type AuthRefreshTokensMutationResponse = {
  __typename?: 'authRefreshTokensMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRefreshTokens>;
};

/** on_conflict condition type for table "auth.refresh_tokens" */
export type AuthRefreshTokensOnConflict = {
  constraint: AuthRefreshTokensConstraint;
  update_columns: Array<AuthRefreshTokensUpdateColumn>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};

/** Ordering options when selecting data from "auth.refresh_tokens". */
export type AuthRefreshTokensOrderBy = {
  createdAt: InputMaybe<OrderBy>;
  expiresAt: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  refreshTokenHash: InputMaybe<OrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: auth.refresh_tokens */
export type AuthRefreshTokensPkColumnsInput = {
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: Scalars['uuid'];
};

/** select columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokensSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  RefreshTokenHash = 'refreshTokenHash',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.refresh_tokens" */
export type AuthRefreshTokensSetInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  expiresAt: InputMaybe<Scalars['timestamptz']>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: InputMaybe<Scalars['uuid']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.refresh_tokens" */
export enum AuthRefreshTokensUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  ExpiresAt = 'expiresAt',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UserId = 'userId'
}

export type AuthRefreshTokensUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthRefreshTokensSetInput>;
  where: AuthRefreshTokensBoolExp;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp = {
  count: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp_Count>;
};

export type AuthRefreshTokens_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<AuthRefreshTokensBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Max_Order_By = {
  createdAt: InputMaybe<OrderBy>;
  expiresAt: InputMaybe<OrderBy>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: InputMaybe<OrderBy>;
  refreshTokenHash: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "auth.refresh_tokens" */
export type AuthRefreshTokens_Min_Order_By = {
  createdAt: InputMaybe<OrderBy>;
  expiresAt: InputMaybe<OrderBy>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: InputMaybe<OrderBy>;
  refreshTokenHash: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "authRefreshTokens" */
export type AuthRefreshTokens_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthRefreshTokens_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRefreshTokens_StreamCursorValueInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  expiresAt: InputMaybe<Scalars['timestamptz']>;
  /** DEPRECATED: auto-generated refresh token id. Will be replaced by a genereric id column that will be used as a primary key, not the refresh token itself. Use refresh_token_hash instead. */
  refreshToken: InputMaybe<Scalars['uuid']>;
  refreshTokenHash: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRoles = {
  __typename?: 'authRoles';
  role: Scalars['String'];
  /** An array relationship */
  userRoles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  userRolesAggregate: AuthUserRolesAggregate;
  /** An array relationship */
  usersByDefaultRole: Array<Users>;
  /** An aggregate relationship */
  usersByDefaultRoleAggregate: UsersAggregate;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRolesArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUserRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRoleArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};


/** Persistent Hasura roles for users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthRolesUsersByDefaultRoleAggregateArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};

/** aggregated selection of "auth.roles" */
export type AuthRolesAggregate = {
  __typename?: 'authRolesAggregate';
  aggregate: Maybe<AuthRolesAggregateFields>;
  nodes: Array<AuthRoles>;
};

/** aggregate fields of "auth.roles" */
export type AuthRolesAggregateFields = {
  __typename?: 'authRolesAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthRolesMaxFields>;
  min: Maybe<AuthRolesMinFields>;
};


/** aggregate fields of "auth.roles" */
export type AuthRolesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthRolesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "auth.roles". All fields are combined with a logical 'AND'. */
export type AuthRolesBoolExp = {
  _and: InputMaybe<Array<AuthRolesBoolExp>>;
  _not: InputMaybe<AuthRolesBoolExp>;
  _or: InputMaybe<Array<AuthRolesBoolExp>>;
  role: InputMaybe<StringComparisonExp>;
  userRoles: InputMaybe<AuthUserRolesBoolExp>;
  userRoles_aggregate: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  usersByDefaultRole: InputMaybe<UsersBoolExp>;
  usersByDefaultRole_aggregate: InputMaybe<Users_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.roles" */
export enum AuthRolesConstraint {
  /** unique or primary key constraint on columns "role" */
  RolesPkey = 'roles_pkey'
}

/** input type for inserting data into table "auth.roles" */
export type AuthRolesInsertInput = {
  role: InputMaybe<Scalars['String']>;
  userRoles: InputMaybe<AuthUserRolesArrRelInsertInput>;
  usersByDefaultRole: InputMaybe<UsersArrRelInsertInput>;
};

/** aggregate max on columns */
export type AuthRolesMaxFields = {
  __typename?: 'authRolesMaxFields';
  role: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type AuthRolesMinFields = {
  __typename?: 'authRolesMinFields';
  role: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "auth.roles" */
export type AuthRolesMutationResponse = {
  __typename?: 'authRolesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthRoles>;
};

/** input type for inserting object relation for remote table "auth.roles" */
export type AuthRolesObjRelInsertInput = {
  data: AuthRolesInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<AuthRolesOnConflict>;
};

/** on_conflict condition type for table "auth.roles" */
export type AuthRolesOnConflict = {
  constraint: AuthRolesConstraint;
  update_columns: Array<AuthRolesUpdateColumn>;
  where: InputMaybe<AuthRolesBoolExp>;
};

/** Ordering options when selecting data from "auth.roles". */
export type AuthRolesOrderBy = {
  role: InputMaybe<OrderBy>;
  userRolesAggregate: InputMaybe<AuthUserRolesAggregateOrderBy>;
  usersByDefaultRoleAggregate: InputMaybe<UsersAggregateOrderBy>;
};

/** primary key columns input for table: auth.roles */
export type AuthRolesPkColumnsInput = {
  role: Scalars['String'];
};

/** select columns of table "auth.roles" */
export enum AuthRolesSelectColumn {
  /** column name */
  Role = 'role'
}

/** input type for updating data in table "auth.roles" */
export type AuthRolesSetInput = {
  role: InputMaybe<Scalars['String']>;
};

/** update columns of table "auth.roles" */
export enum AuthRolesUpdateColumn {
  /** column name */
  Role = 'role'
}

export type AuthRolesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthRolesSetInput>;
  where: AuthRolesBoolExp;
};

/** Streaming cursor of the table "authRoles" */
export type AuthRoles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthRoles_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthRoles_StreamCursorValueInput = {
  role: InputMaybe<Scalars['String']>;
};

/** Active providers for a given user. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserProviders = {
  __typename?: 'authUserProviders';
  accessToken: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  /** An object relationship */
  provider: AuthProviders;
  providerId: Scalars['String'];
  providerUserId: Scalars['String'];
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_providers" */
export type AuthUserProvidersAggregate = {
  __typename?: 'authUserProvidersAggregate';
  aggregate: Maybe<AuthUserProvidersAggregateFields>;
  nodes: Array<AuthUserProviders>;
};

/** aggregate fields of "auth.user_providers" */
export type AuthUserProvidersAggregateFields = {
  __typename?: 'authUserProvidersAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthUserProvidersMaxFields>;
  min: Maybe<AuthUserProvidersMinFields>;
};


/** aggregate fields of "auth.user_providers" */
export type AuthUserProvidersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_providers" */
export type AuthUserProvidersAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AuthUserProviders_Max_Order_By>;
  min: InputMaybe<AuthUserProviders_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_providers" */
export type AuthUserProvidersArrRelInsertInput = {
  data: Array<AuthUserProvidersInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<AuthUserProvidersOnConflict>;
};

/** Boolean expression to filter rows from the table "auth.user_providers". All fields are combined with a logical 'AND'. */
export type AuthUserProvidersBoolExp = {
  _and: InputMaybe<Array<AuthUserProvidersBoolExp>>;
  _not: InputMaybe<AuthUserProvidersBoolExp>;
  _or: InputMaybe<Array<AuthUserProvidersBoolExp>>;
  accessToken: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  provider: InputMaybe<AuthProvidersBoolExp>;
  providerId: InputMaybe<StringComparisonExp>;
  providerUserId: InputMaybe<StringComparisonExp>;
  refreshToken: InputMaybe<StringComparisonExp>;
  updatedAt: InputMaybe<TimestamptzComparisonExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "auth.user_providers" */
export enum AuthUserProvidersConstraint {
  /** unique or primary key constraint on columns "id" */
  UserProvidersPkey = 'user_providers_pkey',
  /** unique or primary key constraint on columns "provider_id", "provider_user_id" */
  UserProvidersProviderIdProviderUserIdKey = 'user_providers_provider_id_provider_user_id_key',
  /** unique or primary key constraint on columns "provider_id", "user_id" */
  UserProvidersUserIdProviderIdKey = 'user_providers_user_id_provider_id_key'
}

/** input type for inserting data into table "auth.user_providers" */
export type AuthUserProvidersInsertInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  provider: InputMaybe<AuthProvidersObjRelInsertInput>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  user: InputMaybe<UsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserProvidersMaxFields = {
  __typename?: 'authUserProvidersMaxFields';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthUserProvidersMinFields = {
  __typename?: 'authUserProvidersMinFields';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.user_providers" */
export type AuthUserProvidersMutationResponse = {
  __typename?: 'authUserProvidersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserProviders>;
};

/** on_conflict condition type for table "auth.user_providers" */
export type AuthUserProvidersOnConflict = {
  constraint: AuthUserProvidersConstraint;
  update_columns: Array<AuthUserProvidersUpdateColumn>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};

/** Ordering options when selecting data from "auth.user_providers". */
export type AuthUserProvidersOrderBy = {
  accessToken: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  provider: InputMaybe<AuthProvidersOrderBy>;
  providerId: InputMaybe<OrderBy>;
  providerUserId: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: auth.user_providers */
export type AuthUserProvidersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_providers" */
export enum AuthUserProvidersSelectColumn {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_providers" */
export type AuthUserProvidersSetInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_providers" */
export enum AuthUserProvidersUpdateColumn {
  /** column name */
  AccessToken = 'accessToken',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  ProviderId = 'providerId',
  /** column name */
  ProviderUserId = 'providerUserId',
  /** column name */
  RefreshToken = 'refreshToken',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type AuthUserProvidersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthUserProvidersSetInput>;
  where: AuthUserProvidersBoolExp;
};

export type AuthUserProviders_Aggregate_Bool_Exp = {
  count: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp_Count>;
};

export type AuthUserProviders_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<AuthUserProvidersBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "auth.user_providers" */
export type AuthUserProviders_Max_Order_By = {
  accessToken: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  providerId: InputMaybe<OrderBy>;
  providerUserId: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "auth.user_providers" */
export type AuthUserProviders_Min_Order_By = {
  accessToken: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  providerId: InputMaybe<OrderBy>;
  providerUserId: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "authUserProviders" */
export type AuthUserProviders_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthUserProviders_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserProviders_StreamCursorValueInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** Roles of users. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserRoles = {
  __typename?: 'authUserRoles';
  createdAt: Scalars['timestamptz'];
  id: Scalars['uuid'];
  role: Scalars['String'];
  /** An object relationship */
  roleByRole: AuthRoles;
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_roles" */
export type AuthUserRolesAggregate = {
  __typename?: 'authUserRolesAggregate';
  aggregate: Maybe<AuthUserRolesAggregateFields>;
  nodes: Array<AuthUserRoles>;
};

/** aggregate fields of "auth.user_roles" */
export type AuthUserRolesAggregateFields = {
  __typename?: 'authUserRolesAggregateFields';
  count: Scalars['Int'];
  max: Maybe<AuthUserRolesMaxFields>;
  min: Maybe<AuthUserRolesMinFields>;
};


/** aggregate fields of "auth.user_roles" */
export type AuthUserRolesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_roles" */
export type AuthUserRolesAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AuthUserRoles_Max_Order_By>;
  min: InputMaybe<AuthUserRoles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_roles" */
export type AuthUserRolesArrRelInsertInput = {
  data: Array<AuthUserRolesInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<AuthUserRolesOnConflict>;
};

/** Boolean expression to filter rows from the table "auth.user_roles". All fields are combined with a logical 'AND'. */
export type AuthUserRolesBoolExp = {
  _and: InputMaybe<Array<AuthUserRolesBoolExp>>;
  _not: InputMaybe<AuthUserRolesBoolExp>;
  _or: InputMaybe<Array<AuthUserRolesBoolExp>>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  role: InputMaybe<StringComparisonExp>;
  roleByRole: InputMaybe<AuthRolesBoolExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "auth.user_roles" */
export enum AuthUserRolesConstraint {
  /** unique or primary key constraint on columns "id" */
  UserRolesPkey = 'user_roles_pkey',
  /** unique or primary key constraint on columns "user_id", "role" */
  UserRolesUserIdRoleKey = 'user_roles_user_id_role_key'
}

/** input type for inserting data into table "auth.user_roles" */
export type AuthUserRolesInsertInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  role: InputMaybe<Scalars['String']>;
  roleByRole: InputMaybe<AuthRolesObjRelInsertInput>;
  user: InputMaybe<UsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserRolesMaxFields = {
  __typename?: 'authUserRolesMaxFields';
  createdAt: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  role: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthUserRolesMinFields = {
  __typename?: 'authUserRolesMinFields';
  createdAt: Maybe<Scalars['timestamptz']>;
  id: Maybe<Scalars['uuid']>;
  role: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.user_roles" */
export type AuthUserRolesMutationResponse = {
  __typename?: 'authUserRolesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserRoles>;
};

/** on_conflict condition type for table "auth.user_roles" */
export type AuthUserRolesOnConflict = {
  constraint: AuthUserRolesConstraint;
  update_columns: Array<AuthUserRolesUpdateColumn>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};

/** Ordering options when selecting data from "auth.user_roles". */
export type AuthUserRolesOrderBy = {
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  role: InputMaybe<OrderBy>;
  roleByRole: InputMaybe<AuthRolesOrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: auth.user_roles */
export type AuthUserRolesPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_roles" */
export enum AuthUserRolesSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_roles" */
export type AuthUserRolesSetInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  role: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "auth.user_roles" */
export enum AuthUserRolesUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Role = 'role',
  /** column name */
  UserId = 'userId'
}

export type AuthUserRolesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthUserRolesSetInput>;
  where: AuthUserRolesBoolExp;
};

export type AuthUserRoles_Aggregate_Bool_Exp = {
  count: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp_Count>;
};

export type AuthUserRoles_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<AuthUserRolesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "auth.user_roles" */
export type AuthUserRoles_Max_Order_By = {
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  role: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "auth.user_roles" */
export type AuthUserRoles_Min_Order_By = {
  createdAt: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  role: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "authUserRoles" */
export type AuthUserRoles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthUserRoles_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserRoles_StreamCursorValueInput = {
  createdAt: InputMaybe<Scalars['timestamptz']>;
  id: InputMaybe<Scalars['uuid']>;
  role: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** User webauthn security keys. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type AuthUserSecurityKeys = {
  __typename?: 'authUserSecurityKeys';
  counter: Scalars['bigint'];
  credentialId: Scalars['String'];
  credentialPublicKey: Maybe<Scalars['bytea']>;
  id: Scalars['uuid'];
  nickname: Maybe<Scalars['String']>;
  transports: Scalars['String'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "auth.user_security_keys" */
export type AuthUserSecurityKeysAggregate = {
  __typename?: 'authUserSecurityKeysAggregate';
  aggregate: Maybe<AuthUserSecurityKeysAggregateFields>;
  nodes: Array<AuthUserSecurityKeys>;
};

/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeysAggregateFields = {
  __typename?: 'authUserSecurityKeysAggregateFields';
  avg: Maybe<AuthUserSecurityKeysAvgFields>;
  count: Scalars['Int'];
  max: Maybe<AuthUserSecurityKeysMaxFields>;
  min: Maybe<AuthUserSecurityKeysMinFields>;
  stddev: Maybe<AuthUserSecurityKeysStddevFields>;
  stddevPop: Maybe<AuthUserSecurityKeysStddev_PopFields>;
  stddevSamp: Maybe<AuthUserSecurityKeysStddev_SampFields>;
  sum: Maybe<AuthUserSecurityKeysSumFields>;
  varPop: Maybe<AuthUserSecurityKeysVar_PopFields>;
  varSamp: Maybe<AuthUserSecurityKeysVar_SampFields>;
  variance: Maybe<AuthUserSecurityKeysVarianceFields>;
};


/** aggregate fields of "auth.user_security_keys" */
export type AuthUserSecurityKeysAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.user_security_keys" */
export type AuthUserSecurityKeysAggregateOrderBy = {
  avg: InputMaybe<AuthUserSecurityKeys_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<AuthUserSecurityKeys_Max_Order_By>;
  min: InputMaybe<AuthUserSecurityKeys_Min_Order_By>;
  stddev: InputMaybe<AuthUserSecurityKeys_Stddev_Order_By>;
  stddev_pop: InputMaybe<AuthUserSecurityKeys_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<AuthUserSecurityKeys_Stddev_Samp_Order_By>;
  sum: InputMaybe<AuthUserSecurityKeys_Sum_Order_By>;
  var_pop: InputMaybe<AuthUserSecurityKeys_Var_Pop_Order_By>;
  var_samp: InputMaybe<AuthUserSecurityKeys_Var_Samp_Order_By>;
  variance: InputMaybe<AuthUserSecurityKeys_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "auth.user_security_keys" */
export type AuthUserSecurityKeysArrRelInsertInput = {
  data: Array<AuthUserSecurityKeysInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<AuthUserSecurityKeysOnConflict>;
};

/** aggregate avg on columns */
export type AuthUserSecurityKeysAvgFields = {
  __typename?: 'authUserSecurityKeysAvgFields';
  counter: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "auth.user_security_keys". All fields are combined with a logical 'AND'. */
export type AuthUserSecurityKeysBoolExp = {
  _and: InputMaybe<Array<AuthUserSecurityKeysBoolExp>>;
  _not: InputMaybe<AuthUserSecurityKeysBoolExp>;
  _or: InputMaybe<Array<AuthUserSecurityKeysBoolExp>>;
  counter: InputMaybe<BigintComparisonExp>;
  credentialId: InputMaybe<StringComparisonExp>;
  credentialPublicKey: InputMaybe<ByteaComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  nickname: InputMaybe<StringComparisonExp>;
  transports: InputMaybe<StringComparisonExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "auth.user_security_keys" */
export enum AuthUserSecurityKeysConstraint {
  /** unique or primary key constraint on columns "credential_id" */
  UserSecurityKeyCredentialIdKey = 'user_security_key_credential_id_key',
  /** unique or primary key constraint on columns "id" */
  UserSecurityKeysPkey = 'user_security_keys_pkey'
}

/** input type for incrementing numeric columns in table "auth.user_security_keys" */
export type AuthUserSecurityKeysIncInput = {
  counter: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "auth.user_security_keys" */
export type AuthUserSecurityKeysInsertInput = {
  counter: InputMaybe<Scalars['bigint']>;
  credentialId: InputMaybe<Scalars['String']>;
  credentialPublicKey: InputMaybe<Scalars['bytea']>;
  id: InputMaybe<Scalars['uuid']>;
  nickname: InputMaybe<Scalars['String']>;
  transports: InputMaybe<Scalars['String']>;
  user: InputMaybe<UsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type AuthUserSecurityKeysMaxFields = {
  __typename?: 'authUserSecurityKeysMaxFields';
  counter: Maybe<Scalars['bigint']>;
  credentialId: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  nickname: Maybe<Scalars['String']>;
  transports: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type AuthUserSecurityKeysMinFields = {
  __typename?: 'authUserSecurityKeysMinFields';
  counter: Maybe<Scalars['bigint']>;
  credentialId: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  nickname: Maybe<Scalars['String']>;
  transports: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "auth.user_security_keys" */
export type AuthUserSecurityKeysMutationResponse = {
  __typename?: 'authUserSecurityKeysMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<AuthUserSecurityKeys>;
};

/** on_conflict condition type for table "auth.user_security_keys" */
export type AuthUserSecurityKeysOnConflict = {
  constraint: AuthUserSecurityKeysConstraint;
  update_columns: Array<AuthUserSecurityKeysUpdateColumn>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};

/** Ordering options when selecting data from "auth.user_security_keys". */
export type AuthUserSecurityKeysOrderBy = {
  counter: InputMaybe<OrderBy>;
  credentialId: InputMaybe<OrderBy>;
  credentialPublicKey: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  nickname: InputMaybe<OrderBy>;
  transports: InputMaybe<OrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: auth.user_security_keys */
export type AuthUserSecurityKeysPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeysSelectColumn {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "auth.user_security_keys" */
export type AuthUserSecurityKeysSetInput = {
  counter: InputMaybe<Scalars['bigint']>;
  credentialId: InputMaybe<Scalars['String']>;
  credentialPublicKey: InputMaybe<Scalars['bytea']>;
  id: InputMaybe<Scalars['uuid']>;
  nickname: InputMaybe<Scalars['String']>;
  transports: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate stddev on columns */
export type AuthUserSecurityKeysStddevFields = {
  __typename?: 'authUserSecurityKeysStddevFields';
  counter: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type AuthUserSecurityKeysStddev_PopFields = {
  __typename?: 'authUserSecurityKeysStddev_popFields';
  counter: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type AuthUserSecurityKeysStddev_SampFields = {
  __typename?: 'authUserSecurityKeysStddev_sampFields';
  counter: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type AuthUserSecurityKeysSumFields = {
  __typename?: 'authUserSecurityKeysSumFields';
  counter: Maybe<Scalars['bigint']>;
};

/** update columns of table "auth.user_security_keys" */
export enum AuthUserSecurityKeysUpdateColumn {
  /** column name */
  Counter = 'counter',
  /** column name */
  CredentialId = 'credentialId',
  /** column name */
  CredentialPublicKey = 'credentialPublicKey',
  /** column name */
  Id = 'id',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  Transports = 'transports',
  /** column name */
  UserId = 'userId'
}

export type AuthUserSecurityKeysUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<AuthUserSecurityKeysIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<AuthUserSecurityKeysSetInput>;
  where: AuthUserSecurityKeysBoolExp;
};

/** aggregate var_pop on columns */
export type AuthUserSecurityKeysVar_PopFields = {
  __typename?: 'authUserSecurityKeysVar_popFields';
  counter: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type AuthUserSecurityKeysVar_SampFields = {
  __typename?: 'authUserSecurityKeysVar_sampFields';
  counter: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type AuthUserSecurityKeysVarianceFields = {
  __typename?: 'authUserSecurityKeysVarianceFields';
  counter: Maybe<Scalars['Float']>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp = {
  count: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp_Count>;
};

export type AuthUserSecurityKeys_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<AuthUserSecurityKeysBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Avg_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Max_Order_By = {
  counter: InputMaybe<OrderBy>;
  credentialId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  nickname: InputMaybe<OrderBy>;
  transports: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Min_Order_By = {
  counter: InputMaybe<OrderBy>;
  credentialId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  nickname: InputMaybe<OrderBy>;
  transports: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Pop_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Stddev_Samp_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "authUserSecurityKeys" */
export type AuthUserSecurityKeys_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AuthUserSecurityKeys_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AuthUserSecurityKeys_StreamCursorValueInput = {
  counter: InputMaybe<Scalars['bigint']>;
  credentialId: InputMaybe<Scalars['String']>;
  credentialPublicKey: InputMaybe<Scalars['bytea']>;
  id: InputMaybe<Scalars['uuid']>;
  nickname: InputMaybe<Scalars['String']>;
  transports: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Sum_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Pop_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Var_Samp_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "auth.user_security_keys" */
export type AuthUserSecurityKeys_Variance_Order_By = {
  counter: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "auth_user_github_provider" */
export type Auth_User_Github_Provider_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Auth_User_Github_Provider_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_User_Github_Provider_StreamCursorValueInput = {
  accessToken: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  providerId: InputMaybe<Scalars['String']>;
  providerUserId: InputMaybe<Scalars['String']>;
  refreshToken: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userId: InputMaybe<Scalars['uuid']>;
};

export type Budgets_Aggregate_Bool_Exp = {
  count: InputMaybe<Budgets_Aggregate_Bool_Exp_Count>;
};

export type Budgets_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<BudgetsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<BudgetsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "budgets" */
export type Budgets_Avg_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "budgets" */
export type Budgets_Max_Order_By = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "budgets" */
export type Budgets_Min_Order_By = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "budgets" */
export type Budgets_Stddev_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "budgets" */
export type Budgets_Stddev_Pop_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "budgets" */
export type Budgets_Stddev_Samp_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "budgets" */
export type Budgets_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Budgets_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Budgets_StreamCursorValueInput = {
  id: InputMaybe<Scalars['uuid']>;
  initialAmount: InputMaybe<Scalars['numeric']>;
  projectId: InputMaybe<Scalars['uuid']>;
  remainingAmount: InputMaybe<Scalars['numeric']>;
  spentAmount: InputMaybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "budgets" */
export type Budgets_Sum_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "budgets" */
export type Budgets_Var_Pop_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "budgets" */
export type Budgets_Var_Samp_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "budgets" */
export type Budgets_Variance_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
  spentAmount: InputMaybe<OrderBy>;
};

export type Github_Pull_Request_Commits_Aggregate_Bool_Exp = {
  count: InputMaybe<Github_Pull_Request_Commits_Aggregate_Bool_Exp_Count>;
};

export type Github_Pull_Request_Commits_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<GithubPullRequestCommitsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Avg_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Max_Order_By = {
  authorId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
  sha: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Min_Order_By = {
  authorId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
  sha: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Stddev_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Stddev_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Stddev_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Pull_Request_Commits_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Pull_Request_Commits_StreamCursorValueInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  pullRequestId: InputMaybe<Scalars['bigint']>;
  sha: InputMaybe<Scalars['String']>;
};

/** order by sum() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Sum_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Var_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Var_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "github_pull_request_commits" */
export type Github_Pull_Request_Commits_Variance_Order_By = {
  authorId: InputMaybe<OrderBy>;
  pullRequestId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "github_users" */
export type Github_Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Users_StreamCursorValueInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptProjectLeaderInvitation: Scalars['Boolean'];
  acceptTermsAndConditions: Scalars['Uuid'];
  addEthPaymentReceipt: Scalars['Uuid'];
  addFiatPaymentReceipt: Scalars['Uuid'];
  addSponsorToProject: Scalars['Uuid'];
  applyToProject: Scalars['Uuid'];
  cancelPaymentRequest: Payment;
  /** createAndCloseIssue */
  createAndCloseIssue: GithubIssue;
  /** createProject */
  createProject: Scalars['Uuid'];
  createSponsor: Scalars['Uuid'];
  /** delete data from the table: "api.closed_by_pull_requests" */
  deleteApiClosedByPullRequests: Maybe<ApiClosedByPullRequestsMutationResponse>;
  /** delete data from the table: "api.closing_issues" */
  deleteApiClosingIssues: Maybe<ApiClosingIssuesMutationResponse>;
  /** delete data from the table: "applications" */
  deleteApplications: Maybe<ApplicationsMutationResponse>;
  /** delete single row from the table: "applications" */
  deleteApplicationsByPk: Maybe<Applications>;
  /** delete single row from the table: "auth.providers" */
  deleteAuthProvider: Maybe<AuthProviders>;
  /** delete single row from the table: "auth.provider_requests" */
  deleteAuthProviderRequest: Maybe<AuthProviderRequests>;
  /** delete data from the table: "auth.provider_requests" */
  deleteAuthProviderRequests: Maybe<AuthProviderRequestsMutationResponse>;
  /** delete data from the table: "auth.providers" */
  deleteAuthProviders: Maybe<AuthProvidersMutationResponse>;
  /** delete single row from the table: "auth.refresh_tokens" */
  deleteAuthRefreshToken: Maybe<AuthRefreshTokens>;
  /** delete data from the table: "auth.refresh_tokens" */
  deleteAuthRefreshTokens: Maybe<AuthRefreshTokensMutationResponse>;
  /** delete single row from the table: "auth.roles" */
  deleteAuthRole: Maybe<AuthRoles>;
  /** delete data from the table: "auth.roles" */
  deleteAuthRoles: Maybe<AuthRolesMutationResponse>;
  /** delete data from the table: "auth.user_github_provider" */
  deleteAuthUserGithubProvider: Maybe<AuthUserGithubProviderMutationResponse>;
  /** delete single row from the table: "auth.user_providers" */
  deleteAuthUserProvider: Maybe<AuthUserProviders>;
  /** delete data from the table: "auth.user_providers" */
  deleteAuthUserProviders: Maybe<AuthUserProvidersMutationResponse>;
  /** delete single row from the table: "auth.user_roles" */
  deleteAuthUserRole: Maybe<AuthUserRoles>;
  /** delete data from the table: "auth.user_roles" */
  deleteAuthUserRoles: Maybe<AuthUserRolesMutationResponse>;
  /** delete single row from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKey: Maybe<AuthUserSecurityKeys>;
  /** delete data from the table: "auth.user_security_keys" */
  deleteAuthUserSecurityKeys: Maybe<AuthUserSecurityKeysMutationResponse>;
  /** delete data from the table: "budgets" */
  deleteBudgets: Maybe<BudgetsMutationResponse>;
  /** delete single row from the table: "budgets" */
  deleteBudgetsByPk: Maybe<Budgets>;
  /** delete data from the table: "api.github_issues" */
  deleteGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** delete data from the table: "github_pull_request_commits" */
  deleteGithubPullRequestCommits: Maybe<GithubPullRequestCommitsMutationResponse>;
  /** delete single row from the table: "github_pull_request_commits" */
  deleteGithubPullRequestCommitsByPk: Maybe<GithubPullRequestCommits>;
  /** delete data from the table: "api.github_pull_request_reviews" */
  deleteGithubPullRequestReviews: Maybe<GithubPullRequestReviewsMutationResponse>;
  /** delete data from the table: "api.github_pull_requests" */
  deleteGithubPullRequests: Maybe<GithubPullRequestsMutationResponse>;
  /** delete data from the table: "github_users" */
  deleteGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** delete single row from the table: "github_users" */
  deleteGithubUsersByPk: Maybe<GithubUsers>;
  /** delete data from the table: "onboardings" */
  deleteOnboardings: Maybe<OnboardingsMutationResponse>;
  /** delete single row from the table: "onboardings" */
  deleteOnboardingsByPk: Maybe<Onboardings>;
  /** delete data from the table: "payment_requests" */
  deletePaymentRequests: Maybe<PaymentRequestsMutationResponse>;
  /** delete single row from the table: "payment_requests" */
  deletePaymentRequestsByPk: Maybe<PaymentRequests>;
  /** delete data from the table: "payments" */
  deletePayments: Maybe<PaymentsMutationResponse>;
  /** delete single row from the table: "payments" */
  deletePaymentsByPk: Maybe<Payments>;
  /** delete data from the table: "pending_project_leader_invitations" */
  deletePendingProjectLeaderInvitations: Maybe<PendingProjectLeaderInvitationsMutationResponse>;
  /** delete single row from the table: "pending_project_leader_invitations" */
  deletePendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** delete data from the table: "project_github_repos" */
  deleteProjectGithubRepos: Maybe<ProjectGithubReposMutationResponse>;
  /** delete single row from the table: "project_github_repos" */
  deleteProjectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** delete data from the table: "project_leads" */
  deleteProjectLeads: Maybe<ProjectLeadsMutationResponse>;
  /** delete single row from the table: "project_leads" */
  deleteProjectLeadsByPk: Maybe<ProjectLeads>;
  /** delete data from the table: "projects_contributors" */
  deleteProjectsContributors: Maybe<ProjectsContributorsMutationResponse>;
  /** delete single row from the table: "projects_contributors" */
  deleteProjectsContributorsByPk: Maybe<ProjectsContributors>;
  /** delete data from the table: "projects_pending_contributors" */
  deleteProjectsPendingContributors: Maybe<ProjectsPendingContributorsMutationResponse>;
  /** delete single row from the table: "projects_pending_contributors" */
  deleteProjectsPendingContributorsByPk: Maybe<ProjectsPendingContributors>;
  /** delete data from the table: "projects_rewarded_users" */
  deleteProjectsRewardedUsers: Maybe<ProjectsRewardedUsersMutationResponse>;
  /** delete single row from the table: "projects_rewarded_users" */
  deleteProjectsRewardedUsersByPk: Maybe<ProjectsRewardedUsers>;
  /** delete data from the table: "projects_sponsors" */
  deleteProjectsSponsors: Maybe<ProjectsSponsorsMutationResponse>;
  /** delete single row from the table: "projects_sponsors" */
  deleteProjectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** delete data from the table: "sponsors" */
  deleteSponsors: Maybe<SponsorsMutationResponse>;
  /** delete single row from the table: "sponsors" */
  deleteSponsorsByPk: Maybe<Sponsors>;
  /** delete data from the table: "api.technologies" */
  deleteTechnologies: Maybe<TechnologiesMutationResponse>;
  /** delete single row from the table: "auth.users" */
  deleteUser: Maybe<Users>;
  /** delete data from the table: "user_payout_info" */
  deleteUserPayoutInfo: Maybe<UserPayoutInfoMutationResponse>;
  /** delete single row from the table: "user_payout_info" */
  deleteUserPayoutInfoByPk: Maybe<UserPayoutInfo>;
  /** delete data from the table: "auth.users" */
  deleteUsers: Maybe<UsersMutationResponse>;
  /** delete data from the table: "api.work_items" */
  deleteWorkItems: Maybe<WorkItemsMutationResponse>;
  /** ignoreContribution */
  ignoreContribution: Scalars['Boolean'];
  /** insert data into the table: "api.closed_by_pull_requests" */
  insertApiClosedByPullRequests: Maybe<ApiClosedByPullRequestsMutationResponse>;
  /** insert a single row into the table: "api.closed_by_pull_requests" */
  insertApiClosedByPullRequestsOne: Maybe<ApiClosedByPullRequests>;
  /** insert data into the table: "api.closing_issues" */
  insertApiClosingIssues: Maybe<ApiClosingIssuesMutationResponse>;
  /** insert a single row into the table: "api.closing_issues" */
  insertApiClosingIssuesOne: Maybe<ApiClosingIssues>;
  /** insert data into the table: "applications" */
  insertApplications: Maybe<ApplicationsMutationResponse>;
  /** insert a single row into the table: "applications" */
  insertApplicationsOne: Maybe<Applications>;
  /** insert a single row into the table: "auth.providers" */
  insertAuthProvider: Maybe<AuthProviders>;
  /** insert a single row into the table: "auth.provider_requests" */
  insertAuthProviderRequest: Maybe<AuthProviderRequests>;
  /** insert data into the table: "auth.provider_requests" */
  insertAuthProviderRequests: Maybe<AuthProviderRequestsMutationResponse>;
  /** insert data into the table: "auth.providers" */
  insertAuthProviders: Maybe<AuthProvidersMutationResponse>;
  /** insert a single row into the table: "auth.refresh_tokens" */
  insertAuthRefreshToken: Maybe<AuthRefreshTokens>;
  /** insert data into the table: "auth.refresh_tokens" */
  insertAuthRefreshTokens: Maybe<AuthRefreshTokensMutationResponse>;
  /** insert a single row into the table: "auth.roles" */
  insertAuthRole: Maybe<AuthRoles>;
  /** insert data into the table: "auth.roles" */
  insertAuthRoles: Maybe<AuthRolesMutationResponse>;
  /** insert data into the table: "auth.user_github_provider" */
  insertAuthUserGithubProvider: Maybe<AuthUserGithubProviderMutationResponse>;
  /** insert a single row into the table: "auth.user_github_provider" */
  insertAuthUserGithubProviderOne: Maybe<AuthUserGithubProvider>;
  /** insert a single row into the table: "auth.user_providers" */
  insertAuthUserProvider: Maybe<AuthUserProviders>;
  /** insert data into the table: "auth.user_providers" */
  insertAuthUserProviders: Maybe<AuthUserProvidersMutationResponse>;
  /** insert a single row into the table: "auth.user_roles" */
  insertAuthUserRole: Maybe<AuthUserRoles>;
  /** insert data into the table: "auth.user_roles" */
  insertAuthUserRoles: Maybe<AuthUserRolesMutationResponse>;
  /** insert a single row into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKey: Maybe<AuthUserSecurityKeys>;
  /** insert data into the table: "auth.user_security_keys" */
  insertAuthUserSecurityKeys: Maybe<AuthUserSecurityKeysMutationResponse>;
  /** insert data into the table: "budgets" */
  insertBudgets: Maybe<BudgetsMutationResponse>;
  /** insert a single row into the table: "budgets" */
  insertBudgetsOne: Maybe<Budgets>;
  /** insert data into the table: "api.github_issues" */
  insertGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** insert a single row into the table: "api.github_issues" */
  insertGithubIssuesOne: Maybe<GithubIssues>;
  /** insert data into the table: "github_pull_request_commits" */
  insertGithubPullRequestCommits: Maybe<GithubPullRequestCommitsMutationResponse>;
  /** insert a single row into the table: "github_pull_request_commits" */
  insertGithubPullRequestCommitsOne: Maybe<GithubPullRequestCommits>;
  /** insert data into the table: "api.github_pull_request_reviews" */
  insertGithubPullRequestReviews: Maybe<GithubPullRequestReviewsMutationResponse>;
  /** insert a single row into the table: "api.github_pull_request_reviews" */
  insertGithubPullRequestReviewsOne: Maybe<GithubPullRequestReviews>;
  /** insert data into the table: "api.github_pull_requests" */
  insertGithubPullRequests: Maybe<GithubPullRequestsMutationResponse>;
  /** insert a single row into the table: "api.github_pull_requests" */
  insertGithubPullRequestsOne: Maybe<GithubPullRequests>;
  /** insert data into the table: "github_users" */
  insertGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** insert a single row into the table: "github_users" */
  insertGithubUsersOne: Maybe<GithubUsers>;
  /** insert data into the table: "onboardings" */
  insertOnboardings: Maybe<OnboardingsMutationResponse>;
  /** insert a single row into the table: "onboardings" */
  insertOnboardingsOne: Maybe<Onboardings>;
  /** insert data into the table: "payment_requests" */
  insertPaymentRequests: Maybe<PaymentRequestsMutationResponse>;
  /** insert a single row into the table: "payment_requests" */
  insertPaymentRequestsOne: Maybe<PaymentRequests>;
  /** insert data into the table: "payments" */
  insertPayments: Maybe<PaymentsMutationResponse>;
  /** insert a single row into the table: "payments" */
  insertPaymentsOne: Maybe<Payments>;
  /** insert data into the table: "pending_project_leader_invitations" */
  insertPendingProjectLeaderInvitations: Maybe<PendingProjectLeaderInvitationsMutationResponse>;
  /** insert a single row into the table: "pending_project_leader_invitations" */
  insertPendingProjectLeaderInvitationsOne: Maybe<PendingProjectLeaderInvitations>;
  /** insert data into the table: "project_github_repos" */
  insertProjectGithubRepos: Maybe<ProjectGithubReposMutationResponse>;
  /** insert a single row into the table: "project_github_repos" */
  insertProjectGithubReposOne: Maybe<ProjectGithubRepos>;
  /** insert data into the table: "project_leads" */
  insertProjectLeads: Maybe<ProjectLeadsMutationResponse>;
  /** insert a single row into the table: "project_leads" */
  insertProjectLeadsOne: Maybe<ProjectLeads>;
  /** insert data into the table: "projects_contributors" */
  insertProjectsContributors: Maybe<ProjectsContributorsMutationResponse>;
  /** insert a single row into the table: "projects_contributors" */
  insertProjectsContributorsOne: Maybe<ProjectsContributors>;
  /** insert data into the table: "projects_pending_contributors" */
  insertProjectsPendingContributors: Maybe<ProjectsPendingContributorsMutationResponse>;
  /** insert a single row into the table: "projects_pending_contributors" */
  insertProjectsPendingContributorsOne: Maybe<ProjectsPendingContributors>;
  /** insert data into the table: "projects_rewarded_users" */
  insertProjectsRewardedUsers: Maybe<ProjectsRewardedUsersMutationResponse>;
  /** insert a single row into the table: "projects_rewarded_users" */
  insertProjectsRewardedUsersOne: Maybe<ProjectsRewardedUsers>;
  /** insert data into the table: "projects_sponsors" */
  insertProjectsSponsors: Maybe<ProjectsSponsorsMutationResponse>;
  /** insert a single row into the table: "projects_sponsors" */
  insertProjectsSponsorsOne: Maybe<ProjectsSponsors>;
  /** insert data into the table: "sponsors" */
  insertSponsors: Maybe<SponsorsMutationResponse>;
  /** insert a single row into the table: "sponsors" */
  insertSponsorsOne: Maybe<Sponsors>;
  /** insert data into the table: "api.technologies" */
  insertTechnologies: Maybe<TechnologiesMutationResponse>;
  /** insert a single row into the table: "api.technologies" */
  insertTechnologiesOne: Maybe<Technologies>;
  /** insert a single row into the table: "auth.users" */
  insertUser: Maybe<Users>;
  /** insert data into the table: "user_payout_info" */
  insertUserPayoutInfo: Maybe<UserPayoutInfoMutationResponse>;
  /** insert a single row into the table: "user_payout_info" */
  insertUserPayoutInfoOne: Maybe<UserPayoutInfo>;
  /** insert data into the table: "auth.users" */
  insertUsers: Maybe<UsersMutationResponse>;
  /** insert data into the table: "api.work_items" */
  insertWorkItems: Maybe<WorkItemsMutationResponse>;
  /** insert a single row into the table: "api.work_items" */
  insertWorkItemsOne: Maybe<WorkItems>;
  inviteProjectLeader: Scalars['Uuid'];
  linkGithubRepo: Scalars['Uuid'];
  markInvoiceAsReceived: Scalars['Int'];
  markProfileWizardAsDisplayed: Scalars['Uuid'];
  rejectInvoice: Scalars['Int'];
  removeSponsorFromProject: Scalars['Uuid'];
  requestPayment: Payment;
  /** Suggest a new technology */
  suggestTechnology: Scalars['Boolean'];
  unassignProjectLead: Scalars['Boolean'];
  /** unignoreContribution */
  unignoreContribution: Scalars['Boolean'];
  unlinkGithubRepo: Scalars['Uuid'];
  /** update data of the table: "api.closed_by_pull_requests" */
  updateApiClosedByPullRequests: Maybe<ApiClosedByPullRequestsMutationResponse>;
  /** update multiples rows of table: "api.closed_by_pull_requests" */
  updateApiClosedByPullRequestsMany: Maybe<Array<Maybe<ApiClosedByPullRequestsMutationResponse>>>;
  /** update data of the table: "api.closing_issues" */
  updateApiClosingIssues: Maybe<ApiClosingIssuesMutationResponse>;
  /** update multiples rows of table: "api.closing_issues" */
  updateApiClosingIssuesMany: Maybe<Array<Maybe<ApiClosingIssuesMutationResponse>>>;
  /** update data of the table: "applications" */
  updateApplications: Maybe<ApplicationsMutationResponse>;
  /** update single row of the table: "applications" */
  updateApplicationsByPk: Maybe<Applications>;
  /** update multiples rows of table: "applications" */
  updateApplicationsMany: Maybe<Array<Maybe<ApplicationsMutationResponse>>>;
  /** update single row of the table: "auth.providers" */
  updateAuthProvider: Maybe<AuthProviders>;
  /** update single row of the table: "auth.provider_requests" */
  updateAuthProviderRequest: Maybe<AuthProviderRequests>;
  /** update data of the table: "auth.provider_requests" */
  updateAuthProviderRequests: Maybe<AuthProviderRequestsMutationResponse>;
  /** update multiples rows of table: "auth.provider_requests" */
  updateAuthProviderRequestsMany: Maybe<Array<Maybe<AuthProviderRequestsMutationResponse>>>;
  /** update data of the table: "auth.providers" */
  updateAuthProviders: Maybe<AuthProvidersMutationResponse>;
  /** update multiples rows of table: "auth.providers" */
  updateAuthProvidersMany: Maybe<Array<Maybe<AuthProvidersMutationResponse>>>;
  /** update single row of the table: "auth.refresh_tokens" */
  updateAuthRefreshToken: Maybe<AuthRefreshTokens>;
  /** update data of the table: "auth.refresh_tokens" */
  updateAuthRefreshTokens: Maybe<AuthRefreshTokensMutationResponse>;
  /** update multiples rows of table: "auth.refresh_tokens" */
  updateAuthRefreshTokensMany: Maybe<Array<Maybe<AuthRefreshTokensMutationResponse>>>;
  /** update single row of the table: "auth.roles" */
  updateAuthRole: Maybe<AuthRoles>;
  /** update data of the table: "auth.roles" */
  updateAuthRoles: Maybe<AuthRolesMutationResponse>;
  /** update multiples rows of table: "auth.roles" */
  updateAuthRolesMany: Maybe<Array<Maybe<AuthRolesMutationResponse>>>;
  /** update data of the table: "auth.user_github_provider" */
  updateAuthUserGithubProvider: Maybe<AuthUserGithubProviderMutationResponse>;
  /** update multiples rows of table: "auth.user_github_provider" */
  updateAuthUserGithubProviderMany: Maybe<Array<Maybe<AuthUserGithubProviderMutationResponse>>>;
  /** update single row of the table: "auth.user_providers" */
  updateAuthUserProvider: Maybe<AuthUserProviders>;
  /** update data of the table: "auth.user_providers" */
  updateAuthUserProviders: Maybe<AuthUserProvidersMutationResponse>;
  /** update multiples rows of table: "auth.user_providers" */
  updateAuthUserProvidersMany: Maybe<Array<Maybe<AuthUserProvidersMutationResponse>>>;
  /** update single row of the table: "auth.user_roles" */
  updateAuthUserRole: Maybe<AuthUserRoles>;
  /** update data of the table: "auth.user_roles" */
  updateAuthUserRoles: Maybe<AuthUserRolesMutationResponse>;
  /** update multiples rows of table: "auth.user_roles" */
  updateAuthUserRolesMany: Maybe<Array<Maybe<AuthUserRolesMutationResponse>>>;
  /** update single row of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKey: Maybe<AuthUserSecurityKeys>;
  /** update data of the table: "auth.user_security_keys" */
  updateAuthUserSecurityKeys: Maybe<AuthUserSecurityKeysMutationResponse>;
  /** update multiples rows of table: "auth.user_security_keys" */
  updateAuthUserSecurityKeysMany: Maybe<Array<Maybe<AuthUserSecurityKeysMutationResponse>>>;
  updateBudgetAllocation: Scalars['Uuid'];
  /** update data of the table: "budgets" */
  updateBudgets: Maybe<BudgetsMutationResponse>;
  /** update single row of the table: "budgets" */
  updateBudgetsByPk: Maybe<Budgets>;
  /** update multiples rows of table: "budgets" */
  updateBudgetsMany: Maybe<Array<Maybe<BudgetsMutationResponse>>>;
  /** update data of the table: "api.github_issues" */
  updateGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** update multiples rows of table: "api.github_issues" */
  updateGithubIssuesMany: Maybe<Array<Maybe<GithubIssuesMutationResponse>>>;
  /** update data of the table: "github_pull_request_commits" */
  updateGithubPullRequestCommits: Maybe<GithubPullRequestCommitsMutationResponse>;
  /** update single row of the table: "github_pull_request_commits" */
  updateGithubPullRequestCommitsByPk: Maybe<GithubPullRequestCommits>;
  /** update multiples rows of table: "github_pull_request_commits" */
  updateGithubPullRequestCommitsMany: Maybe<Array<Maybe<GithubPullRequestCommitsMutationResponse>>>;
  /** update data of the table: "api.github_pull_request_reviews" */
  updateGithubPullRequestReviews: Maybe<GithubPullRequestReviewsMutationResponse>;
  /** update multiples rows of table: "api.github_pull_request_reviews" */
  updateGithubPullRequestReviewsMany: Maybe<Array<Maybe<GithubPullRequestReviewsMutationResponse>>>;
  /** update data of the table: "api.github_pull_requests" */
  updateGithubPullRequests: Maybe<GithubPullRequestsMutationResponse>;
  /** update multiples rows of table: "api.github_pull_requests" */
  updateGithubPullRequestsMany: Maybe<Array<Maybe<GithubPullRequestsMutationResponse>>>;
  /** update data of the table: "github_users" */
  updateGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** update single row of the table: "github_users" */
  updateGithubUsersByPk: Maybe<GithubUsers>;
  /** update multiples rows of table: "github_users" */
  updateGithubUsersMany: Maybe<Array<Maybe<GithubUsersMutationResponse>>>;
  /** update data of the table: "onboardings" */
  updateOnboardings: Maybe<OnboardingsMutationResponse>;
  /** update single row of the table: "onboardings" */
  updateOnboardingsByPk: Maybe<Onboardings>;
  /** update multiples rows of table: "onboardings" */
  updateOnboardingsMany: Maybe<Array<Maybe<OnboardingsMutationResponse>>>;
  /** update data of the table: "payment_requests" */
  updatePaymentRequests: Maybe<PaymentRequestsMutationResponse>;
  /** update single row of the table: "payment_requests" */
  updatePaymentRequestsByPk: Maybe<PaymentRequests>;
  /** update multiples rows of table: "payment_requests" */
  updatePaymentRequestsMany: Maybe<Array<Maybe<PaymentRequestsMutationResponse>>>;
  /** update data of the table: "payments" */
  updatePayments: Maybe<PaymentsMutationResponse>;
  /** update single row of the table: "payments" */
  updatePaymentsByPk: Maybe<Payments>;
  /** update multiples rows of table: "payments" */
  updatePaymentsMany: Maybe<Array<Maybe<PaymentsMutationResponse>>>;
  updatePayoutInfo: Scalars['Uuid'];
  /** update data of the table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitations: Maybe<PendingProjectLeaderInvitationsMutationResponse>;
  /** update single row of the table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** update multiples rows of table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitationsMany: Maybe<Array<Maybe<PendingProjectLeaderInvitationsMutationResponse>>>;
  updateProject: Scalars['Uuid'];
  /** update data of the table: "project_github_repos" */
  updateProjectGithubRepos: Maybe<ProjectGithubReposMutationResponse>;
  /** update single row of the table: "project_github_repos" */
  updateProjectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** update multiples rows of table: "project_github_repos" */
  updateProjectGithubReposMany: Maybe<Array<Maybe<ProjectGithubReposMutationResponse>>>;
  /** update data of the table: "project_leads" */
  updateProjectLeads: Maybe<ProjectLeadsMutationResponse>;
  /** update single row of the table: "project_leads" */
  updateProjectLeadsByPk: Maybe<ProjectLeads>;
  /** update multiples rows of table: "project_leads" */
  updateProjectLeadsMany: Maybe<Array<Maybe<ProjectLeadsMutationResponse>>>;
  /** update data of the table: "projects_contributors" */
  updateProjectsContributors: Maybe<ProjectsContributorsMutationResponse>;
  /** update single row of the table: "projects_contributors" */
  updateProjectsContributorsByPk: Maybe<ProjectsContributors>;
  /** update multiples rows of table: "projects_contributors" */
  updateProjectsContributorsMany: Maybe<Array<Maybe<ProjectsContributorsMutationResponse>>>;
  /** update data of the table: "projects_pending_contributors" */
  updateProjectsPendingContributors: Maybe<ProjectsPendingContributorsMutationResponse>;
  /** update single row of the table: "projects_pending_contributors" */
  updateProjectsPendingContributorsByPk: Maybe<ProjectsPendingContributors>;
  /** update multiples rows of table: "projects_pending_contributors" */
  updateProjectsPendingContributorsMany: Maybe<Array<Maybe<ProjectsPendingContributorsMutationResponse>>>;
  /** update data of the table: "projects_rewarded_users" */
  updateProjectsRewardedUsers: Maybe<ProjectsRewardedUsersMutationResponse>;
  /** update single row of the table: "projects_rewarded_users" */
  updateProjectsRewardedUsersByPk: Maybe<ProjectsRewardedUsers>;
  /** update multiples rows of table: "projects_rewarded_users" */
  updateProjectsRewardedUsersMany: Maybe<Array<Maybe<ProjectsRewardedUsersMutationResponse>>>;
  /** update data of the table: "projects_sponsors" */
  updateProjectsSponsors: Maybe<ProjectsSponsorsMutationResponse>;
  /** update single row of the table: "projects_sponsors" */
  updateProjectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** update multiples rows of table: "projects_sponsors" */
  updateProjectsSponsorsMany: Maybe<Array<Maybe<ProjectsSponsorsMutationResponse>>>;
  updateSponsor: Scalars['Uuid'];
  /** update data of the table: "sponsors" */
  updateSponsors: Maybe<SponsorsMutationResponse>;
  /** update single row of the table: "sponsors" */
  updateSponsorsByPk: Maybe<Sponsors>;
  /** update multiples rows of table: "sponsors" */
  updateSponsorsMany: Maybe<Array<Maybe<SponsorsMutationResponse>>>;
  /** update data of the table: "api.technologies" */
  updateTechnologies: Maybe<TechnologiesMutationResponse>;
  /** update multiples rows of table: "api.technologies" */
  updateTechnologiesMany: Maybe<Array<Maybe<TechnologiesMutationResponse>>>;
  /** update single row of the table: "auth.users" */
  updateUser: Maybe<Users>;
  /** update data of the table: "user_payout_info" */
  updateUserPayoutInfo: Maybe<UserPayoutInfoMutationResponse>;
  /** update single row of the table: "user_payout_info" */
  updateUserPayoutInfoByPk: Maybe<UserPayoutInfo>;
  /** update multiples rows of table: "user_payout_info" */
  updateUserPayoutInfoMany: Maybe<Array<Maybe<UserPayoutInfoMutationResponse>>>;
  /** updateUserProfile */
  updateUserProfile: Scalars['Boolean'];
  /** update data of the table: "auth.users" */
  updateUsers: Maybe<UsersMutationResponse>;
  /** update multiples rows of table: "auth.users" */
  updateUsersMany: Maybe<Array<Maybe<UsersMutationResponse>>>;
  /** update data of the table: "api.work_items" */
  updateWorkItems: Maybe<WorkItemsMutationResponse>;
  /** update multiples rows of table: "api.work_items" */
  updateWorkItemsMany: Maybe<Array<Maybe<WorkItemsMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootAcceptProjectLeaderInvitationArgs = {
  invitationId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootAddEthPaymentReceiptArgs = {
  amount: Scalars['String'];
  currencyCode: Scalars['String'];
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
  recipientIdentity: EthereumIdentityInput;
  transactionHash: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAddFiatPaymentReceiptArgs = {
  amount: Scalars['String'];
  currencyCode: Scalars['String'];
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
  recipientIban: Scalars['Iban'];
  transactionReference: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAddSponsorToProjectArgs = {
  projectId: Scalars['Uuid'];
  sponsorId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootApplyToProjectArgs = {
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootCancelPaymentRequestArgs = {
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootCreateAndCloseIssueArgs = {
  description: Scalars['String'];
  githubRepoId: Scalars['Int'];
  projectId: Scalars['Uuid'];
  title: Scalars['String'];
};


/** mutation root */
export type Mutation_RootCreateProjectArgs = {
  hiring: InputMaybe<Scalars['Boolean']>;
  initialBudget: InputMaybe<Scalars['Int']>;
  logoUrl: InputMaybe<Scalars['Url']>;
  longDescription: Scalars['String'];
  name: Scalars['String'];
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: Scalars['String'];
  telegramLink: InputMaybe<Scalars['Url']>;
  visibility: InputMaybe<Visibility>;
};


/** mutation root */
export type Mutation_RootCreateSponsorArgs = {
  logoUrl: Scalars['Url'];
  name: Scalars['String'];
  url: InputMaybe<Scalars['Url']>;
};


/** mutation root */
export type Mutation_RootDeleteApiClosedByPullRequestsArgs = {
  where: ApiClosedByPullRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteApiClosingIssuesArgs = {
  where: ApiClosingIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationsArgs = {
  where: ApplicationsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteApplicationsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthProviderRequestsArgs = {
  where: AuthProviderRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthProvidersArgs = {
  where: AuthProvidersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRefreshTokensArgs = {
  where: AuthRefreshTokensBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthRoleArgs = {
  role: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteAuthRolesArgs = {
  where: AuthRolesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserGithubProviderArgs = {
  where: AuthUserGithubProviderBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserProvidersArgs = {
  where: AuthUserProvidersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserRolesArgs = {
  where: AuthUserRolesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteAuthUserSecurityKeysArgs = {
  where: AuthUserSecurityKeysBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteBudgetsArgs = {
  where: BudgetsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteBudgetsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteGithubIssuesArgs = {
  where: GithubIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubPullRequestCommitsArgs = {
  where: GithubPullRequestCommitsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubPullRequestCommitsByPkArgs = {
  pullRequestId: Scalars['bigint'];
  sha: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteGithubPullRequestReviewsArgs = {
  where: GithubPullRequestReviewsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubPullRequestsArgs = {
  where: GithubPullRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubUsersArgs = {
  where: GithubUsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubUsersByPkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeleteOnboardingsArgs = {
  where: OnboardingsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteOnboardingsByPkArgs = {
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeletePaymentRequestsArgs = {
  where: PaymentRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePaymentRequestsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeletePaymentsArgs = {
  where: PaymentsBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePaymentsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeletePendingProjectLeaderInvitationsArgs = {
  where: PendingProjectLeaderInvitationsBoolExp;
};


/** mutation root */
export type Mutation_RootDeletePendingProjectLeaderInvitationsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectGithubReposArgs = {
  where: ProjectGithubReposBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectGithubReposByPkArgs = {
  githubRepoId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectLeadsArgs = {
  where: ProjectLeadsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectLeadsByPkArgs = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectsContributorsArgs = {
  where: ProjectsContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectsContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectsPendingContributorsArgs = {
  where: ProjectsPendingContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectsPendingContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectsRewardedUsersArgs = {
  where: ProjectsRewardedUsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectsRewardedUsersByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteProjectsSponsorsArgs = {
  where: ProjectsSponsorsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectsSponsorsByPkArgs = {
  projectId: Scalars['uuid'];
  sponsorId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteSponsorsArgs = {
  where: SponsorsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteSponsorsByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteTechnologiesArgs = {
  where: TechnologiesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUserPayoutInfoArgs = {
  where: UserPayoutInfoBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserPayoutInfoByPkArgs = {
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkItemsArgs = {
  where: WorkItemsBoolExp;
};


/** mutation root */
export type Mutation_RootIgnoreContributionArgs = {
  contributionId: Scalars['String'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootInsertApiClosedByPullRequestsArgs = {
  objects: Array<ApiClosedByPullRequestsInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertApiClosedByPullRequestsOneArgs = {
  object: ApiClosedByPullRequestsInsertInput;
};


/** mutation root */
export type Mutation_RootInsertApiClosingIssuesArgs = {
  objects: Array<ApiClosingIssuesInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertApiClosingIssuesOneArgs = {
  object: ApiClosingIssuesInsertInput;
};


/** mutation root */
export type Mutation_RootInsertApplicationsArgs = {
  objects: Array<ApplicationsInsertInput>;
  onConflict: InputMaybe<ApplicationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertApplicationsOneArgs = {
  object: ApplicationsInsertInput;
  onConflict: InputMaybe<ApplicationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderArgs = {
  object: AuthProvidersInsertInput;
  onConflict: InputMaybe<AuthProvidersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestArgs = {
  object: AuthProviderRequestsInsertInput;
  onConflict: InputMaybe<AuthProviderRequestsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProviderRequestsArgs = {
  objects: Array<AuthProviderRequestsInsertInput>;
  onConflict: InputMaybe<AuthProviderRequestsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthProvidersArgs = {
  objects: Array<AuthProvidersInsertInput>;
  onConflict: InputMaybe<AuthProvidersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokenArgs = {
  object: AuthRefreshTokensInsertInput;
  onConflict: InputMaybe<AuthRefreshTokensOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRefreshTokensArgs = {
  objects: Array<AuthRefreshTokensInsertInput>;
  onConflict: InputMaybe<AuthRefreshTokensOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRoleArgs = {
  object: AuthRolesInsertInput;
  onConflict: InputMaybe<AuthRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthRolesArgs = {
  objects: Array<AuthRolesInsertInput>;
  onConflict: InputMaybe<AuthRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserGithubProviderArgs = {
  objects: Array<AuthUserGithubProviderInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserGithubProviderOneArgs = {
  object: AuthUserGithubProviderInsertInput;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProviderArgs = {
  object: AuthUserProvidersInsertInput;
  onConflict: InputMaybe<AuthUserProvidersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserProvidersArgs = {
  objects: Array<AuthUserProvidersInsertInput>;
  onConflict: InputMaybe<AuthUserProvidersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRoleArgs = {
  object: AuthUserRolesInsertInput;
  onConflict: InputMaybe<AuthUserRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserRolesArgs = {
  objects: Array<AuthUserRolesInsertInput>;
  onConflict: InputMaybe<AuthUserRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeyArgs = {
  object: AuthUserSecurityKeysInsertInput;
  onConflict: InputMaybe<AuthUserSecurityKeysOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAuthUserSecurityKeysArgs = {
  objects: Array<AuthUserSecurityKeysInsertInput>;
  onConflict: InputMaybe<AuthUserSecurityKeysOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertBudgetsArgs = {
  objects: Array<BudgetsInsertInput>;
  onConflict: InputMaybe<BudgetsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertBudgetsOneArgs = {
  object: BudgetsInsertInput;
  onConflict: InputMaybe<BudgetsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubIssuesArgs = {
  objects: Array<GithubIssuesInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertGithubIssuesOneArgs = {
  object: GithubIssuesInsertInput;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestCommitsArgs = {
  objects: Array<GithubPullRequestCommitsInsertInput>;
  onConflict: InputMaybe<GithubPullRequestCommitsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestCommitsOneArgs = {
  object: GithubPullRequestCommitsInsertInput;
  onConflict: InputMaybe<GithubPullRequestCommitsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestReviewsArgs = {
  objects: Array<GithubPullRequestReviewsInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestReviewsOneArgs = {
  object: GithubPullRequestReviewsInsertInput;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestsArgs = {
  objects: Array<GithubPullRequestsInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertGithubPullRequestsOneArgs = {
  object: GithubPullRequestsInsertInput;
};


/** mutation root */
export type Mutation_RootInsertGithubUsersArgs = {
  objects: Array<GithubUsersInsertInput>;
  onConflict: InputMaybe<GithubUsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubUsersOneArgs = {
  object: GithubUsersInsertInput;
  onConflict: InputMaybe<GithubUsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOnboardingsArgs = {
  objects: Array<OnboardingsInsertInput>;
  onConflict: InputMaybe<OnboardingsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOnboardingsOneArgs = {
  object: OnboardingsInsertInput;
  onConflict: InputMaybe<OnboardingsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPaymentRequestsArgs = {
  objects: Array<PaymentRequestsInsertInput>;
  onConflict: InputMaybe<PaymentRequestsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPaymentRequestsOneArgs = {
  object: PaymentRequestsInsertInput;
  onConflict: InputMaybe<PaymentRequestsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPaymentsArgs = {
  objects: Array<PaymentsInsertInput>;
  onConflict: InputMaybe<PaymentsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPaymentsOneArgs = {
  object: PaymentsInsertInput;
  onConflict: InputMaybe<PaymentsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPendingProjectLeaderInvitationsArgs = {
  objects: Array<PendingProjectLeaderInvitationsInsertInput>;
  onConflict: InputMaybe<PendingProjectLeaderInvitationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertPendingProjectLeaderInvitationsOneArgs = {
  object: PendingProjectLeaderInvitationsInsertInput;
  onConflict: InputMaybe<PendingProjectLeaderInvitationsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectGithubReposArgs = {
  objects: Array<ProjectGithubReposInsertInput>;
  onConflict: InputMaybe<ProjectGithubReposOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectGithubReposOneArgs = {
  object: ProjectGithubReposInsertInput;
  onConflict: InputMaybe<ProjectGithubReposOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectLeadsArgs = {
  objects: Array<ProjectLeadsInsertInput>;
  onConflict: InputMaybe<ProjectLeadsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectLeadsOneArgs = {
  object: ProjectLeadsInsertInput;
  onConflict: InputMaybe<ProjectLeadsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsContributorsArgs = {
  objects: Array<ProjectsContributorsInsertInput>;
  onConflict: InputMaybe<ProjectsContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsContributorsOneArgs = {
  object: ProjectsContributorsInsertInput;
  onConflict: InputMaybe<ProjectsContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsPendingContributorsArgs = {
  objects: Array<ProjectsPendingContributorsInsertInput>;
  onConflict: InputMaybe<ProjectsPendingContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsPendingContributorsOneArgs = {
  object: ProjectsPendingContributorsInsertInput;
  onConflict: InputMaybe<ProjectsPendingContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsRewardedUsersArgs = {
  objects: Array<ProjectsRewardedUsersInsertInput>;
  onConflict: InputMaybe<ProjectsRewardedUsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsRewardedUsersOneArgs = {
  object: ProjectsRewardedUsersInsertInput;
  onConflict: InputMaybe<ProjectsRewardedUsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsSponsorsArgs = {
  objects: Array<ProjectsSponsorsInsertInput>;
  onConflict: InputMaybe<ProjectsSponsorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsSponsorsOneArgs = {
  object: ProjectsSponsorsInsertInput;
  onConflict: InputMaybe<ProjectsSponsorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSponsorsArgs = {
  objects: Array<SponsorsInsertInput>;
  onConflict: InputMaybe<SponsorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSponsorsOneArgs = {
  object: SponsorsInsertInput;
  onConflict: InputMaybe<SponsorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertTechnologiesArgs = {
  objects: Array<TechnologiesInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertTechnologiesOneArgs = {
  object: TechnologiesInsertInput;
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  object: UsersInsertInput;
  onConflict: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserPayoutInfoArgs = {
  objects: Array<UserPayoutInfoInsertInput>;
  onConflict: InputMaybe<UserPayoutInfoOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserPayoutInfoOneArgs = {
  object: UserPayoutInfoInsertInput;
  onConflict: InputMaybe<UserPayoutInfoOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkItemsArgs = {
  objects: Array<WorkItemsInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertWorkItemsOneArgs = {
  object: WorkItemsInsertInput;
};


/** mutation root */
export type Mutation_RootInviteProjectLeaderArgs = {
  githubUserId: Scalars['Int'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootLinkGithubRepoArgs = {
  githubRepoId: Scalars['Int'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootMarkInvoiceAsReceivedArgs = {
  paymentReferences: Array<PaymentReference>;
};


/** mutation root */
export type Mutation_RootRejectInvoiceArgs = {
  paymentReferences: Array<PaymentReference>;
};


/** mutation root */
export type Mutation_RootRemoveSponsorFromProjectArgs = {
  projectId: Scalars['Uuid'];
  sponsorId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootRequestPaymentArgs = {
  amountInUsd: Scalars['Int'];
  hoursWorked: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
  recipientId: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootSuggestTechnologyArgs = {
  suggestion: Scalars['String'];
};


/** mutation root */
export type Mutation_RootUnassignProjectLeadArgs = {
  projectId: Scalars['Uuid'];
  userId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUnignoreContributionArgs = {
  contributionId: Scalars['String'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUnlinkGithubRepoArgs = {
  githubRepoId: Scalars['Int'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUpdateApiClosedByPullRequestsArgs = {
  _inc: InputMaybe<ApiClosedByPullRequestsIncInput>;
  _set: InputMaybe<ApiClosedByPullRequestsSetInput>;
  where: ApiClosedByPullRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateApiClosedByPullRequestsManyArgs = {
  updates: Array<ApiClosedByPullRequestsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateApiClosingIssuesArgs = {
  _inc: InputMaybe<ApiClosingIssuesIncInput>;
  _set: InputMaybe<ApiClosingIssuesSetInput>;
  where: ApiClosingIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateApiClosingIssuesManyArgs = {
  updates: Array<ApiClosingIssuesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateApplicationsArgs = {
  _set: InputMaybe<ApplicationsSetInput>;
  where: ApplicationsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateApplicationsByPkArgs = {
  _set: InputMaybe<ApplicationsSetInput>;
  pk_columns: ApplicationsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateApplicationsManyArgs = {
  updates: Array<ApplicationsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderArgs = {
  _set: InputMaybe<AuthProvidersSetInput>;
  pk_columns: AuthProvidersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestArgs = {
  _append: InputMaybe<AuthProviderRequestsAppendInput>;
  _deleteAtPath: InputMaybe<AuthProviderRequestsDeleteAtPathInput>;
  _deleteElem: InputMaybe<AuthProviderRequestsDeleteElemInput>;
  _deleteKey: InputMaybe<AuthProviderRequestsDeleteKeyInput>;
  _prepend: InputMaybe<AuthProviderRequestsPrependInput>;
  _set: InputMaybe<AuthProviderRequestsSetInput>;
  pk_columns: AuthProviderRequestsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestsArgs = {
  _append: InputMaybe<AuthProviderRequestsAppendInput>;
  _deleteAtPath: InputMaybe<AuthProviderRequestsDeleteAtPathInput>;
  _deleteElem: InputMaybe<AuthProviderRequestsDeleteElemInput>;
  _deleteKey: InputMaybe<AuthProviderRequestsDeleteKeyInput>;
  _prepend: InputMaybe<AuthProviderRequestsPrependInput>;
  _set: InputMaybe<AuthProviderRequestsSetInput>;
  where: AuthProviderRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthProviderRequestsManyArgs = {
  updates: Array<AuthProviderRequestsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthProvidersArgs = {
  _set: InputMaybe<AuthProvidersSetInput>;
  where: AuthProvidersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthProvidersManyArgs = {
  updates: Array<AuthProvidersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokenArgs = {
  _set: InputMaybe<AuthRefreshTokensSetInput>;
  pk_columns: AuthRefreshTokensPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensArgs = {
  _set: InputMaybe<AuthRefreshTokensSetInput>;
  where: AuthRefreshTokensBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRefreshTokensManyArgs = {
  updates: Array<AuthRefreshTokensUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthRoleArgs = {
  _set: InputMaybe<AuthRolesSetInput>;
  pk_columns: AuthRolesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthRolesArgs = {
  _set: InputMaybe<AuthRolesSetInput>;
  where: AuthRolesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthRolesManyArgs = {
  updates: Array<AuthRolesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserGithubProviderArgs = {
  _inc: InputMaybe<AuthUserGithubProviderIncInput>;
  _set: InputMaybe<AuthUserGithubProviderSetInput>;
  where: AuthUserGithubProviderBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserGithubProviderManyArgs = {
  updates: Array<AuthUserGithubProviderUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProviderArgs = {
  _set: InputMaybe<AuthUserProvidersSetInput>;
  pk_columns: AuthUserProvidersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProvidersArgs = {
  _set: InputMaybe<AuthUserProvidersSetInput>;
  where: AuthUserProvidersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserProvidersManyArgs = {
  updates: Array<AuthUserProvidersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRoleArgs = {
  _set: InputMaybe<AuthUserRolesSetInput>;
  pk_columns: AuthUserRolesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRolesArgs = {
  _set: InputMaybe<AuthUserRolesSetInput>;
  where: AuthUserRolesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserRolesManyArgs = {
  updates: Array<AuthUserRolesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeyArgs = {
  _inc: InputMaybe<AuthUserSecurityKeysIncInput>;
  _set: InputMaybe<AuthUserSecurityKeysSetInput>;
  pk_columns: AuthUserSecurityKeysPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeysArgs = {
  _inc: InputMaybe<AuthUserSecurityKeysIncInput>;
  _set: InputMaybe<AuthUserSecurityKeysSetInput>;
  where: AuthUserSecurityKeysBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAuthUserSecurityKeysManyArgs = {
  updates: Array<AuthUserSecurityKeysUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateBudgetAllocationArgs = {
  newRemainingAmountInUsd: Scalars['Int'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUpdateBudgetsArgs = {
  _inc: InputMaybe<BudgetsIncInput>;
  _set: InputMaybe<BudgetsSetInput>;
  where: BudgetsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateBudgetsByPkArgs = {
  _inc: InputMaybe<BudgetsIncInput>;
  _set: InputMaybe<BudgetsSetInput>;
  pk_columns: BudgetsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateBudgetsManyArgs = {
  updates: Array<BudgetsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubIssuesArgs = {
  _append: InputMaybe<GithubIssuesAppendInput>;
  _deleteAtPath: InputMaybe<GithubIssuesDeleteAtPathInput>;
  _deleteElem: InputMaybe<GithubIssuesDeleteElemInput>;
  _deleteKey: InputMaybe<GithubIssuesDeleteKeyInput>;
  _inc: InputMaybe<GithubIssuesIncInput>;
  _prepend: InputMaybe<GithubIssuesPrependInput>;
  _set: InputMaybe<GithubIssuesSetInput>;
  where: GithubIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubIssuesManyArgs = {
  updates: Array<GithubIssuesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestCommitsArgs = {
  _inc: InputMaybe<GithubPullRequestCommitsIncInput>;
  _set: InputMaybe<GithubPullRequestCommitsSetInput>;
  where: GithubPullRequestCommitsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestCommitsByPkArgs = {
  _inc: InputMaybe<GithubPullRequestCommitsIncInput>;
  _set: InputMaybe<GithubPullRequestCommitsSetInput>;
  pk_columns: GithubPullRequestCommitsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestCommitsManyArgs = {
  updates: Array<GithubPullRequestCommitsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestReviewsArgs = {
  _inc: InputMaybe<GithubPullRequestReviewsIncInput>;
  _set: InputMaybe<GithubPullRequestReviewsSetInput>;
  where: GithubPullRequestReviewsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestReviewsManyArgs = {
  updates: Array<GithubPullRequestReviewsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestsArgs = {
  _inc: InputMaybe<GithubPullRequestsIncInput>;
  _set: InputMaybe<GithubPullRequestsSetInput>;
  where: GithubPullRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubPullRequestsManyArgs = {
  updates: Array<GithubPullRequestsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubUsersArgs = {
  _inc: InputMaybe<GithubUsersIncInput>;
  _set: InputMaybe<GithubUsersSetInput>;
  where: GithubUsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubUsersByPkArgs = {
  _inc: InputMaybe<GithubUsersIncInput>;
  _set: InputMaybe<GithubUsersSetInput>;
  pk_columns: GithubUsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateGithubUsersManyArgs = {
  updates: Array<GithubUsersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateOnboardingsArgs = {
  _set: InputMaybe<OnboardingsSetInput>;
  where: OnboardingsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateOnboardingsByPkArgs = {
  _set: InputMaybe<OnboardingsSetInput>;
  pk_columns: OnboardingsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateOnboardingsManyArgs = {
  updates: Array<OnboardingsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePaymentRequestsArgs = {
  _inc: InputMaybe<PaymentRequestsIncInput>;
  _set: InputMaybe<PaymentRequestsSetInput>;
  where: PaymentRequestsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePaymentRequestsByPkArgs = {
  _inc: InputMaybe<PaymentRequestsIncInput>;
  _set: InputMaybe<PaymentRequestsSetInput>;
  pk_columns: PaymentRequestsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePaymentRequestsManyArgs = {
  updates: Array<PaymentRequestsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePaymentsArgs = {
  _append: InputMaybe<PaymentsAppendInput>;
  _deleteAtPath: InputMaybe<PaymentsDeleteAtPathInput>;
  _deleteElem: InputMaybe<PaymentsDeleteElemInput>;
  _deleteKey: InputMaybe<PaymentsDeleteKeyInput>;
  _inc: InputMaybe<PaymentsIncInput>;
  _prepend: InputMaybe<PaymentsPrependInput>;
  _set: InputMaybe<PaymentsSetInput>;
  where: PaymentsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePaymentsByPkArgs = {
  _append: InputMaybe<PaymentsAppendInput>;
  _deleteAtPath: InputMaybe<PaymentsDeleteAtPathInput>;
  _deleteElem: InputMaybe<PaymentsDeleteElemInput>;
  _deleteKey: InputMaybe<PaymentsDeleteKeyInput>;
  _inc: InputMaybe<PaymentsIncInput>;
  _prepend: InputMaybe<PaymentsPrependInput>;
  _set: InputMaybe<PaymentsSetInput>;
  pk_columns: PaymentsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePaymentsManyArgs = {
  updates: Array<PaymentsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdatePayoutInfoArgs = {
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
};


/** mutation root */
export type Mutation_RootUpdatePendingProjectLeaderInvitationsArgs = {
  _inc: InputMaybe<PendingProjectLeaderInvitationsIncInput>;
  _set: InputMaybe<PendingProjectLeaderInvitationsSetInput>;
  where: PendingProjectLeaderInvitationsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdatePendingProjectLeaderInvitationsByPkArgs = {
  _inc: InputMaybe<PendingProjectLeaderInvitationsIncInput>;
  _set: InputMaybe<PendingProjectLeaderInvitationsSetInput>;
  pk_columns: PendingProjectLeaderInvitationsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdatePendingProjectLeaderInvitationsManyArgs = {
  updates: Array<PendingProjectLeaderInvitationsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectArgs = {
  hiring: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Uuid'];
  logoUrl: InputMaybe<Scalars['Url']>;
  longDescription: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: InputMaybe<Scalars['String']>;
  telegramLink: InputMaybe<Scalars['Url']>;
  visibility: InputMaybe<Visibility>;
};


/** mutation root */
export type Mutation_RootUpdateProjectGithubReposArgs = {
  _inc: InputMaybe<ProjectGithubReposIncInput>;
  _set: InputMaybe<ProjectGithubReposSetInput>;
  where: ProjectGithubReposBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectGithubReposByPkArgs = {
  _inc: InputMaybe<ProjectGithubReposIncInput>;
  _set: InputMaybe<ProjectGithubReposSetInput>;
  pk_columns: ProjectGithubReposPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectGithubReposManyArgs = {
  updates: Array<ProjectGithubReposUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectLeadsArgs = {
  _set: InputMaybe<ProjectLeadsSetInput>;
  where: ProjectLeadsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectLeadsByPkArgs = {
  _set: InputMaybe<ProjectLeadsSetInput>;
  pk_columns: ProjectLeadsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectLeadsManyArgs = {
  updates: Array<ProjectLeadsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectsContributorsArgs = {
  _inc: InputMaybe<ProjectsContributorsIncInput>;
  _set: InputMaybe<ProjectsContributorsSetInput>;
  where: ProjectsContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectsContributorsByPkArgs = {
  _inc: InputMaybe<ProjectsContributorsIncInput>;
  _set: InputMaybe<ProjectsContributorsSetInput>;
  pk_columns: ProjectsContributorsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectsContributorsManyArgs = {
  updates: Array<ProjectsContributorsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectsPendingContributorsArgs = {
  _inc: InputMaybe<ProjectsPendingContributorsIncInput>;
  _set: InputMaybe<ProjectsPendingContributorsSetInput>;
  where: ProjectsPendingContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectsPendingContributorsByPkArgs = {
  _inc: InputMaybe<ProjectsPendingContributorsIncInput>;
  _set: InputMaybe<ProjectsPendingContributorsSetInput>;
  pk_columns: ProjectsPendingContributorsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectsPendingContributorsManyArgs = {
  updates: Array<ProjectsPendingContributorsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectsRewardedUsersArgs = {
  _inc: InputMaybe<ProjectsRewardedUsersIncInput>;
  _set: InputMaybe<ProjectsRewardedUsersSetInput>;
  where: ProjectsRewardedUsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectsRewardedUsersByPkArgs = {
  _inc: InputMaybe<ProjectsRewardedUsersIncInput>;
  _set: InputMaybe<ProjectsRewardedUsersSetInput>;
  pk_columns: ProjectsRewardedUsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectsRewardedUsersManyArgs = {
  updates: Array<ProjectsRewardedUsersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateProjectsSponsorsArgs = {
  _set: InputMaybe<ProjectsSponsorsSetInput>;
  where: ProjectsSponsorsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectsSponsorsByPkArgs = {
  _set: InputMaybe<ProjectsSponsorsSetInput>;
  pk_columns: ProjectsSponsorsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectsSponsorsManyArgs = {
  updates: Array<ProjectsSponsorsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateSponsorArgs = {
  logoUrl: InputMaybe<Scalars['Url']>;
  name: InputMaybe<Scalars['String']>;
  sponsorId: Scalars['Uuid'];
  url: InputMaybe<Scalars['Url']>;
};


/** mutation root */
export type Mutation_RootUpdateSponsorsArgs = {
  _set: InputMaybe<SponsorsSetInput>;
  where: SponsorsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateSponsorsByPkArgs = {
  _set: InputMaybe<SponsorsSetInput>;
  pk_columns: SponsorsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateSponsorsManyArgs = {
  updates: Array<SponsorsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateTechnologiesArgs = {
  _set: InputMaybe<TechnologiesSetInput>;
  where: TechnologiesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateTechnologiesManyArgs = {
  updates: Array<TechnologiesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _append: InputMaybe<UsersAppendInput>;
  _deleteAtPath: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem: InputMaybe<UsersDeleteElemInput>;
  _deleteKey: InputMaybe<UsersDeleteKeyInput>;
  _prepend: InputMaybe<UsersPrependInput>;
  _set: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserPayoutInfoArgs = {
  _append: InputMaybe<UserPayoutInfoAppendInput>;
  _deleteAtPath: InputMaybe<UserPayoutInfoDeleteAtPathInput>;
  _deleteElem: InputMaybe<UserPayoutInfoDeleteElemInput>;
  _deleteKey: InputMaybe<UserPayoutInfoDeleteKeyInput>;
  _prepend: InputMaybe<UserPayoutInfoPrependInput>;
  _set: InputMaybe<UserPayoutInfoSetInput>;
  where: UserPayoutInfoBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserPayoutInfoByPkArgs = {
  _append: InputMaybe<UserPayoutInfoAppendInput>;
  _deleteAtPath: InputMaybe<UserPayoutInfoDeleteAtPathInput>;
  _deleteElem: InputMaybe<UserPayoutInfoDeleteElemInput>;
  _deleteKey: InputMaybe<UserPayoutInfoDeleteKeyInput>;
  _prepend: InputMaybe<UserPayoutInfoPrependInput>;
  _set: InputMaybe<UserPayoutInfoSetInput>;
  pk_columns: UserPayoutInfoPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserPayoutInfoManyArgs = {
  updates: Array<UserPayoutInfoUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserProfileArgs = {
  bio: InputMaybe<Scalars['String']>;
  contactInformations: Array<Information>;
  cover: InputMaybe<ProfileCover>;
  languages: InputMaybe<Array<Language>>;
  location: InputMaybe<Scalars['String']>;
  lookingForAJob: Scalars['Boolean'];
  website: InputMaybe<Scalars['String']>;
  weeklyAllocatedTime: AllocatedTime;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _append: InputMaybe<UsersAppendInput>;
  _deleteAtPath: InputMaybe<UsersDeleteAtPathInput>;
  _deleteElem: InputMaybe<UsersDeleteElemInput>;
  _deleteKey: InputMaybe<UsersDeleteKeyInput>;
  _prepend: InputMaybe<UsersPrependInput>;
  _set: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkItemsArgs = {
  _inc: InputMaybe<WorkItemsIncInput>;
  _set: InputMaybe<WorkItemsSetInput>;
  where: WorkItemsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkItemsManyArgs = {
  updates: Array<WorkItemsUpdates>;
};

/** Streaming cursor of the table "onboardings" */
export type Onboardings_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Onboardings_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Onboardings_StreamCursorValueInput = {
  profileWizardDisplayDate: InputMaybe<Scalars['timestamp']>;
  termsAndConditionsAcceptanceDate: InputMaybe<Scalars['timestamp']>;
  userId: InputMaybe<Scalars['uuid']>;
};

export type Payment_Requests_Aggregate_Bool_Exp = {
  count: InputMaybe<Payment_Requests_Aggregate_Bool_Exp_Count>;
};

export type Payment_Requests_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<PaymentRequestsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "payment_requests" */
export type Payment_Requests_Avg_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "payment_requests" */
export type Payment_Requests_Max_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  budgetId: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  invoiceReceivedAt: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestorId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payment_requests" */
export type Payment_Requests_Min_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  budgetId: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  invoiceReceivedAt: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestorId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Pop_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Samp_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "payment_requests" */
export type Payment_Requests_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payment_Requests_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payment_Requests_StreamCursorValueInput = {
  amountInUsd: InputMaybe<Scalars['bigint']>;
  budgetId: InputMaybe<Scalars['uuid']>;
  hoursWorked: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['uuid']>;
  invoiceReceivedAt: InputMaybe<Scalars['timestamp']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  requestedAt: InputMaybe<Scalars['timestamp']>;
  requestorId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "payment_requests" */
export type Payment_Requests_Sum_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "payment_requests" */
export type Payment_Requests_Var_Pop_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "payment_requests" */
export type Payment_Requests_Var_Samp_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "payment_requests" */
export type Payment_Requests_Variance_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  hoursWorked: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

export type Payment_Stats_Aggregate_Bool_Exp = {
  count: InputMaybe<Payment_Stats_Aggregate_Bool_Exp_Count>;
};

export type Payment_Stats_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<PaymentStatsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<PaymentStatsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "payment_stats" */
export type Payment_Stats_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "payment_stats" */
export type Payment_Stats_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payment_stats" */
export type Payment_Stats_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "payment_stats" */
export type Payment_Stats_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "payment_stats" */
export type Payment_Stats_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "payment_stats" */
export type Payment_Stats_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "payment_stats" */
export type Payment_Stats_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payment_Stats_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payment_Stats_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  moneyGranted: InputMaybe<Scalars['numeric']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "payment_stats" */
export type Payment_Stats_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "payment_stats" */
export type Payment_Stats_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "payment_stats" */
export type Payment_Stats_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "payment_stats" */
export type Payment_Stats_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

export type Payments_Aggregate_Bool_Exp = {
  count: InputMaybe<Payments_Aggregate_Bool_Exp_Count>;
};

export type Payments_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<PaymentsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<PaymentsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "payments" */
export type Payments_Avg_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "payments" */
export type Payments_Max_Order_By = {
  amount: InputMaybe<OrderBy>;
  currencyCode: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  processedAt: InputMaybe<OrderBy>;
  requestId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payments" */
export type Payments_Min_Order_By = {
  amount: InputMaybe<OrderBy>;
  currencyCode: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  processedAt: InputMaybe<OrderBy>;
  requestId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "payments" */
export type Payments_Stddev_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "payments" */
export type Payments_Stddev_Pop_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "payments" */
export type Payments_Stddev_Samp_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "payments" */
export type Payments_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Payments_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Payments_StreamCursorValueInput = {
  amount: InputMaybe<Scalars['numeric']>;
  currencyCode: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  processedAt: InputMaybe<Scalars['timestamp']>;
  receipt: InputMaybe<Scalars['jsonb']>;
  requestId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "payments" */
export type Payments_Sum_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "payments" */
export type Payments_Var_Pop_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "payments" */
export type Payments_Var_Samp_Order_By = {
  amount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "payments" */
export type Payments_Variance_Order_By = {
  amount: InputMaybe<OrderBy>;
};

export type Pending_Project_Leader_Invitations_Aggregate_Bool_Exp = {
  count: InputMaybe<Pending_Project_Leader_Invitations_Aggregate_Bool_Exp_Count>;
};

export type Pending_Project_Leader_Invitations_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Pending_Project_Leader_Invitations_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Pending_Project_Leader_Invitations_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "pending_project_leader_invitations" */
export type Pending_Project_Leader_Invitations_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

export type Project_Github_Repos_Aggregate_Bool_Exp = {
  count: InputMaybe<Project_Github_Repos_Aggregate_Bool_Exp_Count>;
};

export type Project_Github_Repos_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectGithubReposBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "project_github_repos" */
export type Project_Github_Repos_Avg_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "project_github_repos" */
export type Project_Github_Repos_Max_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "project_github_repos" */
export type Project_Github_Repos_Min_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "project_github_repos" */
export type Project_Github_Repos_Stddev_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "project_github_repos" */
export type Project_Github_Repos_Stddev_Pop_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "project_github_repos" */
export type Project_Github_Repos_Stddev_Samp_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "project_github_repos" */
export type Project_Github_Repos_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Project_Github_Repos_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Github_Repos_StreamCursorValueInput = {
  githubRepoId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "project_github_repos" */
export type Project_Github_Repos_Sum_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "project_github_repos" */
export type Project_Github_Repos_Var_Pop_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "project_github_repos" */
export type Project_Github_Repos_Var_Samp_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "project_github_repos" */
export type Project_Github_Repos_Variance_Order_By = {
  githubRepoId: InputMaybe<OrderBy>;
};

export type Project_Leads_Aggregate_Bool_Exp = {
  count: InputMaybe<Project_Leads_Aggregate_Bool_Exp_Count>;
};

export type Project_Leads_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectLeadsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "project_leads" */
export type Project_Leads_Max_Order_By = {
  assignedAt: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "project_leads" */
export type Project_Leads_Min_Order_By = {
  assignedAt: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "project_leads" */
export type Project_Leads_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Project_Leads_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Leads_StreamCursorValueInput = {
  assignedAt: InputMaybe<Scalars['timestamp']>;
  projectId: InputMaybe<Scalars['uuid']>;
  userId: InputMaybe<Scalars['uuid']>;
};

export type Projects_Contributors_Aggregate_Bool_Exp = {
  count: InputMaybe<Projects_Contributors_Aggregate_Bool_Exp_Count>;
};

export type Projects_Contributors_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectsContributorsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "projects_contributors" */
export type Projects_Contributors_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "projects_contributors" */
export type Projects_Contributors_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "projects_contributors" */
export type Projects_Contributors_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "projects_contributors" */
export type Projects_Contributors_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "projects_contributors" */
export type Projects_Contributors_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "projects_contributors" */
export type Projects_Contributors_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "projects_contributors" */
export type Projects_Contributors_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_Contributors_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Contributors_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "projects_contributors" */
export type Projects_Contributors_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "projects_contributors" */
export type Projects_Contributors_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "projects_contributors" */
export type Projects_Contributors_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "projects_contributors" */
export type Projects_Contributors_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

export type Projects_Pending_Contributors_Aggregate_Bool_Exp = {
  count: InputMaybe<Projects_Pending_Contributors_Aggregate_Bool_Exp_Count>;
};

export type Projects_Pending_Contributors_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectsPendingContributorsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "projects_pending_contributors" */
export type Projects_Pending_Contributors_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_Pending_Contributors_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Pending_Contributors_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "projects_pending_contributors" */
export type Projects_Pending_Contributors_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

export type Projects_Rewarded_Users_Aggregate_Bool_Exp = {
  count: InputMaybe<Projects_Rewarded_Users_Aggregate_Bool_Exp_Count>;
};

export type Projects_Rewarded_Users_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectsRewardedUsersBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "projects_rewarded_users" */
export type Projects_Rewarded_Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_Rewarded_Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Rewarded_Users_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rewardCount: InputMaybe<Scalars['Int']>;
};

/** order by sum() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "projects_rewarded_users" */
export type Projects_Rewarded_Users_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  rewardCount: InputMaybe<OrderBy>;
};

export type Projects_Sponsors_Aggregate_Bool_Exp = {
  count: InputMaybe<Projects_Sponsors_Aggregate_Bool_Exp_Count>;
};

export type Projects_Sponsors_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectsSponsorsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "projects_sponsors" */
export type Projects_Sponsors_Max_Order_By = {
  projectId: InputMaybe<OrderBy>;
  sponsorId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "projects_sponsors" */
export type Projects_Sponsors_Min_Order_By = {
  projectId: InputMaybe<OrderBy>;
  sponsorId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "projects_sponsors" */
export type Projects_Sponsors_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_Sponsors_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Sponsors_StreamCursorValueInput = {
  projectId: InputMaybe<Scalars['uuid']>;
  sponsorId: InputMaybe<Scalars['uuid']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "api.closed_by_pull_requests" */
  apiClosedByPullRequests: Array<ApiClosedByPullRequests>;
  /** fetch aggregated fields from the table: "api.closed_by_pull_requests" */
  apiClosedByPullRequestsAggregate: ApiClosedByPullRequestsAggregate;
  /** fetch data from the table: "api.closing_issues" */
  apiClosingIssues: Array<ApiClosingIssues>;
  /** fetch aggregated fields from the table: "api.closing_issues" */
  apiClosingIssuesAggregate: ApiClosingIssuesAggregate;
  /** fetch data from the table: "api.completed_contributions" */
  apiCompletedContributions: Array<ApiCompletedContributions>;
  /** fetch aggregated fields from the table: "api.completed_contributions" */
  apiCompletedContributionsAggregate: ApiCompletedContributionsAggregate;
  /** An array relationship */
  applications: Array<Applications>;
  /** An aggregate relationship */
  applicationsAggregate: ApplicationsAggregate;
  /** fetch data from the table: "applications" using primary key columns */
  applicationsByPk: Maybe<Applications>;
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequestsAggregate;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProvidersAggregate;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokensAggregate;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRolesAggregate;
  /** fetch data from the table: "auth.user_github_provider" */
  authUserGithubProvider: Array<AuthUserGithubProvider>;
  /** fetch aggregated fields from the table: "auth.user_github_provider" */
  authUserGithubProviderAggregate: AuthUserGithubProviderAggregate;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProvidersAggregate;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRolesAggregate;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeysAggregate;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk: Maybe<Budgets>;
  /** fetch data from the table: "api.commands" */
  commands: Array<Commands>;
  /** fetch aggregated fields from the table: "api.commands" */
  commandsAggregate: CommandsAggregate;
  /** An array relationship */
  contactInformations: Array<ContactInformations>;
  /** An aggregate relationship */
  contactInformationsAggregate: ContactInformationsAggregate;
  /** An array relationship */
  contributionCounts: Array<ContributionCounts>;
  /** An aggregate relationship */
  contributionCountsAggregate: ContributionCountsAggregate;
  /** An array relationship */
  contributionStats: Array<ContributionStats>;
  /** An aggregate relationship */
  contributionStatsAggregate: ContributionStatsAggregate;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributionsAggregate: ContributionsAggregate;
  fetchIssue: Maybe<GithubIssue>;
  fetchPullRequest: Maybe<GithubPullRequest>;
  /** fetch data from the table: "api.github_issues" */
  githubIssues: Array<GithubIssues>;
  /** fetch aggregated fields from the table: "api.github_issues" */
  githubIssuesAggregate: GithubIssuesAggregate;
  /** fetch data from the table: "github_pull_request_commits" */
  githubPullRequestCommits: Array<GithubPullRequestCommits>;
  /** fetch aggregated fields from the table: "github_pull_request_commits" */
  githubPullRequestCommitsAggregate: GithubPullRequestCommitsAggregate;
  /** fetch data from the table: "github_pull_request_commits" using primary key columns */
  githubPullRequestCommitsByPk: Maybe<GithubPullRequestCommits>;
  /** fetch data from the table: "api.github_pull_request_reviews" */
  githubPullRequestReviews: Array<GithubPullRequestReviews>;
  /** fetch aggregated fields from the table: "api.github_pull_request_reviews" */
  githubPullRequestReviewsAggregate: GithubPullRequestReviewsAggregate;
  /** fetch data from the table: "api.github_pull_requests" */
  githubPullRequests: Array<GithubPullRequests>;
  /** fetch aggregated fields from the table: "api.github_pull_requests" */
  githubPullRequestsAggregate: GithubPullRequestsAggregate;
  /** fetch data from the table: "api.github_repos" */
  githubRepos: Array<GithubRepos>;
  /** fetch aggregated fields from the table: "api.github_repos" */
  githubReposAggregate: GithubReposAggregate;
  /** fetch data from the table: "github_users" */
  githubUsers: Array<GithubUsers>;
  /** fetch aggregated fields from the table: "github_users" */
  githubUsersAggregate: GithubUsersAggregate;
  /** fetch data from the table: "github_users" using primary key columns */
  githubUsersByPk: Maybe<GithubUsers>;
  hello: Scalars['String'];
  /** fetch data from the table: "onboardings" */
  onboardings: Array<Onboardings>;
  /** fetch aggregated fields from the table: "onboardings" */
  onboardingsAggregate: OnboardingsAggregate;
  /** fetch data from the table: "onboardings" using primary key columns */
  onboardingsByPk: Maybe<Onboardings>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk: Maybe<PaymentRequests>;
  /** An array relationship */
  paymentStats: Array<PaymentStats>;
  /** An aggregate relationship */
  paymentStatsAggregate: PaymentStatsAggregate;
  /** An array relationship */
  payments: Array<Payments>;
  /** An aggregate relationship */
  paymentsAggregate: PaymentsAggregate;
  /** fetch data from the table: "payments" using primary key columns */
  paymentsByPk: Maybe<Payments>;
  /** fetch data from the table: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitations: Array<PendingProjectLeaderInvitations>;
  /** fetch aggregated fields from the table: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitationsAggregate: PendingProjectLeaderInvitationsAggregate;
  /** fetch data from the table: "pending_project_leader_invitations" using primary key columns */
  pendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** fetch data from the table: "project_github_repos" */
  projectGithubRepos: Array<ProjectGithubRepos>;
  /** fetch aggregated fields from the table: "project_github_repos" */
  projectGithubReposAggregate: ProjectGithubReposAggregate;
  /** fetch data from the table: "project_github_repos" using primary key columns */
  projectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectLeadsAggregate: ProjectLeadsAggregate;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk: Maybe<ProjectLeads>;
  /** fetch data from the table: "api.projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "api.projects" */
  projectsAggregate: ProjectsAggregate;
  /** fetch data from the table: "projects_contributors" */
  projectsContributors: Array<ProjectsContributors>;
  /** fetch aggregated fields from the table: "projects_contributors" */
  projectsContributorsAggregate: ProjectsContributorsAggregate;
  /** fetch data from the table: "projects_contributors" using primary key columns */
  projectsContributorsByPk: Maybe<ProjectsContributors>;
  /** fetch data from the table: "projects_pending_contributors" */
  projectsPendingContributors: Array<ProjectsPendingContributors>;
  /** fetch aggregated fields from the table: "projects_pending_contributors" */
  projectsPendingContributorsAggregate: ProjectsPendingContributorsAggregate;
  /** fetch data from the table: "projects_pending_contributors" using primary key columns */
  projectsPendingContributorsByPk: Maybe<ProjectsPendingContributors>;
  /** fetch data from the table: "projects_rewarded_users" */
  projectsRewardedUsers: Array<ProjectsRewardedUsers>;
  /** fetch aggregated fields from the table: "projects_rewarded_users" */
  projectsRewardedUsersAggregate: ProjectsRewardedUsersAggregate;
  /** fetch data from the table: "projects_rewarded_users" using primary key columns */
  projectsRewardedUsersByPk: Maybe<ProjectsRewardedUsers>;
  /** fetch data from the table: "projects_sponsors" */
  projectsSponsors: Array<ProjectsSponsors>;
  /** fetch aggregated fields from the table: "projects_sponsors" */
  projectsSponsorsAggregate: ProjectsSponsorsAggregate;
  /** fetch data from the table: "projects_sponsors" using primary key columns */
  projectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** fetch data from the table: "registered_users" */
  registeredUsers: Array<RegisteredUsers>;
  /** fetch aggregated fields from the table: "registered_users" */
  registeredUsersAggregate: RegisteredUsersAggregate;
  releaseDate: Scalars['String'];
  searchUsers: Maybe<Array<GithubUser>>;
  /** fetch data from the table: "sponsors" */
  sponsors: Array<Sponsors>;
  /** fetch aggregated fields from the table: "sponsors" */
  sponsorsAggregate: SponsorsAggregate;
  /** fetch data from the table: "sponsors" using primary key columns */
  sponsorsByPk: Maybe<Sponsors>;
  /** fetch data from the table: "api.technologies" */
  technologies: Array<Technologies>;
  /** fetch aggregated fields from the table: "api.technologies" */
  technologiesAggregate: TechnologiesAggregate;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_payout_info" */
  userPayoutInfo: Array<UserPayoutInfo>;
  /** fetch aggregated fields from the table: "user_payout_info" */
  userPayoutInfoAggregate: UserPayoutInfoAggregate;
  /** fetch data from the table: "user_payout_info" using primary key columns */
  userPayoutInfoByPk: Maybe<UserPayoutInfo>;
  /** fetch data from the table: "api.user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "api.user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: UsersAggregate;
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** An aggregate relationship */
  workItemsAggregate: WorkItemsAggregate;
};


export type Query_RootApiClosedByPullRequestsArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


export type Query_RootApiClosedByPullRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


export type Query_RootApiClosingIssuesArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


export type Query_RootApiClosingIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


export type Query_RootApiCompletedContributionsArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


export type Query_RootApiCompletedContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


export type Query_RootApplicationsArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


export type Query_RootApplicationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


export type Query_RootApplicationsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Query_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthProviderRequestsArgs = {
  distinctOn: InputMaybe<Array<AuthProviderRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProviderRequestsOrderBy>>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};


export type Query_RootAuthProviderRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthProviderRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProviderRequestsOrderBy>>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};


export type Query_RootAuthProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProvidersOrderBy>>;
  where: InputMaybe<AuthProvidersBoolExp>;
};


export type Query_RootAuthProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProvidersOrderBy>>;
  where: InputMaybe<AuthProvidersBoolExp>;
};


export type Query_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Query_RootAuthRefreshTokensArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


export type Query_RootAuthRefreshTokensAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


export type Query_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Query_RootAuthRolesArgs = {
  distinctOn: InputMaybe<Array<AuthRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRolesOrderBy>>;
  where: InputMaybe<AuthRolesBoolExp>;
};


export type Query_RootAuthRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRolesOrderBy>>;
  where: InputMaybe<AuthRolesBoolExp>;
};


export type Query_RootAuthUserGithubProviderArgs = {
  distinctOn: InputMaybe<Array<AuthUserGithubProviderSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserGithubProviderOrderBy>>;
  where: InputMaybe<AuthUserGithubProviderBoolExp>;
};


export type Query_RootAuthUserGithubProviderAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserGithubProviderSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserGithubProviderOrderBy>>;
  where: InputMaybe<AuthUserGithubProviderBoolExp>;
};


export type Query_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


export type Query_RootAuthUserProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


export type Query_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserRolesArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


export type Query_RootAuthUserRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


export type Query_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


export type Query_RootAuthUserSecurityKeysArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


export type Query_RootAuthUserSecurityKeysAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


export type Query_RootBudgetsArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


export type Query_RootBudgetsAggregateArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


export type Query_RootBudgetsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootCommandsArgs = {
  distinctOn: InputMaybe<Array<CommandsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<CommandsOrderBy>>;
  where: InputMaybe<CommandsBoolExp>;
};


export type Query_RootCommandsAggregateArgs = {
  distinctOn: InputMaybe<Array<CommandsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<CommandsOrderBy>>;
  where: InputMaybe<CommandsBoolExp>;
};


export type Query_RootContactInformationsArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


export type Query_RootContactInformationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


export type Query_RootContributionCountsArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


export type Query_RootContributionCountsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


export type Query_RootContributionStatsArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


export type Query_RootContributionStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


export type Query_RootContributionsArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


export type Query_RootContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


export type Query_RootFetchIssueArgs = {
  issueNumber: Scalars['Int'];
  repoName: Scalars['String'];
  repoOwner: Scalars['String'];
};


export type Query_RootFetchPullRequestArgs = {
  prNumber: Scalars['Int'];
  repoName: Scalars['String'];
  repoOwner: Scalars['String'];
};


export type Query_RootGithubIssuesArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


export type Query_RootGithubIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


export type Query_RootGithubPullRequestCommitsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


export type Query_RootGithubPullRequestCommitsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


export type Query_RootGithubPullRequestCommitsByPkArgs = {
  pullRequestId: Scalars['bigint'];
  sha: Scalars['String'];
};


export type Query_RootGithubPullRequestReviewsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestReviewsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestReviewsOrderBy>>;
  where: InputMaybe<GithubPullRequestReviewsBoolExp>;
};


export type Query_RootGithubPullRequestReviewsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestReviewsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestReviewsOrderBy>>;
  where: InputMaybe<GithubPullRequestReviewsBoolExp>;
};


export type Query_RootGithubPullRequestsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestsOrderBy>>;
  where: InputMaybe<GithubPullRequestsBoolExp>;
};


export type Query_RootGithubPullRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestsOrderBy>>;
  where: InputMaybe<GithubPullRequestsBoolExp>;
};


export type Query_RootGithubReposArgs = {
  distinctOn: InputMaybe<Array<GithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposOrderBy>>;
  where: InputMaybe<GithubReposBoolExp>;
};


export type Query_RootGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposOrderBy>>;
  where: InputMaybe<GithubReposBoolExp>;
};


export type Query_RootGithubUsersArgs = {
  distinctOn: InputMaybe<Array<GithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubUsersOrderBy>>;
  where: InputMaybe<GithubUsersBoolExp>;
};


export type Query_RootGithubUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubUsersOrderBy>>;
  where: InputMaybe<GithubUsersBoolExp>;
};


export type Query_RootGithubUsersByPkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootOnboardingsArgs = {
  distinctOn: InputMaybe<Array<OnboardingsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<OnboardingsOrderBy>>;
  where: InputMaybe<OnboardingsBoolExp>;
};


export type Query_RootOnboardingsAggregateArgs = {
  distinctOn: InputMaybe<Array<OnboardingsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<OnboardingsOrderBy>>;
  where: InputMaybe<OnboardingsBoolExp>;
};


export type Query_RootOnboardingsByPkArgs = {
  userId: Scalars['uuid'];
};


export type Query_RootPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type Query_RootPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type Query_RootPaymentRequestsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPaymentStatsArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


export type Query_RootPaymentStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


export type Query_RootPaymentsArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


export type Query_RootPaymentsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


export type Query_RootPaymentsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootPendingProjectLeaderInvitationsArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


export type Query_RootPendingProjectLeaderInvitationsAggregateArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


export type Query_RootPendingProjectLeaderInvitationsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectGithubReposArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


export type Query_RootProjectGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


export type Query_RootProjectGithubReposByPkArgs = {
  githubRepoId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Query_RootProjectLeadsArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


export type Query_RootProjectLeadsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


export type Query_RootProjectLeadsByPkArgs = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Query_RootProjectsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsOrderBy>>;
  where: InputMaybe<ProjectsBoolExp>;
};


export type Query_RootProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsOrderBy>>;
  where: InputMaybe<ProjectsBoolExp>;
};


export type Query_RootProjectsContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


export type Query_RootProjectsContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


export type Query_RootProjectsContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Query_RootProjectsPendingContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


export type Query_RootProjectsPendingContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


export type Query_RootProjectsPendingContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Query_RootProjectsRewardedUsersArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


export type Query_RootProjectsRewardedUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


export type Query_RootProjectsRewardedUsersByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Query_RootProjectsSponsorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


export type Query_RootProjectsSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


export type Query_RootProjectsSponsorsByPkArgs = {
  projectId: Scalars['uuid'];
  sponsorId: Scalars['uuid'];
};


export type Query_RootRegisteredUsersArgs = {
  distinctOn: InputMaybe<Array<RegisteredUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<RegisteredUsersOrderBy>>;
  where: InputMaybe<RegisteredUsersBoolExp>;
};


export type Query_RootRegisteredUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<RegisteredUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<RegisteredUsersOrderBy>>;
  where: InputMaybe<RegisteredUsersBoolExp>;
};


export type Query_RootSearchUsersArgs = {
  order: InputMaybe<Scalars['String']>;
  page: InputMaybe<Scalars['Int']>;
  perPage: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
  sort: InputMaybe<Scalars['String']>;
};


export type Query_RootSponsorsArgs = {
  distinctOn: InputMaybe<Array<SponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<SponsorsOrderBy>>;
  where: InputMaybe<SponsorsBoolExp>;
};


export type Query_RootSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<SponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<SponsorsOrderBy>>;
  where: InputMaybe<SponsorsBoolExp>;
};


export type Query_RootSponsorsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootTechnologiesArgs = {
  distinctOn: InputMaybe<Array<TechnologiesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<TechnologiesOrderBy>>;
  where: InputMaybe<TechnologiesBoolExp>;
};


export type Query_RootTechnologiesAggregateArgs = {
  distinctOn: InputMaybe<Array<TechnologiesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<TechnologiesOrderBy>>;
  where: InputMaybe<TechnologiesBoolExp>;
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserPayoutInfoArgs = {
  distinctOn: InputMaybe<Array<UserPayoutInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserPayoutInfoOrderBy>>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};


export type Query_RootUserPayoutInfoAggregateArgs = {
  distinctOn: InputMaybe<Array<UserPayoutInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserPayoutInfoOrderBy>>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};


export type Query_RootUserPayoutInfoByPkArgs = {
  userId: Scalars['uuid'];
};


export type Query_RootUserProfilesArgs = {
  distinctOn: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserProfilesOrderBy>>;
  where: InputMaybe<UserProfilesBoolExp>;
};


export type Query_RootUserProfilesAggregateArgs = {
  distinctOn: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserProfilesOrderBy>>;
  where: InputMaybe<UserProfilesBoolExp>;
};


export type Query_RootUsersArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};


export type Query_RootWorkItemsArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


export type Query_RootWorkItemsAggregateArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** Streaming cursor of the table "registered_users" */
export type Registered_Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Registered_Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Registered_Users_StreamCursorValueInput = {
  admin: InputMaybe<Scalars['Boolean']>;
  avatarUrl: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  lastSeen: InputMaybe<Scalars['timestamp']>;
  login: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "sponsors" */
export type Sponsors_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Sponsors_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Sponsors_StreamCursorValueInput = {
  id: InputMaybe<Scalars['uuid']>;
  logoUrl: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  url: InputMaybe<Scalars['String']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table in a streaming manner: "api.commands" */
  CommandsStream: Array<Commands>;
  /** fetch data from the table in a streaming manner: "api.contact_informations" */
  ContactInformationsStream: Array<ContactInformations>;
  /** fetch data from the table in a streaming manner: "api.contribution_counts" */
  ContributionCountsStream: Array<ContributionCounts>;
  /** fetch data from the table in a streaming manner: "api.contribution_stats" */
  ContributionStatsStream: Array<ContributionStats>;
  /** fetch data from the table in a streaming manner: "api.contributions" */
  ContributionsStream: Array<Contributions>;
  /** fetch data from the table in a streaming manner: "api.github_issues" */
  GithubIssuesStream: Array<GithubIssues>;
  /** fetch data from the table in a streaming manner: "api.github_pull_request_reviews" */
  GithubPullRequestReviewsStream: Array<GithubPullRequestReviews>;
  /** fetch data from the table in a streaming manner: "api.github_pull_requests" */
  GithubPullRequestsStream: Array<GithubPullRequests>;
  /** fetch data from the table in a streaming manner: "api.github_repos" */
  GithubReposStream: Array<GithubRepos>;
  /** fetch data from the table in a streaming manner: "api.projects" */
  ProjectsStream: Array<Projects>;
  /** fetch data from the table in a streaming manner: "api.technologies" */
  TechnologiesStream: Array<Technologies>;
  /** fetch data from the table in a streaming manner: "api.user_profiles" */
  UserProfilesStream: Array<UserProfiles>;
  /** fetch data from the table in a streaming manner: "api.work_items" */
  WorkItemsStream: Array<WorkItems>;
  /** fetch data from the table: "api.closed_by_pull_requests" */
  apiClosedByPullRequests: Array<ApiClosedByPullRequests>;
  /** fetch aggregated fields from the table: "api.closed_by_pull_requests" */
  apiClosedByPullRequestsAggregate: ApiClosedByPullRequestsAggregate;
  /** fetch data from the table in a streaming manner: "api.closed_by_pull_requests" */
  apiClosedByPullRequestsStream: Array<ApiClosedByPullRequests>;
  /** fetch data from the table: "api.closing_issues" */
  apiClosingIssues: Array<ApiClosingIssues>;
  /** fetch aggregated fields from the table: "api.closing_issues" */
  apiClosingIssuesAggregate: ApiClosingIssuesAggregate;
  /** fetch data from the table in a streaming manner: "api.closing_issues" */
  apiClosingIssuesStream: Array<ApiClosingIssues>;
  /** fetch data from the table: "api.completed_contributions" */
  apiCompletedContributions: Array<ApiCompletedContributions>;
  /** fetch aggregated fields from the table: "api.completed_contributions" */
  apiCompletedContributionsAggregate: ApiCompletedContributionsAggregate;
  /** fetch data from the table in a streaming manner: "api.completed_contributions" */
  apiCompletedContributionsStream: Array<ApiCompletedContributions>;
  /** An array relationship */
  applications: Array<Applications>;
  /** An aggregate relationship */
  applicationsAggregate: ApplicationsAggregate;
  /** fetch data from the table: "applications" using primary key columns */
  applicationsByPk: Maybe<Applications>;
  /** fetch data from the table in a streaming manner: "applications" */
  applicationsStream: Array<Applications>;
  /** fetch data from the table: "auth.providers" using primary key columns */
  authProvider: Maybe<AuthProviders>;
  /** fetch data from the table: "auth.provider_requests" using primary key columns */
  authProviderRequest: Maybe<AuthProviderRequests>;
  /** fetch data from the table: "auth.provider_requests" */
  authProviderRequests: Array<AuthProviderRequests>;
  /** fetch aggregated fields from the table: "auth.provider_requests" */
  authProviderRequestsAggregate: AuthProviderRequestsAggregate;
  /** fetch data from the table in a streaming manner: "auth.provider_requests" */
  authProviderRequestsStream: Array<AuthProviderRequests>;
  /** fetch data from the table: "auth.providers" */
  authProviders: Array<AuthProviders>;
  /** fetch aggregated fields from the table: "auth.providers" */
  authProvidersAggregate: AuthProvidersAggregate;
  /** fetch data from the table in a streaming manner: "auth.providers" */
  authProvidersStream: Array<AuthProviders>;
  /** fetch data from the table: "auth.refresh_tokens" using primary key columns */
  authRefreshToken: Maybe<AuthRefreshTokens>;
  /** fetch data from the table: "auth.refresh_tokens" */
  authRefreshTokens: Array<AuthRefreshTokens>;
  /** fetch aggregated fields from the table: "auth.refresh_tokens" */
  authRefreshTokensAggregate: AuthRefreshTokensAggregate;
  /** fetch data from the table in a streaming manner: "auth.refresh_tokens" */
  authRefreshTokensStream: Array<AuthRefreshTokens>;
  /** fetch data from the table: "auth.roles" using primary key columns */
  authRole: Maybe<AuthRoles>;
  /** fetch data from the table: "auth.roles" */
  authRoles: Array<AuthRoles>;
  /** fetch aggregated fields from the table: "auth.roles" */
  authRolesAggregate: AuthRolesAggregate;
  /** fetch data from the table in a streaming manner: "auth.roles" */
  authRolesStream: Array<AuthRoles>;
  /** fetch data from the table: "auth.user_github_provider" */
  authUserGithubProvider: Array<AuthUserGithubProvider>;
  /** fetch aggregated fields from the table: "auth.user_github_provider" */
  authUserGithubProviderAggregate: AuthUserGithubProviderAggregate;
  /** fetch data from the table in a streaming manner: "auth.user_github_provider" */
  authUserGithubProviderStream: Array<AuthUserGithubProvider>;
  /** fetch data from the table: "auth.user_providers" using primary key columns */
  authUserProvider: Maybe<AuthUserProviders>;
  /** fetch data from the table: "auth.user_providers" */
  authUserProviders: Array<AuthUserProviders>;
  /** fetch aggregated fields from the table: "auth.user_providers" */
  authUserProvidersAggregate: AuthUserProvidersAggregate;
  /** fetch data from the table in a streaming manner: "auth.user_providers" */
  authUserProvidersStream: Array<AuthUserProviders>;
  /** fetch data from the table: "auth.user_roles" using primary key columns */
  authUserRole: Maybe<AuthUserRoles>;
  /** fetch data from the table: "auth.user_roles" */
  authUserRoles: Array<AuthUserRoles>;
  /** fetch aggregated fields from the table: "auth.user_roles" */
  authUserRolesAggregate: AuthUserRolesAggregate;
  /** fetch data from the table in a streaming manner: "auth.user_roles" */
  authUserRolesStream: Array<AuthUserRoles>;
  /** fetch data from the table: "auth.user_security_keys" using primary key columns */
  authUserSecurityKey: Maybe<AuthUserSecurityKeys>;
  /** fetch data from the table: "auth.user_security_keys" */
  authUserSecurityKeys: Array<AuthUserSecurityKeys>;
  /** fetch aggregated fields from the table: "auth.user_security_keys" */
  authUserSecurityKeysAggregate: AuthUserSecurityKeysAggregate;
  /** fetch data from the table in a streaming manner: "auth.user_security_keys" */
  authUserSecurityKeysStream: Array<AuthUserSecurityKeys>;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk: Maybe<Budgets>;
  /** fetch data from the table in a streaming manner: "budgets" */
  budgetsStream: Array<Budgets>;
  /** fetch data from the table: "api.commands" */
  commands: Array<Commands>;
  /** fetch aggregated fields from the table: "api.commands" */
  commandsAggregate: CommandsAggregate;
  /** An array relationship */
  contactInformations: Array<ContactInformations>;
  /** An aggregate relationship */
  contactInformationsAggregate: ContactInformationsAggregate;
  /** An array relationship */
  contributionCounts: Array<ContributionCounts>;
  /** An aggregate relationship */
  contributionCountsAggregate: ContributionCountsAggregate;
  /** An array relationship */
  contributionStats: Array<ContributionStats>;
  /** An aggregate relationship */
  contributionStatsAggregate: ContributionStatsAggregate;
  /** An array relationship */
  contributions: Array<Contributions>;
  /** An aggregate relationship */
  contributionsAggregate: ContributionsAggregate;
  /** fetch data from the table: "api.github_issues" */
  githubIssues: Array<GithubIssues>;
  /** fetch aggregated fields from the table: "api.github_issues" */
  githubIssuesAggregate: GithubIssuesAggregate;
  /** fetch data from the table: "github_pull_request_commits" */
  githubPullRequestCommits: Array<GithubPullRequestCommits>;
  /** fetch aggregated fields from the table: "github_pull_request_commits" */
  githubPullRequestCommitsAggregate: GithubPullRequestCommitsAggregate;
  /** fetch data from the table: "github_pull_request_commits" using primary key columns */
  githubPullRequestCommitsByPk: Maybe<GithubPullRequestCommits>;
  /** fetch data from the table in a streaming manner: "github_pull_request_commits" */
  githubPullRequestCommitsStream: Array<GithubPullRequestCommits>;
  /** fetch data from the table: "api.github_pull_request_reviews" */
  githubPullRequestReviews: Array<GithubPullRequestReviews>;
  /** fetch aggregated fields from the table: "api.github_pull_request_reviews" */
  githubPullRequestReviewsAggregate: GithubPullRequestReviewsAggregate;
  /** fetch data from the table: "api.github_pull_requests" */
  githubPullRequests: Array<GithubPullRequests>;
  /** fetch aggregated fields from the table: "api.github_pull_requests" */
  githubPullRequestsAggregate: GithubPullRequestsAggregate;
  /** fetch data from the table: "api.github_repos" */
  githubRepos: Array<GithubRepos>;
  /** fetch aggregated fields from the table: "api.github_repos" */
  githubReposAggregate: GithubReposAggregate;
  /** fetch data from the table: "github_users" */
  githubUsers: Array<GithubUsers>;
  /** fetch aggregated fields from the table: "github_users" */
  githubUsersAggregate: GithubUsersAggregate;
  /** fetch data from the table: "github_users" using primary key columns */
  githubUsersByPk: Maybe<GithubUsers>;
  /** fetch data from the table in a streaming manner: "github_users" */
  githubUsersStream: Array<GithubUsers>;
  /** fetch data from the table: "onboardings" */
  onboardings: Array<Onboardings>;
  /** fetch aggregated fields from the table: "onboardings" */
  onboardingsAggregate: OnboardingsAggregate;
  /** fetch data from the table: "onboardings" using primary key columns */
  onboardingsByPk: Maybe<Onboardings>;
  /** fetch data from the table in a streaming manner: "onboardings" */
  onboardingsStream: Array<Onboardings>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk: Maybe<PaymentRequests>;
  /** fetch data from the table in a streaming manner: "payment_requests" */
  paymentRequestsStream: Array<PaymentRequests>;
  /** An array relationship */
  paymentStats: Array<PaymentStats>;
  /** An aggregate relationship */
  paymentStatsAggregate: PaymentStatsAggregate;
  /** fetch data from the table in a streaming manner: "payment_stats" */
  paymentStatsStream: Array<PaymentStats>;
  /** An array relationship */
  payments: Array<Payments>;
  /** An aggregate relationship */
  paymentsAggregate: PaymentsAggregate;
  /** fetch data from the table: "payments" using primary key columns */
  paymentsByPk: Maybe<Payments>;
  /** fetch data from the table in a streaming manner: "payments" */
  paymentsStream: Array<Payments>;
  /** fetch data from the table: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitations: Array<PendingProjectLeaderInvitations>;
  /** fetch aggregated fields from the table: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitationsAggregate: PendingProjectLeaderInvitationsAggregate;
  /** fetch data from the table: "pending_project_leader_invitations" using primary key columns */
  pendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** fetch data from the table in a streaming manner: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitationsStream: Array<PendingProjectLeaderInvitations>;
  /** fetch data from the table: "project_github_repos" */
  projectGithubRepos: Array<ProjectGithubRepos>;
  /** fetch aggregated fields from the table: "project_github_repos" */
  projectGithubReposAggregate: ProjectGithubReposAggregate;
  /** fetch data from the table: "project_github_repos" using primary key columns */
  projectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** fetch data from the table in a streaming manner: "project_github_repos" */
  projectGithubReposStream: Array<ProjectGithubRepos>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectLeadsAggregate: ProjectLeadsAggregate;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk: Maybe<ProjectLeads>;
  /** fetch data from the table in a streaming manner: "project_leads" */
  projectLeadsStream: Array<ProjectLeads>;
  /** fetch data from the table: "api.projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "api.projects" */
  projectsAggregate: ProjectsAggregate;
  /** fetch data from the table: "projects_contributors" */
  projectsContributors: Array<ProjectsContributors>;
  /** fetch aggregated fields from the table: "projects_contributors" */
  projectsContributorsAggregate: ProjectsContributorsAggregate;
  /** fetch data from the table: "projects_contributors" using primary key columns */
  projectsContributorsByPk: Maybe<ProjectsContributors>;
  /** fetch data from the table in a streaming manner: "projects_contributors" */
  projectsContributorsStream: Array<ProjectsContributors>;
  /** fetch data from the table: "projects_pending_contributors" */
  projectsPendingContributors: Array<ProjectsPendingContributors>;
  /** fetch aggregated fields from the table: "projects_pending_contributors" */
  projectsPendingContributorsAggregate: ProjectsPendingContributorsAggregate;
  /** fetch data from the table: "projects_pending_contributors" using primary key columns */
  projectsPendingContributorsByPk: Maybe<ProjectsPendingContributors>;
  /** fetch data from the table in a streaming manner: "projects_pending_contributors" */
  projectsPendingContributorsStream: Array<ProjectsPendingContributors>;
  /** fetch data from the table: "projects_rewarded_users" */
  projectsRewardedUsers: Array<ProjectsRewardedUsers>;
  /** fetch aggregated fields from the table: "projects_rewarded_users" */
  projectsRewardedUsersAggregate: ProjectsRewardedUsersAggregate;
  /** fetch data from the table: "projects_rewarded_users" using primary key columns */
  projectsRewardedUsersByPk: Maybe<ProjectsRewardedUsers>;
  /** fetch data from the table in a streaming manner: "projects_rewarded_users" */
  projectsRewardedUsersStream: Array<ProjectsRewardedUsers>;
  /** fetch data from the table: "projects_sponsors" */
  projectsSponsors: Array<ProjectsSponsors>;
  /** fetch aggregated fields from the table: "projects_sponsors" */
  projectsSponsorsAggregate: ProjectsSponsorsAggregate;
  /** fetch data from the table: "projects_sponsors" using primary key columns */
  projectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** fetch data from the table in a streaming manner: "projects_sponsors" */
  projectsSponsorsStream: Array<ProjectsSponsors>;
  /** fetch data from the table: "registered_users" */
  registeredUsers: Array<RegisteredUsers>;
  /** fetch aggregated fields from the table: "registered_users" */
  registeredUsersAggregate: RegisteredUsersAggregate;
  /** fetch data from the table in a streaming manner: "registered_users" */
  registeredUsersStream: Array<RegisteredUsers>;
  /** fetch data from the table: "sponsors" */
  sponsors: Array<Sponsors>;
  /** fetch aggregated fields from the table: "sponsors" */
  sponsorsAggregate: SponsorsAggregate;
  /** fetch data from the table: "sponsors" using primary key columns */
  sponsorsByPk: Maybe<Sponsors>;
  /** fetch data from the table in a streaming manner: "sponsors" */
  sponsorsStream: Array<Sponsors>;
  /** fetch data from the table: "api.technologies" */
  technologies: Array<Technologies>;
  /** fetch aggregated fields from the table: "api.technologies" */
  technologiesAggregate: TechnologiesAggregate;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_payout_info" */
  userPayoutInfo: Array<UserPayoutInfo>;
  /** fetch aggregated fields from the table: "user_payout_info" */
  userPayoutInfoAggregate: UserPayoutInfoAggregate;
  /** fetch data from the table: "user_payout_info" using primary key columns */
  userPayoutInfoByPk: Maybe<UserPayoutInfo>;
  /** fetch data from the table in a streaming manner: "user_payout_info" */
  userPayoutInfoStream: Array<UserPayoutInfo>;
  /** fetch data from the table: "api.user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "api.user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table in a streaming manner: "auth.users" */
  usersStream: Array<Users>;
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** An aggregate relationship */
  workItemsAggregate: WorkItemsAggregate;
};


export type Subscription_RootCommandsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Commands_StreamCursorInput>>;
  where: InputMaybe<CommandsBoolExp>;
};


export type Subscription_RootContactInformationsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<ContactInformations_StreamCursorInput>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


export type Subscription_RootContributionCountsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<ContributionCounts_StreamCursorInput>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


export type Subscription_RootContributionStatsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<ContributionStats_StreamCursorInput>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


export type Subscription_RootContributionsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Contributions_StreamCursorInput>>;
  where: InputMaybe<ContributionsBoolExp>;
};


export type Subscription_RootGithubIssuesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<GithubIssues_StreamCursorInput>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


export type Subscription_RootGithubPullRequestReviewsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<GithubPullRequestReviews_StreamCursorInput>>;
  where: InputMaybe<GithubPullRequestReviewsBoolExp>;
};


export type Subscription_RootGithubPullRequestsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<GithubPullRequests_StreamCursorInput>>;
  where: InputMaybe<GithubPullRequestsBoolExp>;
};


export type Subscription_RootGithubReposStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<GithubRepos_StreamCursorInput>>;
  where: InputMaybe<GithubReposBoolExp>;
};


export type Subscription_RootProjectsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_StreamCursorInput>>;
  where: InputMaybe<ProjectsBoolExp>;
};


export type Subscription_RootTechnologiesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Technologies_StreamCursorInput>>;
  where: InputMaybe<TechnologiesBoolExp>;
};


export type Subscription_RootUserProfilesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<UserProfiles_StreamCursorInput>>;
  where: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootWorkItemsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<WorkItems_StreamCursorInput>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


export type Subscription_RootApiClosedByPullRequestsArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


export type Subscription_RootApiClosedByPullRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosedByPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosedByPullRequestsOrderBy>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


export type Subscription_RootApiClosedByPullRequestsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Api_Closed_By_Pull_Requests_StreamCursorInput>>;
  where: InputMaybe<ApiClosedByPullRequestsBoolExp>;
};


export type Subscription_RootApiClosingIssuesArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


export type Subscription_RootApiClosingIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiClosingIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiClosingIssuesOrderBy>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


export type Subscription_RootApiClosingIssuesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Api_Closing_Issues_StreamCursorInput>>;
  where: InputMaybe<ApiClosingIssuesBoolExp>;
};


export type Subscription_RootApiCompletedContributionsArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


export type Subscription_RootApiCompletedContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApiCompletedContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApiCompletedContributionsOrderBy>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


export type Subscription_RootApiCompletedContributionsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Api_Completed_Contributions_StreamCursorInput>>;
  where: InputMaybe<ApiCompletedContributionsBoolExp>;
};


export type Subscription_RootApplicationsArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


export type Subscription_RootApplicationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


export type Subscription_RootApplicationsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootApplicationsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Applications_StreamCursorInput>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


export type Subscription_RootAuthProviderArgs = {
  id: Scalars['String'];
};


export type Subscription_RootAuthProviderRequestArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthProviderRequestsArgs = {
  distinctOn: InputMaybe<Array<AuthProviderRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProviderRequestsOrderBy>>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};


export type Subscription_RootAuthProviderRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthProviderRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProviderRequestsOrderBy>>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};


export type Subscription_RootAuthProviderRequestsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthProviderRequests_StreamCursorInput>>;
  where: InputMaybe<AuthProviderRequestsBoolExp>;
};


export type Subscription_RootAuthProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProvidersOrderBy>>;
  where: InputMaybe<AuthProvidersBoolExp>;
};


export type Subscription_RootAuthProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthProvidersOrderBy>>;
  where: InputMaybe<AuthProvidersBoolExp>;
};


export type Subscription_RootAuthProvidersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthProviders_StreamCursorInput>>;
  where: InputMaybe<AuthProvidersBoolExp>;
};


export type Subscription_RootAuthRefreshTokenArgs = {
  refreshToken: Scalars['uuid'];
};


export type Subscription_RootAuthRefreshTokensArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


export type Subscription_RootAuthRefreshTokensAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


export type Subscription_RootAuthRefreshTokensStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthRefreshTokens_StreamCursorInput>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


export type Subscription_RootAuthRoleArgs = {
  role: Scalars['String'];
};


export type Subscription_RootAuthRolesArgs = {
  distinctOn: InputMaybe<Array<AuthRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRolesOrderBy>>;
  where: InputMaybe<AuthRolesBoolExp>;
};


export type Subscription_RootAuthRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRolesOrderBy>>;
  where: InputMaybe<AuthRolesBoolExp>;
};


export type Subscription_RootAuthRolesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthRoles_StreamCursorInput>>;
  where: InputMaybe<AuthRolesBoolExp>;
};


export type Subscription_RootAuthUserGithubProviderArgs = {
  distinctOn: InputMaybe<Array<AuthUserGithubProviderSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserGithubProviderOrderBy>>;
  where: InputMaybe<AuthUserGithubProviderBoolExp>;
};


export type Subscription_RootAuthUserGithubProviderAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserGithubProviderSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserGithubProviderOrderBy>>;
  where: InputMaybe<AuthUserGithubProviderBoolExp>;
};


export type Subscription_RootAuthUserGithubProviderStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Auth_User_Github_Provider_StreamCursorInput>>;
  where: InputMaybe<AuthUserGithubProviderBoolExp>;
};


export type Subscription_RootAuthUserProviderArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


export type Subscription_RootAuthUserProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


export type Subscription_RootAuthUserProvidersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserProviders_StreamCursorInput>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


export type Subscription_RootAuthUserRoleArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserRolesArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


export type Subscription_RootAuthUserRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


export type Subscription_RootAuthUserRolesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserRoles_StreamCursorInput>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


export type Subscription_RootAuthUserSecurityKeyArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootAuthUserSecurityKeysArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


export type Subscription_RootAuthUserSecurityKeysAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


export type Subscription_RootAuthUserSecurityKeysStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<AuthUserSecurityKeys_StreamCursorInput>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


export type Subscription_RootBudgetsArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


export type Subscription_RootBudgetsAggregateArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


export type Subscription_RootBudgetsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootBudgetsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Budgets_StreamCursorInput>>;
  where: InputMaybe<BudgetsBoolExp>;
};


export type Subscription_RootCommandsArgs = {
  distinctOn: InputMaybe<Array<CommandsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<CommandsOrderBy>>;
  where: InputMaybe<CommandsBoolExp>;
};


export type Subscription_RootCommandsAggregateArgs = {
  distinctOn: InputMaybe<Array<CommandsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<CommandsOrderBy>>;
  where: InputMaybe<CommandsBoolExp>;
};


export type Subscription_RootContactInformationsArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


export type Subscription_RootContactInformationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContactInformationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContactInformationsOrderBy>>;
  where: InputMaybe<ContactInformationsBoolExp>;
};


export type Subscription_RootContributionCountsArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


export type Subscription_RootContributionCountsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionCountsOrderBy>>;
  where: InputMaybe<ContributionCountsBoolExp>;
};


export type Subscription_RootContributionStatsArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


export type Subscription_RootContributionStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionStatsOrderBy>>;
  where: InputMaybe<ContributionStatsBoolExp>;
};


export type Subscription_RootContributionsArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


export type Subscription_RootContributionsAggregateArgs = {
  distinctOn: InputMaybe<Array<ContributionsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ContributionsOrderBy>>;
  where: InputMaybe<ContributionsBoolExp>;
};


export type Subscription_RootGithubIssuesArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


export type Subscription_RootGithubIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubIssuesOrderBy>>;
  where: InputMaybe<GithubIssuesBoolExp>;
};


export type Subscription_RootGithubPullRequestCommitsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


export type Subscription_RootGithubPullRequestCommitsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestCommitsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestCommitsOrderBy>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


export type Subscription_RootGithubPullRequestCommitsByPkArgs = {
  pullRequestId: Scalars['bigint'];
  sha: Scalars['String'];
};


export type Subscription_RootGithubPullRequestCommitsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Pull_Request_Commits_StreamCursorInput>>;
  where: InputMaybe<GithubPullRequestCommitsBoolExp>;
};


export type Subscription_RootGithubPullRequestReviewsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestReviewsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestReviewsOrderBy>>;
  where: InputMaybe<GithubPullRequestReviewsBoolExp>;
};


export type Subscription_RootGithubPullRequestReviewsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestReviewsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestReviewsOrderBy>>;
  where: InputMaybe<GithubPullRequestReviewsBoolExp>;
};


export type Subscription_RootGithubPullRequestsArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestsOrderBy>>;
  where: InputMaybe<GithubPullRequestsBoolExp>;
};


export type Subscription_RootGithubPullRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubPullRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubPullRequestsOrderBy>>;
  where: InputMaybe<GithubPullRequestsBoolExp>;
};


export type Subscription_RootGithubReposArgs = {
  distinctOn: InputMaybe<Array<GithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposOrderBy>>;
  where: InputMaybe<GithubReposBoolExp>;
};


export type Subscription_RootGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposOrderBy>>;
  where: InputMaybe<GithubReposBoolExp>;
};


export type Subscription_RootGithubUsersArgs = {
  distinctOn: InputMaybe<Array<GithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubUsersOrderBy>>;
  where: InputMaybe<GithubUsersBoolExp>;
};


export type Subscription_RootGithubUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubUsersOrderBy>>;
  where: InputMaybe<GithubUsersBoolExp>;
};


export type Subscription_RootGithubUsersByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootGithubUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Users_StreamCursorInput>>;
  where: InputMaybe<GithubUsersBoolExp>;
};


export type Subscription_RootOnboardingsArgs = {
  distinctOn: InputMaybe<Array<OnboardingsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<OnboardingsOrderBy>>;
  where: InputMaybe<OnboardingsBoolExp>;
};


export type Subscription_RootOnboardingsAggregateArgs = {
  distinctOn: InputMaybe<Array<OnboardingsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<OnboardingsOrderBy>>;
  where: InputMaybe<OnboardingsBoolExp>;
};


export type Subscription_RootOnboardingsByPkArgs = {
  userId: Scalars['uuid'];
};


export type Subscription_RootOnboardingsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Onboardings_StreamCursorInput>>;
  where: InputMaybe<OnboardingsBoolExp>;
};


export type Subscription_RootPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type Subscription_RootPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type Subscription_RootPaymentRequestsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPaymentRequestsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payment_Requests_StreamCursorInput>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type Subscription_RootPaymentStatsArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


export type Subscription_RootPaymentStatsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentStatsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentStatsOrderBy>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


export type Subscription_RootPaymentStatsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payment_Stats_StreamCursorInput>>;
  where: InputMaybe<PaymentStatsBoolExp>;
};


export type Subscription_RootPaymentsArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


export type Subscription_RootPaymentsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentsOrderBy>>;
  where: InputMaybe<PaymentsBoolExp>;
};


export type Subscription_RootPaymentsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPaymentsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Payments_StreamCursorInput>>;
  where: InputMaybe<PaymentsBoolExp>;
};


export type Subscription_RootPendingProjectLeaderInvitationsArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


export type Subscription_RootPendingProjectLeaderInvitationsAggregateArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


export type Subscription_RootPendingProjectLeaderInvitationsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootPendingProjectLeaderInvitationsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Pending_Project_Leader_Invitations_StreamCursorInput>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


export type Subscription_RootProjectGithubReposArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


export type Subscription_RootProjectGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


export type Subscription_RootProjectGithubReposByPkArgs = {
  githubRepoId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectGithubReposStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Github_Repos_StreamCursorInput>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


export type Subscription_RootProjectLeadsArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


export type Subscription_RootProjectLeadsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


export type Subscription_RootProjectLeadsByPkArgs = {
  projectId: Scalars['uuid'];
  userId: Scalars['uuid'];
};


export type Subscription_RootProjectLeadsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Leads_StreamCursorInput>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


export type Subscription_RootProjectsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsOrderBy>>;
  where: InputMaybe<ProjectsBoolExp>;
};


export type Subscription_RootProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsOrderBy>>;
  where: InputMaybe<ProjectsBoolExp>;
};


export type Subscription_RootProjectsContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


export type Subscription_RootProjectsContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsOrderBy>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


export type Subscription_RootProjectsContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectsContributorsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Contributors_StreamCursorInput>>;
  where: InputMaybe<ProjectsContributorsBoolExp>;
};


export type Subscription_RootProjectsPendingContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


export type Subscription_RootProjectsPendingContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsPendingContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsPendingContributorsOrderBy>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


export type Subscription_RootProjectsPendingContributorsByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectsPendingContributorsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Pending_Contributors_StreamCursorInput>>;
  where: InputMaybe<ProjectsPendingContributorsBoolExp>;
};


export type Subscription_RootProjectsRewardedUsersArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


export type Subscription_RootProjectsRewardedUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsRewardedUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsRewardedUsersOrderBy>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


export type Subscription_RootProjectsRewardedUsersByPkArgs = {
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectsRewardedUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Rewarded_Users_StreamCursorInput>>;
  where: InputMaybe<ProjectsRewardedUsersBoolExp>;
};


export type Subscription_RootProjectsSponsorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


export type Subscription_RootProjectsSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


export type Subscription_RootProjectsSponsorsByPkArgs = {
  projectId: Scalars['uuid'];
  sponsorId: Scalars['uuid'];
};


export type Subscription_RootProjectsSponsorsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Sponsors_StreamCursorInput>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


export type Subscription_RootRegisteredUsersArgs = {
  distinctOn: InputMaybe<Array<RegisteredUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<RegisteredUsersOrderBy>>;
  where: InputMaybe<RegisteredUsersBoolExp>;
};


export type Subscription_RootRegisteredUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<RegisteredUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<RegisteredUsersOrderBy>>;
  where: InputMaybe<RegisteredUsersBoolExp>;
};


export type Subscription_RootRegisteredUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Registered_Users_StreamCursorInput>>;
  where: InputMaybe<RegisteredUsersBoolExp>;
};


export type Subscription_RootSponsorsArgs = {
  distinctOn: InputMaybe<Array<SponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<SponsorsOrderBy>>;
  where: InputMaybe<SponsorsBoolExp>;
};


export type Subscription_RootSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<SponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<SponsorsOrderBy>>;
  where: InputMaybe<SponsorsBoolExp>;
};


export type Subscription_RootSponsorsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootSponsorsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Sponsors_StreamCursorInput>>;
  where: InputMaybe<SponsorsBoolExp>;
};


export type Subscription_RootTechnologiesArgs = {
  distinctOn: InputMaybe<Array<TechnologiesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<TechnologiesOrderBy>>;
  where: InputMaybe<TechnologiesBoolExp>;
};


export type Subscription_RootTechnologiesAggregateArgs = {
  distinctOn: InputMaybe<Array<TechnologiesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<TechnologiesOrderBy>>;
  where: InputMaybe<TechnologiesBoolExp>;
};


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserPayoutInfoArgs = {
  distinctOn: InputMaybe<Array<UserPayoutInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserPayoutInfoOrderBy>>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};


export type Subscription_RootUserPayoutInfoAggregateArgs = {
  distinctOn: InputMaybe<Array<UserPayoutInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserPayoutInfoOrderBy>>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};


export type Subscription_RootUserPayoutInfoByPkArgs = {
  userId: Scalars['uuid'];
};


export type Subscription_RootUserPayoutInfoStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<User_Payout_Info_StreamCursorInput>>;
  where: InputMaybe<UserPayoutInfoBoolExp>;
};


export type Subscription_RootUserProfilesArgs = {
  distinctOn: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserProfilesOrderBy>>;
  where: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootUserProfilesAggregateArgs = {
  distinctOn: InputMaybe<Array<UserProfilesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserProfilesOrderBy>>;
  where: InputMaybe<UserProfilesBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn: InputMaybe<Array<UsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UsersOrderBy>>;
  where: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Users_StreamCursorInput>>;
  where: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootWorkItemsArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};


export type Subscription_RootWorkItemsAggregateArgs = {
  distinctOn: InputMaybe<Array<WorkItemsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<WorkItemsOrderBy>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** Streaming cursor of the table "user_payout_info" */
export type User_Payout_Info_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Payout_Info_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Payout_Info_StreamCursorValueInput = {
  arePayoutSettingsValid: InputMaybe<Scalars['Boolean']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  currentChallenge: Maybe<Scalars['String']>;
  defaultRole: Scalars['String'];
  /** An object relationship */
  defaultRoleByRole: AuthRoles;
  disabled: Scalars['Boolean'];
  displayName: Scalars['String'];
  email: Maybe<Scalars['citext']>;
  emailVerified: Scalars['Boolean'];
  id: Scalars['uuid'];
  isAnonymous: Scalars['Boolean'];
  lastSeen: Maybe<Scalars['timestamptz']>;
  locale: Scalars['String'];
  metadata: Maybe<Scalars['jsonb']>;
  newEmail: Maybe<Scalars['citext']>;
  otpHash: Maybe<Scalars['String']>;
  otpHashExpiresAt: Scalars['timestamptz'];
  otpMethodLastUsed: Maybe<Scalars['String']>;
  passwordHash: Maybe<Scalars['String']>;
  phoneNumber: Maybe<Scalars['String']>;
  phoneNumberVerified: Scalars['Boolean'];
  /** An array relationship */
  refreshTokens: Array<AuthRefreshTokens>;
  /** An aggregate relationship */
  refreshTokensAggregate: AuthRefreshTokensAggregate;
  /** An object relationship */
  registeredUser: Maybe<RegisteredUsers>;
  /** An array relationship */
  roles: Array<AuthUserRoles>;
  /** An aggregate relationship */
  rolesAggregate: AuthUserRolesAggregate;
  /** An array relationship */
  securityKeys: Array<AuthUserSecurityKeys>;
  /** An aggregate relationship */
  securityKeysAggregate: AuthUserSecurityKeysAggregate;
  ticket: Maybe<Scalars['String']>;
  ticketExpiresAt: Scalars['timestamptz'];
  totpSecret: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  userGithubProvider: Maybe<AuthUserGithubProvider>;
  /** An array relationship */
  userProviders: Array<AuthUserProviders>;
  /** An aggregate relationship */
  userProvidersAggregate: AuthUserProvidersAggregate;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMetadataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokensArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRefreshTokensAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthRefreshTokensSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthRefreshTokensOrderBy>>;
  where: InputMaybe<AuthRefreshTokensBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRolesArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersRolesAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserRolesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserRolesOrderBy>>;
  where: InputMaybe<AuthUserRolesBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeysArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersSecurityKeysAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserSecurityKeysSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserSecurityKeysOrderBy>>;
  where: InputMaybe<AuthUserSecurityKeysBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProvidersArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersUserProvidersAggregateArgs = {
  distinctOn: InputMaybe<Array<AuthUserProvidersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthUserProvidersOrderBy>>;
  where: InputMaybe<AuthUserProvidersBoolExp>;
};

/** aggregated selection of "auth.users" */
export type UsersAggregate = {
  __typename?: 'usersAggregate';
  aggregate: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "auth.users" */
export type UsersAggregateFields = {
  __typename?: 'usersAggregateFields';
  count: Scalars['Int'];
  max: Maybe<UsersMaxFields>;
  min: Maybe<UsersMinFields>;
};


/** aggregate fields of "auth.users" */
export type UsersAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "auth.users" */
export type UsersAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Users_Max_Order_By>;
  min: InputMaybe<Users_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UsersAppendInput = {
  metadata: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "auth.users" */
export type UsersArrRelInsertInput = {
  data: Array<UsersInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<UsersOnConflict>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and: InputMaybe<Array<UsersBoolExp>>;
  _not: InputMaybe<UsersBoolExp>;
  _or: InputMaybe<Array<UsersBoolExp>>;
  activeMfaType: InputMaybe<StringComparisonExp>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  currentChallenge: InputMaybe<StringComparisonExp>;
  defaultRole: InputMaybe<StringComparisonExp>;
  defaultRoleByRole: InputMaybe<AuthRolesBoolExp>;
  disabled: InputMaybe<BooleanComparisonExp>;
  displayName: InputMaybe<StringComparisonExp>;
  email: InputMaybe<CitextComparisonExp>;
  emailVerified: InputMaybe<BooleanComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  isAnonymous: InputMaybe<BooleanComparisonExp>;
  lastSeen: InputMaybe<TimestamptzComparisonExp>;
  locale: InputMaybe<StringComparisonExp>;
  metadata: InputMaybe<JsonbComparisonExp>;
  newEmail: InputMaybe<CitextComparisonExp>;
  otpHash: InputMaybe<StringComparisonExp>;
  otpHashExpiresAt: InputMaybe<TimestamptzComparisonExp>;
  otpMethodLastUsed: InputMaybe<StringComparisonExp>;
  passwordHash: InputMaybe<StringComparisonExp>;
  phoneNumber: InputMaybe<StringComparisonExp>;
  phoneNumberVerified: InputMaybe<BooleanComparisonExp>;
  refreshTokens: InputMaybe<AuthRefreshTokensBoolExp>;
  refreshTokens_aggregate: InputMaybe<AuthRefreshTokens_Aggregate_Bool_Exp>;
  registeredUser: InputMaybe<RegisteredUsersBoolExp>;
  roles: InputMaybe<AuthUserRolesBoolExp>;
  roles_aggregate: InputMaybe<AuthUserRoles_Aggregate_Bool_Exp>;
  securityKeys: InputMaybe<AuthUserSecurityKeysBoolExp>;
  securityKeys_aggregate: InputMaybe<AuthUserSecurityKeys_Aggregate_Bool_Exp>;
  ticket: InputMaybe<StringComparisonExp>;
  ticketExpiresAt: InputMaybe<TimestamptzComparisonExp>;
  totpSecret: InputMaybe<StringComparisonExp>;
  updatedAt: InputMaybe<TimestamptzComparisonExp>;
  userGithubProvider: InputMaybe<AuthUserGithubProviderBoolExp>;
  userProviders: InputMaybe<AuthUserProvidersBoolExp>;
  userProviders_aggregate: InputMaybe<AuthUserProviders_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "auth.users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "phone_number" */
  UsersPhoneNumberKey = 'users_phone_number_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UsersDeleteAtPathInput = {
  metadata: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UsersDeleteElemInput = {
  metadata: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UsersDeleteKeyInput = {
  metadata: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "auth.users" */
export type UsersInsertInput = {
  activeMfaType: InputMaybe<Scalars['String']>;
  avatarUrl: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  currentChallenge: InputMaybe<Scalars['String']>;
  defaultRole: InputMaybe<Scalars['String']>;
  defaultRoleByRole: InputMaybe<AuthRolesObjRelInsertInput>;
  disabled: InputMaybe<Scalars['Boolean']>;
  displayName: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  emailVerified: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  isAnonymous: InputMaybe<Scalars['Boolean']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
  locale: InputMaybe<Scalars['String']>;
  metadata: InputMaybe<Scalars['jsonb']>;
  newEmail: InputMaybe<Scalars['citext']>;
  otpHash: InputMaybe<Scalars['String']>;
  otpHashExpiresAt: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed: InputMaybe<Scalars['String']>;
  passwordHash: InputMaybe<Scalars['String']>;
  phoneNumber: InputMaybe<Scalars['String']>;
  phoneNumberVerified: InputMaybe<Scalars['Boolean']>;
  refreshTokens: InputMaybe<AuthRefreshTokensArrRelInsertInput>;
  registeredUser: InputMaybe<RegisteredUsersObjRelInsertInput>;
  roles: InputMaybe<AuthUserRolesArrRelInsertInput>;
  securityKeys: InputMaybe<AuthUserSecurityKeysArrRelInsertInput>;
  ticket: InputMaybe<Scalars['String']>;
  ticketExpiresAt: InputMaybe<Scalars['timestamptz']>;
  totpSecret: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
  userGithubProvider: InputMaybe<AuthUserGithubProviderObjRelInsertInput>;
  userProviders: InputMaybe<AuthUserProvidersArrRelInsertInput>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'usersMaxFields';
  activeMfaType: Maybe<Scalars['String']>;
  avatarUrl: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  currentChallenge: Maybe<Scalars['String']>;
  defaultRole: Maybe<Scalars['String']>;
  displayName: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
  locale: Maybe<Scalars['String']>;
  newEmail: Maybe<Scalars['citext']>;
  otpHash: Maybe<Scalars['String']>;
  otpHashExpiresAt: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed: Maybe<Scalars['String']>;
  passwordHash: Maybe<Scalars['String']>;
  phoneNumber: Maybe<Scalars['String']>;
  ticket: Maybe<Scalars['String']>;
  ticketExpiresAt: Maybe<Scalars['timestamptz']>;
  totpSecret: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'usersMinFields';
  activeMfaType: Maybe<Scalars['String']>;
  avatarUrl: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  currentChallenge: Maybe<Scalars['String']>;
  defaultRole: Maybe<Scalars['String']>;
  displayName: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
  locale: Maybe<Scalars['String']>;
  newEmail: Maybe<Scalars['citext']>;
  otpHash: Maybe<Scalars['String']>;
  otpHashExpiresAt: Maybe<Scalars['timestamptz']>;
  otpMethodLastUsed: Maybe<Scalars['String']>;
  passwordHash: Maybe<Scalars['String']>;
  phoneNumber: Maybe<Scalars['String']>;
  ticket: Maybe<Scalars['String']>;
  ticketExpiresAt: Maybe<Scalars['timestamptz']>;
  totpSecret: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "auth.users" */
export type UsersMutationResponse = {
  __typename?: 'usersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "auth.users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "auth.users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns: Array<UsersUpdateColumn>;
  where: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "auth.users". */
export type UsersOrderBy = {
  activeMfaType: InputMaybe<OrderBy>;
  avatarUrl: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  currentChallenge: InputMaybe<OrderBy>;
  defaultRole: InputMaybe<OrderBy>;
  defaultRoleByRole: InputMaybe<AuthRolesOrderBy>;
  disabled: InputMaybe<OrderBy>;
  displayName: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  emailVerified: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  isAnonymous: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  locale: InputMaybe<OrderBy>;
  metadata: InputMaybe<OrderBy>;
  newEmail: InputMaybe<OrderBy>;
  otpHash: InputMaybe<OrderBy>;
  otpHashExpiresAt: InputMaybe<OrderBy>;
  otpMethodLastUsed: InputMaybe<OrderBy>;
  passwordHash: InputMaybe<OrderBy>;
  phoneNumber: InputMaybe<OrderBy>;
  phoneNumberVerified: InputMaybe<OrderBy>;
  refreshTokensAggregate: InputMaybe<AuthRefreshTokensAggregateOrderBy>;
  registeredUser: InputMaybe<RegisteredUsersOrderBy>;
  rolesAggregate: InputMaybe<AuthUserRolesAggregateOrderBy>;
  securityKeysAggregate: InputMaybe<AuthUserSecurityKeysAggregateOrderBy>;
  ticket: InputMaybe<OrderBy>;
  ticketExpiresAt: InputMaybe<OrderBy>;
  totpSecret: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  userGithubProvider: InputMaybe<AuthUserGithubProviderOrderBy>;
  userProvidersAggregate: InputMaybe<AuthUserProvidersAggregateOrderBy>;
};

/** primary key columns input for table: auth.users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UsersPrependInput = {
  metadata: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "auth.users" */
export enum UsersSelectColumn {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "auth.users" */
export type UsersSetInput = {
  activeMfaType: InputMaybe<Scalars['String']>;
  avatarUrl: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  currentChallenge: InputMaybe<Scalars['String']>;
  defaultRole: InputMaybe<Scalars['String']>;
  disabled: InputMaybe<Scalars['Boolean']>;
  displayName: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  emailVerified: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  isAnonymous: InputMaybe<Scalars['Boolean']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
  locale: InputMaybe<Scalars['String']>;
  metadata: InputMaybe<Scalars['jsonb']>;
  newEmail: InputMaybe<Scalars['citext']>;
  otpHash: InputMaybe<Scalars['String']>;
  otpHashExpiresAt: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed: InputMaybe<Scalars['String']>;
  passwordHash: InputMaybe<Scalars['String']>;
  phoneNumber: InputMaybe<Scalars['String']>;
  phoneNumberVerified: InputMaybe<Scalars['Boolean']>;
  ticket: InputMaybe<Scalars['String']>;
  ticketExpiresAt: InputMaybe<Scalars['timestamptz']>;
  totpSecret: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "auth.users" */
export enum UsersUpdateColumn {
  /** column name */
  ActiveMfaType = 'activeMfaType',
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CurrentChallenge = 'currentChallenge',
  /** column name */
  DefaultRole = 'defaultRole',
  /** column name */
  Disabled = 'disabled',
  /** column name */
  DisplayName = 'displayName',
  /** column name */
  Email = 'email',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  Id = 'id',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  LastSeen = 'lastSeen',
  /** column name */
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  OtpHash = 'otpHash',
  /** column name */
  OtpHashExpiresAt = 'otpHashExpiresAt',
  /** column name */
  OtpMethodLastUsed = 'otpMethodLastUsed',
  /** column name */
  PasswordHash = 'passwordHash',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified',
  /** column name */
  Ticket = 'ticket',
  /** column name */
  TicketExpiresAt = 'ticketExpiresAt',
  /** column name */
  TotpSecret = 'totpSecret',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type UsersUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<UsersAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<UsersDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<UsersDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<UsersDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<UsersPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};

export type Users_Aggregate_Bool_Exp = {
  bool_and: InputMaybe<Users_Aggregate_Bool_Exp_Bool_And>;
  bool_or: InputMaybe<Users_Aggregate_Bool_Exp_Bool_Or>;
  count: InputMaybe<Users_Aggregate_Bool_Exp_Count>;
};

export type Users_Aggregate_Bool_Exp_Bool_And = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<UsersBoolExp>;
  predicate: BooleanComparisonExp;
};

export type Users_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<UsersBoolExp>;
  predicate: BooleanComparisonExp;
};

export type Users_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<UsersSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<UsersBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "auth.users" */
export type Users_Max_Order_By = {
  activeMfaType: InputMaybe<OrderBy>;
  avatarUrl: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  currentChallenge: InputMaybe<OrderBy>;
  defaultRole: InputMaybe<OrderBy>;
  displayName: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  locale: InputMaybe<OrderBy>;
  newEmail: InputMaybe<OrderBy>;
  otpHash: InputMaybe<OrderBy>;
  otpHashExpiresAt: InputMaybe<OrderBy>;
  otpMethodLastUsed: InputMaybe<OrderBy>;
  passwordHash: InputMaybe<OrderBy>;
  phoneNumber: InputMaybe<OrderBy>;
  ticket: InputMaybe<OrderBy>;
  ticketExpiresAt: InputMaybe<OrderBy>;
  totpSecret: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "auth.users" */
export type Users_Min_Order_By = {
  activeMfaType: InputMaybe<OrderBy>;
  avatarUrl: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  currentChallenge: InputMaybe<OrderBy>;
  defaultRole: InputMaybe<OrderBy>;
  displayName: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  locale: InputMaybe<OrderBy>;
  newEmail: InputMaybe<OrderBy>;
  otpHash: InputMaybe<OrderBy>;
  otpHashExpiresAt: InputMaybe<OrderBy>;
  otpMethodLastUsed: InputMaybe<OrderBy>;
  passwordHash: InputMaybe<OrderBy>;
  phoneNumber: InputMaybe<OrderBy>;
  ticket: InputMaybe<OrderBy>;
  ticketExpiresAt: InputMaybe<OrderBy>;
  totpSecret: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

/** select "users_aggregate_bool_exp_bool_and_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** select "users_aggregate_bool_exp_bool_or_arguments_columns" columns of table "auth.users" */
export enum Users_Select_Column_Users_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Disabled = 'disabled',
  /** column name */
  EmailVerified = 'emailVerified',
  /** column name */
  IsAnonymous = 'isAnonymous',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** Streaming cursor of the table "users" */
export type Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_StreamCursorValueInput = {
  activeMfaType: InputMaybe<Scalars['String']>;
  avatarUrl: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  currentChallenge: InputMaybe<Scalars['String']>;
  defaultRole: InputMaybe<Scalars['String']>;
  disabled: InputMaybe<Scalars['Boolean']>;
  displayName: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  emailVerified: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  isAnonymous: InputMaybe<Scalars['Boolean']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
  locale: InputMaybe<Scalars['String']>;
  metadata: InputMaybe<Scalars['jsonb']>;
  newEmail: InputMaybe<Scalars['citext']>;
  otpHash: InputMaybe<Scalars['String']>;
  otpHashExpiresAt: InputMaybe<Scalars['timestamptz']>;
  otpMethodLastUsed: InputMaybe<Scalars['String']>;
  passwordHash: InputMaybe<Scalars['String']>;
  phoneNumber: InputMaybe<Scalars['String']>;
  phoneNumberVerified: InputMaybe<Scalars['Boolean']>;
  ticket: InputMaybe<Scalars['String']>;
  ticketExpiresAt: InputMaybe<Scalars['timestamptz']>;
  totpSecret: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['timestamptz']>;
};

export type UserIdentityQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type UserIdentityQuery = { __typename?: 'query_root', userPayoutInfo: Array<{ __typename?: 'UserPayoutInfo', userId: any, identity: any | null }> };

export type GetUserAvatarUrlQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetUserAvatarUrlQuery = { __typename?: 'query_root', userProfiles: Array<{ __typename?: 'UserProfiles', avatarUrl: string | null, githubUserId: any | null }> };

export type GetPaymentRequestIdsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestIdsQuery = { __typename?: 'query_root', githubUsersByPk: { __typename?: 'GithubUsers', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any }> } | null };

export type GetOnboardingStateQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetOnboardingStateQuery = { __typename?: 'query_root', onboardingsByPk: { __typename?: 'Onboardings', userId: any, termsAndConditionsAcceptanceDate: any | null, profileWizardDisplayDate: any | null } | null };

export type MarkProfileWizardAsDisplayedMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkProfileWizardAsDisplayedMutation = { __typename?: 'mutation_root', markProfileWizardAsDisplayed: any };

export type GetReleaseDateQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReleaseDateQuery = { __typename?: 'query_root', releaseDate: string };

export type ProjectCardFieldsFragment = { __typename?: 'Projects', name: string | null, moreInfoLink: string | null, logoUrl: string | null, shortDescription: string | null, hiring: boolean | null, rank: number | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, projectId: any, user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, githubUserId: any | null, id: any | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any | null, id: any | null } | null }>, sponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } };

export type AcceptProjectLeaderInvitationMutationVariables = Exact<{
  invitationId: Scalars['Uuid'];
}>;


export type AcceptProjectLeaderInvitationMutation = { __typename?: 'mutation_root', acceptProjectLeaderInvitation: boolean };

export type GetProjectLeadInvitationsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectLeadInvitationsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, id: any | null, key: string | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

export type SuggestTechnologyMutationVariables = Exact<{
  suggestion: Scalars['String'];
}>;


export type SuggestTechnologyMutation = { __typename?: 'mutation_root', suggestTechnology: boolean };

export type AllTechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTechnologiesQuery = { __typename?: 'query_root', technologies: Array<{ __typename?: 'Technologies', technology: string | null }> };

export type PaymentRequestDetailsFragment = { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', processedAt: any, receipt: any }>, requestor: { __typename?: 'RegisteredUsers', id: any | null, login: string | null, avatarUrl: string | null, githubUserId: any | null } | null, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, workItems: Array<{ __typename?: 'WorkItems', type: any | null, id: string | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }>, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } };

export type PaymentRequestDetailsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type PaymentRequestDetailsQuery = { __typename?: 'query_root', paymentRequestsByPk: { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', processedAt: any, receipt: any }>, requestor: { __typename?: 'RegisteredUsers', id: any | null, login: string | null, avatarUrl: string | null, githubUserId: any | null } | null, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, workItems: Array<{ __typename?: 'WorkItems', type: any | null, id: string | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }>, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } } | null };

export type CancelPaymentRequestMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
  paymentId: Scalars['Uuid'];
}>;


export type CancelPaymentRequestMutation = { __typename?: 'mutation_root', cancelPaymentRequest: { __typename?: 'Payment', projectId: any, budgetId: any, paymentId: any, amount: any } };

export type ApplicationIdFragment = { __typename?: 'Applications', id: any };

export type ApplicantFragment = { __typename?: 'Applications', applicantId: any, id: any };

export type GithubCodeReviewIdFragment = { __typename?: 'GithubPullRequestReviews', id: string | null };

export type GithubCodeReviewFragment = { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null };

export type GithubIssueIdFragment = { __typename?: 'GithubIssues', id: any | null };

export type GithubIssueFragment = { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null };

export type GithubPullRequestIdFragment = { __typename?: 'GithubPullRequests', id: any | null };

export type GithubPullRequestFragment = { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null };

export type GithubRepoIdFragment = { __typename?: 'GithubRepos', id: any | null };

export type GithubRepoFragment = { __typename?: 'GithubRepos', owner: string | null, name: string | null, description: string | null, stars: number | null, forkCount: number | null, htmlUrl: string | null, languages: any | null, hasIssues: boolean | null, id: any | null };

export type GithubRepoLanguagesFragment = { __typename?: 'GithubRepos', languages: any | null, id: any | null };

export type GithubUserIdFragment = { __typename?: 'GithubUsers', id: any };

export type GithubUserFragment = { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type PaymentRequestIdFragment = { __typename?: 'PaymentRequests', id: any };

export type PaymentRequestFragment = { __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } };

export type ExtendedPaymentRequestFragment = { __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } };

export type ProjectIdFragment = { __typename?: 'Projects', id: any | null, key: string | null };

export type LastProjectMergedPullRequestsFragment = { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null }> }> };

export type ProjectVisibilityDetailsFragment = { __typename?: 'Projects', visibility: any | null, id: any | null, key: string | null, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> };

export type SponsorIdFragment = { __typename?: 'Sponsors', id: any };

export type SponsorFragment = { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any };

export type UserIdFragment = { __typename?: 'RegisteredUsers', id: any | null };

export type ProjectLeadFragment = { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, githubUserId: any | null, id: any | null };

export type UserProfileIdFragment = { __typename?: 'UserProfiles', githubUserId: any | null };

export type MinimalUserProfileFragment = { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, userId: any | null, githubUserId: any | null };

export type UserProfileDetailsFragment = { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, website: string | null, cover: any | null, contactInformations: Array<{ __typename?: 'ContactInformations', channel: any | null, contact: string | null, public: boolean | null }>, contacts: { __typename?: 'Contacts', email: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, telegram: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, twitter: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, discord: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, linkedin: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, whatsapp: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null } };

export type OwnUserProfileDetailsFragment = { __typename?: 'UserProfiles', weeklyAllocatedTime: any | null, lookingForAJob: boolean | null, completionScore: number };

export type WorkItemIdFragment = { __typename?: 'WorkItems', id: string | null };

export type WorkItemFragment = { __typename?: 'WorkItems', type: any | null, id: string | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null };

export type LiveGithubPullRequestIdFragment = { __typename?: 'GithubPullRequest', id: number };

export type LiveGithubPullRequestFragment = { __typename?: 'GithubPullRequest', repoId: number, number: number, status: GithubPullRequestStatus, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: number, author: { __typename?: 'GithubUser', id: number } };

export type LiveGithubIssueIdFragment = { __typename?: 'GithubIssue', id: number };

export type LiveGithubIssueFragment = { __typename?: 'GithubIssue', repoId: number, number: number, status: GithubIssueStatus, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, id: number, author: { __typename?: 'GithubUser', id: number } };

export type LiveGithubUserIdFragment = { __typename?: 'GithubUser', id: number };

export type LiveGithubUserFragment = { __typename?: 'GithubUser', login: string, avatarUrl: any, htmlUrl: any, id: number, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type ImpersonatedUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ImpersonatedUserQuery = { __typename?: 'query_root', user: { __typename?: 'users', id: any, createdAt: any, email: any | null, locale: string, isAnonymous: boolean, defaultRole: string, emailVerified: boolean, phoneNumber: string | null, phoneNumberVerified: boolean, activeMfaType: string | null, roles: Array<{ __typename?: 'authUserRoles', role: string }>, registeredUser: { __typename?: 'RegisteredUsers', id: any | null, githubUserId: any | null, login: string | null, avatarUrl: string | null, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any }> } | null, userGithubProvider: { __typename?: 'AuthUserGithubProvider', accessToken: string | null } | null } | null };

export type GetRegisteredUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetRegisteredUserQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, login: string | null, avatarUrl: string | null, id: any | null }> };

export type ContributionStatFragment = { __typename?: 'ContributionStats', projectId: any | null, maxDate: any | null, minDate: any | null, totalCount: any | null };

export type PaymentStatFragment = { __typename?: 'PaymentStats', projectId: any | null, moneyGranted: any | null };

export type ProfileProjectFragment = { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> };

export type ContributionCountFragment = { __typename?: 'ContributionCounts', year: any | null, week: any | null, codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null };

export type UserProfileFragment = { __typename?: 'UserProfiles', githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, website: string | null, cover: any | null, contributionStats: Array<{ __typename?: 'ContributionStats', projectId: any | null, maxDate: any | null, minDate: any | null, totalCount: any | null }>, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', totalCount: any | null } | null, min: { __typename?: 'ContributionStatsMinFields', minDate: any | null } | null } | null }, paymentStats: Array<{ __typename?: 'PaymentStats', projectId: any | null, moneyGranted: any | null }>, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsContributed: Array<{ __typename?: 'ProjectsContributors', project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, projectsContributedAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, contributionCounts: Array<{ __typename?: 'ContributionCounts', year: any | null, week: any | null, codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null }>, contactInformations: Array<{ __typename?: 'ContactInformations', channel: any | null, contact: string | null, public: boolean | null }>, contacts: { __typename?: 'Contacts', email: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, telegram: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, twitter: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, discord: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, linkedin: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, whatsapp: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null } };

export type UserProfileQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type UserProfileQuery = { __typename?: 'query_root', userProfiles: Array<{ __typename?: 'UserProfiles', githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, website: string | null, cover: any | null, contributionStats: Array<{ __typename?: 'ContributionStats', projectId: any | null, maxDate: any | null, minDate: any | null, totalCount: any | null }>, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', totalCount: any | null } | null, min: { __typename?: 'ContributionStatsMinFields', minDate: any | null } | null } | null }, paymentStats: Array<{ __typename?: 'PaymentStats', projectId: any | null, moneyGranted: any | null }>, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsContributed: Array<{ __typename?: 'ProjectsContributors', project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, projectsContributedAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, contributionCounts: Array<{ __typename?: 'ContributionCounts', year: any | null, week: any | null, codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null }>, contactInformations: Array<{ __typename?: 'ContactInformations', channel: any | null, contact: string | null, public: boolean | null }>, contacts: { __typename?: 'Contacts', email: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, telegram: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, twitter: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, discord: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, linkedin: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, whatsapp: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null } }> };

export type UserProfileByLoginQueryVariables = Exact<{
  githubUserLogin: Scalars['String'];
}>;


export type UserProfileByLoginQuery = { __typename?: 'query_root', userProfiles: Array<{ __typename?: 'UserProfiles', githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, website: string | null, cover: any | null, contributionStats: Array<{ __typename?: 'ContributionStats', projectId: any | null, maxDate: any | null, minDate: any | null, totalCount: any | null }>, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', totalCount: any | null } | null, min: { __typename?: 'ContributionStatsMinFields', minDate: any | null } | null } | null }, paymentStats: Array<{ __typename?: 'PaymentStats', projectId: any | null, moneyGranted: any | null }>, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsContributed: Array<{ __typename?: 'ProjectsContributors', project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, projectsContributedAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, contributionCounts: Array<{ __typename?: 'ContributionCounts', year: any | null, week: any | null, codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null }>, contactInformations: Array<{ __typename?: 'ContactInformations', channel: any | null, contact: string | null, public: boolean | null }>, contacts: { __typename?: 'Contacts', email: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, telegram: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, twitter: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, discord: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, linkedin: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, whatsapp: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null } }> };

export type OwnUserProfileQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type OwnUserProfileQuery = { __typename?: 'query_root', userProfiles: Array<{ __typename?: 'UserProfiles', weeklyAllocatedTime: any | null, lookingForAJob: boolean | null, completionScore: number, githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, website: string | null, cover: any | null, contributionStats: Array<{ __typename?: 'ContributionStats', projectId: any | null, maxDate: any | null, minDate: any | null, totalCount: any | null }>, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', totalCount: any | null } | null, min: { __typename?: 'ContributionStatsMinFields', minDate: any | null } | null } | null }, paymentStats: Array<{ __typename?: 'PaymentStats', projectId: any | null, moneyGranted: any | null }>, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsContributed: Array<{ __typename?: 'ProjectsContributors', project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, projectsContributedAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', logoUrl: string | null, name: string | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null }>, contributionCounts: Array<{ __typename?: 'ContributionCounts', year: any | null, week: any | null, codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null }>, contactInformations: Array<{ __typename?: 'ContactInformations', channel: any | null, contact: string | null, public: boolean | null }>, contacts: { __typename?: 'Contacts', email: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, telegram: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, twitter: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, discord: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, linkedin: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null, whatsapp: { __typename?: 'ContactInformations', contact: string | null, public: boolean | null } | null } }> };

export type UpdateUserProfileMutationVariables = Exact<{
  bio: Scalars['String'];
  contactInformations: Array<Information> | Information;
  languages: Array<Language> | Language;
  location: Scalars['String'];
  lookingForAJob: Scalars['Boolean'];
  website: Scalars['String'];
  weeklyAllocatedTime: AllocatedTime;
  cover: InputMaybe<ProfileCover>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'mutation_root', updateUserProfile: boolean };

export type UserPayoutSettingsFragment = { __typename?: 'UserPayoutInfo', userId: any, identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean };

export type GetUserPayoutSettingsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetUserPayoutSettingsQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, id: any | null, userPayoutInfo: { __typename?: 'UserPayoutInfo', userId: any, identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean } | null }> };

export type UpdatePayoutSettingsMutationVariables = Exact<{
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
}>;


export type UpdatePayoutSettingsMutation = { __typename?: 'mutation_root', updatePayoutInfo: any };

export type ContributorFragment = { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, userId: any | null, githubUserId: any | null, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null, totalCount: any | null } | null } | null }, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsRewardedAggregate: { __typename?: 'ProjectsRewardedUsersAggregate', aggregate: { __typename?: 'ProjectsRewardedUsersAggregateFields', sum: { __typename?: 'ProjectsRewardedUsersSumFields', rewardCount: number | null } | null } | null }, completedUnpaidPullRequestsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidIssuesAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidCodeReviewsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null } };

export type GetProjectContributorsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsQuery = { __typename?: 'query_root', projectsContributors: Array<{ __typename?: 'ProjectsContributors', user: { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, userId: any | null, githubUserId: any | null, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null, totalCount: any | null } | null } | null }, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsRewardedAggregate: { __typename?: 'ProjectsRewardedUsersAggregate', aggregate: { __typename?: 'ProjectsRewardedUsersAggregateFields', sum: { __typename?: 'ProjectsRewardedUsersSumFields', rewardCount: number | null } | null } | null }, completedUnpaidPullRequestsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidIssuesAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidCodeReviewsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null } } | null }> };

export type GetProjectVisibilityDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectVisibilityDetailsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', visibility: any | null, id: any | null, key: string | null, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

export type PendingProjectLeaderInvitationsQueryVariables = Exact<{
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type PendingProjectLeaderInvitationsQuery = { __typename?: 'query_root', pendingProjectLeaderInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, project: { __typename?: 'Projects', id: any | null, key: string | null } | null }> };

export type PendingUserPaymentsQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type PendingUserPaymentsQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, id: any | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }> }> };

export type GetProjectDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectDetailsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any | null, name: string | null, budgets: Array<{ __typename?: 'Budgets', id: any, remainingAmount: any }> }> };

export type GetGithubRepositoryDetailsQueryVariables = Exact<{
  githubRepoId: Scalars['bigint'];
}>;


export type GetGithubRepositoryDetailsQuery = { __typename?: 'query_root', githubRepos: Array<{ __typename?: 'GithubRepos', owner: string | null, name: string | null, description: string | null, stars: number | null, forkCount: number | null, htmlUrl: string | null, languages: any | null, hasIssues: boolean | null, id: any | null }> };

export type GetProjectOverviewDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectOverviewDetailsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, longDescription: string | null, logoUrl: string | null, moreInfoLink: string | null, hiring: boolean | null, visibility: any | null, id: any | null, key: string | null, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', repo: { __typename?: 'GithubRepos', stars: number | null, languages: any | null, id: any | null } | null }>, sponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, contributors: Array<{ __typename?: 'ProjectsContributors', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, projectLeads: Array<{ __typename?: 'ProjectLeads', user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, githubUserId: any | null, id: any | null } | null }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', initialAmount: any | null, spentAmount: any | null } | null } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

export type GetProjectApplicationsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectApplicationsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any | null, key: string | null, applications: Array<{ __typename?: 'Applications', applicantId: any, id: any }> }> };

export type ApplyToProjectMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
}>;


export type ApplyToProjectMutation = { __typename?: 'mutation_root', applyToProject: any };

export type SearchGithubUsersByHandleSubstringQueryVariables = Exact<{
  handleSubstringQuery: Scalars['String'];
}>;


export type SearchGithubUsersByHandleSubstringQuery = { __typename?: 'query_root', searchUsers: Array<{ __typename?: 'GithubUser', login: string, avatarUrl: any, htmlUrl: any, id: number, user: { __typename?: 'RegisteredUsers', id: any | null } | null }> | null };

export type GetProjectPendingContributorsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectPendingContributorsQuery = { __typename?: 'query_root', projectsPendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', user: { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, userId: any | null, githubUserId: any | null, contributionStatsAggregate: { __typename?: 'ContributionStatsAggregate', aggregate: { __typename?: 'ContributionStatsAggregateFields', sum: { __typename?: 'ContributionStatsSumFields', codeReviewCount: any | null, issueCount: any | null, pullRequestCount: any | null, totalCount: any | null } | null } | null }, paymentStatsAggregate: { __typename?: 'PaymentStatsAggregate', aggregate: { __typename?: 'PaymentStatsAggregateFields', sum: { __typename?: 'PaymentStatsSumFields', moneyGranted: any | null } | null } | null }, projectsRewardedAggregate: { __typename?: 'ProjectsRewardedUsersAggregate', aggregate: { __typename?: 'ProjectsRewardedUsersAggregateFields', sum: { __typename?: 'ProjectsRewardedUsersSumFields', rewardCount: number | null } | null } | null }, completedUnpaidPullRequestsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidIssuesAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null }, completedUnpaidCodeReviewsAggregate: { __typename?: 'ApiCompletedContributionsAggregate', aggregate: { __typename?: 'ApiCompletedContributionsAggregateFields', count: number } | null } } | null }> };

export type IgnoreContributionMutationVariables = Exact<{
  contributionId: Scalars['String'];
  projectId: Scalars['Uuid'];
}>;


export type IgnoreContributionMutation = { __typename?: 'mutation_root', ignoreContribution: boolean };

export type UnignoreContributionMutationVariables = Exact<{
  contributionId: Scalars['String'];
  projectId: Scalars['Uuid'];
}>;


export type UnignoreContributionMutation = { __typename?: 'mutation_root', unignoreContribution: boolean };

export type UnrewardedContributionsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
}>;


export type UnrewardedContributionsQuery = { __typename?: 'query_root', contributions: Array<{ __typename?: 'Contributions', type: string | null, status: any | null, repoId: any | null, projectId: any | null, id: string | null, detailsId: string | null, githubUserId: any | null, ignored: boolean | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, commitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, userCommitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, contributorDetails: Array<{ __typename?: 'GithubPullRequestCommits', author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }> };

export type UnrewardedContributionsByTypeQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
  projectId: Scalars['uuid'];
  type: Scalars['String'];
}>;


export type UnrewardedContributionsByTypeQuery = { __typename?: 'query_root', contributions: Array<{ __typename?: 'Contributions', type: string | null, status: any | null, repoId: any | null, projectId: any | null, id: string | null, detailsId: string | null, githubUserId: any | null, ignored: boolean | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, commitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, userCommitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, contributorDetails: Array<{ __typename?: 'GithubPullRequestCommits', author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }> };

export type ContributionFragment = { __typename?: 'Contributions', type: string | null, status: any | null, repoId: any | null, projectId: any | null, id: string | null, detailsId: string | null, githubUserId: any | null, ignored: boolean | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, commitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, userCommitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, contributorDetails: Array<{ __typename?: 'GithubPullRequestCommits', author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null };

export type GithubPullRequestWithCommitsFragment = { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, commitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, userCommitsCount: { __typename?: 'GithubPullRequestCommitsAggregate', aggregate: { __typename?: 'GithubPullRequestCommitsAggregateFields', count: number } | null }, contributorDetails: Array<{ __typename?: 'GithubPullRequestCommits', author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null };

export type SearchIssuesQueryVariables = Exact<{
  projectId: Scalars['uuid'];
  githubUserId: Scalars['jsonb'];
}>;


export type SearchIssuesQuery = { __typename?: 'query_root', githubIssues: Array<{ __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null }> };

export type SearchPullRequestsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
  githubUserId: Scalars['bigint'];
}>;


export type SearchPullRequestsQuery = { __typename?: 'query_root', githubPullRequests: Array<{ __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> };

export type FetchIssueQueryVariables = Exact<{
  repoOwner: Scalars['String'];
  repoName: Scalars['String'];
  issueNumber: Scalars['Int'];
}>;


export type FetchIssueQuery = { __typename?: 'query_root', fetchIssue: { __typename?: 'GithubIssue', repoId: number, number: number, status: GithubIssueStatus, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, id: number, author: { __typename?: 'GithubUser', id: number } } | null };

export type FetchPullRequestQueryVariables = Exact<{
  repoOwner: Scalars['String'];
  repoName: Scalars['String'];
  prNumber: Scalars['Int'];
}>;


export type FetchPullRequestQuery = { __typename?: 'query_root', fetchPullRequest: { __typename?: 'GithubPullRequest', repoId: number, number: number, status: GithubPullRequestStatus, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: number, author: { __typename?: 'GithubUser', id: number } } | null };

export type GetProjectReposQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectReposQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any | null, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', owner: string | null, name: string | null, description: string | null, stars: number | null, forkCount: number | null, htmlUrl: string | null, languages: any | null, hasIssues: boolean | null, id: any | null } | null }> }> };

export type CreateAndCloseIssueMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
  githubRepoId: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateAndCloseIssueMutation = { __typename?: 'mutation_root', createAndCloseIssue: { __typename?: 'GithubIssue', repoId: number, number: number, status: GithubIssueStatus, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, id: number, author: { __typename?: 'GithubUser', id: number } } };

export type GetPaymentRequestsForProjectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetPaymentRequestsForProjectQuery = { __typename?: 'query_root', budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', initialAmount: any | null, remainingAmount: any | null } | null } | null }, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }> };

export type RequestPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  contributorId: Scalars['Int'];
  hoursWorked: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
}>;


export type RequestPaymentMutation = { __typename?: 'mutation_root', requestPayment: { __typename?: 'Payment', projectId: any, budgetId: any, paymentId: any, amount: any } };

export type SidebarProjectDetailsFragment = { __typename?: 'Projects', name: string | null, logoUrl: string | null, id: any | null, key: string | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null } };

export type GetProjectsForSidebarQueryVariables = Exact<{
  ledProjectIds: InputMaybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectsForSidebarQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, logoUrl: string | null, visibility: any | null, id: any | null, key: string | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } }> };

export type GetCurrentProjectForSidebarQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetCurrentProjectForSidebarQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, logoUrl: string | null, visibility: any | null, id: any | null, key: string | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } }> };

export type GetProjectIdFromKeyQueryVariables = Exact<{
  projectKey: Scalars['String'];
}>;


export type GetProjectIdFromKeyQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, shortDescription: string | null, id: any | null, key: string | null }> };

export type GetProjectsQueryVariables = Exact<{
  where: InputMaybe<ProjectsBoolExp>;
  orderBy: InputMaybe<Array<ProjectsOrderBy> | ProjectsOrderBy>;
}>;


export type GetProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', name: string | null, moreInfoLink: string | null, logoUrl: string | null, shortDescription: string | null, hiring: boolean | null, rank: number | null, id: any | null, key: string | null, visibility: any | null, contributorsAggregate: { __typename?: 'ProjectsContributorsAggregate', aggregate: { __typename?: 'ProjectsContributorsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, projectId: any, user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, githubUserId: any | null, id: any | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any | null, id: any | null } | null }>, sponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } }> };

export type GetAllFilterOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFilterOptionsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', visibility: any | null, id: any | null, key: string | null, sponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string } }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any | null, id: any | null } | null }>, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributors', githubUserId: any }>, pendingContributors: Array<{ __typename?: 'ProjectsPendingContributors', githubUserId: any }>, rewardedUsers: Array<{ __typename?: 'ProjectsRewardedUsers', githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

export type MarkInvoiceAsReceivedMutationVariables = Exact<{
  paymentReferences: Array<PaymentReference> | PaymentReference;
}>;


export type MarkInvoiceAsReceivedMutation = { __typename?: 'mutation_root', markInvoiceAsReceived: number };

export type UserPaymentRequestFragment = { __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', type: any | null, id: string | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any | null, name: string | null, shortDescription: string | null, logoUrl: string | null } | null } | null };

export type GetPaymentRequestsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', type: any | null, id: string | null, githubIssue: { __typename?: 'GithubIssues', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, assigneeIds: any | null, status: string | null, createdAt: any | null, closedAt: any | null, commentsCount: any | null, id: any | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null, githubCodeReview: { __typename?: 'GithubPullRequestReviews', status: string | null, outcome: any | null, submittedAt: any | null, id: string | null, reviewer: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, githubPullRequest: { __typename?: 'GithubPullRequests', repoId: any | null, number: any | null, title: string | null, htmlUrl: string | null, status: string | null, createdAt: any | null, closedAt: any | null, mergedAt: any | null, id: any | null, author: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null } | null } | null }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any | null, name: string | null, shortDescription: string | null, logoUrl: string | null } | null } | null }> };

export type AcceptTermsAndConditionsMutationVariables = Exact<{ [key: string]: never; }>;


export type AcceptTermsAndConditionsMutation = { __typename?: 'mutation_root', acceptTermsAndConditions: any };

export type CountProcessingCommandsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type CountProcessingCommandsQuery = { __typename?: 'query_root', commandsAggregate: { __typename?: 'CommandsAggregate', aggregate: { __typename?: 'CommandsAggregateFields', count: number } | null } };

export const ProjectIdFragmentDoc = gql`
    fragment ProjectId on Projects {
  id
  key
}
    `;
export const ProjectVisibilityDetailsFragmentDoc = gql`
    fragment ProjectVisibilityDetails on Projects {
  ...ProjectId
  visibility
  githubReposAggregate {
    aggregate {
      count
    }
  }
  contributors {
    githubUserId
  }
  pendingContributors {
    githubUserId
  }
  rewardedUsers {
    githubUserId
  }
  projectLeads(orderBy: {user: {githubUserId: ASC}}) {
    userId
  }
  budgetsAggregate {
    aggregate {
      count
    }
  }
  pendingInvitations {
    id
    githubUserId
  }
}
    ${ProjectIdFragmentDoc}`;
export const UserIdFragmentDoc = gql`
    fragment UserId on RegisteredUsers {
  id
}
    `;
export const ProjectLeadFragmentDoc = gql`
    fragment ProjectLead on RegisteredUsers {
  ...UserId
  login
  avatarUrl
  githubUserId
}
    ${UserIdFragmentDoc}`;
export const GithubRepoIdFragmentDoc = gql`
    fragment GithubRepoId on GithubRepos {
  id
}
    `;
export const GithubRepoLanguagesFragmentDoc = gql`
    fragment GithubRepoLanguages on GithubRepos {
  ...GithubRepoId
  languages
}
    ${GithubRepoIdFragmentDoc}`;
export const SponsorIdFragmentDoc = gql`
    fragment SponsorId on Sponsors {
  id
}
    `;
export const SponsorFragmentDoc = gql`
    fragment Sponsor on Sponsors {
  ...SponsorId
  name
  logoUrl
  url
}
    ${SponsorIdFragmentDoc}`;
export const ProjectCardFieldsFragmentDoc = gql`
    fragment ProjectCardFields on Projects {
  ...ProjectId
  ...ProjectVisibilityDetails
  contributorsAggregate {
    aggregate {
      count
    }
  }
  name
  moreInfoLink
  logoUrl
  shortDescription
  hiring
  rank
  pendingInvitations {
    id
    githubUserId
  }
  projectLeads(orderBy: {user: {githubUserId: ASC}}) {
    userId
    projectId
    user {
      ...ProjectLead
    }
  }
  githubRepos {
    projectId
    githubRepoId
    repo {
      ...GithubRepoLanguages
    }
  }
  sponsors {
    sponsor {
      ...Sponsor
    }
  }
}
    ${ProjectIdFragmentDoc}
${ProjectVisibilityDetailsFragmentDoc}
${ProjectLeadFragmentDoc}
${GithubRepoLanguagesFragmentDoc}
${SponsorFragmentDoc}`;
export const GithubUserIdFragmentDoc = gql`
    fragment GithubUserId on GithubUsers {
  id
}
    `;
export const GithubUserFragmentDoc = gql`
    fragment GithubUser on GithubUsers {
  ...GithubUserId
  login
  avatarUrl
  htmlUrl
  user {
    id
  }
}
    ${GithubUserIdFragmentDoc}`;
export const WorkItemIdFragmentDoc = gql`
    fragment WorkItemId on WorkItems {
  id
}
    `;
export const GithubIssueIdFragmentDoc = gql`
    fragment GithubIssueId on GithubIssues {
  id
}
    `;
export const GithubIssueFragmentDoc = gql`
    fragment GithubIssue on GithubIssues {
  ...GithubIssueId
  repoId
  number
  title
  htmlUrl
  assigneeIds
  status
  createdAt
  closedAt
  commentsCount
}
    ${GithubIssueIdFragmentDoc}`;
export const GithubPullRequestIdFragmentDoc = gql`
    fragment GithubPullRequestId on GithubPullRequests {
  id
}
    `;
export const GithubPullRequestFragmentDoc = gql`
    fragment GithubPullRequest on GithubPullRequests {
  ...GithubPullRequestId
  repoId
  number
  title
  htmlUrl
  status
  createdAt
  closedAt
  mergedAt
  author {
    ...GithubUser
  }
}
    ${GithubPullRequestIdFragmentDoc}
${GithubUserFragmentDoc}`;
export const GithubCodeReviewIdFragmentDoc = gql`
    fragment GithubCodeReviewId on GithubPullRequestReviews {
  id
}
    `;
export const GithubCodeReviewFragmentDoc = gql`
    fragment GithubCodeReview on GithubPullRequestReviews {
  ...GithubCodeReviewId
  status
  outcome
  submittedAt
  reviewer {
    ...GithubUser
  }
  githubPullRequest {
    ...GithubPullRequest
  }
}
    ${GithubCodeReviewIdFragmentDoc}
${GithubUserFragmentDoc}
${GithubPullRequestFragmentDoc}`;
export const WorkItemFragmentDoc = gql`
    fragment WorkItem on WorkItems {
  ...WorkItemId
  type
  githubIssue {
    ...GithubIssue
  }
  githubPullRequest {
    ...GithubPullRequest
  }
  githubCodeReview {
    ...GithubCodeReview
  }
}
    ${WorkItemIdFragmentDoc}
${GithubIssueFragmentDoc}
${GithubPullRequestFragmentDoc}
${GithubCodeReviewFragmentDoc}`;
export const PaymentRequestDetailsFragmentDoc = gql`
    fragment PaymentRequestDetails on PaymentRequests {
  id
  amountInUsd
  requestedAt
  payments(limit: 1) {
    processedAt
    receipt
  }
  invoiceReceivedAt
  requestor {
    id
    login
    avatarUrl
    githubUserId
  }
  githubRecipient {
    ...GithubUser
  }
  workItems {
    ...WorkItem
  }
  paymentsAggregate {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    ${GithubUserFragmentDoc}
${WorkItemFragmentDoc}`;
export const ApplicationIdFragmentDoc = gql`
    fragment ApplicationId on Applications {
  id
}
    `;
export const ApplicantFragmentDoc = gql`
    fragment Applicant on Applications {
  ...ApplicationId
  applicantId
}
    ${ApplicationIdFragmentDoc}`;
export const GithubRepoFragmentDoc = gql`
    fragment GithubRepo on GithubRepos {
  ...GithubRepoId
  owner
  name
  description
  stars
  forkCount
  htmlUrl
  languages
  hasIssues
}
    ${GithubRepoIdFragmentDoc}`;
export const PaymentRequestIdFragmentDoc = gql`
    fragment PaymentRequestId on PaymentRequests {
  id
}
    `;
export const PaymentRequestFragmentDoc = gql`
    fragment PaymentRequest on PaymentRequests {
  ...PaymentRequestId
  recipientId
  amountInUsd
  workItemsAggregate {
    aggregate {
      count
    }
  }
  requestedAt
}
    ${PaymentRequestIdFragmentDoc}`;
export const ExtendedPaymentRequestFragmentDoc = gql`
    fragment ExtendedPaymentRequest on PaymentRequests {
  ...PaymentRequest
  githubRecipient {
    ...GithubUser
  }
  paymentsAggregate {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    ${PaymentRequestFragmentDoc}
${GithubUserFragmentDoc}`;
export const LastProjectMergedPullRequestsFragmentDoc = gql`
    fragment LastProjectMergedPullRequests on Projects {
  githubRepos {
    projectId
    githubRepoId
    repoIssues(where: {status: {_eq: "Merged"}}) {
      ...GithubIssue
    }
  }
}
    ${GithubIssueFragmentDoc}`;
export const OwnUserProfileDetailsFragmentDoc = gql`
    fragment OwnUserProfileDetails on UserProfiles {
  weeklyAllocatedTime
  lookingForAJob
  completionScore @client
}
    `;
export const LiveGithubPullRequestIdFragmentDoc = gql`
    fragment LiveGithubPullRequestId on GithubPullRequest {
  id
}
    `;
export const LiveGithubPullRequestFragmentDoc = gql`
    fragment LiveGithubPullRequest on GithubPullRequest {
  ...LiveGithubPullRequestId
  repoId
  number
  status
  title
  htmlUrl
  createdAt
  closedAt
  mergedAt
  author {
    id
  }
}
    ${LiveGithubPullRequestIdFragmentDoc}`;
export const LiveGithubIssueIdFragmentDoc = gql`
    fragment LiveGithubIssueId on GithubIssue {
  id
}
    `;
export const LiveGithubIssueFragmentDoc = gql`
    fragment LiveGithubIssue on GithubIssue {
  ...LiveGithubIssueId
  repoId
  number
  status
  title
  htmlUrl
  createdAt
  closedAt
  author {
    id
  }
}
    ${LiveGithubIssueIdFragmentDoc}`;
export const LiveGithubUserIdFragmentDoc = gql`
    fragment LiveGithubUserId on GithubUser {
  id
}
    `;
export const LiveGithubUserFragmentDoc = gql`
    fragment LiveGithubUser on GithubUser {
  ...LiveGithubUserId
  login
  avatarUrl
  htmlUrl
  user {
    id
  }
}
    ${LiveGithubUserIdFragmentDoc}`;
export const UserProfileIdFragmentDoc = gql`
    fragment UserProfileId on UserProfiles {
  githubUserId
}
    `;
export const UserProfileDetailsFragmentDoc = gql`
    fragment UserProfileDetails on UserProfiles {
  login
  avatarUrl
  htmlUrl
  location
  bio
  languages
  createdAt
  lastSeen
  website
  cover
  contactInformations {
    channel
    contact
    public
  }
  contacts @client {
    email {
      contact
      public
    }
    telegram {
      contact
      public
    }
    twitter {
      contact
      public
    }
    discord {
      contact
      public
    }
    linkedin {
      contact
      public
    }
    whatsapp {
      contact
      public
    }
  }
}
    `;
export const ContributionStatFragmentDoc = gql`
    fragment ContributionStat on ContributionStats {
  projectId
  maxDate
  minDate
  totalCount
}
    `;
export const PaymentStatFragmentDoc = gql`
    fragment PaymentStat on PaymentStats {
  projectId
  moneyGranted
}
    `;
export const ProfileProjectFragmentDoc = gql`
    fragment ProfileProject on Projects {
  ...ProjectId
  ...ProjectVisibilityDetails
  logoUrl
  name
  contributorsAggregate {
    aggregate {
      count
    }
  }
  budgetsAggregate {
    aggregate {
      sum {
        spentAmount
      }
    }
  }
}
    ${ProjectIdFragmentDoc}
${ProjectVisibilityDetailsFragmentDoc}`;
export const ContributionCountFragmentDoc = gql`
    fragment ContributionCount on ContributionCounts {
  year
  week
  codeReviewCount
  issueCount
  pullRequestCount
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on UserProfiles {
  ...UserProfileId
  ...UserProfileDetails
  contributionStats {
    ...ContributionStat
  }
  contributionStatsAggregate {
    aggregate {
      sum {
        totalCount
      }
      min {
        minDate
      }
    }
  }
  paymentStats {
    ...PaymentStat
  }
  paymentStatsAggregate {
    aggregate {
      sum {
        moneyGranted
      }
    }
  }
  projectsContributed {
    project {
      ...ProfileProject
    }
  }
  projectsContributedAggregate {
    aggregate {
      count
    }
  }
  projectsLeaded {
    projectId
    assignedAt
    project {
      ...ProfileProject
    }
  }
  contributionCounts(orderBy: [{year: DESC, week: DESC}], limit: 9) {
    ...ContributionCount
  }
}
    ${UserProfileIdFragmentDoc}
${UserProfileDetailsFragmentDoc}
${ContributionStatFragmentDoc}
${PaymentStatFragmentDoc}
${ProfileProjectFragmentDoc}
${ContributionCountFragmentDoc}`;
export const UserPayoutSettingsFragmentDoc = gql`
    fragment UserPayoutSettings on UserPayoutInfo {
  userId
  identity
  location
  payoutSettings
  arePayoutSettingsValid
}
    `;
export const MinimalUserProfileFragmentDoc = gql`
    fragment MinimalUserProfile on UserProfiles {
  ...UserProfileId
  login
  avatarUrl
  userId
}
    ${UserProfileIdFragmentDoc}`;
export const ContributorFragmentDoc = gql`
    fragment Contributor on UserProfiles {
  ...MinimalUserProfile
  contributionStatsAggregate(where: {projectId: {_eq: $projectId}}) {
    aggregate {
      sum {
        codeReviewCount
        issueCount
        pullRequestCount
        totalCount
      }
    }
  }
  paymentStatsAggregate(where: {projectId: {_eq: $projectId}}) {
    aggregate {
      sum {
        moneyGranted
      }
    }
  }
  projectsRewardedAggregate(where: {projectId: {_eq: $projectId}}) {
    aggregate {
      sum {
        rewardCount
      }
    }
  }
  completedUnpaidPullRequestsAggregate: completedContributionsAggregate(
    where: {projectId: {_eq: $projectId}, type: {_eq: "pull_request"}, rewardItems_aggregate: {count: {predicate: {_eq: 0}}}}
  ) {
    aggregate {
      count
    }
  }
  completedUnpaidIssuesAggregate: completedContributionsAggregate(
    where: {projectId: {_eq: $projectId}, type: {_eq: "issue"}, rewardItems_aggregate: {count: {predicate: {_eq: 0}}}}
  ) {
    aggregate {
      count
    }
  }
  completedUnpaidCodeReviewsAggregate: completedContributionsAggregate(
    where: {projectId: {_eq: $projectId}, type: {_eq: "code_review"}, rewardItems_aggregate: {count: {predicate: {_eq: 0}}}}
  ) {
    aggregate {
      count
    }
  }
}
    ${MinimalUserProfileFragmentDoc}`;
export const GithubPullRequestWithCommitsFragmentDoc = gql`
    fragment GithubPullRequestWithCommits on GithubPullRequests {
  ...GithubPullRequest
  commitsCount: commitsAggregate {
    aggregate {
      count
    }
  }
  userCommitsCount: commitsAggregate(where: {authorId: {_eq: $githubUserId}}) {
    aggregate {
      count
    }
  }
  contributorDetails: commits(where: {authorId: {_eq: $githubUserId}}, limit: 1) {
    author {
      ...GithubUser
    }
  }
}
    ${GithubPullRequestFragmentDoc}
${GithubUserFragmentDoc}`;
export const ContributionFragmentDoc = gql`
    fragment Contribution on Contributions {
  type
  status
  repoId
  projectId
  id
  detailsId
  githubUserId
  ignored
  githubIssue {
    ...GithubIssue
  }
  githubPullRequest {
    ...GithubPullRequestWithCommits
  }
  githubCodeReview {
    ...GithubCodeReview
  }
}
    ${GithubIssueFragmentDoc}
${GithubPullRequestWithCommitsFragmentDoc}
${GithubCodeReviewFragmentDoc}`;
export const SidebarProjectDetailsFragmentDoc = gql`
    fragment SidebarProjectDetails on Projects {
  ...ProjectId
  name
  logoUrl
  pendingInvitations {
    id
    githubUserId
  }
  contributorsAggregate {
    aggregate {
      count
    }
  }
}
    ${ProjectIdFragmentDoc}`;
export const UserPaymentRequestFragmentDoc = gql`
    fragment UserPaymentRequest on PaymentRequests {
  id
  requestedAt
  payments {
    amount
    currencyCode
  }
  amountInUsd
  workItems {
    ...WorkItem
  }
  invoiceReceivedAt
  budget {
    id
    project {
      id
      name
      shortDescription
      logoUrl
    }
  }
}
    ${WorkItemFragmentDoc}`;
export const UserIdentityDocument = gql`
    query UserIdentity($userId: uuid!) {
  userPayoutInfo(where: {userId: {_eq: $userId}}) {
    userId
    identity
  }
}
    `;

/**
 * __useUserIdentityQuery__
 *
 * To run a query within a React component, call `useUserIdentityQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserIdentityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserIdentityQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserIdentityQuery(baseOptions: Apollo.QueryHookOptions<UserIdentityQuery, UserIdentityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserIdentityQuery, UserIdentityQueryVariables>(UserIdentityDocument, options);
      }
export function useUserIdentityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserIdentityQuery, UserIdentityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserIdentityQuery, UserIdentityQueryVariables>(UserIdentityDocument, options);
        }
export type UserIdentityQueryHookResult = ReturnType<typeof useUserIdentityQuery>;
export type UserIdentityLazyQueryHookResult = ReturnType<typeof useUserIdentityLazyQuery>;
export type UserIdentityQueryResult = Apollo.QueryResult<UserIdentityQuery, UserIdentityQueryVariables>;
export const GetUserAvatarUrlDocument = gql`
    query getUserAvatarUrl($githubUserId: bigint!) {
  userProfiles(where: {githubUserId: {_eq: $githubUserId}}) {
    ...UserProfileId
    avatarUrl
  }
}
    ${UserProfileIdFragmentDoc}`;

/**
 * __useGetUserAvatarUrlQuery__
 *
 * To run a query within a React component, call `useGetUserAvatarUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAvatarUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAvatarUrlQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetUserAvatarUrlQuery(baseOptions: Apollo.QueryHookOptions<GetUserAvatarUrlQuery, GetUserAvatarUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserAvatarUrlQuery, GetUserAvatarUrlQueryVariables>(GetUserAvatarUrlDocument, options);
      }
export function useGetUserAvatarUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserAvatarUrlQuery, GetUserAvatarUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserAvatarUrlQuery, GetUserAvatarUrlQueryVariables>(GetUserAvatarUrlDocument, options);
        }
export type GetUserAvatarUrlQueryHookResult = ReturnType<typeof useGetUserAvatarUrlQuery>;
export type GetUserAvatarUrlLazyQueryHookResult = ReturnType<typeof useGetUserAvatarUrlLazyQuery>;
export type GetUserAvatarUrlQueryResult = Apollo.QueryResult<GetUserAvatarUrlQuery, GetUserAvatarUrlQueryVariables>;
export const GetPaymentRequestIdsDocument = gql`
    query GetPaymentRequestIds($githubUserId: bigint!) {
  githubUsersByPk(id: $githubUserId) {
    ...GithubUserId
    paymentRequests {
      ...PaymentRequestId
    }
  }
}
    ${GithubUserIdFragmentDoc}
${PaymentRequestIdFragmentDoc}`;

/**
 * __useGetPaymentRequestIdsQuery__
 *
 * To run a query within a React component, call `useGetPaymentRequestIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentRequestIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentRequestIdsQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetPaymentRequestIdsQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentRequestIdsQuery, GetPaymentRequestIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentRequestIdsQuery, GetPaymentRequestIdsQueryVariables>(GetPaymentRequestIdsDocument, options);
      }
export function useGetPaymentRequestIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentRequestIdsQuery, GetPaymentRequestIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentRequestIdsQuery, GetPaymentRequestIdsQueryVariables>(GetPaymentRequestIdsDocument, options);
        }
export type GetPaymentRequestIdsQueryHookResult = ReturnType<typeof useGetPaymentRequestIdsQuery>;
export type GetPaymentRequestIdsLazyQueryHookResult = ReturnType<typeof useGetPaymentRequestIdsLazyQuery>;
export type GetPaymentRequestIdsQueryResult = Apollo.QueryResult<GetPaymentRequestIdsQuery, GetPaymentRequestIdsQueryVariables>;
export const GetOnboardingStateDocument = gql`
    query GetOnboardingState($userId: uuid!) {
  onboardingsByPk(userId: $userId) {
    userId
    termsAndConditionsAcceptanceDate
    profileWizardDisplayDate
  }
}
    `;

/**
 * __useGetOnboardingStateQuery__
 *
 * To run a query within a React component, call `useGetOnboardingStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnboardingStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnboardingStateQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetOnboardingStateQuery(baseOptions: Apollo.QueryHookOptions<GetOnboardingStateQuery, GetOnboardingStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnboardingStateQuery, GetOnboardingStateQueryVariables>(GetOnboardingStateDocument, options);
      }
export function useGetOnboardingStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnboardingStateQuery, GetOnboardingStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnboardingStateQuery, GetOnboardingStateQueryVariables>(GetOnboardingStateDocument, options);
        }
export type GetOnboardingStateQueryHookResult = ReturnType<typeof useGetOnboardingStateQuery>;
export type GetOnboardingStateLazyQueryHookResult = ReturnType<typeof useGetOnboardingStateLazyQuery>;
export type GetOnboardingStateQueryResult = Apollo.QueryResult<GetOnboardingStateQuery, GetOnboardingStateQueryVariables>;
export const MarkProfileWizardAsDisplayedDocument = gql`
    mutation MarkProfileWizardAsDisplayed {
  markProfileWizardAsDisplayed
}
    `;
export type MarkProfileWizardAsDisplayedMutationFn = Apollo.MutationFunction<MarkProfileWizardAsDisplayedMutation, MarkProfileWizardAsDisplayedMutationVariables>;

/**
 * __useMarkProfileWizardAsDisplayedMutation__
 *
 * To run a mutation, you first call `useMarkProfileWizardAsDisplayedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkProfileWizardAsDisplayedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markProfileWizardAsDisplayedMutation, { data, loading, error }] = useMarkProfileWizardAsDisplayedMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkProfileWizardAsDisplayedMutation(baseOptions?: Apollo.MutationHookOptions<MarkProfileWizardAsDisplayedMutation, MarkProfileWizardAsDisplayedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkProfileWizardAsDisplayedMutation, MarkProfileWizardAsDisplayedMutationVariables>(MarkProfileWizardAsDisplayedDocument, options);
      }
export type MarkProfileWizardAsDisplayedMutationHookResult = ReturnType<typeof useMarkProfileWizardAsDisplayedMutation>;
export type MarkProfileWizardAsDisplayedMutationResult = Apollo.MutationResult<MarkProfileWizardAsDisplayedMutation>;
export type MarkProfileWizardAsDisplayedMutationOptions = Apollo.BaseMutationOptions<MarkProfileWizardAsDisplayedMutation, MarkProfileWizardAsDisplayedMutationVariables>;
export const GetReleaseDateDocument = gql`
    query GetReleaseDate {
  releaseDate
}
    `;

/**
 * __useGetReleaseDateQuery__
 *
 * To run a query within a React component, call `useGetReleaseDateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReleaseDateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReleaseDateQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReleaseDateQuery(baseOptions?: Apollo.QueryHookOptions<GetReleaseDateQuery, GetReleaseDateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReleaseDateQuery, GetReleaseDateQueryVariables>(GetReleaseDateDocument, options);
      }
export function useGetReleaseDateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReleaseDateQuery, GetReleaseDateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReleaseDateQuery, GetReleaseDateQueryVariables>(GetReleaseDateDocument, options);
        }
export type GetReleaseDateQueryHookResult = ReturnType<typeof useGetReleaseDateQuery>;
export type GetReleaseDateLazyQueryHookResult = ReturnType<typeof useGetReleaseDateLazyQuery>;
export type GetReleaseDateQueryResult = Apollo.QueryResult<GetReleaseDateQuery, GetReleaseDateQueryVariables>;
export const AcceptProjectLeaderInvitationDocument = gql`
    mutation acceptProjectLeaderInvitation($invitationId: Uuid!) {
  acceptProjectLeaderInvitation(invitationId: $invitationId)
}
    `;
export type AcceptProjectLeaderInvitationMutationFn = Apollo.MutationFunction<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>;

/**
 * __useAcceptProjectLeaderInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptProjectLeaderInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptProjectLeaderInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptProjectLeaderInvitationMutation, { data, loading, error }] = useAcceptProjectLeaderInvitationMutation({
 *   variables: {
 *      invitationId: // value for 'invitationId'
 *   },
 * });
 */
export function useAcceptProjectLeaderInvitationMutation(baseOptions?: Apollo.MutationHookOptions<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>(AcceptProjectLeaderInvitationDocument, options);
      }
export type AcceptProjectLeaderInvitationMutationHookResult = ReturnType<typeof useAcceptProjectLeaderInvitationMutation>;
export type AcceptProjectLeaderInvitationMutationResult = Apollo.MutationResult<AcceptProjectLeaderInvitationMutation>;
export type AcceptProjectLeaderInvitationMutationOptions = Apollo.BaseMutationOptions<AcceptProjectLeaderInvitationMutation, AcceptProjectLeaderInvitationMutationVariables>;
export const GetProjectLeadInvitationsDocument = gql`
    query GetProjectLeadInvitations($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    ...ProjectId
    name
    pendingInvitations {
      id
      githubUserId
    }
  }
}
    ${ProjectIdFragmentDoc}`;

/**
 * __useGetProjectLeadInvitationsQuery__
 *
 * To run a query within a React component, call `useGetProjectLeadInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectLeadInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectLeadInvitationsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectLeadInvitationsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectLeadInvitationsQuery, GetProjectLeadInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectLeadInvitationsQuery, GetProjectLeadInvitationsQueryVariables>(GetProjectLeadInvitationsDocument, options);
      }
export function useGetProjectLeadInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectLeadInvitationsQuery, GetProjectLeadInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectLeadInvitationsQuery, GetProjectLeadInvitationsQueryVariables>(GetProjectLeadInvitationsDocument, options);
        }
export type GetProjectLeadInvitationsQueryHookResult = ReturnType<typeof useGetProjectLeadInvitationsQuery>;
export type GetProjectLeadInvitationsLazyQueryHookResult = ReturnType<typeof useGetProjectLeadInvitationsLazyQuery>;
export type GetProjectLeadInvitationsQueryResult = Apollo.QueryResult<GetProjectLeadInvitationsQuery, GetProjectLeadInvitationsQueryVariables>;
export const SuggestTechnologyDocument = gql`
    mutation SuggestTechnology($suggestion: String!) {
  suggestTechnology(suggestion: $suggestion)
}
    `;
export type SuggestTechnologyMutationFn = Apollo.MutationFunction<SuggestTechnologyMutation, SuggestTechnologyMutationVariables>;

/**
 * __useSuggestTechnologyMutation__
 *
 * To run a mutation, you first call `useSuggestTechnologyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSuggestTechnologyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [suggestTechnologyMutation, { data, loading, error }] = useSuggestTechnologyMutation({
 *   variables: {
 *      suggestion: // value for 'suggestion'
 *   },
 * });
 */
export function useSuggestTechnologyMutation(baseOptions?: Apollo.MutationHookOptions<SuggestTechnologyMutation, SuggestTechnologyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SuggestTechnologyMutation, SuggestTechnologyMutationVariables>(SuggestTechnologyDocument, options);
      }
export type SuggestTechnologyMutationHookResult = ReturnType<typeof useSuggestTechnologyMutation>;
export type SuggestTechnologyMutationResult = Apollo.MutationResult<SuggestTechnologyMutation>;
export type SuggestTechnologyMutationOptions = Apollo.BaseMutationOptions<SuggestTechnologyMutation, SuggestTechnologyMutationVariables>;
export const AllTechnologiesDocument = gql`
    query AllTechnologies {
  technologies {
    technology
  }
}
    `;

/**
 * __useAllTechnologiesQuery__
 *
 * To run a query within a React component, call `useAllTechnologiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTechnologiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTechnologiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTechnologiesQuery(baseOptions?: Apollo.QueryHookOptions<AllTechnologiesQuery, AllTechnologiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTechnologiesQuery, AllTechnologiesQueryVariables>(AllTechnologiesDocument, options);
      }
export function useAllTechnologiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTechnologiesQuery, AllTechnologiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTechnologiesQuery, AllTechnologiesQueryVariables>(AllTechnologiesDocument, options);
        }
export type AllTechnologiesQueryHookResult = ReturnType<typeof useAllTechnologiesQuery>;
export type AllTechnologiesLazyQueryHookResult = ReturnType<typeof useAllTechnologiesLazyQuery>;
export type AllTechnologiesQueryResult = Apollo.QueryResult<AllTechnologiesQuery, AllTechnologiesQueryVariables>;
export const PaymentRequestDetailsDocument = gql`
    query PaymentRequestDetails($id: uuid!) {
  paymentRequestsByPk(id: $id) {
    ...PaymentRequestDetails
  }
}
    ${PaymentRequestDetailsFragmentDoc}`;

/**
 * __usePaymentRequestDetailsQuery__
 *
 * To run a query within a React component, call `usePaymentRequestDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentRequestDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentRequestDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePaymentRequestDetailsQuery(baseOptions: Apollo.QueryHookOptions<PaymentRequestDetailsQuery, PaymentRequestDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentRequestDetailsQuery, PaymentRequestDetailsQueryVariables>(PaymentRequestDetailsDocument, options);
      }
export function usePaymentRequestDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentRequestDetailsQuery, PaymentRequestDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentRequestDetailsQuery, PaymentRequestDetailsQueryVariables>(PaymentRequestDetailsDocument, options);
        }
export type PaymentRequestDetailsQueryHookResult = ReturnType<typeof usePaymentRequestDetailsQuery>;
export type PaymentRequestDetailsLazyQueryHookResult = ReturnType<typeof usePaymentRequestDetailsLazyQuery>;
export type PaymentRequestDetailsQueryResult = Apollo.QueryResult<PaymentRequestDetailsQuery, PaymentRequestDetailsQueryVariables>;
export const CancelPaymentRequestDocument = gql`
    mutation CancelPaymentRequest($projectId: Uuid!, $paymentId: Uuid!) {
  cancelPaymentRequest(projectId: $projectId, paymentId: $paymentId) {
    projectId
    budgetId
    paymentId
    amount
  }
}
    `;
export type CancelPaymentRequestMutationFn = Apollo.MutationFunction<CancelPaymentRequestMutation, CancelPaymentRequestMutationVariables>;

/**
 * __useCancelPaymentRequestMutation__
 *
 * To run a mutation, you first call `useCancelPaymentRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelPaymentRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelPaymentRequestMutation, { data, loading, error }] = useCancelPaymentRequestMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useCancelPaymentRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelPaymentRequestMutation, CancelPaymentRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelPaymentRequestMutation, CancelPaymentRequestMutationVariables>(CancelPaymentRequestDocument, options);
      }
export type CancelPaymentRequestMutationHookResult = ReturnType<typeof useCancelPaymentRequestMutation>;
export type CancelPaymentRequestMutationResult = Apollo.MutationResult<CancelPaymentRequestMutation>;
export type CancelPaymentRequestMutationOptions = Apollo.BaseMutationOptions<CancelPaymentRequestMutation, CancelPaymentRequestMutationVariables>;
export const ImpersonatedUserDocument = gql`
    query ImpersonatedUser($id: uuid!) {
  user(id: $id) {
    id
    createdAt
    email
    locale
    isAnonymous
    defaultRole
    emailVerified
    phoneNumber
    phoneNumberVerified
    activeMfaType
    roles {
      role
    }
    registeredUser {
      id
      githubUserId
      login
      avatarUrl
      projectsLeaded {
        projectId
      }
    }
    userGithubProvider {
      accessToken
    }
  }
}
    `;

/**
 * __useImpersonatedUserQuery__
 *
 * To run a query within a React component, call `useImpersonatedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useImpersonatedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImpersonatedUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImpersonatedUserQuery(baseOptions: Apollo.QueryHookOptions<ImpersonatedUserQuery, ImpersonatedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImpersonatedUserQuery, ImpersonatedUserQueryVariables>(ImpersonatedUserDocument, options);
      }
export function useImpersonatedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImpersonatedUserQuery, ImpersonatedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImpersonatedUserQuery, ImpersonatedUserQueryVariables>(ImpersonatedUserDocument, options);
        }
export type ImpersonatedUserQueryHookResult = ReturnType<typeof useImpersonatedUserQuery>;
export type ImpersonatedUserLazyQueryHookResult = ReturnType<typeof useImpersonatedUserLazyQuery>;
export type ImpersonatedUserQueryResult = Apollo.QueryResult<ImpersonatedUserQuery, ImpersonatedUserQueryVariables>;
export const GetRegisteredUserDocument = gql`
    query GetRegisteredUser($id: uuid!) {
  registeredUsers(where: {id: {_eq: $id}}) {
    ...UserId
    githubUserId
    login
    avatarUrl
  }
}
    ${UserIdFragmentDoc}`;

/**
 * __useGetRegisteredUserQuery__
 *
 * To run a query within a React component, call `useGetRegisteredUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRegisteredUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRegisteredUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRegisteredUserQuery(baseOptions: Apollo.QueryHookOptions<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>(GetRegisteredUserDocument, options);
      }
export function useGetRegisteredUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>(GetRegisteredUserDocument, options);
        }
export type GetRegisteredUserQueryHookResult = ReturnType<typeof useGetRegisteredUserQuery>;
export type GetRegisteredUserLazyQueryHookResult = ReturnType<typeof useGetRegisteredUserLazyQuery>;
export type GetRegisteredUserQueryResult = Apollo.QueryResult<GetRegisteredUserQuery, GetRegisteredUserQueryVariables>;
export const UserProfileDocument = gql`
    query UserProfile($githubUserId: bigint!) {
  userProfiles(where: {githubUserId: {_eq: $githubUserId}}) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useUserProfileQuery(baseOptions: Apollo.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
      }
export function useUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, options);
        }
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = Apollo.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
export const UserProfileByLoginDocument = gql`
    query UserProfileByLogin($githubUserLogin: String!) {
  userProfiles(where: {login: {_ilike: $githubUserLogin}}) {
    ...UserProfile
  }
}
    ${UserProfileFragmentDoc}`;

/**
 * __useUserProfileByLoginQuery__
 *
 * To run a query within a React component, call `useUserProfileByLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileByLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileByLoginQuery({
 *   variables: {
 *      githubUserLogin: // value for 'githubUserLogin'
 *   },
 * });
 */
export function useUserProfileByLoginQuery(baseOptions: Apollo.QueryHookOptions<UserProfileByLoginQuery, UserProfileByLoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProfileByLoginQuery, UserProfileByLoginQueryVariables>(UserProfileByLoginDocument, options);
      }
export function useUserProfileByLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProfileByLoginQuery, UserProfileByLoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProfileByLoginQuery, UserProfileByLoginQueryVariables>(UserProfileByLoginDocument, options);
        }
export type UserProfileByLoginQueryHookResult = ReturnType<typeof useUserProfileByLoginQuery>;
export type UserProfileByLoginLazyQueryHookResult = ReturnType<typeof useUserProfileByLoginLazyQuery>;
export type UserProfileByLoginQueryResult = Apollo.QueryResult<UserProfileByLoginQuery, UserProfileByLoginQueryVariables>;
export const OwnUserProfileDocument = gql`
    query OwnUserProfile($githubUserId: bigint!) {
  userProfiles(where: {githubUserId: {_eq: $githubUserId}}) {
    ...UserProfile
    ...OwnUserProfileDetails
  }
}
    ${UserProfileFragmentDoc}
${OwnUserProfileDetailsFragmentDoc}`;

/**
 * __useOwnUserProfileQuery__
 *
 * To run a query within a React component, call `useOwnUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useOwnUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOwnUserProfileQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useOwnUserProfileQuery(baseOptions: Apollo.QueryHookOptions<OwnUserProfileQuery, OwnUserProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OwnUserProfileQuery, OwnUserProfileQueryVariables>(OwnUserProfileDocument, options);
      }
export function useOwnUserProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OwnUserProfileQuery, OwnUserProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OwnUserProfileQuery, OwnUserProfileQueryVariables>(OwnUserProfileDocument, options);
        }
export type OwnUserProfileQueryHookResult = ReturnType<typeof useOwnUserProfileQuery>;
export type OwnUserProfileLazyQueryHookResult = ReturnType<typeof useOwnUserProfileLazyQuery>;
export type OwnUserProfileQueryResult = Apollo.QueryResult<OwnUserProfileQuery, OwnUserProfileQueryVariables>;
export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($bio: String!, $contactInformations: [Information!]!, $languages: [Language!]!, $location: String!, $lookingForAJob: Boolean!, $website: String!, $weeklyAllocatedTime: AllocatedTime!, $cover: ProfileCover) {
  updateUserProfile(
    bio: $bio
    contactInformations: $contactInformations
    languages: $languages
    location: $location
    lookingForAJob: $lookingForAJob
    website: $website
    weeklyAllocatedTime: $weeklyAllocatedTime
    cover: $cover
  )
}
    `;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      bio: // value for 'bio'
 *      contactInformations: // value for 'contactInformations'
 *      languages: // value for 'languages'
 *      location: // value for 'location'
 *      lookingForAJob: // value for 'lookingForAJob'
 *      website: // value for 'website'
 *      weeklyAllocatedTime: // value for 'weeklyAllocatedTime'
 *      cover: // value for 'cover'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;
export const GetUserPayoutSettingsDocument = gql`
    query GetUserPayoutSettings($githubUserId: bigint!) {
  registeredUsers(where: {githubUserId: {_eq: $githubUserId}}) {
    ...UserId
    githubUserId
    userPayoutInfo {
      ...UserPayoutSettings
    }
  }
}
    ${UserIdFragmentDoc}
${UserPayoutSettingsFragmentDoc}`;

/**
 * __useGetUserPayoutSettingsQuery__
 *
 * To run a query within a React component, call `useGetUserPayoutSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPayoutSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPayoutSettingsQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetUserPayoutSettingsQuery(baseOptions: Apollo.QueryHookOptions<GetUserPayoutSettingsQuery, GetUserPayoutSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserPayoutSettingsQuery, GetUserPayoutSettingsQueryVariables>(GetUserPayoutSettingsDocument, options);
      }
export function useGetUserPayoutSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserPayoutSettingsQuery, GetUserPayoutSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserPayoutSettingsQuery, GetUserPayoutSettingsQueryVariables>(GetUserPayoutSettingsDocument, options);
        }
export type GetUserPayoutSettingsQueryHookResult = ReturnType<typeof useGetUserPayoutSettingsQuery>;
export type GetUserPayoutSettingsLazyQueryHookResult = ReturnType<typeof useGetUserPayoutSettingsLazyQuery>;
export type GetUserPayoutSettingsQueryResult = Apollo.QueryResult<GetUserPayoutSettingsQuery, GetUserPayoutSettingsQueryVariables>;
export const UpdatePayoutSettingsDocument = gql`
    mutation updatePayoutSettings($identity: IdentityInput, $location: Location, $payoutSettings: PayoutSettingsInput) {
  updatePayoutInfo(
    identity: $identity
    location: $location
    payoutSettings: $payoutSettings
  )
}
    `;
export type UpdatePayoutSettingsMutationFn = Apollo.MutationFunction<UpdatePayoutSettingsMutation, UpdatePayoutSettingsMutationVariables>;

/**
 * __useUpdatePayoutSettingsMutation__
 *
 * To run a mutation, you first call `useUpdatePayoutSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePayoutSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePayoutSettingsMutation, { data, loading, error }] = useUpdatePayoutSettingsMutation({
 *   variables: {
 *      identity: // value for 'identity'
 *      location: // value for 'location'
 *      payoutSettings: // value for 'payoutSettings'
 *   },
 * });
 */
export function useUpdatePayoutSettingsMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePayoutSettingsMutation, UpdatePayoutSettingsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePayoutSettingsMutation, UpdatePayoutSettingsMutationVariables>(UpdatePayoutSettingsDocument, options);
      }
export type UpdatePayoutSettingsMutationHookResult = ReturnType<typeof useUpdatePayoutSettingsMutation>;
export type UpdatePayoutSettingsMutationResult = Apollo.MutationResult<UpdatePayoutSettingsMutation>;
export type UpdatePayoutSettingsMutationOptions = Apollo.BaseMutationOptions<UpdatePayoutSettingsMutation, UpdatePayoutSettingsMutationVariables>;
export const GetProjectContributorsDocument = gql`
    query GetProjectContributors($projectId: uuid!) {
  projectsContributors(where: {projectId: {_eq: $projectId}}) {
    user {
      ...Contributor
    }
  }
}
    ${ContributorFragmentDoc}`;

/**
 * __useGetProjectContributorsQuery__
 *
 * To run a query within a React component, call `useGetProjectContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectContributorsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectContributorsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectContributorsQuery, GetProjectContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectContributorsQuery, GetProjectContributorsQueryVariables>(GetProjectContributorsDocument, options);
      }
export function useGetProjectContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectContributorsQuery, GetProjectContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectContributorsQuery, GetProjectContributorsQueryVariables>(GetProjectContributorsDocument, options);
        }
export type GetProjectContributorsQueryHookResult = ReturnType<typeof useGetProjectContributorsQuery>;
export type GetProjectContributorsLazyQueryHookResult = ReturnType<typeof useGetProjectContributorsLazyQuery>;
export type GetProjectContributorsQueryResult = Apollo.QueryResult<GetProjectContributorsQuery, GetProjectContributorsQueryVariables>;
export const GetProjectVisibilityDetailsDocument = gql`
    query GetProjectVisibilityDetails($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    ...ProjectVisibilityDetails
  }
}
    ${ProjectVisibilityDetailsFragmentDoc}`;

/**
 * __useGetProjectVisibilityDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectVisibilityDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectVisibilityDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectVisibilityDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectVisibilityDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectVisibilityDetailsQuery, GetProjectVisibilityDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectVisibilityDetailsQuery, GetProjectVisibilityDetailsQueryVariables>(GetProjectVisibilityDetailsDocument, options);
      }
export function useGetProjectVisibilityDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectVisibilityDetailsQuery, GetProjectVisibilityDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectVisibilityDetailsQuery, GetProjectVisibilityDetailsQueryVariables>(GetProjectVisibilityDetailsDocument, options);
        }
export type GetProjectVisibilityDetailsQueryHookResult = ReturnType<typeof useGetProjectVisibilityDetailsQuery>;
export type GetProjectVisibilityDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectVisibilityDetailsLazyQuery>;
export type GetProjectVisibilityDetailsQueryResult = Apollo.QueryResult<GetProjectVisibilityDetailsQuery, GetProjectVisibilityDetailsQueryVariables>;
export const PendingProjectLeaderInvitationsDocument = gql`
    query PendingProjectLeaderInvitations($githubUserId: bigint) {
  pendingProjectLeaderInvitations(where: {githubUserId: {_eq: $githubUserId}}) {
    id
    project {
      ...ProjectId
    }
  }
}
    ${ProjectIdFragmentDoc}`;

/**
 * __usePendingProjectLeaderInvitationsQuery__
 *
 * To run a query within a React component, call `usePendingProjectLeaderInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingProjectLeaderInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingProjectLeaderInvitationsQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function usePendingProjectLeaderInvitationsQuery(baseOptions?: Apollo.QueryHookOptions<PendingProjectLeaderInvitationsQuery, PendingProjectLeaderInvitationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingProjectLeaderInvitationsQuery, PendingProjectLeaderInvitationsQueryVariables>(PendingProjectLeaderInvitationsDocument, options);
      }
export function usePendingProjectLeaderInvitationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingProjectLeaderInvitationsQuery, PendingProjectLeaderInvitationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingProjectLeaderInvitationsQuery, PendingProjectLeaderInvitationsQueryVariables>(PendingProjectLeaderInvitationsDocument, options);
        }
export type PendingProjectLeaderInvitationsQueryHookResult = ReturnType<typeof usePendingProjectLeaderInvitationsQuery>;
export type PendingProjectLeaderInvitationsLazyQueryHookResult = ReturnType<typeof usePendingProjectLeaderInvitationsLazyQuery>;
export type PendingProjectLeaderInvitationsQueryResult = Apollo.QueryResult<PendingProjectLeaderInvitationsQuery, PendingProjectLeaderInvitationsQueryVariables>;
export const PendingUserPaymentsDocument = gql`
    query PendingUserPayments($userId: uuid!) {
  registeredUsers(where: {id: {_eq: $userId}}) {
    ...UserId
    githubUserId
    paymentRequests {
      ...ExtendedPaymentRequest
    }
  }
}
    ${UserIdFragmentDoc}
${ExtendedPaymentRequestFragmentDoc}`;

/**
 * __usePendingUserPaymentsQuery__
 *
 * To run a query within a React component, call `usePendingUserPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingUserPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingUserPaymentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePendingUserPaymentsQuery(baseOptions: Apollo.QueryHookOptions<PendingUserPaymentsQuery, PendingUserPaymentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingUserPaymentsQuery, PendingUserPaymentsQueryVariables>(PendingUserPaymentsDocument, options);
      }
export function usePendingUserPaymentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingUserPaymentsQuery, PendingUserPaymentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingUserPaymentsQuery, PendingUserPaymentsQueryVariables>(PendingUserPaymentsDocument, options);
        }
export type PendingUserPaymentsQueryHookResult = ReturnType<typeof usePendingUserPaymentsQuery>;
export type PendingUserPaymentsLazyQueryHookResult = ReturnType<typeof usePendingUserPaymentsLazyQuery>;
export type PendingUserPaymentsQueryResult = Apollo.QueryResult<PendingUserPaymentsQuery, PendingUserPaymentsQueryVariables>;
export const GetProjectDetailsDocument = gql`
    query GetProjectDetails($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    id
    name
    budgets {
      id
      remainingAmount
    }
  }
}
    `;

/**
 * __useGetProjectDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options);
      }
export function useGetProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>(GetProjectDetailsDocument, options);
        }
export type GetProjectDetailsQueryHookResult = ReturnType<typeof useGetProjectDetailsQuery>;
export type GetProjectDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectDetailsLazyQuery>;
export type GetProjectDetailsQueryResult = Apollo.QueryResult<GetProjectDetailsQuery, GetProjectDetailsQueryVariables>;
export const GetGithubRepositoryDetailsDocument = gql`
    query GetGithubRepositoryDetails($githubRepoId: bigint!) {
  githubRepos(where: {id: {_eq: $githubRepoId}}) {
    ...GithubRepo
  }
}
    ${GithubRepoFragmentDoc}`;

/**
 * __useGetGithubRepositoryDetailsQuery__
 *
 * To run a query within a React component, call `useGetGithubRepositoryDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGithubRepositoryDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGithubRepositoryDetailsQuery({
 *   variables: {
 *      githubRepoId: // value for 'githubRepoId'
 *   },
 * });
 */
export function useGetGithubRepositoryDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetGithubRepositoryDetailsQuery, GetGithubRepositoryDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGithubRepositoryDetailsQuery, GetGithubRepositoryDetailsQueryVariables>(GetGithubRepositoryDetailsDocument, options);
      }
export function useGetGithubRepositoryDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGithubRepositoryDetailsQuery, GetGithubRepositoryDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGithubRepositoryDetailsQuery, GetGithubRepositoryDetailsQueryVariables>(GetGithubRepositoryDetailsDocument, options);
        }
export type GetGithubRepositoryDetailsQueryHookResult = ReturnType<typeof useGetGithubRepositoryDetailsQuery>;
export type GetGithubRepositoryDetailsLazyQueryHookResult = ReturnType<typeof useGetGithubRepositoryDetailsLazyQuery>;
export type GetGithubRepositoryDetailsQueryResult = Apollo.QueryResult<GetGithubRepositoryDetailsQuery, GetGithubRepositoryDetailsQueryVariables>;
export const GetProjectOverviewDetailsDocument = gql`
    query GetProjectOverviewDetails($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    ...ProjectId
    name
    longDescription
    logoUrl
    moreInfoLink
    hiring
    visibility
    githubRepos {
      repo {
        ...GithubRepoLanguages
        stars
      }
    }
    sponsors {
      sponsor {
        ...Sponsor
      }
    }
    contributors(limit: 3) {
      githubUser {
        ...GithubUser
      }
    }
    contributorsAggregate {
      aggregate {
        count
      }
    }
    projectLeads {
      user {
        ...ProjectLead
      }
    }
    budgetsAggregate {
      aggregate {
        sum {
          initialAmount
          spentAmount
        }
      }
    }
    pendingInvitations {
      id
      githubUserId
    }
  }
}
    ${ProjectIdFragmentDoc}
${GithubRepoLanguagesFragmentDoc}
${SponsorFragmentDoc}
${GithubUserFragmentDoc}
${ProjectLeadFragmentDoc}`;

/**
 * __useGetProjectOverviewDetailsQuery__
 *
 * To run a query within a React component, call `useGetProjectOverviewDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectOverviewDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectOverviewDetailsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectOverviewDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectOverviewDetailsQuery, GetProjectOverviewDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectOverviewDetailsQuery, GetProjectOverviewDetailsQueryVariables>(GetProjectOverviewDetailsDocument, options);
      }
export function useGetProjectOverviewDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectOverviewDetailsQuery, GetProjectOverviewDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectOverviewDetailsQuery, GetProjectOverviewDetailsQueryVariables>(GetProjectOverviewDetailsDocument, options);
        }
export type GetProjectOverviewDetailsQueryHookResult = ReturnType<typeof useGetProjectOverviewDetailsQuery>;
export type GetProjectOverviewDetailsLazyQueryHookResult = ReturnType<typeof useGetProjectOverviewDetailsLazyQuery>;
export type GetProjectOverviewDetailsQueryResult = Apollo.QueryResult<GetProjectOverviewDetailsQuery, GetProjectOverviewDetailsQueryVariables>;
export const GetProjectApplicationsDocument = gql`
    query GetProjectApplications($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    ...ProjectId
    applications {
      ...Applicant
    }
  }
}
    ${ProjectIdFragmentDoc}
${ApplicantFragmentDoc}`;

/**
 * __useGetProjectApplicationsQuery__
 *
 * To run a query within a React component, call `useGetProjectApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectApplicationsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectApplicationsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectApplicationsQuery, GetProjectApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectApplicationsQuery, GetProjectApplicationsQueryVariables>(GetProjectApplicationsDocument, options);
      }
export function useGetProjectApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectApplicationsQuery, GetProjectApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectApplicationsQuery, GetProjectApplicationsQueryVariables>(GetProjectApplicationsDocument, options);
        }
export type GetProjectApplicationsQueryHookResult = ReturnType<typeof useGetProjectApplicationsQuery>;
export type GetProjectApplicationsLazyQueryHookResult = ReturnType<typeof useGetProjectApplicationsLazyQuery>;
export type GetProjectApplicationsQueryResult = Apollo.QueryResult<GetProjectApplicationsQuery, GetProjectApplicationsQueryVariables>;
export const ApplyToProjectDocument = gql`
    mutation ApplyToProject($projectId: Uuid!) {
  applyToProject(projectId: $projectId)
}
    `;
export type ApplyToProjectMutationFn = Apollo.MutationFunction<ApplyToProjectMutation, ApplyToProjectMutationVariables>;

/**
 * __useApplyToProjectMutation__
 *
 * To run a mutation, you first call `useApplyToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApplyToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [applyToProjectMutation, { data, loading, error }] = useApplyToProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useApplyToProjectMutation(baseOptions?: Apollo.MutationHookOptions<ApplyToProjectMutation, ApplyToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApplyToProjectMutation, ApplyToProjectMutationVariables>(ApplyToProjectDocument, options);
      }
export type ApplyToProjectMutationHookResult = ReturnType<typeof useApplyToProjectMutation>;
export type ApplyToProjectMutationResult = Apollo.MutationResult<ApplyToProjectMutation>;
export type ApplyToProjectMutationOptions = Apollo.BaseMutationOptions<ApplyToProjectMutation, ApplyToProjectMutationVariables>;
export const SearchGithubUsersByHandleSubstringDocument = gql`
    query SearchGithubUsersByHandleSubstring($handleSubstringQuery: String!) {
  searchUsers(
    query: $handleSubstringQuery
    sort: "followers"
    order: "desc"
    page: 1
    perPage: 100
  ) {
    ...LiveGithubUser
  }
}
    ${LiveGithubUserFragmentDoc}`;

/**
 * __useSearchGithubUsersByHandleSubstringQuery__
 *
 * To run a query within a React component, call `useSearchGithubUsersByHandleSubstringQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGithubUsersByHandleSubstringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGithubUsersByHandleSubstringQuery({
 *   variables: {
 *      handleSubstringQuery: // value for 'handleSubstringQuery'
 *   },
 * });
 */
export function useSearchGithubUsersByHandleSubstringQuery(baseOptions: Apollo.QueryHookOptions<SearchGithubUsersByHandleSubstringQuery, SearchGithubUsersByHandleSubstringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchGithubUsersByHandleSubstringQuery, SearchGithubUsersByHandleSubstringQueryVariables>(SearchGithubUsersByHandleSubstringDocument, options);
      }
export function useSearchGithubUsersByHandleSubstringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchGithubUsersByHandleSubstringQuery, SearchGithubUsersByHandleSubstringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchGithubUsersByHandleSubstringQuery, SearchGithubUsersByHandleSubstringQueryVariables>(SearchGithubUsersByHandleSubstringDocument, options);
        }
export type SearchGithubUsersByHandleSubstringQueryHookResult = ReturnType<typeof useSearchGithubUsersByHandleSubstringQuery>;
export type SearchGithubUsersByHandleSubstringLazyQueryHookResult = ReturnType<typeof useSearchGithubUsersByHandleSubstringLazyQuery>;
export type SearchGithubUsersByHandleSubstringQueryResult = Apollo.QueryResult<SearchGithubUsersByHandleSubstringQuery, SearchGithubUsersByHandleSubstringQueryVariables>;
export const GetProjectPendingContributorsDocument = gql`
    query GetProjectPendingContributors($projectId: uuid!) {
  projectsPendingContributors(where: {projectId: {_eq: $projectId}}) {
    user {
      ...Contributor
    }
  }
}
    ${ContributorFragmentDoc}`;

/**
 * __useGetProjectPendingContributorsQuery__
 *
 * To run a query within a React component, call `useGetProjectPendingContributorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectPendingContributorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectPendingContributorsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectPendingContributorsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectPendingContributorsQuery, GetProjectPendingContributorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectPendingContributorsQuery, GetProjectPendingContributorsQueryVariables>(GetProjectPendingContributorsDocument, options);
      }
export function useGetProjectPendingContributorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectPendingContributorsQuery, GetProjectPendingContributorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectPendingContributorsQuery, GetProjectPendingContributorsQueryVariables>(GetProjectPendingContributorsDocument, options);
        }
export type GetProjectPendingContributorsQueryHookResult = ReturnType<typeof useGetProjectPendingContributorsQuery>;
export type GetProjectPendingContributorsLazyQueryHookResult = ReturnType<typeof useGetProjectPendingContributorsLazyQuery>;
export type GetProjectPendingContributorsQueryResult = Apollo.QueryResult<GetProjectPendingContributorsQuery, GetProjectPendingContributorsQueryVariables>;
export const IgnoreContributionDocument = gql`
    mutation IgnoreContribution($contributionId: String!, $projectId: Uuid!) {
  ignoreContribution(contributionId: $contributionId, projectId: $projectId)
}
    `;
export type IgnoreContributionMutationFn = Apollo.MutationFunction<IgnoreContributionMutation, IgnoreContributionMutationVariables>;

/**
 * __useIgnoreContributionMutation__
 *
 * To run a mutation, you first call `useIgnoreContributionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIgnoreContributionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ignoreContributionMutation, { data, loading, error }] = useIgnoreContributionMutation({
 *   variables: {
 *      contributionId: // value for 'contributionId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useIgnoreContributionMutation(baseOptions?: Apollo.MutationHookOptions<IgnoreContributionMutation, IgnoreContributionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IgnoreContributionMutation, IgnoreContributionMutationVariables>(IgnoreContributionDocument, options);
      }
export type IgnoreContributionMutationHookResult = ReturnType<typeof useIgnoreContributionMutation>;
export type IgnoreContributionMutationResult = Apollo.MutationResult<IgnoreContributionMutation>;
export type IgnoreContributionMutationOptions = Apollo.BaseMutationOptions<IgnoreContributionMutation, IgnoreContributionMutationVariables>;
export const UnignoreContributionDocument = gql`
    mutation UnignoreContribution($contributionId: String!, $projectId: Uuid!) {
  unignoreContribution(contributionId: $contributionId, projectId: $projectId)
}
    `;
export type UnignoreContributionMutationFn = Apollo.MutationFunction<UnignoreContributionMutation, UnignoreContributionMutationVariables>;

/**
 * __useUnignoreContributionMutation__
 *
 * To run a mutation, you first call `useUnignoreContributionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnignoreContributionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unignoreContributionMutation, { data, loading, error }] = useUnignoreContributionMutation({
 *   variables: {
 *      contributionId: // value for 'contributionId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUnignoreContributionMutation(baseOptions?: Apollo.MutationHookOptions<UnignoreContributionMutation, UnignoreContributionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnignoreContributionMutation, UnignoreContributionMutationVariables>(UnignoreContributionDocument, options);
      }
export type UnignoreContributionMutationHookResult = ReturnType<typeof useUnignoreContributionMutation>;
export type UnignoreContributionMutationResult = Apollo.MutationResult<UnignoreContributionMutation>;
export type UnignoreContributionMutationOptions = Apollo.BaseMutationOptions<UnignoreContributionMutation, UnignoreContributionMutationVariables>;
export const UnrewardedContributionsDocument = gql`
    query UnrewardedContributions($githubUserId: bigint!, $projectId: uuid!) {
  contributions(
    where: {githubUserId: {_eq: $githubUserId}, projectId: {_eq: $projectId}, rewardItems_aggregate: {count: {predicate: {_eq: 0}}}}
  ) {
    ...Contribution
  }
}
    ${ContributionFragmentDoc}`;

/**
 * __useUnrewardedContributionsQuery__
 *
 * To run a query within a React component, call `useUnrewardedContributionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnrewardedContributionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnrewardedContributionsQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useUnrewardedContributionsQuery(baseOptions: Apollo.QueryHookOptions<UnrewardedContributionsQuery, UnrewardedContributionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnrewardedContributionsQuery, UnrewardedContributionsQueryVariables>(UnrewardedContributionsDocument, options);
      }
export function useUnrewardedContributionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnrewardedContributionsQuery, UnrewardedContributionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnrewardedContributionsQuery, UnrewardedContributionsQueryVariables>(UnrewardedContributionsDocument, options);
        }
export type UnrewardedContributionsQueryHookResult = ReturnType<typeof useUnrewardedContributionsQuery>;
export type UnrewardedContributionsLazyQueryHookResult = ReturnType<typeof useUnrewardedContributionsLazyQuery>;
export type UnrewardedContributionsQueryResult = Apollo.QueryResult<UnrewardedContributionsQuery, UnrewardedContributionsQueryVariables>;
export const UnrewardedContributionsByTypeDocument = gql`
    query UnrewardedContributionsByType($githubUserId: bigint!, $projectId: uuid!, $type: String!) {
  contributions(
    where: {githubUserId: {_eq: $githubUserId}, projectId: {_eq: $projectId}, type: {_eq: $type}, rewardItems_aggregate: {count: {predicate: {_eq: 0}}}}
  ) {
    ...Contribution
  }
}
    ${ContributionFragmentDoc}`;

/**
 * __useUnrewardedContributionsByTypeQuery__
 *
 * To run a query within a React component, call `useUnrewardedContributionsByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnrewardedContributionsByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnrewardedContributionsByTypeQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *      projectId: // value for 'projectId'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useUnrewardedContributionsByTypeQuery(baseOptions: Apollo.QueryHookOptions<UnrewardedContributionsByTypeQuery, UnrewardedContributionsByTypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnrewardedContributionsByTypeQuery, UnrewardedContributionsByTypeQueryVariables>(UnrewardedContributionsByTypeDocument, options);
      }
export function useUnrewardedContributionsByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnrewardedContributionsByTypeQuery, UnrewardedContributionsByTypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnrewardedContributionsByTypeQuery, UnrewardedContributionsByTypeQueryVariables>(UnrewardedContributionsByTypeDocument, options);
        }
export type UnrewardedContributionsByTypeQueryHookResult = ReturnType<typeof useUnrewardedContributionsByTypeQuery>;
export type UnrewardedContributionsByTypeLazyQueryHookResult = ReturnType<typeof useUnrewardedContributionsByTypeLazyQuery>;
export type UnrewardedContributionsByTypeQueryResult = Apollo.QueryResult<UnrewardedContributionsByTypeQuery, UnrewardedContributionsByTypeQueryVariables>;
export const SearchIssuesDocument = gql`
    query SearchIssues($projectId: uuid!, $githubUserId: jsonb!) {
  githubIssues(
    where: {repo: {projects: {projectId: {_eq: $projectId}}}, assigneeIds: {_contains: $githubUserId}}
  ) {
    ...GithubIssue
  }
}
    ${GithubIssueFragmentDoc}`;

/**
 * __useSearchIssuesQuery__
 *
 * To run a query within a React component, call `useSearchIssuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchIssuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchIssuesQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useSearchIssuesQuery(baseOptions: Apollo.QueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SearchIssuesDocument, options);
      }
export function useSearchIssuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchIssuesQuery, SearchIssuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchIssuesQuery, SearchIssuesQueryVariables>(SearchIssuesDocument, options);
        }
export type SearchIssuesQueryHookResult = ReturnType<typeof useSearchIssuesQuery>;
export type SearchIssuesLazyQueryHookResult = ReturnType<typeof useSearchIssuesLazyQuery>;
export type SearchIssuesQueryResult = Apollo.QueryResult<SearchIssuesQuery, SearchIssuesQueryVariables>;
export const SearchPullRequestsDocument = gql`
    query SearchPullRequests($projectId: uuid!, $githubUserId: bigint!) {
  githubPullRequests(
    where: {repo: {projects: {projectId: {_eq: $projectId}}}, authorId: {_eq: $githubUserId}}
  ) {
    ...GithubPullRequest
  }
}
    ${GithubPullRequestFragmentDoc}`;

/**
 * __useSearchPullRequestsQuery__
 *
 * To run a query within a React component, call `useSearchPullRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchPullRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchPullRequestsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useSearchPullRequestsQuery(baseOptions: Apollo.QueryHookOptions<SearchPullRequestsQuery, SearchPullRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchPullRequestsQuery, SearchPullRequestsQueryVariables>(SearchPullRequestsDocument, options);
      }
export function useSearchPullRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchPullRequestsQuery, SearchPullRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchPullRequestsQuery, SearchPullRequestsQueryVariables>(SearchPullRequestsDocument, options);
        }
export type SearchPullRequestsQueryHookResult = ReturnType<typeof useSearchPullRequestsQuery>;
export type SearchPullRequestsLazyQueryHookResult = ReturnType<typeof useSearchPullRequestsLazyQuery>;
export type SearchPullRequestsQueryResult = Apollo.QueryResult<SearchPullRequestsQuery, SearchPullRequestsQueryVariables>;
export const FetchIssueDocument = gql`
    query fetchIssue($repoOwner: String!, $repoName: String!, $issueNumber: Int!) {
  fetchIssue(
    repoOwner: $repoOwner
    repoName: $repoName
    issueNumber: $issueNumber
  ) {
    ...LiveGithubIssue
  }
}
    ${LiveGithubIssueFragmentDoc}`;

/**
 * __useFetchIssueQuery__
 *
 * To run a query within a React component, call `useFetchIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchIssueQuery({
 *   variables: {
 *      repoOwner: // value for 'repoOwner'
 *      repoName: // value for 'repoName'
 *      issueNumber: // value for 'issueNumber'
 *   },
 * });
 */
export function useFetchIssueQuery(baseOptions: Apollo.QueryHookOptions<FetchIssueQuery, FetchIssueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchIssueQuery, FetchIssueQueryVariables>(FetchIssueDocument, options);
      }
export function useFetchIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchIssueQuery, FetchIssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchIssueQuery, FetchIssueQueryVariables>(FetchIssueDocument, options);
        }
export type FetchIssueQueryHookResult = ReturnType<typeof useFetchIssueQuery>;
export type FetchIssueLazyQueryHookResult = ReturnType<typeof useFetchIssueLazyQuery>;
export type FetchIssueQueryResult = Apollo.QueryResult<FetchIssueQuery, FetchIssueQueryVariables>;
export const FetchPullRequestDocument = gql`
    query fetchPullRequest($repoOwner: String!, $repoName: String!, $prNumber: Int!) {
  fetchPullRequest(
    repoOwner: $repoOwner
    repoName: $repoName
    prNumber: $prNumber
  ) {
    ...LiveGithubPullRequest
  }
}
    ${LiveGithubPullRequestFragmentDoc}`;

/**
 * __useFetchPullRequestQuery__
 *
 * To run a query within a React component, call `useFetchPullRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchPullRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchPullRequestQuery({
 *   variables: {
 *      repoOwner: // value for 'repoOwner'
 *      repoName: // value for 'repoName'
 *      prNumber: // value for 'prNumber'
 *   },
 * });
 */
export function useFetchPullRequestQuery(baseOptions: Apollo.QueryHookOptions<FetchPullRequestQuery, FetchPullRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchPullRequestQuery, FetchPullRequestQueryVariables>(FetchPullRequestDocument, options);
      }
export function useFetchPullRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchPullRequestQuery, FetchPullRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchPullRequestQuery, FetchPullRequestQueryVariables>(FetchPullRequestDocument, options);
        }
export type FetchPullRequestQueryHookResult = ReturnType<typeof useFetchPullRequestQuery>;
export type FetchPullRequestLazyQueryHookResult = ReturnType<typeof useFetchPullRequestLazyQuery>;
export type FetchPullRequestQueryResult = Apollo.QueryResult<FetchPullRequestQuery, FetchPullRequestQueryVariables>;
export const GetProjectReposDocument = gql`
    query GetProjectRepos($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    id
    githubRepos {
      projectId
      githubRepoId
      repo {
        ...GithubRepo
      }
    }
  }
}
    ${GithubRepoFragmentDoc}`;

/**
 * __useGetProjectReposQuery__
 *
 * To run a query within a React component, call `useGetProjectReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectReposQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectReposQuery(baseOptions: Apollo.QueryHookOptions<GetProjectReposQuery, GetProjectReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectReposQuery, GetProjectReposQueryVariables>(GetProjectReposDocument, options);
      }
export function useGetProjectReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectReposQuery, GetProjectReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectReposQuery, GetProjectReposQueryVariables>(GetProjectReposDocument, options);
        }
export type GetProjectReposQueryHookResult = ReturnType<typeof useGetProjectReposQuery>;
export type GetProjectReposLazyQueryHookResult = ReturnType<typeof useGetProjectReposLazyQuery>;
export type GetProjectReposQueryResult = Apollo.QueryResult<GetProjectReposQuery, GetProjectReposQueryVariables>;
export const CreateAndCloseIssueDocument = gql`
    mutation CreateAndCloseIssue($projectId: Uuid!, $githubRepoId: Int!, $title: String!, $description: String!) {
  createAndCloseIssue(
    projectId: $projectId
    githubRepoId: $githubRepoId
    title: $title
    description: $description
  ) {
    ...LiveGithubIssue
  }
}
    ${LiveGithubIssueFragmentDoc}`;
export type CreateAndCloseIssueMutationFn = Apollo.MutationFunction<CreateAndCloseIssueMutation, CreateAndCloseIssueMutationVariables>;

/**
 * __useCreateAndCloseIssueMutation__
 *
 * To run a mutation, you first call `useCreateAndCloseIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAndCloseIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAndCloseIssueMutation, { data, loading, error }] = useCreateAndCloseIssueMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubRepoId: // value for 'githubRepoId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateAndCloseIssueMutation(baseOptions?: Apollo.MutationHookOptions<CreateAndCloseIssueMutation, CreateAndCloseIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAndCloseIssueMutation, CreateAndCloseIssueMutationVariables>(CreateAndCloseIssueDocument, options);
      }
export type CreateAndCloseIssueMutationHookResult = ReturnType<typeof useCreateAndCloseIssueMutation>;
export type CreateAndCloseIssueMutationResult = Apollo.MutationResult<CreateAndCloseIssueMutation>;
export type CreateAndCloseIssueMutationOptions = Apollo.BaseMutationOptions<CreateAndCloseIssueMutation, CreateAndCloseIssueMutationVariables>;
export const GetPaymentRequestsForProjectDocument = gql`
    query GetPaymentRequestsForProject($projectId: uuid!) {
  budgetsAggregate(where: {projectId: {_eq: $projectId}}) {
    aggregate {
      sum {
        initialAmount
        remainingAmount
      }
    }
  }
  paymentRequests(where: {budget: {projectId: {_eq: $projectId}}}) {
    ...ExtendedPaymentRequest
  }
}
    ${ExtendedPaymentRequestFragmentDoc}`;

/**
 * __useGetPaymentRequestsForProjectQuery__
 *
 * To run a query within a React component, call `useGetPaymentRequestsForProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentRequestsForProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentRequestsForProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetPaymentRequestsForProjectQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentRequestsForProjectQuery, GetPaymentRequestsForProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentRequestsForProjectQuery, GetPaymentRequestsForProjectQueryVariables>(GetPaymentRequestsForProjectDocument, options);
      }
export function useGetPaymentRequestsForProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentRequestsForProjectQuery, GetPaymentRequestsForProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentRequestsForProjectQuery, GetPaymentRequestsForProjectQueryVariables>(GetPaymentRequestsForProjectDocument, options);
        }
export type GetPaymentRequestsForProjectQueryHookResult = ReturnType<typeof useGetPaymentRequestsForProjectQuery>;
export type GetPaymentRequestsForProjectLazyQueryHookResult = ReturnType<typeof useGetPaymentRequestsForProjectLazyQuery>;
export type GetPaymentRequestsForProjectQueryResult = Apollo.QueryResult<GetPaymentRequestsForProjectQuery, GetPaymentRequestsForProjectQueryVariables>;
export const RequestPaymentDocument = gql`
    mutation RequestPayment($amount: Int!, $contributorId: Int!, $hoursWorked: Int!, $projectId: Uuid!, $reason: Reason!) {
  requestPayment(
    amountInUsd: $amount
    hoursWorked: $hoursWorked
    projectId: $projectId
    reason: $reason
    recipientId: $contributorId
  ) {
    projectId
    budgetId
    paymentId
    amount
  }
}
    `;
export type RequestPaymentMutationFn = Apollo.MutationFunction<RequestPaymentMutation, RequestPaymentMutationVariables>;

/**
 * __useRequestPaymentMutation__
 *
 * To run a mutation, you first call `useRequestPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestPaymentMutation, { data, loading, error }] = useRequestPaymentMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      contributorId: // value for 'contributorId'
 *      hoursWorked: // value for 'hoursWorked'
 *      projectId: // value for 'projectId'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useRequestPaymentMutation(baseOptions?: Apollo.MutationHookOptions<RequestPaymentMutation, RequestPaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestPaymentMutation, RequestPaymentMutationVariables>(RequestPaymentDocument, options);
      }
export type RequestPaymentMutationHookResult = ReturnType<typeof useRequestPaymentMutation>;
export type RequestPaymentMutationResult = Apollo.MutationResult<RequestPaymentMutation>;
export type RequestPaymentMutationOptions = Apollo.BaseMutationOptions<RequestPaymentMutation, RequestPaymentMutationVariables>;
export const GetProjectsForSidebarDocument = gql`
    query GetProjectsForSidebar($ledProjectIds: [uuid!], $githubUserId: bigint) {
  projects(
    where: {_or: [{id: {_in: $ledProjectIds}}, {pendingInvitations: {githubUserId: {_eq: $githubUserId}}}]}
  ) {
    ...SidebarProjectDetails
    ...ProjectVisibilityDetails
  }
}
    ${SidebarProjectDetailsFragmentDoc}
${ProjectVisibilityDetailsFragmentDoc}`;

/**
 * __useGetProjectsForSidebarQuery__
 *
 * To run a query within a React component, call `useGetProjectsForSidebarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsForSidebarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsForSidebarQuery({
 *   variables: {
 *      ledProjectIds: // value for 'ledProjectIds'
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetProjectsForSidebarQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsForSidebarQuery, GetProjectsForSidebarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsForSidebarQuery, GetProjectsForSidebarQueryVariables>(GetProjectsForSidebarDocument, options);
      }
export function useGetProjectsForSidebarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsForSidebarQuery, GetProjectsForSidebarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsForSidebarQuery, GetProjectsForSidebarQueryVariables>(GetProjectsForSidebarDocument, options);
        }
export type GetProjectsForSidebarQueryHookResult = ReturnType<typeof useGetProjectsForSidebarQuery>;
export type GetProjectsForSidebarLazyQueryHookResult = ReturnType<typeof useGetProjectsForSidebarLazyQuery>;
export type GetProjectsForSidebarQueryResult = Apollo.QueryResult<GetProjectsForSidebarQuery, GetProjectsForSidebarQueryVariables>;
export const GetCurrentProjectForSidebarDocument = gql`
    query GetCurrentProjectForSidebar($projectId: uuid!) {
  projects(where: {id: {_eq: $projectId}}) {
    ...SidebarProjectDetails
    ...ProjectVisibilityDetails
  }
}
    ${SidebarProjectDetailsFragmentDoc}
${ProjectVisibilityDetailsFragmentDoc}`;

/**
 * __useGetCurrentProjectForSidebarQuery__
 *
 * To run a query within a React component, call `useGetCurrentProjectForSidebarQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentProjectForSidebarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentProjectForSidebarQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetCurrentProjectForSidebarQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentProjectForSidebarQuery, GetCurrentProjectForSidebarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentProjectForSidebarQuery, GetCurrentProjectForSidebarQueryVariables>(GetCurrentProjectForSidebarDocument, options);
      }
export function useGetCurrentProjectForSidebarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentProjectForSidebarQuery, GetCurrentProjectForSidebarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentProjectForSidebarQuery, GetCurrentProjectForSidebarQueryVariables>(GetCurrentProjectForSidebarDocument, options);
        }
export type GetCurrentProjectForSidebarQueryHookResult = ReturnType<typeof useGetCurrentProjectForSidebarQuery>;
export type GetCurrentProjectForSidebarLazyQueryHookResult = ReturnType<typeof useGetCurrentProjectForSidebarLazyQuery>;
export type GetCurrentProjectForSidebarQueryResult = Apollo.QueryResult<GetCurrentProjectForSidebarQuery, GetCurrentProjectForSidebarQueryVariables>;
export const GetProjectIdFromKeyDocument = gql`
    query GetProjectIdFromKey($projectKey: String!) {
  projects(where: {key: {_eq: $projectKey}}) {
    ...ProjectId
    name
    shortDescription
  }
}
    ${ProjectIdFragmentDoc}`;

/**
 * __useGetProjectIdFromKeyQuery__
 *
 * To run a query within a React component, call `useGetProjectIdFromKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectIdFromKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectIdFromKeyQuery({
 *   variables: {
 *      projectKey: // value for 'projectKey'
 *   },
 * });
 */
export function useGetProjectIdFromKeyQuery(baseOptions: Apollo.QueryHookOptions<GetProjectIdFromKeyQuery, GetProjectIdFromKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectIdFromKeyQuery, GetProjectIdFromKeyQueryVariables>(GetProjectIdFromKeyDocument, options);
      }
export function useGetProjectIdFromKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectIdFromKeyQuery, GetProjectIdFromKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectIdFromKeyQuery, GetProjectIdFromKeyQueryVariables>(GetProjectIdFromKeyDocument, options);
        }
export type GetProjectIdFromKeyQueryHookResult = ReturnType<typeof useGetProjectIdFromKeyQuery>;
export type GetProjectIdFromKeyLazyQueryHookResult = ReturnType<typeof useGetProjectIdFromKeyLazyQuery>;
export type GetProjectIdFromKeyQueryResult = Apollo.QueryResult<GetProjectIdFromKeyQuery, GetProjectIdFromKeyQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects($where: ProjectsBoolExp, $orderBy: [ProjectsOrderBy!]) {
  projects(where: $where, orderBy: $orderBy) {
    ...ProjectCardFields
  }
}
    ${ProjectCardFieldsFragmentDoc}`;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const GetAllFilterOptionsDocument = gql`
    query GetAllFilterOptions {
  projects {
    ...ProjectVisibilityDetails
    sponsors {
      sponsor {
        id
        name
      }
    }
    githubRepos {
      projectId
      githubRepoId
      repo {
        ...GithubRepoLanguages
      }
    }
  }
}
    ${ProjectVisibilityDetailsFragmentDoc}
${GithubRepoLanguagesFragmentDoc}`;

/**
 * __useGetAllFilterOptionsQuery__
 *
 * To run a query within a React component, call `useGetAllFilterOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFilterOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFilterOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllFilterOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllFilterOptionsQuery, GetAllFilterOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllFilterOptionsQuery, GetAllFilterOptionsQueryVariables>(GetAllFilterOptionsDocument, options);
      }
export function useGetAllFilterOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllFilterOptionsQuery, GetAllFilterOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllFilterOptionsQuery, GetAllFilterOptionsQueryVariables>(GetAllFilterOptionsDocument, options);
        }
export type GetAllFilterOptionsQueryHookResult = ReturnType<typeof useGetAllFilterOptionsQuery>;
export type GetAllFilterOptionsLazyQueryHookResult = ReturnType<typeof useGetAllFilterOptionsLazyQuery>;
export type GetAllFilterOptionsQueryResult = Apollo.QueryResult<GetAllFilterOptionsQuery, GetAllFilterOptionsQueryVariables>;
export const MarkInvoiceAsReceivedDocument = gql`
    mutation markInvoiceAsReceived($paymentReferences: [PaymentReference!]!) {
  markInvoiceAsReceived(paymentReferences: $paymentReferences)
}
    `;
export type MarkInvoiceAsReceivedMutationFn = Apollo.MutationFunction<MarkInvoiceAsReceivedMutation, MarkInvoiceAsReceivedMutationVariables>;

/**
 * __useMarkInvoiceAsReceivedMutation__
 *
 * To run a mutation, you first call `useMarkInvoiceAsReceivedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkInvoiceAsReceivedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markInvoiceAsReceivedMutation, { data, loading, error }] = useMarkInvoiceAsReceivedMutation({
 *   variables: {
 *      paymentReferences: // value for 'paymentReferences'
 *   },
 * });
 */
export function useMarkInvoiceAsReceivedMutation(baseOptions?: Apollo.MutationHookOptions<MarkInvoiceAsReceivedMutation, MarkInvoiceAsReceivedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkInvoiceAsReceivedMutation, MarkInvoiceAsReceivedMutationVariables>(MarkInvoiceAsReceivedDocument, options);
      }
export type MarkInvoiceAsReceivedMutationHookResult = ReturnType<typeof useMarkInvoiceAsReceivedMutation>;
export type MarkInvoiceAsReceivedMutationResult = Apollo.MutationResult<MarkInvoiceAsReceivedMutation>;
export type MarkInvoiceAsReceivedMutationOptions = Apollo.BaseMutationOptions<MarkInvoiceAsReceivedMutation, MarkInvoiceAsReceivedMutationVariables>;
export const GetPaymentRequestsDocument = gql`
    query GetPaymentRequests($githubUserId: bigint!) {
  paymentRequests(where: {recipientId: {_eq: $githubUserId}}) {
    ...UserPaymentRequest
  }
}
    ${UserPaymentRequestFragmentDoc}`;

/**
 * __useGetPaymentRequestsQuery__
 *
 * To run a query within a React component, call `useGetPaymentRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentRequestsQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetPaymentRequestsQuery(baseOptions: Apollo.QueryHookOptions<GetPaymentRequestsQuery, GetPaymentRequestsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentRequestsQuery, GetPaymentRequestsQueryVariables>(GetPaymentRequestsDocument, options);
      }
export function useGetPaymentRequestsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentRequestsQuery, GetPaymentRequestsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentRequestsQuery, GetPaymentRequestsQueryVariables>(GetPaymentRequestsDocument, options);
        }
export type GetPaymentRequestsQueryHookResult = ReturnType<typeof useGetPaymentRequestsQuery>;
export type GetPaymentRequestsLazyQueryHookResult = ReturnType<typeof useGetPaymentRequestsLazyQuery>;
export type GetPaymentRequestsQueryResult = Apollo.QueryResult<GetPaymentRequestsQuery, GetPaymentRequestsQueryVariables>;
export const AcceptTermsAndConditionsDocument = gql`
    mutation AcceptTermsAndConditions {
  acceptTermsAndConditions
}
    `;
export type AcceptTermsAndConditionsMutationFn = Apollo.MutationFunction<AcceptTermsAndConditionsMutation, AcceptTermsAndConditionsMutationVariables>;

/**
 * __useAcceptTermsAndConditionsMutation__
 *
 * To run a mutation, you first call `useAcceptTermsAndConditionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptTermsAndConditionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptTermsAndConditionsMutation, { data, loading, error }] = useAcceptTermsAndConditionsMutation({
 *   variables: {
 *   },
 * });
 */
export function useAcceptTermsAndConditionsMutation(baseOptions?: Apollo.MutationHookOptions<AcceptTermsAndConditionsMutation, AcceptTermsAndConditionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptTermsAndConditionsMutation, AcceptTermsAndConditionsMutationVariables>(AcceptTermsAndConditionsDocument, options);
      }
export type AcceptTermsAndConditionsMutationHookResult = ReturnType<typeof useAcceptTermsAndConditionsMutation>;
export type AcceptTermsAndConditionsMutationResult = Apollo.MutationResult<AcceptTermsAndConditionsMutation>;
export type AcceptTermsAndConditionsMutationOptions = Apollo.BaseMutationOptions<AcceptTermsAndConditionsMutation, AcceptTermsAndConditionsMutationVariables>;
export const CountProcessingCommandsDocument = gql`
    query CountProcessingCommands($projectId: uuid!) {
  commandsAggregate(
    where: {projectId: {_eq: $projectId}, processingCount: {_gt: 0}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useCountProcessingCommandsQuery__
 *
 * To run a query within a React component, call `useCountProcessingCommandsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountProcessingCommandsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountProcessingCommandsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useCountProcessingCommandsQuery(baseOptions: Apollo.QueryHookOptions<CountProcessingCommandsQuery, CountProcessingCommandsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountProcessingCommandsQuery, CountProcessingCommandsQueryVariables>(CountProcessingCommandsDocument, options);
      }
export function useCountProcessingCommandsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountProcessingCommandsQuery, CountProcessingCommandsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountProcessingCommandsQuery, CountProcessingCommandsQueryVariables>(CountProcessingCommandsDocument, options);
        }
export type CountProcessingCommandsQueryHookResult = ReturnType<typeof useCountProcessingCommandsQuery>;
export type CountProcessingCommandsLazyQueryHookResult = ReturnType<typeof useCountProcessingCommandsLazyQuery>;
export type CountProcessingCommandsQueryResult = Apollo.QueryResult<CountProcessingCommandsQuery, CountProcessingCommandsQueryVariables>;