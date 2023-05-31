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
  Email: any;
  EthereumAddress: any;
  EthereumName: any;
  GithubIssueId: any;
  GithubIssueNumber: any;
  GithubRepoId: any;
  GithubUserId: any;
  Iban: any;
  Id: any;
  Url: any;
  Uuid: any;
  bigint: any;
  bytea: any;
  citext: any;
  float8: any;
  jsonb: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
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

export type CompanyIdentity = {
  identificationNumber: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<PersonIdentity>;
};

export type ContactInformation = {
  discord: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['Email']>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
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

/** columns and relationships of "github_issues" */
export type GithubIssues = {
  __typename?: 'GithubIssues';
  authorId: Scalars['bigint'];
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Scalars['timestamp'];
  htmlUrl: Scalars['String'];
  id: Scalars['bigint'];
  ignoredForProjects: Array<IgnoredGithubIssues>;
  ignoredForProjectsAggregate: IgnoredGithubIssuesAggregate;
  issueNumber: Scalars['bigint'];
  mergedAt: Maybe<Scalars['timestamp']>;
  repoId: Scalars['bigint'];
  status: Scalars['jsonb'];
  title: Scalars['String'];
  type: Scalars['jsonb'];
};


/** columns and relationships of "github_issues" */
export type GithubIssuesIgnoredForProjectsArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


/** columns and relationships of "github_issues" */
export type GithubIssuesIgnoredForProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


/** columns and relationships of "github_issues" */
export type GithubIssuesStatusArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "github_issues" */
export type GithubIssuesTypeArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "github_issues" */
export type GithubIssuesAggregate = {
  __typename?: 'GithubIssuesAggregate';
  aggregate: Maybe<GithubIssuesAggregateFields>;
  nodes: Array<GithubIssues>;
};

/** aggregate fields of "github_issues" */
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


/** aggregate fields of "github_issues" */
export type GithubIssuesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "github_issues" */
export type GithubIssuesAggregateOrderBy = {
  avg: InputMaybe<Github_Issues_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Github_Issues_Max_Order_By>;
  min: InputMaybe<Github_Issues_Min_Order_By>;
  stddev: InputMaybe<Github_Issues_Stddev_Order_By>;
  stddev_pop: InputMaybe<Github_Issues_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Github_Issues_Stddev_Samp_Order_By>;
  sum: InputMaybe<Github_Issues_Sum_Order_By>;
  var_pop: InputMaybe<Github_Issues_Var_Pop_Order_By>;
  var_samp: InputMaybe<Github_Issues_Var_Samp_Order_By>;
  variance: InputMaybe<Github_Issues_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type GithubIssuesAppendInput = {
  status: InputMaybe<Scalars['jsonb']>;
  type: InputMaybe<Scalars['jsonb']>;
};

/** input type for inserting array relation for remote table "github_issues" */
export type GithubIssuesArrRelInsertInput = {
  data: Array<GithubIssuesInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<GithubIssuesOnConflict>;
};

/** aggregate avg on columns */
export type GithubIssuesAvgFields = {
  __typename?: 'GithubIssuesAvgFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "github_issues". All fields are combined with a logical 'AND'. */
export type GithubIssuesBoolExp = {
  _and: InputMaybe<Array<GithubIssuesBoolExp>>;
  _not: InputMaybe<GithubIssuesBoolExp>;
  _or: InputMaybe<Array<GithubIssuesBoolExp>>;
  authorId: InputMaybe<BigintComparisonExp>;
  closedAt: InputMaybe<TimestampComparisonExp>;
  createdAt: InputMaybe<TimestampComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  ignoredForProjects: InputMaybe<IgnoredGithubIssuesBoolExp>;
  ignoredForProjects_aggregate: InputMaybe<Ignored_Github_Issues_Aggregate_Bool_Exp>;
  issueNumber: InputMaybe<BigintComparisonExp>;
  mergedAt: InputMaybe<TimestampComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
  status: InputMaybe<JsonbComparisonExp>;
  title: InputMaybe<StringComparisonExp>;
  type: InputMaybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "github_issues" */
export enum GithubIssuesConstraint {
  /** unique or primary key constraint on columns "id" */
  GithubPullsPkey = 'github_pulls_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GithubIssuesDeleteAtPathInput = {
  status: InputMaybe<Array<Scalars['String']>>;
  type: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GithubIssuesDeleteElemInput = {
  status: InputMaybe<Scalars['Int']>;
  type: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GithubIssuesDeleteKeyInput = {
  status: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "github_issues" */
export type GithubIssuesIncInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['bigint']>;
  issueNumber: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "github_issues" */
export type GithubIssuesInsertInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  ignoredForProjects: InputMaybe<IgnoredGithubIssuesArrRelInsertInput>;
  issueNumber: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['jsonb']>;
  title: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type GithubIssuesMaxFields = {
  __typename?: 'GithubIssuesMaxFields';
  authorId: Maybe<Scalars['bigint']>;
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  issueNumber: Maybe<Scalars['bigint']>;
  mergedAt: Maybe<Scalars['timestamp']>;
  repoId: Maybe<Scalars['bigint']>;
  title: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type GithubIssuesMinFields = {
  __typename?: 'GithubIssuesMinFields';
  authorId: Maybe<Scalars['bigint']>;
  closedAt: Maybe<Scalars['timestamp']>;
  createdAt: Maybe<Scalars['timestamp']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['bigint']>;
  issueNumber: Maybe<Scalars['bigint']>;
  mergedAt: Maybe<Scalars['timestamp']>;
  repoId: Maybe<Scalars['bigint']>;
  title: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "github_issues" */
export type GithubIssuesMutationResponse = {
  __typename?: 'GithubIssuesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubIssues>;
};

/** on_conflict condition type for table "github_issues" */
export type GithubIssuesOnConflict = {
  constraint: GithubIssuesConstraint;
  update_columns: Array<GithubIssuesUpdateColumn>;
  where: InputMaybe<GithubIssuesBoolExp>;
};

/** Ordering options when selecting data from "github_issues". */
export type GithubIssuesOrderBy = {
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  ignoredForProjectsAggregate: InputMaybe<IgnoredGithubIssuesAggregateOrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  mergedAt: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  status: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
  type: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_issues */
export type GithubIssuesPkColumnsInput = {
  id: Scalars['bigint'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GithubIssuesPrependInput = {
  status: InputMaybe<Scalars['jsonb']>;
  type: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_issues" */
export enum GithubIssuesSelectColumn {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  MergedAt = 'mergedAt',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type'
}

/** input type for updating data in table "github_issues" */
export type GithubIssuesSetInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  issueNumber: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['jsonb']>;
  title: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type GithubIssuesStddevFields = {
  __typename?: 'GithubIssuesStddevFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubIssuesStddev_PopFields = {
  __typename?: 'GithubIssuesStddev_popFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubIssuesStddev_SampFields = {
  __typename?: 'GithubIssuesStddev_sampFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubIssuesSumFields = {
  __typename?: 'GithubIssuesSumFields';
  authorId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['bigint']>;
  issueNumber: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** update columns of table "github_issues" */
export enum GithubIssuesUpdateColumn {
  /** column name */
  AuthorId = 'authorId',
  /** column name */
  ClosedAt = 'closedAt',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  MergedAt = 'mergedAt',
  /** column name */
  RepoId = 'repoId',
  /** column name */
  Status = 'status',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type'
}

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
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubIssuesVar_SampFields = {
  __typename?: 'GithubIssuesVar_sampFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubIssuesVarianceFields = {
  __typename?: 'GithubIssuesVarianceFields';
  authorId: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "github_repos" */
export type GithubRepos = {
  __typename?: 'GithubRepos';
  description: Scalars['String'];
  forkCount: Scalars['Int'];
  htmlUrl: Scalars['String'];
  id: Scalars['bigint'];
  languages: Scalars['jsonb'];
  name: Scalars['String'];
  owner: Scalars['String'];
  stars: Scalars['Int'];
  updatedAt: Maybe<Scalars['timestamp']>;
};


/** columns and relationships of "github_repos" */
export type GithubReposLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "github_repos" */
export type GithubReposAggregate = {
  __typename?: 'GithubReposAggregate';
  aggregate: Maybe<GithubReposAggregateFields>;
  nodes: Array<GithubRepos>;
};

/** aggregate fields of "github_repos" */
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


/** aggregate fields of "github_repos" */
export type GithubReposAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubReposSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type GithubReposAppendInput = {
  languages: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type GithubReposAvgFields = {
  __typename?: 'GithubReposAvgFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "github_repos". All fields are combined with a logical 'AND'. */
export type GithubReposBoolExp = {
  _and: InputMaybe<Array<GithubReposBoolExp>>;
  _not: InputMaybe<GithubReposBoolExp>;
  _or: InputMaybe<Array<GithubReposBoolExp>>;
  description: InputMaybe<StringComparisonExp>;
  forkCount: InputMaybe<IntComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<BigintComparisonExp>;
  languages: InputMaybe<JsonbComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  owner: InputMaybe<StringComparisonExp>;
  stars: InputMaybe<IntComparisonExp>;
  updatedAt: InputMaybe<TimestampComparisonExp>;
};

/** unique or primary key constraints on table "github_repos" */
export enum GithubReposConstraint {
  /** unique or primary key constraint on columns "id" */
  CrmGithubReposPkey = 'crm_github_repos_pkey'
}

/** columns and relationships of "github_repos_contributors" */
export type GithubReposContributors = {
  __typename?: 'GithubReposContributors';
  repoId: Scalars['bigint'];
  /** An object relationship */
  user: Maybe<GithubUsers>;
  userId: Scalars['bigint'];
};

/** aggregated selection of "github_repos_contributors" */
export type GithubReposContributorsAggregate = {
  __typename?: 'GithubReposContributorsAggregate';
  aggregate: Maybe<GithubReposContributorsAggregateFields>;
  nodes: Array<GithubReposContributors>;
};

/** aggregate fields of "github_repos_contributors" */
export type GithubReposContributorsAggregateFields = {
  __typename?: 'GithubReposContributorsAggregateFields';
  avg: Maybe<GithubReposContributorsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<GithubReposContributorsMaxFields>;
  min: Maybe<GithubReposContributorsMinFields>;
  stddev: Maybe<GithubReposContributorsStddevFields>;
  stddevPop: Maybe<GithubReposContributorsStddev_PopFields>;
  stddevSamp: Maybe<GithubReposContributorsStddev_SampFields>;
  sum: Maybe<GithubReposContributorsSumFields>;
  varPop: Maybe<GithubReposContributorsVar_PopFields>;
  varSamp: Maybe<GithubReposContributorsVar_SampFields>;
  variance: Maybe<GithubReposContributorsVarianceFields>;
};


/** aggregate fields of "github_repos_contributors" */
export type GithubReposContributorsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "github_repos_contributors" */
export type GithubReposContributorsAggregateOrderBy = {
  avg: InputMaybe<Github_Repos_Contributors_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Github_Repos_Contributors_Max_Order_By>;
  min: InputMaybe<Github_Repos_Contributors_Min_Order_By>;
  stddev: InputMaybe<Github_Repos_Contributors_Stddev_Order_By>;
  stddev_pop: InputMaybe<Github_Repos_Contributors_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Github_Repos_Contributors_Stddev_Samp_Order_By>;
  sum: InputMaybe<Github_Repos_Contributors_Sum_Order_By>;
  var_pop: InputMaybe<Github_Repos_Contributors_Var_Pop_Order_By>;
  var_samp: InputMaybe<Github_Repos_Contributors_Var_Samp_Order_By>;
  variance: InputMaybe<Github_Repos_Contributors_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "github_repos_contributors" */
export type GithubReposContributorsArrRelInsertInput = {
  data: Array<GithubReposContributorsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<GithubReposContributorsOnConflict>;
};

/** aggregate avg on columns */
export type GithubReposContributorsAvgFields = {
  __typename?: 'GithubReposContributorsAvgFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "github_repos_contributors". All fields are combined with a logical 'AND'. */
export type GithubReposContributorsBoolExp = {
  _and: InputMaybe<Array<GithubReposContributorsBoolExp>>;
  _not: InputMaybe<GithubReposContributorsBoolExp>;
  _or: InputMaybe<Array<GithubReposContributorsBoolExp>>;
  repoId: InputMaybe<BigintComparisonExp>;
  user: InputMaybe<GithubUsersBoolExp>;
  userId: InputMaybe<BigintComparisonExp>;
};

/** unique or primary key constraints on table "github_repos_contributors" */
export enum GithubReposContributorsConstraint {
  /** unique or primary key constraint on columns "user_id", "repo_id" */
  GithubReposContributorsPkey = 'github_repos_contributors_pkey'
}

/** input type for incrementing numeric columns in table "github_repos_contributors" */
export type GithubReposContributorsIncInput = {
  repoId: InputMaybe<Scalars['bigint']>;
  userId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "github_repos_contributors" */
export type GithubReposContributorsInsertInput = {
  repoId: InputMaybe<Scalars['bigint']>;
  user: InputMaybe<GithubUsersObjRelInsertInput>;
  userId: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type GithubReposContributorsMaxFields = {
  __typename?: 'GithubReposContributorsMaxFields';
  repoId: Maybe<Scalars['bigint']>;
  userId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type GithubReposContributorsMinFields = {
  __typename?: 'GithubReposContributorsMinFields';
  repoId: Maybe<Scalars['bigint']>;
  userId: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "github_repos_contributors" */
export type GithubReposContributorsMutationResponse = {
  __typename?: 'GithubReposContributorsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubReposContributors>;
};

/** on_conflict condition type for table "github_repos_contributors" */
export type GithubReposContributorsOnConflict = {
  constraint: GithubReposContributorsConstraint;
  update_columns: Array<GithubReposContributorsUpdateColumn>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};

/** Ordering options when selecting data from "github_repos_contributors". */
export type GithubReposContributorsOrderBy = {
  repoId: InputMaybe<OrderBy>;
  user: InputMaybe<GithubUsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_repos_contributors */
export type GithubReposContributorsPkColumnsInput = {
  repoId: Scalars['bigint'];
  userId: Scalars['bigint'];
};

/** select columns of table "github_repos_contributors" */
export enum GithubReposContributorsSelectColumn {
  /** column name */
  RepoId = 'repoId',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "github_repos_contributors" */
export type GithubReposContributorsSetInput = {
  repoId: InputMaybe<Scalars['bigint']>;
  userId: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type GithubReposContributorsStddevFields = {
  __typename?: 'GithubReposContributorsStddevFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubReposContributorsStddev_PopFields = {
  __typename?: 'GithubReposContributorsStddev_popFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubReposContributorsStddev_SampFields = {
  __typename?: 'GithubReposContributorsStddev_sampFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubReposContributorsSumFields = {
  __typename?: 'GithubReposContributorsSumFields';
  repoId: Maybe<Scalars['bigint']>;
  userId: Maybe<Scalars['bigint']>;
};

/** update columns of table "github_repos_contributors" */
export enum GithubReposContributorsUpdateColumn {
  /** column name */
  RepoId = 'repoId',
  /** column name */
  UserId = 'userId'
}

export type GithubReposContributorsUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubReposContributorsIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubReposContributorsSetInput>;
  where: GithubReposContributorsBoolExp;
};

/** aggregate var_pop on columns */
export type GithubReposContributorsVar_PopFields = {
  __typename?: 'GithubReposContributorsVar_popFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubReposContributorsVar_SampFields = {
  __typename?: 'GithubReposContributorsVar_sampFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubReposContributorsVarianceFields = {
  __typename?: 'GithubReposContributorsVarianceFields';
  repoId: Maybe<Scalars['Float']>;
  userId: Maybe<Scalars['Float']>;
};

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GithubReposDeleteAtPathInput = {
  languages: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GithubReposDeleteElemInput = {
  languages: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GithubReposDeleteKeyInput = {
  languages: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "github_repos" */
export type GithubReposIncInput = {
  forkCount: InputMaybe<Scalars['Int']>;
  id: InputMaybe<Scalars['bigint']>;
  stars: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "github_repos" */
export type GithubReposInsertInput = {
  description: InputMaybe<Scalars['String']>;
  forkCount: InputMaybe<Scalars['Int']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
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
  name: Maybe<Scalars['String']>;
  owner: Maybe<Scalars['String']>;
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
  name: Maybe<Scalars['String']>;
  owner: Maybe<Scalars['String']>;
  stars: Maybe<Scalars['Int']>;
  updatedAt: Maybe<Scalars['timestamp']>;
};

/** response of any mutation on the table "github_repos" */
export type GithubReposMutationResponse = {
  __typename?: 'GithubReposMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubRepos>;
};

/** input type for inserting object relation for remote table "github_repos" */
export type GithubReposObjRelInsertInput = {
  data: GithubReposInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<GithubReposOnConflict>;
};

/** on_conflict condition type for table "github_repos" */
export type GithubReposOnConflict = {
  constraint: GithubReposConstraint;
  update_columns: Array<GithubReposUpdateColumn>;
  where: InputMaybe<GithubReposBoolExp>;
};

/** Ordering options when selecting data from "github_repos". */
export type GithubReposOrderBy = {
  description: InputMaybe<OrderBy>;
  forkCount: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  owner: InputMaybe<OrderBy>;
  stars: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_repos */
export type GithubReposPkColumnsInput = {
  id: Scalars['bigint'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GithubReposPrependInput = {
  languages: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_repos" */
export enum GithubReposSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  ForkCount = 'forkCount',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner',
  /** column name */
  Stars = 'stars',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "github_repos" */
export type GithubReposSetInput = {
  description: InputMaybe<Scalars['String']>;
  forkCount: InputMaybe<Scalars['Int']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
  stars: InputMaybe<Scalars['Int']>;
  updatedAt: InputMaybe<Scalars['timestamp']>;
};

/** aggregate stddev on columns */
export type GithubReposStddevFields = {
  __typename?: 'GithubReposStddevFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubReposStddev_PopFields = {
  __typename?: 'GithubReposStddev_popFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubReposStddev_SampFields = {
  __typename?: 'GithubReposStddev_sampFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubReposSumFields = {
  __typename?: 'GithubReposSumFields';
  forkCount: Maybe<Scalars['Int']>;
  id: Maybe<Scalars['bigint']>;
  stars: Maybe<Scalars['Int']>;
};

/** update columns of table "github_repos" */
export enum GithubReposUpdateColumn {
  /** column name */
  Description = 'description',
  /** column name */
  ForkCount = 'forkCount',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Id = 'id',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner',
  /** column name */
  Stars = 'stars',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type GithubReposUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<GithubReposAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<GithubReposDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<GithubReposDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<GithubReposDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubReposIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<GithubReposPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubReposSetInput>;
  where: GithubReposBoolExp;
};

/** aggregate var_pop on columns */
export type GithubReposVar_PopFields = {
  __typename?: 'GithubReposVar_popFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubReposVar_SampFields = {
  __typename?: 'GithubReposVar_sampFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubReposVarianceFields = {
  __typename?: 'GithubReposVarianceFields';
  forkCount: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['Float']>;
  stars: Maybe<Scalars['Float']>;
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

/** columns and relationships of "ignored_github_issues" */
export type IgnoredGithubIssues = {
  __typename?: 'IgnoredGithubIssues';
  issueNumber: Scalars['bigint'];
  projectId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};

/** aggregated selection of "ignored_github_issues" */
export type IgnoredGithubIssuesAggregate = {
  __typename?: 'IgnoredGithubIssuesAggregate';
  aggregate: Maybe<IgnoredGithubIssuesAggregateFields>;
  nodes: Array<IgnoredGithubIssues>;
};

/** aggregate fields of "ignored_github_issues" */
export type IgnoredGithubIssuesAggregateFields = {
  __typename?: 'IgnoredGithubIssuesAggregateFields';
  avg: Maybe<IgnoredGithubIssuesAvgFields>;
  count: Scalars['Int'];
  max: Maybe<IgnoredGithubIssuesMaxFields>;
  min: Maybe<IgnoredGithubIssuesMinFields>;
  stddev: Maybe<IgnoredGithubIssuesStddevFields>;
  stddevPop: Maybe<IgnoredGithubIssuesStddev_PopFields>;
  stddevSamp: Maybe<IgnoredGithubIssuesStddev_SampFields>;
  sum: Maybe<IgnoredGithubIssuesSumFields>;
  varPop: Maybe<IgnoredGithubIssuesVar_PopFields>;
  varSamp: Maybe<IgnoredGithubIssuesVar_SampFields>;
  variance: Maybe<IgnoredGithubIssuesVarianceFields>;
};


/** aggregate fields of "ignored_github_issues" */
export type IgnoredGithubIssuesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "ignored_github_issues" */
export type IgnoredGithubIssuesAggregateOrderBy = {
  avg: InputMaybe<Ignored_Github_Issues_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Ignored_Github_Issues_Max_Order_By>;
  min: InputMaybe<Ignored_Github_Issues_Min_Order_By>;
  stddev: InputMaybe<Ignored_Github_Issues_Stddev_Order_By>;
  stddev_pop: InputMaybe<Ignored_Github_Issues_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Ignored_Github_Issues_Stddev_Samp_Order_By>;
  sum: InputMaybe<Ignored_Github_Issues_Sum_Order_By>;
  var_pop: InputMaybe<Ignored_Github_Issues_Var_Pop_Order_By>;
  var_samp: InputMaybe<Ignored_Github_Issues_Var_Samp_Order_By>;
  variance: InputMaybe<Ignored_Github_Issues_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "ignored_github_issues" */
export type IgnoredGithubIssuesArrRelInsertInput = {
  data: Array<IgnoredGithubIssuesInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<IgnoredGithubIssuesOnConflict>;
};

/** aggregate avg on columns */
export type IgnoredGithubIssuesAvgFields = {
  __typename?: 'IgnoredGithubIssuesAvgFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "ignored_github_issues". All fields are combined with a logical 'AND'. */
export type IgnoredGithubIssuesBoolExp = {
  _and: InputMaybe<Array<IgnoredGithubIssuesBoolExp>>;
  _not: InputMaybe<IgnoredGithubIssuesBoolExp>;
  _or: InputMaybe<Array<IgnoredGithubIssuesBoolExp>>;
  issueNumber: InputMaybe<BigintComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
};

/** unique or primary key constraints on table "ignored_github_issues" */
export enum IgnoredGithubIssuesConstraint {
  /** unique or primary key constraint on columns "issue_number", "project_id", "repo_id" */
  IgnoredGithubIssuesPkey = 'ignored_github_issues_pkey'
}

/** input type for incrementing numeric columns in table "ignored_github_issues" */
export type IgnoredGithubIssuesIncInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "ignored_github_issues" */
export type IgnoredGithubIssuesInsertInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type IgnoredGithubIssuesMaxFields = {
  __typename?: 'IgnoredGithubIssuesMaxFields';
  issueNumber: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type IgnoredGithubIssuesMinFields = {
  __typename?: 'IgnoredGithubIssuesMinFields';
  issueNumber: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "ignored_github_issues" */
export type IgnoredGithubIssuesMutationResponse = {
  __typename?: 'IgnoredGithubIssuesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<IgnoredGithubIssues>;
};

/** on_conflict condition type for table "ignored_github_issues" */
export type IgnoredGithubIssuesOnConflict = {
  constraint: IgnoredGithubIssuesConstraint;
  update_columns: Array<IgnoredGithubIssuesUpdateColumn>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};

/** Ordering options when selecting data from "ignored_github_issues". */
export type IgnoredGithubIssuesOrderBy = {
  issueNumber: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: ignored_github_issues */
export type IgnoredGithubIssuesPkColumnsInput = {
  issueNumber: Scalars['bigint'];
  projectId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};

/** select columns of table "ignored_github_issues" */
export enum IgnoredGithubIssuesSelectColumn {
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RepoId = 'repoId'
}

/** input type for updating data in table "ignored_github_issues" */
export type IgnoredGithubIssuesSetInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type IgnoredGithubIssuesStddevFields = {
  __typename?: 'IgnoredGithubIssuesStddevFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type IgnoredGithubIssuesStddev_PopFields = {
  __typename?: 'IgnoredGithubIssuesStddev_popFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type IgnoredGithubIssuesStddev_SampFields = {
  __typename?: 'IgnoredGithubIssuesStddev_sampFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type IgnoredGithubIssuesSumFields = {
  __typename?: 'IgnoredGithubIssuesSumFields';
  issueNumber: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** update columns of table "ignored_github_issues" */
export enum IgnoredGithubIssuesUpdateColumn {
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  RepoId = 'repoId'
}

export type IgnoredGithubIssuesUpdates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<IgnoredGithubIssuesIncInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<IgnoredGithubIssuesSetInput>;
  where: IgnoredGithubIssuesBoolExp;
};

/** aggregate var_pop on columns */
export type IgnoredGithubIssuesVar_PopFields = {
  __typename?: 'IgnoredGithubIssuesVar_popFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type IgnoredGithubIssuesVar_SampFields = {
  __typename?: 'IgnoredGithubIssuesVar_sampFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type IgnoredGithubIssuesVarianceFields = {
  __typename?: 'IgnoredGithubIssuesVarianceFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
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

export type Issue = {
  __typename?: 'Issue';
  author: User;
  closedAt: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  htmlUrl: Scalars['Url'];
  id: Scalars['GithubIssueId'];
  ignoredForProjects: Array<IgnoredGithubIssues>;
  ignoredForProjectsAggregate: IgnoredGithubIssuesAggregate;
  mergedAt: Maybe<Scalars['DateTimeUtc']>;
  number: Scalars['GithubIssueNumber'];
  repoId: Scalars['GithubRepoId'];
  status: Status;
  title: Scalars['String'];
  type: Type;
  updatedAt: Scalars['DateTimeUtc'];
};


export type IssueIgnoredForProjectsArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


export type IssueIgnoredForProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
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
  budgetId: Scalars['Id'];
  paymentId: Scalars['Id'];
  projectId: Scalars['Id'];
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
  liveGithubRecipient: Maybe<User>;
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
  workItems_aggregate: InputMaybe<Work_Items_Aggregate_Bool_Exp>;
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

/** columns and relationships of "project_details" */
export type ProjectDetails = {
  __typename?: 'ProjectDetails';
  hiring: Scalars['Boolean'];
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['uuid'];
  rank: Scalars['Int'];
  shortDescription: Scalars['String'];
  telegramLink: Maybe<Scalars['String']>;
  visibility: Scalars['jsonb'];
};


/** columns and relationships of "project_details" */
export type ProjectDetailsVisibilityArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "project_details" */
export type ProjectDetailsAggregate = {
  __typename?: 'ProjectDetailsAggregate';
  aggregate: Maybe<ProjectDetailsAggregateFields>;
  nodes: Array<ProjectDetails>;
};

/** aggregate fields of "project_details" */
export type ProjectDetailsAggregateFields = {
  __typename?: 'ProjectDetailsAggregateFields';
  avg: Maybe<ProjectDetailsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectDetailsMaxFields>;
  min: Maybe<ProjectDetailsMinFields>;
  stddev: Maybe<ProjectDetailsStddevFields>;
  stddevPop: Maybe<ProjectDetailsStddev_PopFields>;
  stddevSamp: Maybe<ProjectDetailsStddev_SampFields>;
  sum: Maybe<ProjectDetailsSumFields>;
  varPop: Maybe<ProjectDetailsVar_PopFields>;
  varSamp: Maybe<ProjectDetailsVar_SampFields>;
  variance: Maybe<ProjectDetailsVarianceFields>;
};


/** aggregate fields of "project_details" */
export type ProjectDetailsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type ProjectDetailsAppendInput = {
  visibility: InputMaybe<Scalars['jsonb']>;
};

/** aggregate avg on columns */
export type ProjectDetailsAvgFields = {
  __typename?: 'ProjectDetailsAvgFields';
  rank: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "project_details". All fields are combined with a logical 'AND'. */
export type ProjectDetailsBoolExp = {
  _and: InputMaybe<Array<ProjectDetailsBoolExp>>;
  _not: InputMaybe<ProjectDetailsBoolExp>;
  _or: InputMaybe<Array<ProjectDetailsBoolExp>>;
  hiring: InputMaybe<BooleanComparisonExp>;
  logoUrl: InputMaybe<StringComparisonExp>;
  longDescription: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  rank: InputMaybe<IntComparisonExp>;
  shortDescription: InputMaybe<StringComparisonExp>;
  telegramLink: InputMaybe<StringComparisonExp>;
  visibility: InputMaybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "project_details" */
export enum ProjectDetailsConstraint {
  /** unique or primary key constraint on columns "project_id" */
  ProjectDetailsPkey = 'project_details_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type ProjectDetailsDeleteAtPathInput = {
  visibility: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type ProjectDetailsDeleteElemInput = {
  visibility: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type ProjectDetailsDeleteKeyInput = {
  visibility: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "project_details" */
export type ProjectDetailsIncInput = {
  rank: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "project_details" */
export type ProjectDetailsInsertInput = {
  hiring: InputMaybe<Scalars['Boolean']>;
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: InputMaybe<Scalars['String']>;
  telegramLink: InputMaybe<Scalars['String']>;
  visibility: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type ProjectDetailsMaxFields = {
  __typename?: 'ProjectDetailsMaxFields';
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  rank: Maybe<Scalars['Int']>;
  shortDescription: Maybe<Scalars['String']>;
  telegramLink: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type ProjectDetailsMinFields = {
  __typename?: 'ProjectDetailsMinFields';
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Maybe<Scalars['String']>;
  name: Maybe<Scalars['String']>;
  projectId: Maybe<Scalars['uuid']>;
  rank: Maybe<Scalars['Int']>;
  shortDescription: Maybe<Scalars['String']>;
  telegramLink: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "project_details" */
export type ProjectDetailsMutationResponse = {
  __typename?: 'ProjectDetailsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<ProjectDetails>;
};

/** input type for inserting object relation for remote table "project_details" */
export type ProjectDetailsObjRelInsertInput = {
  data: ProjectDetailsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<ProjectDetailsOnConflict>;
};

/** on_conflict condition type for table "project_details" */
export type ProjectDetailsOnConflict = {
  constraint: ProjectDetailsConstraint;
  update_columns: Array<ProjectDetailsUpdateColumn>;
  where: InputMaybe<ProjectDetailsBoolExp>;
};

/** Ordering options when selecting data from "project_details". */
export type ProjectDetailsOrderBy = {
  hiring: InputMaybe<OrderBy>;
  logoUrl: InputMaybe<OrderBy>;
  longDescription: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  rank: InputMaybe<OrderBy>;
  shortDescription: InputMaybe<OrderBy>;
  telegramLink: InputMaybe<OrderBy>;
  visibility: InputMaybe<OrderBy>;
};

/** primary key columns input for table: project_details */
export type ProjectDetailsPkColumnsInput = {
  projectId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type ProjectDetailsPrependInput = {
  visibility: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "project_details" */
export enum ProjectDetailsSelectColumn {
  /** column name */
  Hiring = 'hiring',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  LongDescription = 'longDescription',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Rank = 'rank',
  /** column name */
  ShortDescription = 'shortDescription',
  /** column name */
  TelegramLink = 'telegramLink',
  /** column name */
  Visibility = 'visibility'
}

/** input type for updating data in table "project_details" */
export type ProjectDetailsSetInput = {
  hiring: InputMaybe<Scalars['Boolean']>;
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: InputMaybe<Scalars['String']>;
  telegramLink: InputMaybe<Scalars['String']>;
  visibility: InputMaybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type ProjectDetailsStddevFields = {
  __typename?: 'ProjectDetailsStddevFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectDetailsStddev_PopFields = {
  __typename?: 'ProjectDetailsStddev_popFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectDetailsStddev_SampFields = {
  __typename?: 'ProjectDetailsStddev_sampFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectDetailsSumFields = {
  __typename?: 'ProjectDetailsSumFields';
  rank: Maybe<Scalars['Int']>;
};

/** update columns of table "project_details" */
export enum ProjectDetailsUpdateColumn {
  /** column name */
  Hiring = 'hiring',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  LongDescription = 'longDescription',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  Rank = 'rank',
  /** column name */
  ShortDescription = 'shortDescription',
  /** column name */
  TelegramLink = 'telegramLink',
  /** column name */
  Visibility = 'visibility'
}

export type ProjectDetailsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<ProjectDetailsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<ProjectDetailsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<ProjectDetailsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<ProjectDetailsDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<ProjectDetailsIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<ProjectDetailsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectDetailsSetInput>;
  where: ProjectDetailsBoolExp;
};

/** aggregate var_pop on columns */
export type ProjectDetailsVar_PopFields = {
  __typename?: 'ProjectDetailsVar_popFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectDetailsVar_SampFields = {
  __typename?: 'ProjectDetailsVar_sampFields';
  rank: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectDetailsVarianceFields = {
  __typename?: 'ProjectDetailsVarianceFields';
  rank: Maybe<Scalars['Float']>;
};

/** columns and relationships of "project_github_repos" */
export type ProjectGithubRepos = {
  __typename?: 'ProjectGithubRepos';
  githubRepoId: Scalars['bigint'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
  /** An object relationship */
  repo: Maybe<GithubRepos>;
  /** An array relationship */
  repoContributors: Array<GithubReposContributors>;
  /** An aggregate relationship */
  repoContributorsAggregate: GithubReposContributorsAggregate;
  /** An array relationship */
  repoIssues: Array<GithubIssues>;
  /** An aggregate relationship */
  repoIssuesAggregate: GithubIssuesAggregate;
};


/** columns and relationships of "project_github_repos" */
export type ProjectGithubReposRepoContributorsArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


/** columns and relationships of "project_github_repos" */
export type ProjectGithubReposRepoContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
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
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  repo: InputMaybe<GithubReposBoolExp>;
  repoContributors: InputMaybe<GithubReposContributorsBoolExp>;
  repoContributors_aggregate: InputMaybe<Github_Repos_Contributors_Aggregate_Bool_Exp>;
  repoIssues: InputMaybe<GithubIssuesBoolExp>;
  repoIssues_aggregate: InputMaybe<Github_Issues_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "project_github_repos" */
export enum ProjectGithubReposConstraint {
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
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
  repo: InputMaybe<GithubReposObjRelInsertInput>;
  repoContributors: InputMaybe<GithubReposContributorsArrRelInsertInput>;
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
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  repo: InputMaybe<GithubReposOrderBy>;
  repoContributorsAggregate: InputMaybe<GithubReposContributorsAggregateOrderBy>;
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
  ProjectLeadsPkey = 'project_leads_pkey'
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

/** columns and relationships of "projects" */
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
  contributors: Array<ProjectsContributorsView>;
  /** An aggregate relationship */
  contributorsAggregate: ProjectsContributorsViewAggregate;
  /** An array relationship */
  githubRepos: Array<ProjectGithubRepos>;
  /** An aggregate relationship */
  githubReposAggregate: ProjectGithubReposAggregate;
  id: Scalars['uuid'];
  /** An array relationship */
  pendingInvitations: Array<PendingProjectLeaderInvitations>;
  /** An aggregate relationship */
  pendingInvitationsAggregate: PendingProjectLeaderInvitationsAggregate;
  /** An object relationship */
  projectDetails: Maybe<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectLeadsAggregate: ProjectLeadsAggregate;
  /** An array relationship */
  projectSponsors: Array<ProjectsSponsors>;
  /** An aggregate relationship */
  projectSponsorsAggregate: ProjectsSponsorsAggregate;
};


/** columns and relationships of "projects" */
export type ProjectsApplicationsArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsApplicationsAggregateArgs = {
  distinctOn: InputMaybe<Array<ApplicationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ApplicationsOrderBy>>;
  where: InputMaybe<ApplicationsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsBudgetsArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsBudgetsAggregateArgs = {
  distinctOn: InputMaybe<Array<BudgetsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<BudgetsOrderBy>>;
  where: InputMaybe<BudgetsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsContributorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsGithubReposArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsGithubReposAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectGithubReposSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectGithubReposOrderBy>>;
  where: InputMaybe<ProjectGithubReposBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsPendingInvitationsArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsPendingInvitationsAggregateArgs = {
  distinctOn: InputMaybe<Array<PendingProjectLeaderInvitationsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PendingProjectLeaderInvitationsOrderBy>>;
  where: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsProjectLeadsArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsProjectLeadsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsProjectSponsorsArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};


/** columns and relationships of "projects" */
export type ProjectsProjectSponsorsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsSponsorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsSponsorsOrderBy>>;
  where: InputMaybe<ProjectsSponsorsBoolExp>;
};

/** aggregated selection of "projects" */
export type ProjectsAggregate = {
  __typename?: 'ProjectsAggregate';
  aggregate: Maybe<ProjectsAggregateFields>;
  nodes: Array<Projects>;
};

/** aggregate fields of "projects" */
export type ProjectsAggregateFields = {
  __typename?: 'ProjectsAggregateFields';
  count: Scalars['Int'];
  max: Maybe<ProjectsMaxFields>;
  min: Maybe<ProjectsMinFields>;
};


/** aggregate fields of "projects" */
export type ProjectsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and: InputMaybe<Array<ProjectsBoolExp>>;
  _not: InputMaybe<ProjectsBoolExp>;
  _or: InputMaybe<Array<ProjectsBoolExp>>;
  applications: InputMaybe<ApplicationsBoolExp>;
  applications_aggregate: InputMaybe<Applications_Aggregate_Bool_Exp>;
  budgets: InputMaybe<BudgetsBoolExp>;
  budgets_aggregate: InputMaybe<Budgets_Aggregate_Bool_Exp>;
  contributors: InputMaybe<ProjectsContributorsViewBoolExp>;
  contributors_aggregate: InputMaybe<Projects_Contributors_View_Aggregate_Bool_Exp>;
  githubRepos: InputMaybe<ProjectGithubReposBoolExp>;
  githubRepos_aggregate: InputMaybe<Project_Github_Repos_Aggregate_Bool_Exp>;
  id: InputMaybe<UuidComparisonExp>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  pendingInvitations_aggregate: InputMaybe<Pending_Project_Leader_Invitations_Aggregate_Bool_Exp>;
  projectDetails: InputMaybe<ProjectDetailsBoolExp>;
  projectLeads: InputMaybe<ProjectLeadsBoolExp>;
  projectLeads_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  projectSponsors: InputMaybe<ProjectsSponsorsBoolExp>;
  projectSponsors_aggregate: InputMaybe<Projects_Sponsors_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "projects" */
export enum ProjectsConstraint {
  /** unique or primary key constraint on columns "id" */
  ProjectsPkey = 'projects_pkey'
}

/** columns and relationships of "projects_contributors_view" */
export type ProjectsContributorsView = {
  __typename?: 'ProjectsContributorsView';
  /** An object relationship */
  githubUser: Maybe<GithubUsers>;
  githubUserId: Maybe<Scalars['bigint']>;
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "projects_contributors_view" */
export type ProjectsContributorsViewAggregate = {
  __typename?: 'ProjectsContributorsViewAggregate';
  aggregate: Maybe<ProjectsContributorsViewAggregateFields>;
  nodes: Array<ProjectsContributorsView>;
};

/** aggregate fields of "projects_contributors_view" */
export type ProjectsContributorsViewAggregateFields = {
  __typename?: 'ProjectsContributorsViewAggregateFields';
  avg: Maybe<ProjectsContributorsViewAvgFields>;
  count: Scalars['Int'];
  max: Maybe<ProjectsContributorsViewMaxFields>;
  min: Maybe<ProjectsContributorsViewMinFields>;
  stddev: Maybe<ProjectsContributorsViewStddevFields>;
  stddevPop: Maybe<ProjectsContributorsViewStddev_PopFields>;
  stddevSamp: Maybe<ProjectsContributorsViewStddev_SampFields>;
  sum: Maybe<ProjectsContributorsViewSumFields>;
  varPop: Maybe<ProjectsContributorsViewVar_PopFields>;
  varSamp: Maybe<ProjectsContributorsViewVar_SampFields>;
  variance: Maybe<ProjectsContributorsViewVarianceFields>;
};


/** aggregate fields of "projects_contributors_view" */
export type ProjectsContributorsViewAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "projects_contributors_view" */
export type ProjectsContributorsViewAggregateOrderBy = {
  avg: InputMaybe<Projects_Contributors_View_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Contributors_View_Max_Order_By>;
  min: InputMaybe<Projects_Contributors_View_Min_Order_By>;
  stddev: InputMaybe<Projects_Contributors_View_Stddev_Order_By>;
  stddev_pop: InputMaybe<Projects_Contributors_View_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Projects_Contributors_View_Stddev_Samp_Order_By>;
  sum: InputMaybe<Projects_Contributors_View_Sum_Order_By>;
  var_pop: InputMaybe<Projects_Contributors_View_Var_Pop_Order_By>;
  var_samp: InputMaybe<Projects_Contributors_View_Var_Samp_Order_By>;
  variance: InputMaybe<Projects_Contributors_View_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "projects_contributors_view" */
export type ProjectsContributorsViewArrRelInsertInput = {
  data: Array<ProjectsContributorsViewInsertInput>;
};

/** aggregate avg on columns */
export type ProjectsContributorsViewAvgFields = {
  __typename?: 'ProjectsContributorsViewAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "projects_contributors_view". All fields are combined with a logical 'AND'. */
export type ProjectsContributorsViewBoolExp = {
  _and: InputMaybe<Array<ProjectsContributorsViewBoolExp>>;
  _not: InputMaybe<ProjectsContributorsViewBoolExp>;
  _or: InputMaybe<Array<ProjectsContributorsViewBoolExp>>;
  githubUser: InputMaybe<GithubUsersBoolExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
};

/** input type for inserting data into table "projects_contributors_view" */
export type ProjectsContributorsViewInsertInput = {
  githubUser: InputMaybe<GithubUsersObjRelInsertInput>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  project: InputMaybe<ProjectsObjRelInsertInput>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type ProjectsContributorsViewMaxFields = {
  __typename?: 'ProjectsContributorsViewMaxFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectsContributorsViewMinFields = {
  __typename?: 'ProjectsContributorsViewMinFields';
  githubUserId: Maybe<Scalars['bigint']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "projects_contributors_view". */
export type ProjectsContributorsViewOrderBy = {
  githubUser: InputMaybe<GithubUsersOrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** select columns of table "projects_contributors_view" */
export enum ProjectsContributorsViewSelectColumn {
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  ProjectId = 'projectId'
}

/** aggregate stddev on columns */
export type ProjectsContributorsViewStddevFields = {
  __typename?: 'ProjectsContributorsViewStddevFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type ProjectsContributorsViewStddev_PopFields = {
  __typename?: 'ProjectsContributorsViewStddev_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type ProjectsContributorsViewStddev_SampFields = {
  __typename?: 'ProjectsContributorsViewStddev_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type ProjectsContributorsViewSumFields = {
  __typename?: 'ProjectsContributorsViewSumFields';
  githubUserId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type ProjectsContributorsViewVar_PopFields = {
  __typename?: 'ProjectsContributorsViewVar_popFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type ProjectsContributorsViewVar_SampFields = {
  __typename?: 'ProjectsContributorsViewVar_sampFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type ProjectsContributorsViewVarianceFields = {
  __typename?: 'ProjectsContributorsViewVarianceFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** input type for inserting data into table "projects" */
export type ProjectsInsertInput = {
  applications: InputMaybe<ApplicationsArrRelInsertInput>;
  budgets: InputMaybe<BudgetsArrRelInsertInput>;
  contributors: InputMaybe<ProjectsContributorsViewArrRelInsertInput>;
  githubRepos: InputMaybe<ProjectGithubReposArrRelInsertInput>;
  id: InputMaybe<Scalars['uuid']>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsArrRelInsertInput>;
  projectDetails: InputMaybe<ProjectDetailsObjRelInsertInput>;
  projectLeads: InputMaybe<ProjectLeadsArrRelInsertInput>;
  projectSponsors: InputMaybe<ProjectsSponsorsArrRelInsertInput>;
};

/** aggregate max on columns */
export type ProjectsMaxFields = {
  __typename?: 'ProjectsMaxFields';
  id: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type ProjectsMinFields = {
  __typename?: 'ProjectsMinFields';
  id: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "projects" */
export type ProjectsMutationResponse = {
  __typename?: 'ProjectsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Projects>;
};

/** input type for inserting object relation for remote table "projects" */
export type ProjectsObjRelInsertInput = {
  data: ProjectsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<ProjectsOnConflict>;
};

/** on_conflict condition type for table "projects" */
export type ProjectsOnConflict = {
  constraint: ProjectsConstraint;
  update_columns: Array<ProjectsUpdateColumn>;
  where: InputMaybe<ProjectsBoolExp>;
};

/** Ordering options when selecting data from "projects". */
export type ProjectsOrderBy = {
  applicationsAggregate: InputMaybe<ApplicationsAggregateOrderBy>;
  budgetsAggregate: InputMaybe<BudgetsAggregateOrderBy>;
  contributorsAggregate: InputMaybe<ProjectsContributorsViewAggregateOrderBy>;
  githubReposAggregate: InputMaybe<ProjectGithubReposAggregateOrderBy>;
  id: InputMaybe<OrderBy>;
  pendingInvitationsAggregate: InputMaybe<PendingProjectLeaderInvitationsAggregateOrderBy>;
  projectDetails: InputMaybe<ProjectDetailsOrderBy>;
  projectLeadsAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  projectSponsorsAggregate: InputMaybe<ProjectsSponsorsAggregateOrderBy>;
};

/** primary key columns input for table: projects */
export type ProjectsPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "projects" */
export enum ProjectsSelectColumn {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "projects" */
export type ProjectsSetInput = {
  id: InputMaybe<Scalars['uuid']>;
};

/** columns and relationships of "projects_sponsors" */
export type ProjectsSponsors = {
  __typename?: 'ProjectsSponsors';
  /** An object relationship */
  project: Projects;
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
  project: InputMaybe<ProjectsBoolExp>;
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
  project: InputMaybe<ProjectsObjRelInsertInput>;
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
  project: InputMaybe<ProjectsOrderBy>;
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

/** update columns of table "projects" */
export enum ProjectsUpdateColumn {
  /** column name */
  Id = 'id'
}

export type ProjectsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<ProjectsSetInput>;
  where: ProjectsBoolExp;
};

export type Reason = {
  workItems: Array<WorkItem>;
};

/** columns and relationships of "registered_users" */
export type RegisteredUsers = {
  __typename?: 'RegisteredUsers';
  avatarUrl: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
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
  userInfo: Maybe<UserInfo>;
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
  avatarUrl: InputMaybe<StringComparisonExp>;
  email: InputMaybe<CitextComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  lastSeen: InputMaybe<TimestamptzComparisonExp>;
  login: InputMaybe<StringComparisonExp>;
  paymentRequests: InputMaybe<PaymentRequestsBoolExp>;
  paymentRequests_aggregate: InputMaybe<Payment_Requests_Aggregate_Bool_Exp>;
  projectsLeaded: InputMaybe<ProjectLeadsBoolExp>;
  projectsLeaded_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  userInfo: InputMaybe<UserInfoBoolExp>;
};

/** input type for inserting data into table "registered_users" */
export type RegisteredUsersInsertInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
  login: InputMaybe<Scalars['String']>;
  paymentRequests: InputMaybe<PaymentRequestsArrRelInsertInput>;
  projectsLeaded: InputMaybe<ProjectLeadsArrRelInsertInput>;
  userInfo: InputMaybe<UserInfoObjRelInsertInput>;
};

/** aggregate max on columns */
export type RegisteredUsersMaxFields = {
  __typename?: 'RegisteredUsersMaxFields';
  avatarUrl: Maybe<Scalars['String']>;
  email: Maybe<Scalars['citext']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
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
  lastSeen: Maybe<Scalars['timestamptz']>;
  login: Maybe<Scalars['String']>;
};

/** input type for inserting object relation for remote table "registered_users" */
export type RegisteredUsersObjRelInsertInput = {
  data: RegisteredUsersInsertInput;
};

/** Ordering options when selecting data from "registered_users". */
export type RegisteredUsersOrderBy = {
  avatarUrl: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  login: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  projectsLeadedAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  userInfo: InputMaybe<UserInfoOrderBy>;
};

/** select columns of table "registered_users" */
export enum RegisteredUsersSelectColumn {
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

export enum Status {
  Cancelled = 'CANCELLED',
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  Merged = 'MERGED',
  Open = 'OPEN'
}

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

export enum Type {
  Issue = 'ISSUE',
  PullRequest = 'PULL_REQUEST'
}

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['Url'];
  htmlUrl: Scalars['Url'];
  id: Scalars['GithubUserId'];
  login: Scalars['String'];
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  user: Maybe<RegisteredUsers>;
};


export type UserPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


export type UserPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};

/** columns and relationships of "user_contribution_counts" */
export type UserContributionCounts = {
  __typename?: 'UserContributionCounts';
  count: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregated selection of "user_contribution_counts" */
export type UserContributionCountsAggregate = {
  __typename?: 'UserContributionCountsAggregate';
  aggregate: Maybe<UserContributionCountsAggregateFields>;
  nodes: Array<UserContributionCounts>;
};

/** aggregate fields of "user_contribution_counts" */
export type UserContributionCountsAggregateFields = {
  __typename?: 'UserContributionCountsAggregateFields';
  avg: Maybe<UserContributionCountsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<UserContributionCountsMaxFields>;
  min: Maybe<UserContributionCountsMinFields>;
  stddev: Maybe<UserContributionCountsStddevFields>;
  stddevPop: Maybe<UserContributionCountsStddev_PopFields>;
  stddevSamp: Maybe<UserContributionCountsStddev_SampFields>;
  sum: Maybe<UserContributionCountsSumFields>;
  varPop: Maybe<UserContributionCountsVar_PopFields>;
  varSamp: Maybe<UserContributionCountsVar_SampFields>;
  variance: Maybe<UserContributionCountsVarianceFields>;
};


/** aggregate fields of "user_contribution_counts" */
export type UserContributionCountsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserContributionCountsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type UserContributionCountsAvgFields = {
  __typename?: 'UserContributionCountsAvgFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_contribution_counts". All fields are combined with a logical 'AND'. */
export type UserContributionCountsBoolExp = {
  _and: InputMaybe<Array<UserContributionCountsBoolExp>>;
  _not: InputMaybe<UserContributionCountsBoolExp>;
  _or: InputMaybe<Array<UserContributionCountsBoolExp>>;
  count: InputMaybe<BigintComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  week: InputMaybe<Float8ComparisonExp>;
  year: InputMaybe<Float8ComparisonExp>;
};

/** aggregate max on columns */
export type UserContributionCountsMaxFields = {
  __typename?: 'UserContributionCountsMaxFields';
  count: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregate min on columns */
export type UserContributionCountsMinFields = {
  __typename?: 'UserContributionCountsMinFields';
  count: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** Ordering options when selecting data from "user_contribution_counts". */
export type UserContributionCountsOrderBy = {
  count: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  week: InputMaybe<OrderBy>;
  year: InputMaybe<OrderBy>;
};

/** select columns of table "user_contribution_counts" */
export enum UserContributionCountsSelectColumn {
  /** column name */
  Count = 'count',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  Week = 'week',
  /** column name */
  Year = 'year'
}

/** aggregate stddev on columns */
export type UserContributionCountsStddevFields = {
  __typename?: 'UserContributionCountsStddevFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UserContributionCountsStddev_PopFields = {
  __typename?: 'UserContributionCountsStddev_popFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UserContributionCountsStddev_SampFields = {
  __typename?: 'UserContributionCountsStddev_sampFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UserContributionCountsSumFields = {
  __typename?: 'UserContributionCountsSumFields';
  count: Maybe<Scalars['bigint']>;
  githubUserId: Maybe<Scalars['bigint']>;
  week: Maybe<Scalars['float8']>;
  year: Maybe<Scalars['float8']>;
};

/** aggregate var_pop on columns */
export type UserContributionCountsVar_PopFields = {
  __typename?: 'UserContributionCountsVar_popFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UserContributionCountsVar_SampFields = {
  __typename?: 'UserContributionCountsVar_sampFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UserContributionCountsVarianceFields = {
  __typename?: 'UserContributionCountsVarianceFields';
  count: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  week: Maybe<Scalars['Float']>;
  year: Maybe<Scalars['Float']>;
};

/** columns and relationships of "user_contribution_projects" */
export type UserContributionProjects = {
  __typename?: 'UserContributionProjects';
  contributionCount: Maybe<Scalars['numeric']>;
  githubUserId: Maybe<Scalars['bigint']>;
  maxContributionDate: Maybe<Scalars['timestamp']>;
  minContributionDate: Maybe<Scalars['timestamp']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregated selection of "user_contribution_projects" */
export type UserContributionProjectsAggregate = {
  __typename?: 'UserContributionProjectsAggregate';
  aggregate: Maybe<UserContributionProjectsAggregateFields>;
  nodes: Array<UserContributionProjects>;
};

/** aggregate fields of "user_contribution_projects" */
export type UserContributionProjectsAggregateFields = {
  __typename?: 'UserContributionProjectsAggregateFields';
  avg: Maybe<UserContributionProjectsAvgFields>;
  count: Scalars['Int'];
  max: Maybe<UserContributionProjectsMaxFields>;
  min: Maybe<UserContributionProjectsMinFields>;
  stddev: Maybe<UserContributionProjectsStddevFields>;
  stddevPop: Maybe<UserContributionProjectsStddev_PopFields>;
  stddevSamp: Maybe<UserContributionProjectsStddev_SampFields>;
  sum: Maybe<UserContributionProjectsSumFields>;
  varPop: Maybe<UserContributionProjectsVar_PopFields>;
  varSamp: Maybe<UserContributionProjectsVar_SampFields>;
  variance: Maybe<UserContributionProjectsVarianceFields>;
};


/** aggregate fields of "user_contribution_projects" */
export type UserContributionProjectsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_contribution_projects" */
export type UserContributionProjectsAggregateOrderBy = {
  avg: InputMaybe<User_Contribution_Projects_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<User_Contribution_Projects_Max_Order_By>;
  min: InputMaybe<User_Contribution_Projects_Min_Order_By>;
  stddev: InputMaybe<User_Contribution_Projects_Stddev_Order_By>;
  stddev_pop: InputMaybe<User_Contribution_Projects_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<User_Contribution_Projects_Stddev_Samp_Order_By>;
  sum: InputMaybe<User_Contribution_Projects_Sum_Order_By>;
  var_pop: InputMaybe<User_Contribution_Projects_Var_Pop_Order_By>;
  var_samp: InputMaybe<User_Contribution_Projects_Var_Samp_Order_By>;
  variance: InputMaybe<User_Contribution_Projects_Variance_Order_By>;
};

/** aggregate avg on columns */
export type UserContributionProjectsAvgFields = {
  __typename?: 'UserContributionProjectsAvgFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_contribution_projects". All fields are combined with a logical 'AND'. */
export type UserContributionProjectsBoolExp = {
  _and: InputMaybe<Array<UserContributionProjectsBoolExp>>;
  _not: InputMaybe<UserContributionProjectsBoolExp>;
  _or: InputMaybe<Array<UserContributionProjectsBoolExp>>;
  contributionCount: InputMaybe<NumericComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  maxContributionDate: InputMaybe<TimestampComparisonExp>;
  minContributionDate: InputMaybe<TimestampComparisonExp>;
  moneyGranted: InputMaybe<NumericComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
};

/** aggregate max on columns */
export type UserContributionProjectsMaxFields = {
  __typename?: 'UserContributionProjectsMaxFields';
  contributionCount: Maybe<Scalars['numeric']>;
  githubUserId: Maybe<Scalars['bigint']>;
  maxContributionDate: Maybe<Scalars['timestamp']>;
  minContributionDate: Maybe<Scalars['timestamp']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type UserContributionProjectsMinFields = {
  __typename?: 'UserContributionProjectsMinFields';
  contributionCount: Maybe<Scalars['numeric']>;
  githubUserId: Maybe<Scalars['bigint']>;
  maxContributionDate: Maybe<Scalars['timestamp']>;
  minContributionDate: Maybe<Scalars['timestamp']>;
  moneyGranted: Maybe<Scalars['numeric']>;
  projectId: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "user_contribution_projects". */
export type UserContributionProjectsOrderBy = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  maxContributionDate: InputMaybe<OrderBy>;
  minContributionDate: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** select columns of table "user_contribution_projects" */
export enum UserContributionProjectsSelectColumn {
  /** column name */
  ContributionCount = 'contributionCount',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  MaxContributionDate = 'maxContributionDate',
  /** column name */
  MinContributionDate = 'minContributionDate',
  /** column name */
  MoneyGranted = 'moneyGranted',
  /** column name */
  ProjectId = 'projectId'
}

/** aggregate stddev on columns */
export type UserContributionProjectsStddevFields = {
  __typename?: 'UserContributionProjectsStddevFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type UserContributionProjectsStddev_PopFields = {
  __typename?: 'UserContributionProjectsStddev_popFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type UserContributionProjectsStddev_SampFields = {
  __typename?: 'UserContributionProjectsStddev_sampFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type UserContributionProjectsSumFields = {
  __typename?: 'UserContributionProjectsSumFields';
  contributionCount: Maybe<Scalars['numeric']>;
  githubUserId: Maybe<Scalars['bigint']>;
  moneyGranted: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type UserContributionProjectsVar_PopFields = {
  __typename?: 'UserContributionProjectsVar_popFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type UserContributionProjectsVar_SampFields = {
  __typename?: 'UserContributionProjectsVar_sampFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type UserContributionProjectsVarianceFields = {
  __typename?: 'UserContributionProjectsVarianceFields';
  contributionCount: Maybe<Scalars['Float']>;
  githubUserId: Maybe<Scalars['Float']>;
  moneyGranted: Maybe<Scalars['Float']>;
};

/** columns and relationships of "user_info" */
export type UserInfo = {
  __typename?: 'UserInfo';
  arePayoutSettingsValid: Scalars['Boolean'];
  contactInformation: Maybe<Scalars['jsonb']>;
  identity: Maybe<Scalars['jsonb']>;
  location: Maybe<Scalars['jsonb']>;
  payoutSettings: Maybe<Scalars['jsonb']>;
  userId: Scalars['uuid'];
};


/** columns and relationships of "user_info" */
export type UserInfoContactInformationArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_info" */
export type UserInfoIdentityArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_info" */
export type UserInfoLocationArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_info" */
export type UserInfoPayoutSettingsArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "user_info" */
export type UserInfoAggregate = {
  __typename?: 'UserInfoAggregate';
  aggregate: Maybe<UserInfoAggregateFields>;
  nodes: Array<UserInfo>;
};

/** aggregate fields of "user_info" */
export type UserInfoAggregateFields = {
  __typename?: 'UserInfoAggregateFields';
  count: Scalars['Int'];
  max: Maybe<UserInfoMaxFields>;
  min: Maybe<UserInfoMinFields>;
};


/** aggregate fields of "user_info" */
export type UserInfoAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserInfoSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UserInfoAppendInput = {
  contactInformation: InputMaybe<Scalars['jsonb']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type UserInfoBoolExp = {
  _and: InputMaybe<Array<UserInfoBoolExp>>;
  _not: InputMaybe<UserInfoBoolExp>;
  _or: InputMaybe<Array<UserInfoBoolExp>>;
  arePayoutSettingsValid: InputMaybe<BooleanComparisonExp>;
  contactInformation: InputMaybe<JsonbComparisonExp>;
  identity: InputMaybe<JsonbComparisonExp>;
  location: InputMaybe<JsonbComparisonExp>;
  payoutSettings: InputMaybe<JsonbComparisonExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "user_info" */
export enum UserInfoConstraint {
  /** unique or primary key constraint on columns "user_id" */
  UserInfoPkey = 'user_info_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type UserInfoDeleteAtPathInput = {
  contactInformation: InputMaybe<Array<Scalars['String']>>;
  identity: InputMaybe<Array<Scalars['String']>>;
  location: InputMaybe<Array<Scalars['String']>>;
  payoutSettings: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserInfoDeleteElemInput = {
  contactInformation: InputMaybe<Scalars['Int']>;
  identity: InputMaybe<Scalars['Int']>;
  location: InputMaybe<Scalars['Int']>;
  payoutSettings: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserInfoDeleteKeyInput = {
  contactInformation: InputMaybe<Scalars['String']>;
  identity: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  payoutSettings: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "user_info" */
export type UserInfoInsertInput = {
  contactInformation: InputMaybe<Scalars['jsonb']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type UserInfoMaxFields = {
  __typename?: 'UserInfoMaxFields';
  userId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type UserInfoMinFields = {
  __typename?: 'UserInfoMinFields';
  userId: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "user_info" */
export type UserInfoMutationResponse = {
  __typename?: 'UserInfoMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserInfo>;
};

/** input type for inserting object relation for remote table "user_info" */
export type UserInfoObjRelInsertInput = {
  data: UserInfoInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<UserInfoOnConflict>;
};

/** on_conflict condition type for table "user_info" */
export type UserInfoOnConflict = {
  constraint: UserInfoConstraint;
  update_columns: Array<UserInfoUpdateColumn>;
  where: InputMaybe<UserInfoBoolExp>;
};

/** Ordering options when selecting data from "user_info". */
export type UserInfoOrderBy = {
  arePayoutSettingsValid: InputMaybe<OrderBy>;
  contactInformation: InputMaybe<OrderBy>;
  identity: InputMaybe<OrderBy>;
  location: InputMaybe<OrderBy>;
  payoutSettings: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: user_info */
export type UserInfoPkColumnsInput = {
  userId: Scalars['uuid'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type UserInfoPrependInput = {
  contactInformation: InputMaybe<Scalars['jsonb']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "user_info" */
export enum UserInfoSelectColumn {
  /** column name */
  ArePayoutSettingsValid = 'arePayoutSettingsValid',
  /** column name */
  ContactInformation = 'contactInformation',
  /** column name */
  Identity = 'identity',
  /** column name */
  Location = 'location',
  /** column name */
  PayoutSettings = 'payoutSettings',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "user_info" */
export type UserInfoSetInput = {
  contactInformation: InputMaybe<Scalars['jsonb']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_info" */
export enum UserInfoUpdateColumn {
  /** column name */
  ContactInformation = 'contactInformation',
  /** column name */
  Identity = 'identity',
  /** column name */
  Location = 'location',
  /** column name */
  PayoutSettings = 'payoutSettings',
  /** column name */
  UserId = 'userId'
}

export type UserInfoUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<UserInfoAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<UserInfoDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<UserInfoDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<UserInfoDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<UserInfoPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<UserInfoSetInput>;
  where: UserInfoBoolExp;
};

/** columns and relationships of "user_profiles" */
export type UserProfiles = {
  __typename?: 'UserProfiles';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  discord: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  languages: Maybe<Scalars['jsonb']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  /** An array relationship */
  projects: Array<UserContributionProjects>;
  /** An aggregate relationship */
  projectsAggregate: UserContributionProjectsAggregate;
  /** An array relationship */
  projectsLeaded: Array<ProjectLeads>;
  /** An aggregate relationship */
  projectsLeadedAggregate: ProjectLeadsAggregate;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
};


/** columns and relationships of "user_profiles" */
export type UserProfilesLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "user_profiles" */
export type UserProfilesProjectsArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


/** columns and relationships of "user_profiles" */
export type UserProfilesProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


/** columns and relationships of "user_profiles" */
export type UserProfilesProjectsLeadedArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};


/** columns and relationships of "user_profiles" */
export type UserProfilesProjectsLeadedAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};

/** aggregated selection of "user_profiles" */
export type UserProfilesAggregate = {
  __typename?: 'UserProfilesAggregate';
  aggregate: Maybe<UserProfilesAggregateFields>;
  nodes: Array<UserProfiles>;
};

/** aggregate fields of "user_profiles" */
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


/** aggregate fields of "user_profiles" */
export type UserProfilesAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<UserProfilesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type UserProfilesAvgFields = {
  __typename?: 'UserProfilesAvgFields';
  githubUserId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user_profiles". All fields are combined with a logical 'AND'. */
export type UserProfilesBoolExp = {
  _and: InputMaybe<Array<UserProfilesBoolExp>>;
  _not: InputMaybe<UserProfilesBoolExp>;
  _or: InputMaybe<Array<UserProfilesBoolExp>>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  bio: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  discord: InputMaybe<StringComparisonExp>;
  email: InputMaybe<StringComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  htmlUrl: InputMaybe<StringComparisonExp>;
  languages: InputMaybe<JsonbComparisonExp>;
  lastSeen: InputMaybe<TimestamptzComparisonExp>;
  linkedin: InputMaybe<StringComparisonExp>;
  location: InputMaybe<StringComparisonExp>;
  login: InputMaybe<StringComparisonExp>;
  projects: InputMaybe<UserContributionProjectsBoolExp>;
  projectsLeaded: InputMaybe<ProjectLeadsBoolExp>;
  projectsLeaded_aggregate: InputMaybe<Project_Leads_Aggregate_Bool_Exp>;
  projects_aggregate: InputMaybe<User_Contribution_Projects_Aggregate_Bool_Exp>;
  telegram: InputMaybe<StringComparisonExp>;
  twitter: InputMaybe<StringComparisonExp>;
  userId: InputMaybe<UuidComparisonExp>;
  website: InputMaybe<StringComparisonExp>;
};

/** aggregate max on columns */
export type UserProfilesMaxFields = {
  __typename?: 'UserProfilesMaxFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  discord: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type UserProfilesMinFields = {
  __typename?: 'UserProfilesMinFields';
  avatarUrl: Maybe<Scalars['String']>;
  bio: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  discord: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  githubUserId: Maybe<Scalars['bigint']>;
  htmlUrl: Maybe<Scalars['String']>;
  lastSeen: Maybe<Scalars['timestamptz']>;
  linkedin: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  login: Maybe<Scalars['String']>;
  telegram: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  userId: Maybe<Scalars['uuid']>;
  website: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "user_profiles". */
export type UserProfilesOrderBy = {
  avatarUrl: InputMaybe<OrderBy>;
  bio: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  discord: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
  lastSeen: InputMaybe<OrderBy>;
  linkedin: InputMaybe<OrderBy>;
  location: InputMaybe<OrderBy>;
  login: InputMaybe<OrderBy>;
  projectsAggregate: InputMaybe<UserContributionProjectsAggregateOrderBy>;
  projectsLeadedAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  telegram: InputMaybe<OrderBy>;
  twitter: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
  website: InputMaybe<OrderBy>;
};

/** select columns of table "user_profiles" */
export enum UserProfilesSelectColumn {
  /** column name */
  AvatarUrl = 'avatarUrl',
  /** column name */
  Bio = 'bio',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Discord = 'discord',
  /** column name */
  Email = 'email',
  /** column name */
  GithubUserId = 'githubUserId',
  /** column name */
  HtmlUrl = 'htmlUrl',
  /** column name */
  Languages = 'languages',
  /** column name */
  LastSeen = 'lastSeen',
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
  UserId = 'userId',
  /** column name */
  Website = 'website'
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
  issueNumber: Scalars['GithubIssueNumber'];
  repoId: Scalars['GithubRepoId'];
};

/** columns and relationships of "work_items" */
export type WorkItems = {
  __typename?: 'WorkItems';
  githubIssue: Maybe<Issue>;
  ignoredForProjects: Array<IgnoredGithubIssues>;
  ignoredForProjectsAggregate: IgnoredGithubIssuesAggregate;
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};


/** columns and relationships of "work_items" */
export type WorkItemsIgnoredForProjectsArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


/** columns and relationships of "work_items" */
export type WorkItemsIgnoredForProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};

/** aggregated selection of "work_items" */
export type WorkItemsAggregate = {
  __typename?: 'WorkItemsAggregate';
  aggregate: Maybe<WorkItemsAggregateFields>;
  nodes: Array<WorkItems>;
};

/** aggregate fields of "work_items" */
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


/** aggregate fields of "work_items" */
export type WorkItemsAggregateFieldsCountArgs = {
  columns: InputMaybe<Array<WorkItemsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "work_items" */
export type WorkItemsAggregateOrderBy = {
  avg: InputMaybe<Work_Items_Avg_Order_By>;
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Work_Items_Max_Order_By>;
  min: InputMaybe<Work_Items_Min_Order_By>;
  stddev: InputMaybe<Work_Items_Stddev_Order_By>;
  stddev_pop: InputMaybe<Work_Items_Stddev_Pop_Order_By>;
  stddev_samp: InputMaybe<Work_Items_Stddev_Samp_Order_By>;
  sum: InputMaybe<Work_Items_Sum_Order_By>;
  var_pop: InputMaybe<Work_Items_Var_Pop_Order_By>;
  var_samp: InputMaybe<Work_Items_Var_Samp_Order_By>;
  variance: InputMaybe<Work_Items_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "work_items" */
export type WorkItemsArrRelInsertInput = {
  data: Array<WorkItemsInsertInput>;
  /** upsert condition */
  onConflict: InputMaybe<WorkItemsOnConflict>;
};

/** aggregate avg on columns */
export type WorkItemsAvgFields = {
  __typename?: 'WorkItemsAvgFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "work_items". All fields are combined with a logical 'AND'. */
export type WorkItemsBoolExp = {
  _and: InputMaybe<Array<WorkItemsBoolExp>>;
  _not: InputMaybe<WorkItemsBoolExp>;
  _or: InputMaybe<Array<WorkItemsBoolExp>>;
  ignoredForProjects: InputMaybe<IgnoredGithubIssuesBoolExp>;
  ignoredForProjects_aggregate: InputMaybe<Ignored_Github_Issues_Aggregate_Bool_Exp>;
  issueNumber: InputMaybe<BigintComparisonExp>;
  paymentId: InputMaybe<UuidComparisonExp>;
  repoId: InputMaybe<BigintComparisonExp>;
};

/** unique or primary key constraints on table "work_items" */
export enum WorkItemsConstraint {
  /** unique or primary key constraint on columns "issue_number", "payment_id", "repo_id" */
  WorkItemsPkey = 'work_items_pkey'
}

/** input type for incrementing numeric columns in table "work_items" */
export type WorkItemsIncInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "work_items" */
export type WorkItemsInsertInput = {
  ignoredForProjects: InputMaybe<IgnoredGithubIssuesArrRelInsertInput>;
  issueNumber: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** aggregate max on columns */
export type WorkItemsMaxFields = {
  __typename?: 'WorkItemsMaxFields';
  issueNumber: Maybe<Scalars['bigint']>;
  paymentId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type WorkItemsMinFields = {
  __typename?: 'WorkItemsMinFields';
  issueNumber: Maybe<Scalars['bigint']>;
  paymentId: Maybe<Scalars['uuid']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "work_items" */
export type WorkItemsMutationResponse = {
  __typename?: 'WorkItemsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkItems>;
};

/** on_conflict condition type for table "work_items" */
export type WorkItemsOnConflict = {
  constraint: WorkItemsConstraint;
  update_columns: Array<WorkItemsUpdateColumn>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** Ordering options when selecting data from "work_items". */
export type WorkItemsOrderBy = {
  ignoredForProjectsAggregate: InputMaybe<IgnoredGithubIssuesAggregateOrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** primary key columns input for table: work_items */
export type WorkItemsPkColumnsInput = {
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};

/** select columns of table "work_items" */
export enum WorkItemsSelectColumn {
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  PaymentId = 'paymentId',
  /** column name */
  RepoId = 'repoId'
}

/** input type for updating data in table "work_items" */
export type WorkItemsSetInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** aggregate stddev on columns */
export type WorkItemsStddevFields = {
  __typename?: 'WorkItemsStddevFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type WorkItemsStddev_PopFields = {
  __typename?: 'WorkItemsStddev_popFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type WorkItemsStddev_SampFields = {
  __typename?: 'WorkItemsStddev_sampFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type WorkItemsSumFields = {
  __typename?: 'WorkItemsSumFields';
  issueNumber: Maybe<Scalars['bigint']>;
  repoId: Maybe<Scalars['bigint']>;
};

/** update columns of table "work_items" */
export enum WorkItemsUpdateColumn {
  /** column name */
  IssueNumber = 'issueNumber',
  /** column name */
  PaymentId = 'paymentId',
  /** column name */
  RepoId = 'repoId'
}

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
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type WorkItemsVar_SampFields = {
  __typename?: 'WorkItemsVar_sampFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type WorkItemsVarianceFields = {
  __typename?: 'WorkItemsVarianceFields';
  issueNumber: Maybe<Scalars['Float']>;
  repoId: Maybe<Scalars['Float']>;
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

export type Github_Issues_Aggregate_Bool_Exp = {
  count: InputMaybe<Github_Issues_Aggregate_Bool_Exp_Count>;
};

export type Github_Issues_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<GithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<GithubIssuesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "github_issues" */
export type Github_Issues_Avg_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "github_issues" */
export type Github_Issues_Max_Order_By = {
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  mergedAt: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "github_issues" */
export type Github_Issues_Min_Order_By = {
  authorId: InputMaybe<OrderBy>;
  closedAt: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  htmlUrl: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  mergedAt: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
  title: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "github_issues" */
export type Github_Issues_Stddev_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "github_issues" */
export type Github_Issues_Stddev_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "github_issues" */
export type Github_Issues_Stddev_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "github_issues" */
export type Github_Issues_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Issues_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Issues_StreamCursorValueInput = {
  authorId: InputMaybe<Scalars['bigint']>;
  closedAt: InputMaybe<Scalars['timestamp']>;
  createdAt: InputMaybe<Scalars['timestamp']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  issueNumber: InputMaybe<Scalars['bigint']>;
  mergedAt: InputMaybe<Scalars['timestamp']>;
  repoId: InputMaybe<Scalars['bigint']>;
  status: InputMaybe<Scalars['jsonb']>;
  title: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['jsonb']>;
};

/** order by sum() on columns of table "github_issues" */
export type Github_Issues_Sum_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "github_issues" */
export type Github_Issues_Var_Pop_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "github_issues" */
export type Github_Issues_Var_Samp_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "github_issues" */
export type Github_Issues_Variance_Order_By = {
  authorId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

export type Github_Repos_Contributors_Aggregate_Bool_Exp = {
  count: InputMaybe<Github_Repos_Contributors_Aggregate_Bool_Exp_Count>;
};

export type Github_Repos_Contributors_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<GithubReposContributorsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Avg_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Max_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Min_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Stddev_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Stddev_Pop_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Stddev_Samp_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "github_repos_contributors" */
export type Github_Repos_Contributors_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Repos_Contributors_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Repos_Contributors_StreamCursorValueInput = {
  repoId: InputMaybe<Scalars['bigint']>;
  userId: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Sum_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Var_Pop_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Var_Samp_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "github_repos_contributors" */
export type Github_Repos_Contributors_Variance_Order_By = {
  repoId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "github_repos" */
export type Github_Repos_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Repos_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Repos_StreamCursorValueInput = {
  description: InputMaybe<Scalars['String']>;
  forkCount: InputMaybe<Scalars['Int']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
  stars: InputMaybe<Scalars['Int']>;
  updatedAt: InputMaybe<Scalars['timestamp']>;
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

export type Ignored_Github_Issues_Aggregate_Bool_Exp = {
  count: InputMaybe<Ignored_Github_Issues_Aggregate_Bool_Exp_Count>;
};

export type Ignored_Github_Issues_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<IgnoredGithubIssuesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Avg_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Max_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Min_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Stddev_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Stddev_Pop_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Stddev_Samp_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "ignored_github_issues" */
export type Ignored_Github_Issues_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Ignored_Github_Issues_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Ignored_Github_Issues_StreamCursorValueInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Sum_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Var_Pop_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Var_Samp_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "ignored_github_issues" */
export type Ignored_Github_Issues_Variance_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptProjectLeaderInvitation: Scalars['Boolean'];
  addEthPaymentReceipt: Scalars['Uuid'];
  addFiatPaymentReceipt: Scalars['Uuid'];
  addSponsorToProject: Scalars['Uuid'];
  applyToProject: Scalars['Uuid'];
  cancelPaymentRequest: Payment;
  createIssue: Issue;
  createProject: Scalars['Uuid'];
  createSponsor: Scalars['Uuid'];
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
  /** delete data from the table: "github_issues" */
  deleteGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** delete single row from the table: "github_issues" */
  deleteGithubIssuesByPk: Maybe<GithubIssues>;
  /** delete data from the table: "github_repos" */
  deleteGithubRepos: Maybe<GithubReposMutationResponse>;
  /** delete single row from the table: "github_repos" */
  deleteGithubReposByPk: Maybe<GithubRepos>;
  /** delete data from the table: "github_repos_contributors" */
  deleteGithubReposContributors: Maybe<GithubReposContributorsMutationResponse>;
  /** delete single row from the table: "github_repos_contributors" */
  deleteGithubReposContributorsByPk: Maybe<GithubReposContributors>;
  /** delete data from the table: "github_users" */
  deleteGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** delete single row from the table: "github_users" */
  deleteGithubUsersByPk: Maybe<GithubUsers>;
  /** delete data from the table: "ignored_github_issues" */
  deleteIgnoredGithubIssues: Maybe<IgnoredGithubIssuesMutationResponse>;
  /** delete single row from the table: "ignored_github_issues" */
  deleteIgnoredGithubIssuesByPk: Maybe<IgnoredGithubIssues>;
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
  /** delete data from the table: "project_details" */
  deleteProjectDetails: Maybe<ProjectDetailsMutationResponse>;
  /** delete single row from the table: "project_details" */
  deleteProjectDetailsByPk: Maybe<ProjectDetails>;
  /** delete data from the table: "project_github_repos" */
  deleteProjectGithubRepos: Maybe<ProjectGithubReposMutationResponse>;
  /** delete single row from the table: "project_github_repos" */
  deleteProjectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** delete data from the table: "project_leads" */
  deleteProjectLeads: Maybe<ProjectLeadsMutationResponse>;
  /** delete single row from the table: "project_leads" */
  deleteProjectLeadsByPk: Maybe<ProjectLeads>;
  /** delete data from the table: "projects" */
  deleteProjects: Maybe<ProjectsMutationResponse>;
  /** delete single row from the table: "projects" */
  deleteProjectsByPk: Maybe<Projects>;
  /** delete data from the table: "projects_sponsors" */
  deleteProjectsSponsors: Maybe<ProjectsSponsorsMutationResponse>;
  /** delete single row from the table: "projects_sponsors" */
  deleteProjectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** delete data from the table: "sponsors" */
  deleteSponsors: Maybe<SponsorsMutationResponse>;
  /** delete single row from the table: "sponsors" */
  deleteSponsorsByPk: Maybe<Sponsors>;
  /** delete single row from the table: "auth.users" */
  deleteUser: Maybe<Users>;
  /** delete data from the table: "user_info" */
  deleteUserInfo: Maybe<UserInfoMutationResponse>;
  /** delete single row from the table: "user_info" */
  deleteUserInfoByPk: Maybe<UserInfo>;
  /** delete data from the table: "auth.users" */
  deleteUsers: Maybe<UsersMutationResponse>;
  /** delete data from the table: "work_items" */
  deleteWorkItems: Maybe<WorkItemsMutationResponse>;
  /** delete single row from the table: "work_items" */
  deleteWorkItemsByPk: Maybe<WorkItems>;
  ignoreIssue: Scalars['Boolean'];
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
  /** insert data into the table: "github_issues" */
  insertGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** insert a single row into the table: "github_issues" */
  insertGithubIssuesOne: Maybe<GithubIssues>;
  /** insert data into the table: "github_repos" */
  insertGithubRepos: Maybe<GithubReposMutationResponse>;
  /** insert data into the table: "github_repos_contributors" */
  insertGithubReposContributors: Maybe<GithubReposContributorsMutationResponse>;
  /** insert a single row into the table: "github_repos_contributors" */
  insertGithubReposContributorsOne: Maybe<GithubReposContributors>;
  /** insert a single row into the table: "github_repos" */
  insertGithubReposOne: Maybe<GithubRepos>;
  /** insert data into the table: "github_users" */
  insertGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** insert a single row into the table: "github_users" */
  insertGithubUsersOne: Maybe<GithubUsers>;
  /** insert data into the table: "ignored_github_issues" */
  insertIgnoredGithubIssues: Maybe<IgnoredGithubIssuesMutationResponse>;
  /** insert a single row into the table: "ignored_github_issues" */
  insertIgnoredGithubIssuesOne: Maybe<IgnoredGithubIssues>;
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
  /** insert data into the table: "project_details" */
  insertProjectDetails: Maybe<ProjectDetailsMutationResponse>;
  /** insert a single row into the table: "project_details" */
  insertProjectDetailsOne: Maybe<ProjectDetails>;
  /** insert data into the table: "project_github_repos" */
  insertProjectGithubRepos: Maybe<ProjectGithubReposMutationResponse>;
  /** insert a single row into the table: "project_github_repos" */
  insertProjectGithubReposOne: Maybe<ProjectGithubRepos>;
  /** insert data into the table: "project_leads" */
  insertProjectLeads: Maybe<ProjectLeadsMutationResponse>;
  /** insert a single row into the table: "project_leads" */
  insertProjectLeadsOne: Maybe<ProjectLeads>;
  /** insert data into the table: "projects" */
  insertProjects: Maybe<ProjectsMutationResponse>;
  /** insert a single row into the table: "projects" */
  insertProjectsOne: Maybe<Projects>;
  /** insert data into the table: "projects_sponsors" */
  insertProjectsSponsors: Maybe<ProjectsSponsorsMutationResponse>;
  /** insert a single row into the table: "projects_sponsors" */
  insertProjectsSponsorsOne: Maybe<ProjectsSponsors>;
  /** insert data into the table: "sponsors" */
  insertSponsors: Maybe<SponsorsMutationResponse>;
  /** insert a single row into the table: "sponsors" */
  insertSponsorsOne: Maybe<Sponsors>;
  /** insert a single row into the table: "auth.users" */
  insertUser: Maybe<Users>;
  /** insert data into the table: "user_info" */
  insertUserInfo: Maybe<UserInfoMutationResponse>;
  /** insert a single row into the table: "user_info" */
  insertUserInfoOne: Maybe<UserInfo>;
  /** insert data into the table: "auth.users" */
  insertUsers: Maybe<UsersMutationResponse>;
  /** insert data into the table: "work_items" */
  insertWorkItems: Maybe<WorkItemsMutationResponse>;
  /** insert a single row into the table: "work_items" */
  insertWorkItemsOne: Maybe<WorkItems>;
  internalCreateIssue: Issue;
  inviteProjectLeader: Scalars['Uuid'];
  linkGithubRepo: Scalars['Uuid'];
  markInvoiceAsReceived: Scalars['Int'];
  rejectInvoice: Scalars['Int'];
  removeSponsorFromProject: Scalars['Uuid'];
  requestPayment: Payment;
  unassignProjectLead: Scalars['Boolean'];
  unignoreIssue: Scalars['Boolean'];
  unlinkGithubRepo: Scalars['Uuid'];
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
  /** update data of the table: "github_issues" */
  updateGithubIssues: Maybe<GithubIssuesMutationResponse>;
  /** update single row of the table: "github_issues" */
  updateGithubIssuesByPk: Maybe<GithubIssues>;
  /** update multiples rows of table: "github_issues" */
  updateGithubIssuesMany: Maybe<Array<Maybe<GithubIssuesMutationResponse>>>;
  /** update data of the table: "github_repos" */
  updateGithubRepos: Maybe<GithubReposMutationResponse>;
  /** update single row of the table: "github_repos" */
  updateGithubReposByPk: Maybe<GithubRepos>;
  /** update data of the table: "github_repos_contributors" */
  updateGithubReposContributors: Maybe<GithubReposContributorsMutationResponse>;
  /** update single row of the table: "github_repos_contributors" */
  updateGithubReposContributorsByPk: Maybe<GithubReposContributors>;
  /** update multiples rows of table: "github_repos_contributors" */
  updateGithubReposContributorsMany: Maybe<Array<Maybe<GithubReposContributorsMutationResponse>>>;
  /** update multiples rows of table: "github_repos" */
  updateGithubReposMany: Maybe<Array<Maybe<GithubReposMutationResponse>>>;
  /** update data of the table: "github_users" */
  updateGithubUsers: Maybe<GithubUsersMutationResponse>;
  /** update single row of the table: "github_users" */
  updateGithubUsersByPk: Maybe<GithubUsers>;
  /** update multiples rows of table: "github_users" */
  updateGithubUsersMany: Maybe<Array<Maybe<GithubUsersMutationResponse>>>;
  /** update data of the table: "ignored_github_issues" */
  updateIgnoredGithubIssues: Maybe<IgnoredGithubIssuesMutationResponse>;
  /** update single row of the table: "ignored_github_issues" */
  updateIgnoredGithubIssuesByPk: Maybe<IgnoredGithubIssues>;
  /** update multiples rows of table: "ignored_github_issues" */
  updateIgnoredGithubIssuesMany: Maybe<Array<Maybe<IgnoredGithubIssuesMutationResponse>>>;
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
  /** update data of the table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitations: Maybe<PendingProjectLeaderInvitationsMutationResponse>;
  /** update single row of the table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** update multiples rows of table: "pending_project_leader_invitations" */
  updatePendingProjectLeaderInvitationsMany: Maybe<Array<Maybe<PendingProjectLeaderInvitationsMutationResponse>>>;
  updateProfileInfo: Scalars['Uuid'];
  updateProject: Scalars['Uuid'];
  /** update data of the table: "project_details" */
  updateProjectDetails: Maybe<ProjectDetailsMutationResponse>;
  /** update single row of the table: "project_details" */
  updateProjectDetailsByPk: Maybe<ProjectDetails>;
  /** update multiples rows of table: "project_details" */
  updateProjectDetailsMany: Maybe<Array<Maybe<ProjectDetailsMutationResponse>>>;
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
  /** update data of the table: "projects" */
  updateProjects: Maybe<ProjectsMutationResponse>;
  /** update single row of the table: "projects" */
  updateProjectsByPk: Maybe<Projects>;
  /** update multiples rows of table: "projects" */
  updateProjectsMany: Maybe<Array<Maybe<ProjectsMutationResponse>>>;
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
  /** update single row of the table: "auth.users" */
  updateUser: Maybe<Users>;
  /** update data of the table: "user_info" */
  updateUserInfo: Maybe<UserInfoMutationResponse>;
  /** update single row of the table: "user_info" */
  updateUserInfoByPk: Maybe<UserInfo>;
  /** update multiples rows of table: "user_info" */
  updateUserInfoMany: Maybe<Array<Maybe<UserInfoMutationResponse>>>;
  /** update data of the table: "auth.users" */
  updateUsers: Maybe<UsersMutationResponse>;
  /** update multiples rows of table: "auth.users" */
  updateUsersMany: Maybe<Array<Maybe<UsersMutationResponse>>>;
  /** update data of the table: "work_items" */
  updateWorkItems: Maybe<WorkItemsMutationResponse>;
  /** update single row of the table: "work_items" */
  updateWorkItemsByPk: Maybe<WorkItems>;
  /** update multiples rows of table: "work_items" */
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
  projectId: Scalars['Id'];
};


/** mutation root */
export type Mutation_RootCancelPaymentRequestArgs = {
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootCreateIssueArgs = {
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
export type Mutation_RootDeleteGithubIssuesByPkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeleteGithubReposArgs = {
  where: GithubReposBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubReposByPkArgs = {
  id: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootDeleteGithubReposContributorsArgs = {
  where: GithubReposContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubReposContributorsByPkArgs = {
  repoId: Scalars['bigint'];
  userId: Scalars['bigint'];
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
export type Mutation_RootDeleteIgnoredGithubIssuesArgs = {
  where: IgnoredGithubIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteIgnoredGithubIssuesByPkArgs = {
  issueNumber: Scalars['bigint'];
  projectId: Scalars['uuid'];
  repoId: Scalars['bigint'];
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
export type Mutation_RootDeleteProjectDetailsArgs = {
  where: ProjectDetailsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectDetailsByPkArgs = {
  projectId: Scalars['uuid'];
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
export type Mutation_RootDeleteProjectsArgs = {
  where: ProjectsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteProjectsByPkArgs = {
  id: Scalars['uuid'];
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
export type Mutation_RootDeleteUserArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteUserInfoArgs = {
  where: UserInfoBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserInfoByPkArgs = {
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
export type Mutation_RootDeleteWorkItemsByPkArgs = {
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};


/** mutation root */
export type Mutation_RootIgnoreIssueArgs = {
  issueNumber: Scalars['GithubIssueNumber'];
  projectId: Scalars['Uuid'];
  repoId: Scalars['GithubRepoId'];
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
  onConflict: InputMaybe<GithubIssuesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubIssuesOneArgs = {
  object: GithubIssuesInsertInput;
  onConflict: InputMaybe<GithubIssuesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubReposArgs = {
  objects: Array<GithubReposInsertInput>;
  onConflict: InputMaybe<GithubReposOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubReposContributorsArgs = {
  objects: Array<GithubReposContributorsInsertInput>;
  onConflict: InputMaybe<GithubReposContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubReposContributorsOneArgs = {
  object: GithubReposContributorsInsertInput;
  onConflict: InputMaybe<GithubReposContributorsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubReposOneArgs = {
  object: GithubReposInsertInput;
  onConflict: InputMaybe<GithubReposOnConflict>;
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
export type Mutation_RootInsertIgnoredGithubIssuesArgs = {
  objects: Array<IgnoredGithubIssuesInsertInput>;
  onConflict: InputMaybe<IgnoredGithubIssuesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertIgnoredGithubIssuesOneArgs = {
  object: IgnoredGithubIssuesInsertInput;
  onConflict: InputMaybe<IgnoredGithubIssuesOnConflict>;
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
export type Mutation_RootInsertProjectDetailsArgs = {
  objects: Array<ProjectDetailsInsertInput>;
  onConflict: InputMaybe<ProjectDetailsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectDetailsOneArgs = {
  object: ProjectDetailsInsertInput;
  onConflict: InputMaybe<ProjectDetailsOnConflict>;
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
export type Mutation_RootInsertProjectsArgs = {
  objects: Array<ProjectsInsertInput>;
  onConflict: InputMaybe<ProjectsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertProjectsOneArgs = {
  object: ProjectsInsertInput;
  onConflict: InputMaybe<ProjectsOnConflict>;
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
export type Mutation_RootInsertUserArgs = {
  object: UsersInsertInput;
  onConflict: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserInfoArgs = {
  objects: Array<UserInfoInsertInput>;
  onConflict: InputMaybe<UserInfoOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserInfoOneArgs = {
  object: UserInfoInsertInput;
  onConflict: InputMaybe<UserInfoOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkItemsArgs = {
  objects: Array<WorkItemsInsertInput>;
  onConflict: InputMaybe<WorkItemsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkItemsOneArgs = {
  object: WorkItemsInsertInput;
  onConflict: InputMaybe<WorkItemsOnConflict>;
};


/** mutation root */
export type Mutation_RootInternalCreateIssueArgs = {
  description: Scalars['String'];
  repoId: Scalars['GithubRepoId'];
  title: Scalars['String'];
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
export type Mutation_RootUnassignProjectLeadArgs = {
  projectId: Scalars['Uuid'];
  userId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootUnignoreIssueArgs = {
  issueNumber: Scalars['GithubIssueNumber'];
  projectId: Scalars['Uuid'];
  repoId: Scalars['GithubRepoId'];
};


/** mutation root */
export type Mutation_RootUnlinkGithubRepoArgs = {
  githubRepoId: Scalars['Int'];
  projectId: Scalars['Uuid'];
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
export type Mutation_RootUpdateGithubIssuesByPkArgs = {
  _append: InputMaybe<GithubIssuesAppendInput>;
  _deleteAtPath: InputMaybe<GithubIssuesDeleteAtPathInput>;
  _deleteElem: InputMaybe<GithubIssuesDeleteElemInput>;
  _deleteKey: InputMaybe<GithubIssuesDeleteKeyInput>;
  _inc: InputMaybe<GithubIssuesIncInput>;
  _prepend: InputMaybe<GithubIssuesPrependInput>;
  _set: InputMaybe<GithubIssuesSetInput>;
  pk_columns: GithubIssuesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateGithubIssuesManyArgs = {
  updates: Array<GithubIssuesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposArgs = {
  _append: InputMaybe<GithubReposAppendInput>;
  _deleteAtPath: InputMaybe<GithubReposDeleteAtPathInput>;
  _deleteElem: InputMaybe<GithubReposDeleteElemInput>;
  _deleteKey: InputMaybe<GithubReposDeleteKeyInput>;
  _inc: InputMaybe<GithubReposIncInput>;
  _prepend: InputMaybe<GithubReposPrependInput>;
  _set: InputMaybe<GithubReposSetInput>;
  where: GithubReposBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposByPkArgs = {
  _append: InputMaybe<GithubReposAppendInput>;
  _deleteAtPath: InputMaybe<GithubReposDeleteAtPathInput>;
  _deleteElem: InputMaybe<GithubReposDeleteElemInput>;
  _deleteKey: InputMaybe<GithubReposDeleteKeyInput>;
  _inc: InputMaybe<GithubReposIncInput>;
  _prepend: InputMaybe<GithubReposPrependInput>;
  _set: InputMaybe<GithubReposSetInput>;
  pk_columns: GithubReposPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposContributorsArgs = {
  _inc: InputMaybe<GithubReposContributorsIncInput>;
  _set: InputMaybe<GithubReposContributorsSetInput>;
  where: GithubReposContributorsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposContributorsByPkArgs = {
  _inc: InputMaybe<GithubReposContributorsIncInput>;
  _set: InputMaybe<GithubReposContributorsSetInput>;
  pk_columns: GithubReposContributorsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposContributorsManyArgs = {
  updates: Array<GithubReposContributorsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateGithubReposManyArgs = {
  updates: Array<GithubReposUpdates>;
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
export type Mutation_RootUpdateIgnoredGithubIssuesArgs = {
  _inc: InputMaybe<IgnoredGithubIssuesIncInput>;
  _set: InputMaybe<IgnoredGithubIssuesSetInput>;
  where: IgnoredGithubIssuesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateIgnoredGithubIssuesByPkArgs = {
  _inc: InputMaybe<IgnoredGithubIssuesIncInput>;
  _set: InputMaybe<IgnoredGithubIssuesSetInput>;
  pk_columns: IgnoredGithubIssuesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateIgnoredGithubIssuesManyArgs = {
  updates: Array<IgnoredGithubIssuesUpdates>;
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
export type Mutation_RootUpdateProfileInfoArgs = {
  contactInformation: InputMaybe<ContactInformation>;
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
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
export type Mutation_RootUpdateProjectDetailsArgs = {
  _append: InputMaybe<ProjectDetailsAppendInput>;
  _deleteAtPath: InputMaybe<ProjectDetailsDeleteAtPathInput>;
  _deleteElem: InputMaybe<ProjectDetailsDeleteElemInput>;
  _deleteKey: InputMaybe<ProjectDetailsDeleteKeyInput>;
  _inc: InputMaybe<ProjectDetailsIncInput>;
  _prepend: InputMaybe<ProjectDetailsPrependInput>;
  _set: InputMaybe<ProjectDetailsSetInput>;
  where: ProjectDetailsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectDetailsByPkArgs = {
  _append: InputMaybe<ProjectDetailsAppendInput>;
  _deleteAtPath: InputMaybe<ProjectDetailsDeleteAtPathInput>;
  _deleteElem: InputMaybe<ProjectDetailsDeleteElemInput>;
  _deleteKey: InputMaybe<ProjectDetailsDeleteKeyInput>;
  _inc: InputMaybe<ProjectDetailsIncInput>;
  _prepend: InputMaybe<ProjectDetailsPrependInput>;
  _set: InputMaybe<ProjectDetailsSetInput>;
  pk_columns: ProjectDetailsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectDetailsManyArgs = {
  updates: Array<ProjectDetailsUpdates>;
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
export type Mutation_RootUpdateProjectsArgs = {
  _set: InputMaybe<ProjectsSetInput>;
  where: ProjectsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateProjectsByPkArgs = {
  _set: InputMaybe<ProjectsSetInput>;
  pk_columns: ProjectsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateProjectsManyArgs = {
  updates: Array<ProjectsUpdates>;
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
export type Mutation_RootUpdateUserInfoArgs = {
  _append: InputMaybe<UserInfoAppendInput>;
  _deleteAtPath: InputMaybe<UserInfoDeleteAtPathInput>;
  _deleteElem: InputMaybe<UserInfoDeleteElemInput>;
  _deleteKey: InputMaybe<UserInfoDeleteKeyInput>;
  _prepend: InputMaybe<UserInfoPrependInput>;
  _set: InputMaybe<UserInfoSetInput>;
  where: UserInfoBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserInfoByPkArgs = {
  _append: InputMaybe<UserInfoAppendInput>;
  _deleteAtPath: InputMaybe<UserInfoDeleteAtPathInput>;
  _deleteElem: InputMaybe<UserInfoDeleteElemInput>;
  _deleteKey: InputMaybe<UserInfoDeleteKeyInput>;
  _prepend: InputMaybe<UserInfoPrependInput>;
  _set: InputMaybe<UserInfoSetInput>;
  pk_columns: UserInfoPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserInfoManyArgs = {
  updates: Array<UserInfoUpdates>;
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
export type Mutation_RootUpdateWorkItemsByPkArgs = {
  _inc: InputMaybe<WorkItemsIncInput>;
  _set: InputMaybe<WorkItemsSetInput>;
  pk_columns: WorkItemsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkItemsManyArgs = {
  updates: Array<WorkItemsUpdates>;
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

/** Streaming cursor of the table "project_details" */
export type Project_Details_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Project_Details_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Project_Details_StreamCursorValueInput = {
  hiring: InputMaybe<Scalars['Boolean']>;
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  rank: InputMaybe<Scalars['Int']>;
  shortDescription: InputMaybe<Scalars['String']>;
  telegramLink: InputMaybe<Scalars['String']>;
  visibility: InputMaybe<Scalars['jsonb']>;
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

export type Projects_Contributors_View_Aggregate_Bool_Exp = {
  count: InputMaybe<Projects_Contributors_View_Aggregate_Bool_Exp_Count>;
};

export type Projects_Contributors_View_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<ProjectsContributorsViewBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Avg_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Max_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Min_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Stddev_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Stddev_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Stddev_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "projects_contributors_view" */
export type Projects_Contributors_View_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_Contributors_View_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_Contributors_View_StreamCursorValueInput = {
  githubUserId: InputMaybe<Scalars['bigint']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Sum_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Var_Pop_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Var_Samp_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "projects_contributors_view" */
export type Projects_Contributors_View_Variance_Order_By = {
  githubUserId: InputMaybe<OrderBy>;
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

/** Streaming cursor of the table "projects" */
export type Projects_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_StreamCursorValueInput = {
  id: InputMaybe<Scalars['uuid']>;
};

export type Query_Root = {
  __typename?: 'query_root';
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
  fetchIssue: Maybe<Issue>;
  fetchIssueByRepositoryId: Maybe<Issue>;
  fetchUserDetailsById: Maybe<User>;
  /** fetch data from the table: "github_issues" */
  githubIssues: Array<GithubIssues>;
  /** fetch aggregated fields from the table: "github_issues" */
  githubIssuesAggregate: GithubIssuesAggregate;
  /** fetch data from the table: "github_issues" using primary key columns */
  githubIssuesByPk: Maybe<GithubIssues>;
  /** fetch data from the table: "github_repos" */
  githubRepos: Array<GithubRepos>;
  /** fetch aggregated fields from the table: "github_repos" */
  githubReposAggregate: GithubReposAggregate;
  /** fetch data from the table: "github_repos" using primary key columns */
  githubReposByPk: Maybe<GithubRepos>;
  /** fetch data from the table: "github_repos_contributors" */
  githubReposContributors: Array<GithubReposContributors>;
  /** fetch aggregated fields from the table: "github_repos_contributors" */
  githubReposContributorsAggregate: GithubReposContributorsAggregate;
  /** fetch data from the table: "github_repos_contributors" using primary key columns */
  githubReposContributorsByPk: Maybe<GithubReposContributors>;
  /** fetch data from the table: "github_users" */
  githubUsers: Array<GithubUsers>;
  /** fetch aggregated fields from the table: "github_users" */
  githubUsersAggregate: GithubUsersAggregate;
  /** fetch data from the table: "github_users" using primary key columns */
  githubUsersByPk: Maybe<GithubUsers>;
  hello: Scalars['String'];
  helloFromDustyBot: Scalars['String'];
  /** fetch data from the table: "ignored_github_issues" */
  ignoredGithubIssues: Array<IgnoredGithubIssues>;
  /** fetch aggregated fields from the table: "ignored_github_issues" */
  ignoredGithubIssuesAggregate: IgnoredGithubIssuesAggregate;
  /** fetch data from the table: "ignored_github_issues" using primary key columns */
  ignoredGithubIssuesByPk: Maybe<IgnoredGithubIssues>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk: Maybe<PaymentRequests>;
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
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch aggregated fields from the table: "project_details" */
  projectDetailsAggregate: ProjectDetailsAggregate;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk: Maybe<ProjectDetails>;
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
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projectsAggregate: ProjectsAggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk: Maybe<Projects>;
  /** fetch data from the table: "projects_contributors_view" */
  projectsContributorsView: Array<ProjectsContributorsView>;
  /** fetch aggregated fields from the table: "projects_contributors_view" */
  projectsContributorsViewAggregate: ProjectsContributorsViewAggregate;
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
  searchUsers: Maybe<Array<User>>;
  /** fetch data from the table: "sponsors" */
  sponsors: Array<Sponsors>;
  /** fetch aggregated fields from the table: "sponsors" */
  sponsorsAggregate: SponsorsAggregate;
  /** fetch data from the table: "sponsors" using primary key columns */
  sponsorsByPk: Maybe<Sponsors>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_contribution_counts" */
  userContributionCounts: Array<UserContributionCounts>;
  /** fetch aggregated fields from the table: "user_contribution_counts" */
  userContributionCountsAggregate: UserContributionCountsAggregate;
  /** fetch data from the table: "user_contribution_projects" */
  userContributionProjects: Array<UserContributionProjects>;
  /** fetch aggregated fields from the table: "user_contribution_projects" */
  userContributionProjectsAggregate: UserContributionProjectsAggregate;
  /** fetch data from the table: "user_info" */
  userInfo: Array<UserInfo>;
  /** fetch aggregated fields from the table: "user_info" */
  userInfoAggregate: UserInfoAggregate;
  /** fetch data from the table: "user_info" using primary key columns */
  userInfoByPk: Maybe<UserInfo>;
  /** fetch data from the table: "user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "auth.users" */
  usersAggregate: UsersAggregate;
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** An aggregate relationship */
  workItemsAggregate: WorkItemsAggregate;
  /** fetch data from the table: "work_items" using primary key columns */
  workItemsByPk: Maybe<WorkItems>;
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


export type Query_RootFetchIssueArgs = {
  issueNumber: Scalars['Int'];
  repoName: Scalars['String'];
  repoOwner: Scalars['String'];
};


export type Query_RootFetchIssueByRepositoryIdArgs = {
  issueNumber: Scalars['Int'];
  repositoryId: Scalars['Int'];
};


export type Query_RootFetchUserDetailsByIdArgs = {
  userId: Scalars['Int'];
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


export type Query_RootGithubIssuesByPkArgs = {
  id: Scalars['bigint'];
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


export type Query_RootGithubReposByPkArgs = {
  id: Scalars['bigint'];
};


export type Query_RootGithubReposContributorsArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


export type Query_RootGithubReposContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


export type Query_RootGithubReposContributorsByPkArgs = {
  repoId: Scalars['bigint'];
  userId: Scalars['bigint'];
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


export type Query_RootIgnoredGithubIssuesArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


export type Query_RootIgnoredGithubIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


export type Query_RootIgnoredGithubIssuesByPkArgs = {
  issueNumber: Scalars['bigint'];
  projectId: Scalars['uuid'];
  repoId: Scalars['bigint'];
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


export type Query_RootProjectDetailsArgs = {
  distinctOn: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where: InputMaybe<ProjectDetailsBoolExp>;
};


export type Query_RootProjectDetailsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where: InputMaybe<ProjectDetailsBoolExp>;
};


export type Query_RootProjectDetailsByPkArgs = {
  projectId: Scalars['uuid'];
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


export type Query_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsContributorsViewArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
};


export type Query_RootProjectsContributorsViewAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
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


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserContributionCountsArgs = {
  distinctOn: InputMaybe<Array<UserContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionCountsOrderBy>>;
  where: InputMaybe<UserContributionCountsBoolExp>;
};


export type Query_RootUserContributionCountsAggregateArgs = {
  distinctOn: InputMaybe<Array<UserContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionCountsOrderBy>>;
  where: InputMaybe<UserContributionCountsBoolExp>;
};


export type Query_RootUserContributionProjectsArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


export type Query_RootUserContributionProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


export type Query_RootUserInfoArgs = {
  distinctOn: InputMaybe<Array<UserInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserInfoOrderBy>>;
  where: InputMaybe<UserInfoBoolExp>;
};


export type Query_RootUserInfoAggregateArgs = {
  distinctOn: InputMaybe<Array<UserInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserInfoOrderBy>>;
  where: InputMaybe<UserInfoBoolExp>;
};


export type Query_RootUserInfoByPkArgs = {
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


export type Query_RootWorkItemsByPkArgs = {
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
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
  avatarUrl: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['uuid']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
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
  /** fetch data from the table: "github_issues" */
  githubIssues: Array<GithubIssues>;
  /** fetch aggregated fields from the table: "github_issues" */
  githubIssuesAggregate: GithubIssuesAggregate;
  /** fetch data from the table: "github_issues" using primary key columns */
  githubIssuesByPk: Maybe<GithubIssues>;
  /** fetch data from the table in a streaming manner: "github_issues" */
  githubIssuesStream: Array<GithubIssues>;
  /** fetch data from the table: "github_repos" */
  githubRepos: Array<GithubRepos>;
  /** fetch aggregated fields from the table: "github_repos" */
  githubReposAggregate: GithubReposAggregate;
  /** fetch data from the table: "github_repos" using primary key columns */
  githubReposByPk: Maybe<GithubRepos>;
  /** fetch data from the table: "github_repos_contributors" */
  githubReposContributors: Array<GithubReposContributors>;
  /** fetch aggregated fields from the table: "github_repos_contributors" */
  githubReposContributorsAggregate: GithubReposContributorsAggregate;
  /** fetch data from the table: "github_repos_contributors" using primary key columns */
  githubReposContributorsByPk: Maybe<GithubReposContributors>;
  /** fetch data from the table in a streaming manner: "github_repos_contributors" */
  githubReposContributorsStream: Array<GithubReposContributors>;
  /** fetch data from the table in a streaming manner: "github_repos" */
  githubReposStream: Array<GithubRepos>;
  /** fetch data from the table: "github_users" */
  githubUsers: Array<GithubUsers>;
  /** fetch aggregated fields from the table: "github_users" */
  githubUsersAggregate: GithubUsersAggregate;
  /** fetch data from the table: "github_users" using primary key columns */
  githubUsersByPk: Maybe<GithubUsers>;
  /** fetch data from the table in a streaming manner: "github_users" */
  githubUsersStream: Array<GithubUsers>;
  /** fetch data from the table: "ignored_github_issues" */
  ignoredGithubIssues: Array<IgnoredGithubIssues>;
  /** fetch aggregated fields from the table: "ignored_github_issues" */
  ignoredGithubIssuesAggregate: IgnoredGithubIssuesAggregate;
  /** fetch data from the table: "ignored_github_issues" using primary key columns */
  ignoredGithubIssuesByPk: Maybe<IgnoredGithubIssues>;
  /** fetch data from the table in a streaming manner: "ignored_github_issues" */
  ignoredGithubIssuesStream: Array<IgnoredGithubIssues>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** fetch data from the table: "payment_requests" using primary key columns */
  paymentRequestsByPk: Maybe<PaymentRequests>;
  /** fetch data from the table in a streaming manner: "payment_requests" */
  paymentRequestsStream: Array<PaymentRequests>;
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
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch aggregated fields from the table: "project_details" */
  projectDetailsAggregate: ProjectDetailsAggregate;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk: Maybe<ProjectDetails>;
  /** fetch data from the table in a streaming manner: "project_details" */
  projectDetailsStream: Array<ProjectDetails>;
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
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch aggregated fields from the table: "projects" */
  projectsAggregate: ProjectsAggregate;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk: Maybe<Projects>;
  /** fetch data from the table: "projects_contributors_view" */
  projectsContributorsView: Array<ProjectsContributorsView>;
  /** fetch aggregated fields from the table: "projects_contributors_view" */
  projectsContributorsViewAggregate: ProjectsContributorsViewAggregate;
  /** fetch data from the table in a streaming manner: "projects_contributors_view" */
  projectsContributorsViewStream: Array<ProjectsContributorsView>;
  /** fetch data from the table: "projects_sponsors" */
  projectsSponsors: Array<ProjectsSponsors>;
  /** fetch aggregated fields from the table: "projects_sponsors" */
  projectsSponsorsAggregate: ProjectsSponsorsAggregate;
  /** fetch data from the table: "projects_sponsors" using primary key columns */
  projectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** fetch data from the table in a streaming manner: "projects_sponsors" */
  projectsSponsorsStream: Array<ProjectsSponsors>;
  /** fetch data from the table in a streaming manner: "projects" */
  projectsStream: Array<Projects>;
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
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_contribution_counts" */
  userContributionCounts: Array<UserContributionCounts>;
  /** fetch aggregated fields from the table: "user_contribution_counts" */
  userContributionCountsAggregate: UserContributionCountsAggregate;
  /** fetch data from the table in a streaming manner: "user_contribution_counts" */
  userContributionCountsStream: Array<UserContributionCounts>;
  /** fetch data from the table: "user_contribution_projects" */
  userContributionProjects: Array<UserContributionProjects>;
  /** fetch aggregated fields from the table: "user_contribution_projects" */
  userContributionProjectsAggregate: UserContributionProjectsAggregate;
  /** fetch data from the table in a streaming manner: "user_contribution_projects" */
  userContributionProjectsStream: Array<UserContributionProjects>;
  /** fetch data from the table: "user_info" */
  userInfo: Array<UserInfo>;
  /** fetch aggregated fields from the table: "user_info" */
  userInfoAggregate: UserInfoAggregate;
  /** fetch data from the table: "user_info" using primary key columns */
  userInfoByPk: Maybe<UserInfo>;
  /** fetch data from the table in a streaming manner: "user_info" */
  userInfoStream: Array<UserInfo>;
  /** fetch data from the table: "user_profiles" */
  userProfiles: Array<UserProfiles>;
  /** fetch aggregated fields from the table: "user_profiles" */
  userProfilesAggregate: UserProfilesAggregate;
  /** fetch data from the table in a streaming manner: "user_profiles" */
  userProfilesStream: Array<UserProfiles>;
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
  /** fetch data from the table: "work_items" using primary key columns */
  workItemsByPk: Maybe<WorkItems>;
  /** fetch data from the table in a streaming manner: "work_items" */
  workItemsStream: Array<WorkItems>;
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


export type Subscription_RootGithubIssuesByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootGithubIssuesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Issues_StreamCursorInput>>;
  where: InputMaybe<GithubIssuesBoolExp>;
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


export type Subscription_RootGithubReposByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootGithubReposContributorsArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


export type Subscription_RootGithubReposContributorsAggregateArgs = {
  distinctOn: InputMaybe<Array<GithubReposContributorsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubReposContributorsOrderBy>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


export type Subscription_RootGithubReposContributorsByPkArgs = {
  repoId: Scalars['bigint'];
  userId: Scalars['bigint'];
};


export type Subscription_RootGithubReposContributorsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Repos_Contributors_StreamCursorInput>>;
  where: InputMaybe<GithubReposContributorsBoolExp>;
};


export type Subscription_RootGithubReposStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Repos_StreamCursorInput>>;
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


export type Subscription_RootIgnoredGithubIssuesArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


export type Subscription_RootIgnoredGithubIssuesAggregateArgs = {
  distinctOn: InputMaybe<Array<IgnoredGithubIssuesSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<IgnoredGithubIssuesOrderBy>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
};


export type Subscription_RootIgnoredGithubIssuesByPkArgs = {
  issueNumber: Scalars['bigint'];
  projectId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};


export type Subscription_RootIgnoredGithubIssuesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Ignored_Github_Issues_StreamCursorInput>>;
  where: InputMaybe<IgnoredGithubIssuesBoolExp>;
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


export type Subscription_RootProjectDetailsArgs = {
  distinctOn: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where: InputMaybe<ProjectDetailsBoolExp>;
};


export type Subscription_RootProjectDetailsAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectDetailsOrderBy>>;
  where: InputMaybe<ProjectDetailsBoolExp>;
};


export type Subscription_RootProjectDetailsByPkArgs = {
  projectId: Scalars['uuid'];
};


export type Subscription_RootProjectDetailsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Project_Details_StreamCursorInput>>;
  where: InputMaybe<ProjectDetailsBoolExp>;
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


export type Subscription_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsContributorsViewArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
};


export type Subscription_RootProjectsContributorsViewAggregateArgs = {
  distinctOn: InputMaybe<Array<ProjectsContributorsViewSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectsContributorsViewOrderBy>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
};


export type Subscription_RootProjectsContributorsViewStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_Contributors_View_StreamCursorInput>>;
  where: InputMaybe<ProjectsContributorsViewBoolExp>;
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


export type Subscription_RootProjectsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_StreamCursorInput>>;
  where: InputMaybe<ProjectsBoolExp>;
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


export type Subscription_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUserContributionCountsArgs = {
  distinctOn: InputMaybe<Array<UserContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionCountsOrderBy>>;
  where: InputMaybe<UserContributionCountsBoolExp>;
};


export type Subscription_RootUserContributionCountsAggregateArgs = {
  distinctOn: InputMaybe<Array<UserContributionCountsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionCountsOrderBy>>;
  where: InputMaybe<UserContributionCountsBoolExp>;
};


export type Subscription_RootUserContributionCountsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<User_Contribution_Counts_StreamCursorInput>>;
  where: InputMaybe<UserContributionCountsBoolExp>;
};


export type Subscription_RootUserContributionProjectsArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


export type Subscription_RootUserContributionProjectsAggregateArgs = {
  distinctOn: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserContributionProjectsOrderBy>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


export type Subscription_RootUserContributionProjectsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<User_Contribution_Projects_StreamCursorInput>>;
  where: InputMaybe<UserContributionProjectsBoolExp>;
};


export type Subscription_RootUserInfoArgs = {
  distinctOn: InputMaybe<Array<UserInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserInfoOrderBy>>;
  where: InputMaybe<UserInfoBoolExp>;
};


export type Subscription_RootUserInfoAggregateArgs = {
  distinctOn: InputMaybe<Array<UserInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserInfoOrderBy>>;
  where: InputMaybe<UserInfoBoolExp>;
};


export type Subscription_RootUserInfoByPkArgs = {
  userId: Scalars['uuid'];
};


export type Subscription_RootUserInfoStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<User_Info_StreamCursorInput>>;
  where: InputMaybe<UserInfoBoolExp>;
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


export type Subscription_RootUserProfilesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<User_Profiles_StreamCursorInput>>;
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


export type Subscription_RootWorkItemsByPkArgs = {
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
};


export type Subscription_RootWorkItemsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Work_Items_StreamCursorInput>>;
  where: InputMaybe<WorkItemsBoolExp>;
};

/** Streaming cursor of the table "user_contribution_counts" */
export type User_Contribution_Counts_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Contribution_Counts_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Contribution_Counts_StreamCursorValueInput = {
  count: InputMaybe<Scalars['bigint']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  week: InputMaybe<Scalars['float8']>;
  year: InputMaybe<Scalars['float8']>;
};

export type User_Contribution_Projects_Aggregate_Bool_Exp = {
  count: InputMaybe<User_Contribution_Projects_Aggregate_Bool_Exp_Count>;
};

export type User_Contribution_Projects_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<UserContributionProjectsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<UserContributionProjectsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Avg_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Max_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  maxContributionDate: InputMaybe<OrderBy>;
  minContributionDate: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Min_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  maxContributionDate: InputMaybe<OrderBy>;
  minContributionDate: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Stddev_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Stddev_Pop_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Stddev_Samp_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "user_contribution_projects" */
export type User_Contribution_Projects_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Contribution_Projects_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Contribution_Projects_StreamCursorValueInput = {
  contributionCount: InputMaybe<Scalars['numeric']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  maxContributionDate: InputMaybe<Scalars['timestamp']>;
  minContributionDate: InputMaybe<Scalars['timestamp']>;
  moneyGranted: InputMaybe<Scalars['numeric']>;
  projectId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Sum_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Var_Pop_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Var_Samp_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "user_contribution_projects" */
export type User_Contribution_Projects_Variance_Order_By = {
  contributionCount: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  moneyGranted: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "user_info" */
export type User_Info_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Info_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Info_StreamCursorValueInput = {
  arePayoutSettingsValid: InputMaybe<Scalars['Boolean']>;
  contactInformation: InputMaybe<Scalars['jsonb']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "user_profiles" */
export type User_Profiles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Profiles_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Profiles_StreamCursorValueInput = {
  avatarUrl: InputMaybe<Scalars['String']>;
  bio: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['timestamptz']>;
  discord: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['String']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
  htmlUrl: InputMaybe<Scalars['String']>;
  languages: InputMaybe<Scalars['jsonb']>;
  lastSeen: InputMaybe<Scalars['timestamptz']>;
  linkedin: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  login: InputMaybe<Scalars['String']>;
  telegram: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  userId: InputMaybe<Scalars['uuid']>;
  website: InputMaybe<Scalars['String']>;
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

export type Work_Items_Aggregate_Bool_Exp = {
  count: InputMaybe<Work_Items_Aggregate_Bool_Exp_Count>;
};

export type Work_Items_Aggregate_Bool_Exp_Count = {
  arguments: InputMaybe<Array<WorkItemsSelectColumn>>;
  distinct: InputMaybe<Scalars['Boolean']>;
  filter: InputMaybe<WorkItemsBoolExp>;
  predicate: IntComparisonExp;
};

/** order by avg() on columns of table "work_items" */
export type Work_Items_Avg_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "work_items" */
export type Work_Items_Max_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "work_items" */
export type Work_Items_Min_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  paymentId: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "work_items" */
export type Work_Items_Stddev_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "work_items" */
export type Work_Items_Stddev_Pop_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "work_items" */
export type Work_Items_Stddev_Samp_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "work_items" */
export type Work_Items_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Work_Items_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Work_Items_StreamCursorValueInput = {
  issueNumber: InputMaybe<Scalars['bigint']>;
  paymentId: InputMaybe<Scalars['uuid']>;
  repoId: InputMaybe<Scalars['bigint']>;
};

/** order by sum() on columns of table "work_items" */
export type Work_Items_Sum_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "work_items" */
export type Work_Items_Var_Pop_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "work_items" */
export type Work_Items_Var_Samp_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "work_items" */
export type Work_Items_Variance_Order_By = {
  issueNumber: InputMaybe<OrderBy>;
  repoId: InputMaybe<OrderBy>;
};

export type UserIdentityQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type UserIdentityQuery = { __typename?: 'query_root', userInfo: Array<{ __typename?: 'UserInfo', userId: any, identity: any | null }> };

export type GetPaymentRequestIdsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestIdsQuery = { __typename?: 'query_root', githubUsersByPk: { __typename?: 'GithubUsers', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any }> } | null };

export type UserProfileIdFragment = { __typename?: 'UserProfiles', githubUserId: any | null };

export type UserProfileDetailsFragment = { __typename?: 'UserProfiles', login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, email: string | null, twitter: string | null, telegram: string | null, linkedin: string | null, discord: string | null, website: string | null };

export type ContributionsFragment = { __typename?: 'UserContributionProjects', projectId: any | null, maxContributionDate: any | null, contributionCount: any | null, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } } | null };

export type ProfileProjectFragment = { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } };

export type UserProfileFragment = { __typename?: 'UserProfiles', githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, email: string | null, twitter: string | null, telegram: string | null, linkedin: string | null, discord: string | null, website: string | null, projects: Array<{ __typename?: 'UserContributionProjects', projectId: any | null, maxContributionDate: any | null, contributionCount: any | null, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } } | null }>, projectsAggregate: { __typename?: 'UserContributionProjectsAggregate', aggregate: { __typename?: 'UserContributionProjectsAggregateFields', count: number, sum: { __typename?: 'UserContributionProjectsSumFields', moneyGranted: any | null } | null, min: { __typename?: 'UserContributionProjectsMinFields', minContributionDate: any | null } | null } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } } | null }> };

export type UserProfileQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type UserProfileQuery = { __typename?: 'query_root', userProfiles: Array<{ __typename?: 'UserProfiles', githubUserId: any | null, login: string | null, avatarUrl: string | null, htmlUrl: string | null, location: string | null, bio: string | null, languages: any | null, createdAt: any | null, lastSeen: any | null, email: string | null, twitter: string | null, telegram: string | null, linkedin: string | null, discord: string | null, website: string | null, projects: Array<{ __typename?: 'UserContributionProjects', projectId: any | null, maxContributionDate: any | null, contributionCount: any | null, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } } | null }>, projectsAggregate: { __typename?: 'UserContributionProjectsAggregate', aggregate: { __typename?: 'UserContributionProjectsAggregateFields', count: number, sum: { __typename?: 'UserContributionProjectsSumFields', moneyGranted: any | null } | null, min: { __typename?: 'UserContributionProjectsMinFields', minContributionDate: any | null } | null } | null }, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any, assignedAt: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null, name: string } | null, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null } | null } | null } } | null }> }> };

export type PaymentRequestDetailsFragment = { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', processedAt: any, receipt: any }>, requestor: { __typename?: 'RegisteredUsers', id: any | null, login: string | null, avatarUrl: string | null } | null, liveGithubRecipient: { __typename?: 'User', login: string, avatarUrl: any, htmlUrl: any, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any, githubIssue: { __typename?: 'Issue', repoId: any, number: any, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> } | null }>, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } };

export type PaymentRequestDetailsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type PaymentRequestDetailsQuery = { __typename?: 'query_root', paymentRequestsByPk: { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', processedAt: any, receipt: any }>, requestor: { __typename?: 'RegisteredUsers', id: any | null, login: string | null, avatarUrl: string | null } | null, liveGithubRecipient: { __typename?: 'User', login: string, avatarUrl: any, htmlUrl: any, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any, githubIssue: { __typename?: 'Issue', repoId: any, number: any, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> } | null }>, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } } | null };

export type ProjectCardFieldsFragment = { __typename?: 'Projects', id: any, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null, initialAmount: any | null } | null } | null }, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, telegramLink: string | null, logoUrl: string | null, shortDescription: string, hiring: boolean, rank: number, visibility: any } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, projectId: any, user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, id: any | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any, id: any } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> };

export type ApplicationIdFragment = { __typename?: 'Applications', id: any };

export type ApplicantFragment = { __typename?: 'Applications', applicantId: any, id: any };

export type GithubIssueIdFragment = { __typename?: 'GithubIssues', id: any };

export type GithubIssueFragment = { __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> };

export type GithubRepoIdFragment = { __typename?: 'GithubRepos', id: any };

export type GithubRepoFragment = { __typename?: 'GithubRepos', owner: string, name: string, description: string, stars: number, forkCount: number, htmlUrl: string, languages: any, id: any };

export type GithubRepoLanguagesFragment = { __typename?: 'GithubRepos', languages: any, id: any };

export type GithubUserIdFragment = { __typename?: 'GithubUsers', id: any };

export type GithubUserFragment = { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type GithubUserWithPaymentRequestsForProjectFragment = { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type IgnoredGithubIssueIdFragment = { __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any };

export type PaymentRequestIdFragment = { __typename?: 'PaymentRequests', id: any };

export type PaymentRequestFragment = { __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } };

export type ExtendedPaymentRequestFragment = { __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } };

export type ProjectIdFragment = { __typename?: 'Projects', id: any };

export type ProjectContributorsFragment = { __typename?: 'Projects', id: any, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoContributors: Array<{ __typename?: 'GithubReposContributors', user: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> }> };

export type LastProjectMergedPullRequestsFragment = { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> }> }> };

export type ProjectPaidWorkItemsFragment = { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, id: any, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }> }> }> };

export type ProjectContributorsWithPaymentSummaryFragment = { __typename?: 'Projects', contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> };

export type ProjectVisibilityDetailsFragment = { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, visibility: any } | null, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> };

export type SponsorIdFragment = { __typename?: 'Sponsors', id: any };

export type SponsorFragment = { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any };

export type UserIdFragment = { __typename?: 'RegisteredUsers', id: any | null };

export type ProjectLeadFragment = { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, id: any | null };

export type WorkItemIdFragment = { __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any };

export type WorkItemFragment = { __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any };

export type LiveGithubIssueIdFragment = { __typename?: 'Issue', id: any };

export type LiveGithubIssueFragment = { __typename?: 'Issue', repoId: any, number: any, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> };

export type LiveGithubUserIdFragment = { __typename?: 'User', id: any };

export type LiveGithubUserFragment = { __typename?: 'User', login: string, avatarUrl: any, htmlUrl: any, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type LiveGithubUserWithPaymentRequestsForProjectFragment = { __typename?: 'User', login: string, avatarUrl: any, htmlUrl: any, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null };

export type ImpersonatedUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type ImpersonatedUserQuery = { __typename?: 'query_root', user: { __typename?: 'users', id: any, createdAt: any, email: any | null, locale: string, isAnonymous: boolean, defaultRole: string, emailVerified: boolean, phoneNumber: string | null, phoneNumberVerified: boolean, activeMfaType: string | null, roles: Array<{ __typename?: 'authUserRoles', role: string }>, registeredUser: { __typename?: 'RegisteredUsers', id: any | null, githubUserId: any | null, login: string | null, avatarUrl: string | null, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any }> } | null } | null };

export type GetRegisteredUserQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetRegisteredUserQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, login: string | null, avatarUrl: string | null, id: any | null }> };

export type GetPaymentRequestsForProjectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetPaymentRequestsForProjectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, initialAmount: any, remainingAmount: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }> }> } | null };

export type RequestPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  contributorId: Scalars['Int'];
  hoursWorked: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
}>;


export type RequestPaymentMutation = { __typename?: 'mutation_root', requestPayment: { __typename?: 'Payment', projectId: any, budgetId: any, paymentId: any, amount: any } };

export type CancelPaymentRequestMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
  paymentId: Scalars['Uuid'];
}>;


export type CancelPaymentRequestMutation = { __typename?: 'mutation_root', cancelPaymentRequest: { __typename?: 'Payment', projectId: any, budgetId: any, paymentId: any, amount: any } };

export type UserPayoutSettingsFragment = { __typename?: 'UserInfo', userId: any, identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean };

export type GetUserPayoutSettingsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetUserPayoutSettingsQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, id: any | null, userInfo: { __typename?: 'UserInfo', userId: any, identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean } | null }> };

export type UpdatePayoutSettingsMutationVariables = Exact<{
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
}>;


export type UpdatePayoutSettingsMutation = { __typename?: 'mutation_root', updateProfileInfo: any };

export type GetProjectVisibilityDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectVisibilityDetailsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, visibility: any } | null, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null };

export type PendingProjectLeaderInvitationsQueryVariables = Exact<{
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type PendingProjectLeaderInvitationsQuery = { __typename?: 'query_root', pendingProjectLeaderInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, projectId: any }> };

export type PendingUserPaymentsQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type PendingUserPaymentsQuery = { __typename?: 'query_root', registeredUsers: Array<{ __typename?: 'RegisteredUsers', githubUserId: any | null, id: any | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, githubRecipient: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }> }> };

export type MarkInvoiceAsReceivedMutationVariables = Exact<{
  paymentReferences: Array<PaymentReference> | PaymentReference;
}>;


export type MarkInvoiceAsReceivedMutation = { __typename?: 'mutation_root', markInvoiceAsReceived: number };

export type UserPaymentRequestFragment = { __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, shortDescription: string, logoUrl: string | null } | null } | null } | null };

export type GetPaymentRequestsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, shortDescription: string, logoUrl: string | null } | null } | null } | null }> };

export type GetProjectContributorsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string } | null, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> } | null };

export type GetProjectContributorsAsLeaderQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsAsLeaderQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string } | null, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> }> }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, id: any, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }> }> }> } | null };

export type GetProjectRemainingBudgetQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectRemainingBudgetQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, remainingAmount: any }> } | null };

export type GetGithubRepositoryDetailsQueryVariables = Exact<{
  githubRepoId: Scalars['bigint'];
}>;


export type GetGithubRepositoryDetailsQuery = { __typename?: 'query_root', githubReposByPk: { __typename?: 'GithubRepos', owner: string, name: string, description: string, stars: number, forkCount: number, htmlUrl: string, languages: any, id: any } | null };

export type GetProjectOverviewDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectOverviewDetailsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, longDescription: string, logoUrl: string | null, telegramLink: string | null, hiring: boolean, visibility: any } | null, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', repo: { __typename?: 'GithubRepos', stars: number, languages: any, id: any } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, projectLeads: Array<{ __typename?: 'ProjectLeads', user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, id: any | null } | null }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', initialAmount: any | null, spentAmount: any | null } | null } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> } | null };

export type GetProjectApplicationsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectApplicationsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, applications: Array<{ __typename?: 'Applications', applicantId: any, id: any }> } | null };

export type ApplyToProjectMutationVariables = Exact<{
  projectId: Scalars['Id'];
}>;


export type ApplyToProjectMutation = { __typename?: 'mutation_root', applyToProject: any };

export type AcceptProjectLeaderInvitationMutationVariables = Exact<{
  invitationId: Scalars['Uuid'];
}>;


export type AcceptProjectLeaderInvitationMutation = { __typename?: 'mutation_root', acceptProjectLeaderInvitation: boolean };

export type ProjectContributorsForPaymentSelectFragment = { __typename?: 'Projects', id: any, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> }> }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, id: any, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }> }> }> };

export type SearchGithubUsersByHandleSubstringQueryVariables = Exact<{
  handleSubstringQuery: Scalars['String'];
}>;


export type SearchGithubUsersByHandleSubstringQuery = { __typename?: 'query_root', searchUsers: Array<{ __typename?: 'User', login: string, avatarUrl: any, htmlUrl: any, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null }> | null };

export type GetProjectContributorsForPaymentSelectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsForPaymentSelectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, amountInUsd: any, requestedAt: any, id: any, workItemsAggregate: { __typename?: 'WorkItemsAggregate', aggregate: { __typename?: 'WorkItemsAggregateFields', count: number } | null } }>, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> }> }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', recipientId: any, id: any, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }> }> }> } | null };

export type IgnoreIssueMutationVariables = Exact<{
  issueNumber: Scalars['GithubIssueNumber'];
  projectId: Scalars['Uuid'];
  repoId: Scalars['GithubRepoId'];
}>;


export type IgnoreIssueMutation = { __typename?: 'mutation_root', ignoreIssue: boolean };

export type UnignoreIssueMutationVariables = Exact<{
  issueNumber: Scalars['GithubIssueNumber'];
  projectId: Scalars['Uuid'];
  repoId: Scalars['GithubRepoId'];
}>;


export type UnignoreIssueMutation = { __typename?: 'mutation_root', unignoreIssue: boolean };

export type SearchIssuesQueryVariables = Exact<{
  projectId: Scalars['uuid'];
  authorId: Scalars['bigint'];
  type: Scalars['jsonb'];
}>;


export type SearchIssuesQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repoIssues: Array<{ __typename?: 'GithubIssues', repoId: any, issueNumber: any, title: string, htmlUrl: string, authorId: any, type: any, status: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> }> }> } | null };

export type GetPaidWorkItemsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetPaidWorkItemsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, workItems: Array<{ __typename?: 'WorkItems', paymentId: any, repoId: any, issueNumber: any }> }> }> } | null };

export type FetchIssueQueryVariables = Exact<{
  repoOwner: Scalars['String'];
  repoName: Scalars['String'];
  issueNumber: Scalars['Int'];
}>;


export type FetchIssueQuery = { __typename?: 'query_root', fetchIssue: { __typename?: 'Issue', repoId: any, number: any, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> } | null };

export type GetProjectReposQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectReposQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', owner: string, name: string, description: string, stars: number, forkCount: number, htmlUrl: string, languages: any, id: any } | null }> } | null };

export type CreateIssueMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
  githubRepoId: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateIssueMutation = { __typename?: 'mutation_root', createIssue: { __typename?: 'Issue', repoId: any, number: any, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null, id: any, ignoredForProjects: Array<{ __typename?: 'IgnoredGithubIssues', projectId: any, repoId: any, issueNumber: any }> } };

export type SidebarProjectDetailsFragment = { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null } };

export type GetProjectsForSidebarQueryVariables = Exact<{
  ledProjectIds: InputMaybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectsForSidebarQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, logoUrl: string | null, visibility: any } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } }> };

export type GetCurrentProjectForSidebarQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetCurrentProjectForSidebarQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, logoUrl: string | null, visibility: any } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null } } | null };

export type GetProjectsQueryVariables = Exact<{
  where: InputMaybe<ProjectsBoolExp>;
  orderBy: InputMaybe<Array<ProjectsOrderBy> | ProjectsOrderBy>;
}>;


export type GetProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, contributorsAggregate: { __typename?: 'ProjectsContributorsViewAggregate', aggregate: { __typename?: 'ProjectsContributorsViewAggregateFields', count: number } | null }, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number, sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null, initialAmount: any | null } | null } | null }, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, telegramLink: string | null, logoUrl: string | null, shortDescription: string, hiring: boolean, rank: number, visibility: any } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, projectId: any, user: { __typename?: 'RegisteredUsers', login: string | null, avatarUrl: string | null, id: any | null } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any, id: any } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', name: string, logoUrl: string, url: string | null, id: any } }>, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }> }> };

export type GetAllFilterOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFilterOptionsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string } }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', projectId: any, githubRepoId: any, repo: { __typename?: 'GithubRepos', languages: any, id: any } | null }>, projectDetails: { __typename?: 'ProjectDetails', projectId: any, visibility: any } | null, githubReposAggregate: { __typename?: 'ProjectGithubReposAggregate', aggregate: { __typename?: 'ProjectGithubReposAggregateFields', count: number } | null }, contributors: Array<{ __typename?: 'ProjectsContributorsView', githubUser: { __typename?: 'GithubUsers', login: string, avatarUrl: string, htmlUrl: string, id: any, user: { __typename?: 'RegisteredUsers', id: any | null } | null } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', count: number } | null }, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

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
  email
  twitter
  telegram
  linkedin
  discord
  website
}
    `;
export const ProfileProjectFragmentDoc = gql`
    fragment ProfileProject on Projects {
  id
  projectDetails {
    projectId
    logoUrl
    name
  }
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
    `;
export const ContributionsFragmentDoc = gql`
    fragment Contributions on UserContributionProjects {
  projectId
  maxContributionDate
  contributionCount
  project {
    ...ProfileProject
  }
}
    ${ProfileProjectFragmentDoc}`;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on UserProfiles {
  ...UserProfileId
  ...UserProfileDetails
  projects {
    ...Contributions
  }
  projectsAggregate {
    aggregate {
      sum {
        moneyGranted
      }
      min {
        minContributionDate
      }
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
}
    ${UserProfileIdFragmentDoc}
${UserProfileDetailsFragmentDoc}
${ContributionsFragmentDoc}
${ProfileProjectFragmentDoc}`;
export const LiveGithubUserIdFragmentDoc = gql`
    fragment LiveGithubUserId on User {
  id
}
    `;
export const LiveGithubUserFragmentDoc = gql`
    fragment LiveGithubUser on User {
  ...LiveGithubUserId
  login
  avatarUrl
  htmlUrl
  user {
    id
  }
}
    ${LiveGithubUserIdFragmentDoc}`;
export const WorkItemIdFragmentDoc = gql`
    fragment WorkItemId on WorkItems {
  paymentId
  repoId
  issueNumber
}
    `;
export const LiveGithubIssueIdFragmentDoc = gql`
    fragment LiveGithubIssueId on Issue {
  id
}
    `;
export const IgnoredGithubIssueIdFragmentDoc = gql`
    fragment IgnoredGithubIssueId on IgnoredGithubIssues {
  projectId
  repoId
  issueNumber
}
    `;
export const LiveGithubIssueFragmentDoc = gql`
    fragment LiveGithubIssue on Issue {
  ...LiveGithubIssueId
  repoId
  number
  type
  status
  title
  htmlUrl
  createdAt
  closedAt
  mergedAt
  ignoredForProjects {
    ...IgnoredGithubIssueId
  }
}
    ${LiveGithubIssueIdFragmentDoc}
${IgnoredGithubIssueIdFragmentDoc}`;
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
  }
  liveGithubRecipient {
    ...LiveGithubUser
  }
  workItems {
    ...WorkItemId
    githubIssue {
      ...LiveGithubIssue
    }
  }
  paymentsAggregate {
    aggregate {
      sum {
        amount
      }
    }
  }
}
    ${LiveGithubUserFragmentDoc}
${WorkItemIdFragmentDoc}
${LiveGithubIssueFragmentDoc}`;
export const ProjectIdFragmentDoc = gql`
    fragment ProjectId on Projects {
  id
}
    `;
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
export const ProjectVisibilityDetailsFragmentDoc = gql`
    fragment ProjectVisibilityDetails on Projects {
  ...ProjectId
  projectDetails {
    projectId
    visibility
  }
  githubReposAggregate {
    aggregate {
      count
    }
  }
  contributors {
    githubUser {
      ...GithubUser
    }
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
    ${ProjectIdFragmentDoc}
${GithubUserFragmentDoc}`;
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
  budgetsAggregate {
    aggregate {
      sum {
        spentAmount
        initialAmount
      }
    }
  }
  projectDetails {
    projectId
    name
    telegramLink
    logoUrl
    shortDescription
    hiring
    rank
  }
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
  projectSponsors {
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
export const ProjectContributorsFragmentDoc = gql`
    fragment ProjectContributors on Projects {
  id
  githubRepos {
    projectId
    githubRepoId
    repoContributors {
      user {
        ...GithubUser
      }
    }
  }
  budgets {
    id
    paymentRequests {
      ...PaymentRequestId
      githubRecipient {
        ...GithubUser
      }
    }
  }
}
    ${GithubUserFragmentDoc}
${PaymentRequestIdFragmentDoc}`;
export const LiveGithubUserWithPaymentRequestsForProjectFragmentDoc = gql`
    fragment LiveGithubUserWithPaymentRequestsForProject on User {
  ...LiveGithubUser
  paymentRequests(where: {budget: {projectId: {_eq: $projectId}}}) {
    ...PaymentRequest
  }
}
    ${LiveGithubUserFragmentDoc}
${PaymentRequestFragmentDoc}`;
export const UserPayoutSettingsFragmentDoc = gql`
    fragment UserPayoutSettings on UserInfo {
  userId
  identity
  location
  payoutSettings
  arePayoutSettingsValid
}
    `;
export const WorkItemFragmentDoc = gql`
    fragment WorkItem on WorkItems {
  ...WorkItemId
}
    ${WorkItemIdFragmentDoc}`;
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
      projectDetails {
        projectId
        name
        shortDescription
        logoUrl
      }
    }
  }
}
    ${WorkItemFragmentDoc}`;
export const GithubUserWithPaymentRequestsForProjectFragmentDoc = gql`
    fragment GithubUserWithPaymentRequestsForProject on GithubUsers {
  ...GithubUser
  paymentRequests(where: {budget: {projectId: {_eq: $projectId}}}) {
    ...PaymentRequest
  }
}
    ${GithubUserFragmentDoc}
${PaymentRequestFragmentDoc}`;
export const ProjectContributorsWithPaymentSummaryFragmentDoc = gql`
    fragment ProjectContributorsWithPaymentSummary on Projects {
  contributors {
    githubUser {
      ...GithubUserWithPaymentRequestsForProject
    }
  }
}
    ${GithubUserWithPaymentRequestsForProjectFragmentDoc}`;
export const GithubIssueIdFragmentDoc = gql`
    fragment GithubIssueId on GithubIssues {
  id
}
    `;
export const GithubIssueFragmentDoc = gql`
    fragment GithubIssue on GithubIssues {
  ...GithubIssueId
  repoId
  issueNumber
  title
  htmlUrl
  authorId
  type
  status
  createdAt
  closedAt
  mergedAt
  ignoredForProjects {
    ...IgnoredGithubIssueId
  }
}
    ${GithubIssueIdFragmentDoc}
${IgnoredGithubIssueIdFragmentDoc}`;
export const LastProjectMergedPullRequestsFragmentDoc = gql`
    fragment LastProjectMergedPullRequests on Projects {
  githubRepos {
    projectId
    githubRepoId
    repoIssues(where: {type: {_eq: "PullRequest"}, status: {_eq: "Merged"}}) {
      ...GithubIssue
    }
  }
}
    ${GithubIssueFragmentDoc}`;
export const ProjectPaidWorkItemsFragmentDoc = gql`
    fragment ProjectPaidWorkItems on Projects {
  ...ProjectId
  budgets {
    id
    paymentRequests {
      ...PaymentRequestId
      recipientId
      workItems {
        ...WorkItemId
      }
    }
  }
}
    ${ProjectIdFragmentDoc}
${PaymentRequestIdFragmentDoc}
${WorkItemIdFragmentDoc}`;
export const ProjectContributorsForPaymentSelectFragmentDoc = gql`
    fragment ProjectContributorsForPaymentSelect on Projects {
  ...ProjectContributorsWithPaymentSummary
  ...LastProjectMergedPullRequests
  ...ProjectPaidWorkItems
}
    ${ProjectContributorsWithPaymentSummaryFragmentDoc}
${LastProjectMergedPullRequestsFragmentDoc}
${ProjectPaidWorkItemsFragmentDoc}`;
export const SidebarProjectDetailsFragmentDoc = gql`
    fragment SidebarProjectDetails on Projects {
  ...ProjectId
  projectDetails {
    projectId
    name
    logoUrl
  }
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
export const UserIdentityDocument = gql`
    query UserIdentity($userId: uuid!) {
  userInfo(where: {userId: {_eq: $userId}}) {
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
export const GetPaymentRequestsForProjectDocument = gql`
    query GetPaymentRequestsForProject($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    budgets {
      id
      initialAmount
      remainingAmount
      paymentRequests {
        ...ExtendedPaymentRequest
      }
    }
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
export const GetUserPayoutSettingsDocument = gql`
    query GetUserPayoutSettings($githubUserId: bigint!) {
  registeredUsers(where: {githubUserId: {_eq: $githubUserId}}) {
    ...UserId
    githubUserId
    userInfo {
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
  updateProfileInfo(
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
export const GetProjectVisibilityDetailsDocument = gql`
    query GetProjectVisibilityDetails($projectId: uuid!) {
  projectsByPk(id: $projectId) {
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
    projectId
  }
}
    `;

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
export const GetProjectContributorsDocument = gql`
    query GetProjectContributors($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    projectDetails {
      projectId
      name
    }
    ...ProjectContributorsWithPaymentSummary
  }
}
    ${ProjectContributorsWithPaymentSummaryFragmentDoc}`;

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
export const GetProjectContributorsAsLeaderDocument = gql`
    query GetProjectContributorsAsLeader($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    projectDetails {
      projectId
      name
    }
    ...ProjectContributorsWithPaymentSummary
    ...LastProjectMergedPullRequests
    ...ProjectPaidWorkItems
  }
}
    ${ProjectContributorsWithPaymentSummaryFragmentDoc}
${LastProjectMergedPullRequestsFragmentDoc}
${ProjectPaidWorkItemsFragmentDoc}`;

/**
 * __useGetProjectContributorsAsLeaderQuery__
 *
 * To run a query within a React component, call `useGetProjectContributorsAsLeaderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectContributorsAsLeaderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectContributorsAsLeaderQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectContributorsAsLeaderQuery(baseOptions: Apollo.QueryHookOptions<GetProjectContributorsAsLeaderQuery, GetProjectContributorsAsLeaderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectContributorsAsLeaderQuery, GetProjectContributorsAsLeaderQueryVariables>(GetProjectContributorsAsLeaderDocument, options);
      }
export function useGetProjectContributorsAsLeaderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectContributorsAsLeaderQuery, GetProjectContributorsAsLeaderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectContributorsAsLeaderQuery, GetProjectContributorsAsLeaderQueryVariables>(GetProjectContributorsAsLeaderDocument, options);
        }
export type GetProjectContributorsAsLeaderQueryHookResult = ReturnType<typeof useGetProjectContributorsAsLeaderQuery>;
export type GetProjectContributorsAsLeaderLazyQueryHookResult = ReturnType<typeof useGetProjectContributorsAsLeaderLazyQuery>;
export type GetProjectContributorsAsLeaderQueryResult = Apollo.QueryResult<GetProjectContributorsAsLeaderQuery, GetProjectContributorsAsLeaderQueryVariables>;
export const GetProjectRemainingBudgetDocument = gql`
    query GetProjectRemainingBudget($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    budgets {
      id
      remainingAmount
    }
  }
}
    `;

/**
 * __useGetProjectRemainingBudgetQuery__
 *
 * To run a query within a React component, call `useGetProjectRemainingBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectRemainingBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectRemainingBudgetQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectRemainingBudgetQuery(baseOptions: Apollo.QueryHookOptions<GetProjectRemainingBudgetQuery, GetProjectRemainingBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectRemainingBudgetQuery, GetProjectRemainingBudgetQueryVariables>(GetProjectRemainingBudgetDocument, options);
      }
export function useGetProjectRemainingBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectRemainingBudgetQuery, GetProjectRemainingBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectRemainingBudgetQuery, GetProjectRemainingBudgetQueryVariables>(GetProjectRemainingBudgetDocument, options);
        }
export type GetProjectRemainingBudgetQueryHookResult = ReturnType<typeof useGetProjectRemainingBudgetQuery>;
export type GetProjectRemainingBudgetLazyQueryHookResult = ReturnType<typeof useGetProjectRemainingBudgetLazyQuery>;
export type GetProjectRemainingBudgetQueryResult = Apollo.QueryResult<GetProjectRemainingBudgetQuery, GetProjectRemainingBudgetQueryVariables>;
export const GetGithubRepositoryDetailsDocument = gql`
    query GetGithubRepositoryDetails($githubRepoId: bigint!) {
  githubReposByPk(id: $githubRepoId) {
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
  projectsByPk(id: $projectId) {
    ...ProjectId
    projectDetails {
      projectId
      name
      longDescription
      logoUrl
      telegramLink
      hiring
      visibility
    }
    githubRepos {
      repo {
        ...GithubRepoLanguages
        stars
      }
    }
    projectSponsors {
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
  projectsByPk(id: $projectId) {
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
    mutation ApplyToProject($projectId: Id!) {
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
export const SearchGithubUsersByHandleSubstringDocument = gql`
    query SearchGithubUsersByHandleSubstring($handleSubstringQuery: String!) {
  searchUsers(query: $handleSubstringQuery, sort: "followers", order: "desc") {
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
export const GetProjectContributorsForPaymentSelectDocument = gql`
    query GetProjectContributorsForPaymentSelect($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    ...ProjectContributorsForPaymentSelect
  }
}
    ${ProjectContributorsForPaymentSelectFragmentDoc}`;

/**
 * __useGetProjectContributorsForPaymentSelectQuery__
 *
 * To run a query within a React component, call `useGetProjectContributorsForPaymentSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectContributorsForPaymentSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectContributorsForPaymentSelectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectContributorsForPaymentSelectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectContributorsForPaymentSelectQuery, GetProjectContributorsForPaymentSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectContributorsForPaymentSelectQuery, GetProjectContributorsForPaymentSelectQueryVariables>(GetProjectContributorsForPaymentSelectDocument, options);
      }
export function useGetProjectContributorsForPaymentSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectContributorsForPaymentSelectQuery, GetProjectContributorsForPaymentSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectContributorsForPaymentSelectQuery, GetProjectContributorsForPaymentSelectQueryVariables>(GetProjectContributorsForPaymentSelectDocument, options);
        }
export type GetProjectContributorsForPaymentSelectQueryHookResult = ReturnType<typeof useGetProjectContributorsForPaymentSelectQuery>;
export type GetProjectContributorsForPaymentSelectLazyQueryHookResult = ReturnType<typeof useGetProjectContributorsForPaymentSelectLazyQuery>;
export type GetProjectContributorsForPaymentSelectQueryResult = Apollo.QueryResult<GetProjectContributorsForPaymentSelectQuery, GetProjectContributorsForPaymentSelectQueryVariables>;
export const IgnoreIssueDocument = gql`
    mutation IgnoreIssue($issueNumber: GithubIssueNumber!, $projectId: Uuid!, $repoId: GithubRepoId!) {
  ignoreIssue(issueNumber: $issueNumber, projectId: $projectId, repoId: $repoId)
}
    `;
export type IgnoreIssueMutationFn = Apollo.MutationFunction<IgnoreIssueMutation, IgnoreIssueMutationVariables>;

/**
 * __useIgnoreIssueMutation__
 *
 * To run a mutation, you first call `useIgnoreIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIgnoreIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ignoreIssueMutation, { data, loading, error }] = useIgnoreIssueMutation({
 *   variables: {
 *      issueNumber: // value for 'issueNumber'
 *      projectId: // value for 'projectId'
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useIgnoreIssueMutation(baseOptions?: Apollo.MutationHookOptions<IgnoreIssueMutation, IgnoreIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IgnoreIssueMutation, IgnoreIssueMutationVariables>(IgnoreIssueDocument, options);
      }
export type IgnoreIssueMutationHookResult = ReturnType<typeof useIgnoreIssueMutation>;
export type IgnoreIssueMutationResult = Apollo.MutationResult<IgnoreIssueMutation>;
export type IgnoreIssueMutationOptions = Apollo.BaseMutationOptions<IgnoreIssueMutation, IgnoreIssueMutationVariables>;
export const UnignoreIssueDocument = gql`
    mutation UnignoreIssue($issueNumber: GithubIssueNumber!, $projectId: Uuid!, $repoId: GithubRepoId!) {
  unignoreIssue(issueNumber: $issueNumber, projectId: $projectId, repoId: $repoId)
}
    `;
export type UnignoreIssueMutationFn = Apollo.MutationFunction<UnignoreIssueMutation, UnignoreIssueMutationVariables>;

/**
 * __useUnignoreIssueMutation__
 *
 * To run a mutation, you first call `useUnignoreIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnignoreIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unignoreIssueMutation, { data, loading, error }] = useUnignoreIssueMutation({
 *   variables: {
 *      issueNumber: // value for 'issueNumber'
 *      projectId: // value for 'projectId'
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useUnignoreIssueMutation(baseOptions?: Apollo.MutationHookOptions<UnignoreIssueMutation, UnignoreIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnignoreIssueMutation, UnignoreIssueMutationVariables>(UnignoreIssueDocument, options);
      }
export type UnignoreIssueMutationHookResult = ReturnType<typeof useUnignoreIssueMutation>;
export type UnignoreIssueMutationResult = Apollo.MutationResult<UnignoreIssueMutation>;
export type UnignoreIssueMutationOptions = Apollo.BaseMutationOptions<UnignoreIssueMutation, UnignoreIssueMutationVariables>;
export const SearchIssuesDocument = gql`
    query SearchIssues($projectId: uuid!, $authorId: bigint!, $type: jsonb!) {
  projectsByPk(id: $projectId) {
    id
    githubRepos {
      projectId
      githubRepoId
      repoIssues(where: {authorId: {_eq: $authorId}, type: {_eq: $type}}) {
        ...GithubIssue
      }
    }
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
 *      authorId: // value for 'authorId'
 *      type: // value for 'type'
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
export const GetPaidWorkItemsDocument = gql`
    query getPaidWorkItems($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    budgets {
      id
      paymentRequests {
        ...PaymentRequestId
        workItems {
          ...WorkItemId
        }
      }
    }
  }
}
    ${PaymentRequestIdFragmentDoc}
${WorkItemIdFragmentDoc}`;

/**
 * __useGetPaidWorkItemsQuery__
 *
 * To run a query within a React component, call `useGetPaidWorkItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaidWorkItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaidWorkItemsQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetPaidWorkItemsQuery(baseOptions: Apollo.QueryHookOptions<GetPaidWorkItemsQuery, GetPaidWorkItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaidWorkItemsQuery, GetPaidWorkItemsQueryVariables>(GetPaidWorkItemsDocument, options);
      }
export function useGetPaidWorkItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaidWorkItemsQuery, GetPaidWorkItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaidWorkItemsQuery, GetPaidWorkItemsQueryVariables>(GetPaidWorkItemsDocument, options);
        }
export type GetPaidWorkItemsQueryHookResult = ReturnType<typeof useGetPaidWorkItemsQuery>;
export type GetPaidWorkItemsLazyQueryHookResult = ReturnType<typeof useGetPaidWorkItemsLazyQuery>;
export type GetPaidWorkItemsQueryResult = Apollo.QueryResult<GetPaidWorkItemsQuery, GetPaidWorkItemsQueryVariables>;
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
export const GetProjectReposDocument = gql`
    query GetProjectRepos($projectId: uuid!) {
  projectsByPk(id: $projectId) {
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
export const CreateIssueDocument = gql`
    mutation CreateIssue($projectId: Uuid!, $githubRepoId: Int!, $title: String!, $description: String!) {
  createIssue(
    projectId: $projectId
    githubRepoId: $githubRepoId
    title: $title
    description: $description
  ) {
    ...LiveGithubIssue
  }
}
    ${LiveGithubIssueFragmentDoc}`;
export type CreateIssueMutationFn = Apollo.MutationFunction<CreateIssueMutation, CreateIssueMutationVariables>;

/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubRepoId: // value for 'githubRepoId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateIssueMutation(baseOptions?: Apollo.MutationHookOptions<CreateIssueMutation, CreateIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, options);
      }
export type CreateIssueMutationHookResult = ReturnType<typeof useCreateIssueMutation>;
export type CreateIssueMutationResult = Apollo.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = Apollo.BaseMutationOptions<CreateIssueMutation, CreateIssueMutationVariables>;
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
  projectsByPk(id: $projectId) {
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
    projectSponsors {
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