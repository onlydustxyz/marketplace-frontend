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
  DateTimeUtc: any;
  Email: any;
  EthereumAddress: any;
  EthereumName: any;
  GithubIssueNumber: any;
  GithubRepositoryId: any;
  Url: any;
  Uuid: any;
  bigint: any;
  citext: any;
  jsonb: any;
  numeric: any;
  timestamp: any;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "auth.github_users" */
export type AuthGithubUsers = {
  __typename?: 'AuthGithubUsers';
  accessToken: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['timestamptz']>;
  githubUserId: Maybe<Scalars['bigint']>;
  id: Maybe<Scalars['uuid']>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  providerId: Maybe<Scalars['String']>;
  providerUserId: Maybe<Scalars['String']>;
  refreshToken: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: Maybe<Users>;
  userId: Maybe<Scalars['uuid']>;
};


/** columns and relationships of "auth.github_users" */
export type AuthGithubUsersPaymentRequestsArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};


/** columns and relationships of "auth.github_users" */
export type AuthGithubUsersPaymentRequestsAggregateArgs = {
  distinctOn: InputMaybe<Array<PaymentRequestsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<PaymentRequestsOrderBy>>;
  where: InputMaybe<PaymentRequestsBoolExp>;
};

/** Boolean expression to filter rows from the table "auth.github_users". All fields are combined with a logical 'AND'. */
export type AuthGithubUsersBoolExp = {
  _and: InputMaybe<Array<AuthGithubUsersBoolExp>>;
  _not: InputMaybe<AuthGithubUsersBoolExp>;
  _or: InputMaybe<Array<AuthGithubUsersBoolExp>>;
  accessToken: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  paymentRequests: InputMaybe<PaymentRequestsBoolExp>;
  paymentRequests_aggregate: InputMaybe<Payment_Requests_Aggregate_Bool_Exp>;
  providerId: InputMaybe<StringComparisonExp>;
  providerUserId: InputMaybe<StringComparisonExp>;
  refreshToken: InputMaybe<StringComparisonExp>;
  updatedAt: InputMaybe<TimestamptzComparisonExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "auth.github_users". */
export type AuthGithubUsersOrderBy = {
  accessToken: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  providerId: InputMaybe<OrderBy>;
  providerUserId: InputMaybe<OrderBy>;
  refreshToken: InputMaybe<OrderBy>;
  updatedAt: InputMaybe<OrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** select columns of table "auth.github_users" */
export enum AuthGithubUsersSelectColumn {
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

export type BankAddress = {
  BIC: Scalars['String'];
  IBAN: Scalars['String'];
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

/** columns and relationships of "github_repo_details" */
export type GithubRepoDetails = {
  __typename?: 'GithubRepoDetails';
  content: Maybe<Repository>;
  id: Scalars['bigint'];
  languages: Scalars['jsonb'];
  pullRequests: Maybe<Array<Issue>>;
};


/** columns and relationships of "github_repo_details" */
export type GithubRepoDetailsLanguagesArgs = {
  path: InputMaybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "github_repo_details". All fields are combined with a logical 'AND'. */
export type GithubRepoDetailsBoolExp = {
  _and: InputMaybe<Array<GithubRepoDetailsBoolExp>>;
  _not: InputMaybe<GithubRepoDetailsBoolExp>;
  _or: InputMaybe<Array<GithubRepoDetailsBoolExp>>;
  id: InputMaybe<BigintComparisonExp>;
  languages: InputMaybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "github_repo_details" */
export enum GithubRepoDetailsConstraint {
  /** unique or primary key constraint on columns "id" */
  GithubRepoDetailsPkey = 'github_repo_details_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type GithubRepoDetailsDeleteAtPathInput = {
  languages: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type GithubRepoDetailsDeleteElemInput = {
  languages: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type GithubRepoDetailsDeleteKeyInput = {
  languages: InputMaybe<Scalars['String']>;
};

/** input type for incrementing numeric columns in table "github_repo_details" */
export type GithubRepoDetailsIncInput = {
  id: InputMaybe<Scalars['bigint']>;
};

/** input type for inserting data into table "github_repo_details" */
export type GithubRepoDetailsInsertInput = {
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type GithubRepoDetailsMaxFields = {
  __typename?: 'GithubRepoDetailsMaxFields';
  id: Maybe<Scalars['bigint']>;
};

/** aggregate min on columns */
export type GithubRepoDetailsMinFields = {
  __typename?: 'GithubRepoDetailsMinFields';
  id: Maybe<Scalars['bigint']>;
};

/** response of any mutation on the table "github_repo_details" */
export type GithubRepoDetailsMutationResponse = {
  __typename?: 'GithubRepoDetailsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<GithubRepoDetails>;
};

/** input type for inserting object relation for remote table "github_repo_details" */
export type GithubRepoDetailsObjRelInsertInput = {
  data: GithubRepoDetailsInsertInput;
  /** upsert condition */
  onConflict: InputMaybe<GithubRepoDetailsOnConflict>;
};

/** on_conflict condition type for table "github_repo_details" */
export type GithubRepoDetailsOnConflict = {
  constraint: GithubRepoDetailsConstraint;
  update_columns: Array<GithubRepoDetailsUpdateColumn>;
  where: InputMaybe<GithubRepoDetailsBoolExp>;
};

/** Ordering options when selecting data from "github_repo_details". */
export type GithubRepoDetailsOrderBy = {
  id: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
};

/** primary key columns input for table: github_repo_details */
export type GithubRepoDetailsPkColumnsInput = {
  id: Scalars['bigint'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type GithubRepoDetailsPrependInput = {
  languages: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "github_repo_details" */
export enum GithubRepoDetailsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Languages = 'languages'
}

/** input type for updating data in table "github_repo_details" */
export type GithubRepoDetailsSetInput = {
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
};

/** aggregate stddev on columns */
export type GithubRepoDetailsStddevFields = {
  __typename?: 'GithubRepoDetailsStddevFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type GithubRepoDetailsStddev_PopFields = {
  __typename?: 'GithubRepoDetailsStddev_popFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type GithubRepoDetailsStddev_SampFields = {
  __typename?: 'GithubRepoDetailsStddev_sampFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type GithubRepoDetailsSumFields = {
  __typename?: 'GithubRepoDetailsSumFields';
  id: Maybe<Scalars['bigint']>;
};

/** update columns of table "github_repo_details" */
export enum GithubRepoDetailsUpdateColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Languages = 'languages'
}

export type GithubRepoDetailsUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append: InputMaybe<GithubRepoDetailsAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath: InputMaybe<GithubRepoDetailsDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem: InputMaybe<GithubRepoDetailsDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey: InputMaybe<GithubRepoDetailsDeleteKeyInput>;
  /** increments the numeric columns with given value of the filtered values */
  _inc: InputMaybe<GithubRepoDetailsIncInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend: InputMaybe<GithubRepoDetailsPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set: InputMaybe<GithubRepoDetailsSetInput>;
  where: GithubRepoDetailsBoolExp;
};

/** aggregate var_pop on columns */
export type GithubRepoDetailsVar_PopFields = {
  __typename?: 'GithubRepoDetailsVar_popFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type GithubRepoDetailsVar_SampFields = {
  __typename?: 'GithubRepoDetailsVar_sampFields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type GithubRepoDetailsVarianceFields = {
  __typename?: 'GithubRepoDetailsVarianceFields';
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
  closedAt: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  htmlUrl: Scalars['Url'];
  id: Scalars['Int'];
  mergedAt: Maybe<Scalars['DateTimeUtc']>;
  number: Scalars['Int'];
  repoId: Scalars['GithubRepositoryId'];
  status: Status;
  title: Scalars['String'];
  type: Type;
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
  githubRecipient: Maybe<User>;
  id: Scalars['uuid'];
  invoiceReceivedAt: Maybe<Scalars['timestamp']>;
  /** An array relationship */
  payments: Array<Payments>;
  /** An aggregate relationship */
  paymentsAggregate: PaymentsAggregate;
  /** An object relationship */
  recipient: Maybe<AuthGithubUsers>;
  recipientId: Scalars['bigint'];
  requestedAt: Scalars['timestamp'];
  /** An object relationship */
  requestor: Maybe<Users>;
  requestorId: Scalars['uuid'];
  /** An array relationship */
  workItems: Array<WorkItems>;
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

/** aggregate avg on columns */
export type PaymentRequestsAvgFields = {
  __typename?: 'PaymentRequestsAvgFields';
  amountInUsd: Maybe<Scalars['Float']>;
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
  id: InputMaybe<UuidComparisonExp>;
  invoiceReceivedAt: InputMaybe<TimestampComparisonExp>;
  payments: InputMaybe<PaymentsBoolExp>;
  payments_aggregate: InputMaybe<Payments_Aggregate_Bool_Exp>;
  recipient: InputMaybe<AuthGithubUsersBoolExp>;
  recipientId: InputMaybe<BigintComparisonExp>;
  requestedAt: InputMaybe<TimestampComparisonExp>;
  requestor: InputMaybe<UsersBoolExp>;
  requestorId: InputMaybe<UuidComparisonExp>;
  workItems: InputMaybe<WorkItemsBoolExp>;
};

/** aggregate max on columns */
export type PaymentRequestsMaxFields = {
  __typename?: 'PaymentRequestsMaxFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  budgetId: Maybe<Scalars['uuid']>;
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
  id: Maybe<Scalars['uuid']>;
  invoiceReceivedAt: Maybe<Scalars['timestamp']>;
  recipientId: Maybe<Scalars['bigint']>;
  requestedAt: Maybe<Scalars['timestamp']>;
  requestorId: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "payment_requests". */
export type PaymentRequestsOrderBy = {
  amountInUsd: InputMaybe<OrderBy>;
  budget: InputMaybe<BudgetsOrderBy>;
  budgetId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  invoiceReceivedAt: InputMaybe<OrderBy>;
  paymentsAggregate: InputMaybe<PaymentsAggregateOrderBy>;
  recipient: InputMaybe<AuthGithubUsersOrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestor: InputMaybe<UsersOrderBy>;
  requestorId: InputMaybe<OrderBy>;
  workItemsAggregate: InputMaybe<WorkItemsAggregateOrderBy>;
};

/** select columns of table "payment_requests" */
export enum PaymentRequestsSelectColumn {
  /** column name */
  AmountInUsd = 'amountInUsd',
  /** column name */
  BudgetId = 'budgetId',
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

/** aggregate stddev on columns */
export type PaymentRequestsStddevFields = {
  __typename?: 'PaymentRequestsStddevFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type PaymentRequestsStddev_PopFields = {
  __typename?: 'PaymentRequestsStddev_popFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type PaymentRequestsStddev_SampFields = {
  __typename?: 'PaymentRequestsStddev_sampFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type PaymentRequestsSumFields = {
  __typename?: 'PaymentRequestsSumFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  recipientId: Maybe<Scalars['bigint']>;
};

/** aggregate var_pop on columns */
export type PaymentRequestsVar_PopFields = {
  __typename?: 'PaymentRequestsVar_popFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type PaymentRequestsVar_SampFields = {
  __typename?: 'PaymentRequestsVar_sampFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type PaymentRequestsVarianceFields = {
  __typename?: 'PaymentRequestsVarianceFields';
  amountInUsd: Maybe<Scalars['Float']>;
  recipientId: Maybe<Scalars['Float']>;
};

/** columns and relationships of "payments" */
export type Payments = {
  __typename?: 'Payments';
  amount: Scalars['numeric'];
  currencyCode: Scalars['String'];
  id: Scalars['uuid'];
  /** An object relationship */
  paymentRequest: PaymentRequests;
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
  /** An object relationship */
  githubUser: Maybe<AuthGithubUsers>;
  githubUserId: Scalars['bigint'];
  id: Scalars['uuid'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
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

/** Boolean expression to filter rows from the table "pending_project_leader_invitations". All fields are combined with a logical 'AND'. */
export type PendingProjectLeaderInvitationsBoolExp = {
  _and: InputMaybe<Array<PendingProjectLeaderInvitationsBoolExp>>;
  _not: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  _or: InputMaybe<Array<PendingProjectLeaderInvitationsBoolExp>>;
  githubUser: InputMaybe<AuthGithubUsersBoolExp>;
  githubUserId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "pending_project_leader_invitations". */
export type PendingProjectLeaderInvitationsOrderBy = {
  githubUser: InputMaybe<AuthGithubUsersOrderBy>;
  githubUserId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
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

export type PersonIdentity = {
  firstname: InputMaybe<Scalars['String']>;
  lastname: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "project_details" */
export type ProjectDetails = {
  __typename?: 'ProjectDetails';
  logoUrl: Maybe<Scalars['String']>;
  longDescription: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['uuid'];
  shortDescription: Scalars['String'];
  telegramLink: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "project_details". All fields are combined with a logical 'AND'. */
export type ProjectDetailsBoolExp = {
  _and: InputMaybe<Array<ProjectDetailsBoolExp>>;
  _not: InputMaybe<ProjectDetailsBoolExp>;
  _or: InputMaybe<Array<ProjectDetailsBoolExp>>;
  logoUrl: InputMaybe<StringComparisonExp>;
  longDescription: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  shortDescription: InputMaybe<StringComparisonExp>;
  telegramLink: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "project_details". */
export type ProjectDetailsOrderBy = {
  logoUrl: InputMaybe<OrderBy>;
  longDescription: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  shortDescription: InputMaybe<OrderBy>;
  telegramLink: InputMaybe<OrderBy>;
};

/** select columns of table "project_details" */
export enum ProjectDetailsSelectColumn {
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  LongDescription = 'longDescription',
  /** column name */
  Name = 'name',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  ShortDescription = 'shortDescription',
  /** column name */
  TelegramLink = 'telegramLink'
}

/** columns and relationships of "project_github_repos" */
export type ProjectGithubRepos = {
  __typename?: 'ProjectGithubRepos';
  /** An object relationship */
  githubRepoDetails: Maybe<GithubRepoDetails>;
  githubRepoId: Scalars['bigint'];
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Scalars['uuid'];
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

/** Boolean expression to filter rows from the table "project_github_repos". All fields are combined with a logical 'AND'. */
export type ProjectGithubReposBoolExp = {
  _and: InputMaybe<Array<ProjectGithubReposBoolExp>>;
  _not: InputMaybe<ProjectGithubReposBoolExp>;
  _or: InputMaybe<Array<ProjectGithubReposBoolExp>>;
  githubRepoDetails: InputMaybe<GithubRepoDetailsBoolExp>;
  githubRepoId: InputMaybe<BigintComparisonExp>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "project_github_repos". */
export type ProjectGithubReposOrderBy = {
  githubRepoDetails: InputMaybe<GithubRepoDetailsOrderBy>;
  githubRepoId: InputMaybe<OrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
};

/** select columns of table "project_github_repos" */
export enum ProjectGithubReposSelectColumn {
  /** column name */
  GithubRepoId = 'githubRepoId',
  /** column name */
  ProjectId = 'projectId'
}

/** columns and relationships of "project_leads" */
export type ProjectLeads = {
  __typename?: 'ProjectLeads';
  /** An object relationship */
  project: Projects;
  projectId: Scalars['uuid'];
  /** An object relationship */
  user: Maybe<Users>;
  userId: Scalars['uuid'];
};

/** order by aggregate values of table "project_leads" */
export type ProjectLeadsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Project_Leads_Max_Order_By>;
  min: InputMaybe<Project_Leads_Min_Order_By>;
};

/** Boolean expression to filter rows from the table "project_leads". All fields are combined with a logical 'AND'. */
export type ProjectLeadsBoolExp = {
  _and: InputMaybe<Array<ProjectLeadsBoolExp>>;
  _not: InputMaybe<ProjectLeadsBoolExp>;
  _or: InputMaybe<Array<ProjectLeadsBoolExp>>;
  project: InputMaybe<ProjectsBoolExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  user: InputMaybe<UsersBoolExp>;
  userId: InputMaybe<UuidComparisonExp>;
};

/** Ordering options when selecting data from "project_leads". */
export type ProjectLeadsOrderBy = {
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  user: InputMaybe<UsersOrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** select columns of table "project_leads" */
export enum ProjectLeadsSelectColumn {
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  UserId = 'userId'
}

/** columns and relationships of "projects" */
export type Projects = {
  __typename?: 'Projects';
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** An array relationship */
  githubRepos: Array<ProjectGithubRepos>;
  id: Scalars['uuid'];
  /** An array relationship */
  pendingInvitations: Array<PendingProjectLeaderInvitations>;
  /** An object relationship */
  projectDetails: Maybe<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** An array relationship */
  projectSponsors: Array<ProjectsSponsors>;
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
export type ProjectsGithubReposArgs = {
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
export type ProjectsProjectLeadsArgs = {
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

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and: InputMaybe<Array<ProjectsBoolExp>>;
  _not: InputMaybe<ProjectsBoolExp>;
  _or: InputMaybe<Array<ProjectsBoolExp>>;
  budgets: InputMaybe<BudgetsBoolExp>;
  budgets_aggregate: InputMaybe<Budgets_Aggregate_Bool_Exp>;
  githubRepos: InputMaybe<ProjectGithubReposBoolExp>;
  id: InputMaybe<UuidComparisonExp>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  projectDetails: InputMaybe<ProjectDetailsBoolExp>;
  projectLeads: InputMaybe<ProjectLeadsBoolExp>;
  projectSponsors: InputMaybe<ProjectsSponsorsBoolExp>;
};

/** Ordering options when selecting data from "projects". */
export type ProjectsOrderBy = {
  budgetsAggregate: InputMaybe<BudgetsAggregateOrderBy>;
  githubReposAggregate: InputMaybe<ProjectGithubReposAggregateOrderBy>;
  id: InputMaybe<OrderBy>;
  pendingInvitationsAggregate: InputMaybe<PendingProjectLeaderInvitationsAggregateOrderBy>;
  projectDetails: InputMaybe<ProjectDetailsOrderBy>;
  projectLeadsAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  projectSponsorsAggregate: InputMaybe<ProjectsSponsorsAggregateOrderBy>;
};

/** select columns of table "projects" */
export enum ProjectsSelectColumn {
  /** column name */
  Id = 'id'
}

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

/** order by aggregate values of table "projects_sponsors" */
export type ProjectsSponsorsAggregateOrderBy = {
  count: InputMaybe<OrderBy>;
  max: InputMaybe<Projects_Sponsors_Max_Order_By>;
  min: InputMaybe<Projects_Sponsors_Min_Order_By>;
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

/** Ordering options when selecting data from "projects_sponsors". */
export type ProjectsSponsorsOrderBy = {
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  sponsor: InputMaybe<SponsorsOrderBy>;
  sponsorId: InputMaybe<OrderBy>;
};

/** select columns of table "projects_sponsors" */
export enum ProjectsSponsorsSelectColumn {
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  SponsorId = 'sponsorId'
}

export type Reason = {
  workItems: Array<WorkItem>;
};

export type Repository = {
  __typename?: 'Repository';
  contributors: Array<User>;
  description: Scalars['String'];
  forksCount: Scalars['Int'];
  htmlUrl: Scalars['Url'];
  id: Scalars['Int'];
  logoUrl: Scalars['Url'];
  name: Scalars['String'];
  owner: Scalars['String'];
  stars: Scalars['Int'];
};

/** columns and relationships of "sponsors" */
export type Sponsors = {
  __typename?: 'Sponsors';
  id: Scalars['uuid'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  sponsorProjects: Array<ProjectsSponsors>;
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

/** Boolean expression to filter rows from the table "sponsors". All fields are combined with a logical 'AND'. */
export type SponsorsBoolExp = {
  _and: InputMaybe<Array<SponsorsBoolExp>>;
  _not: InputMaybe<SponsorsBoolExp>;
  _or: InputMaybe<Array<SponsorsBoolExp>>;
  id: InputMaybe<UuidComparisonExp>;
  logoUrl: InputMaybe<StringComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  sponsorProjects: InputMaybe<ProjectsSponsorsBoolExp>;
  url: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "sponsors". */
export type SponsorsOrderBy = {
  id: InputMaybe<OrderBy>;
  logoUrl: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  sponsorProjectsAggregate: InputMaybe<ProjectsSponsorsAggregateOrderBy>;
  url: InputMaybe<OrderBy>;
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
  id: Scalars['Int'];
  login: Scalars['String'];
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  user: Maybe<AuthGithubUsers>;
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

/** columns and relationships of "user_info" */
export type UserInfo = {
  __typename?: 'UserInfo';
  arePayoutSettingsValid: Maybe<Scalars['Boolean']>;
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

/** response of any mutation on the table "user_info" */
export type UserInfoMutationResponse = {
  __typename?: 'UserInfoMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<UserInfo>;
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

export type WorkItem = {
  issueNumber: Scalars['GithubIssueNumber'];
  repoId: Scalars['GithubRepositoryId'];
};

/** columns and relationships of "work_items" */
export type WorkItems = {
  __typename?: 'WorkItems';
  githubIssue: Maybe<Issue>;
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
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

/** Streaming cursor of the table "auth_github_users" */
export type Auth_Github_Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Auth_Github_Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Auth_Github_Users_StreamCursorValueInput = {
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

/** Streaming cursor of the table "github_repo_details" */
export type Github_Repo_Details_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Github_Repo_Details_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Github_Repo_Details_StreamCursorValueInput = {
  id: InputMaybe<Scalars['bigint']>;
  languages: InputMaybe<Scalars['jsonb']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptProjectLeaderInvitation: Scalars['Boolean'];
  addEthPaymentReceipt: Scalars['Uuid'];
  addFiatPaymentReceipt: Scalars['Uuid'];
  addSponsorToProject: Scalars['Uuid'];
  cancelPaymentRequest: Scalars['Uuid'];
  createProject: Scalars['Uuid'];
  createSponsor: Scalars['Uuid'];
  /** delete data from the table: "auth.github_users" */
  deleteAuthGithubUsers: Maybe<AuthGithubUsersMutationResponse>;
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
  /** delete data from the table: "github_repo_details" */
  deleteGithubRepoDetails: Maybe<GithubRepoDetailsMutationResponse>;
  /** delete single row from the table: "github_repo_details" */
  deleteGithubRepoDetailsByPk: Maybe<GithubRepoDetails>;
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
  /** insert data into the table: "user_info" */
  insertUserInfo: Maybe<UserInfoMutationResponse>;
  /** insert a single row into the table: "user_info" */
  insertUserInfoOne: Maybe<UserInfo>;
  markInvoiceAsReceived: Scalars['Int'];
  requestPayment: Scalars['Uuid'];
  updateProfileInfo: Scalars['Uuid'];
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
  recipientIban: Scalars['String'];
  transactionReference: Scalars['String'];
};


/** mutation root */
export type Mutation_RootAddSponsorToProjectArgs = {
  projectId: Scalars['Uuid'];
  sponsorId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootCancelPaymentRequestArgs = {
  paymentId: Scalars['Uuid'];
  projectId: Scalars['Uuid'];
};


/** mutation root */
export type Mutation_RootCreateProjectArgs = {
  initialBudget: InputMaybe<Scalars['Int']>;
  logoUrl: InputMaybe<Scalars['Url']>;
  longDescription: Scalars['String'];
  name: Scalars['String'];
  shortDescription: Scalars['String'];
  telegramLink: InputMaybe<Scalars['Url']>;
};


/** mutation root */
export type Mutation_RootCreateSponsorArgs = {
  logoUrl: Scalars['Url'];
  name: Scalars['String'];
  url: InputMaybe<Scalars['Url']>;
};


/** mutation root */
export type Mutation_RootDeleteAuthGithubUsersArgs = {
  where: AuthGithubUsersBoolExp;
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
export type Mutation_RootDeleteGithubRepoDetailsArgs = {
  where: GithubRepoDetailsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteGithubRepoDetailsByPkArgs = {
  id: Scalars['bigint'];
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
export type Mutation_RootInsertAuthGithubUsersArgs = {
  objects: Array<AuthGithubUsersInsertInput>;
};


/** mutation root */
export type Mutation_RootInsertAuthGithubUsersOneArgs = {
  object: AuthGithubUsersInsertInput;
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
export type Mutation_RootInsertGithubRepoDetailsArgs = {
  objects: Array<GithubRepoDetailsInsertInput>;
  onConflict: InputMaybe<GithubRepoDetailsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertGithubRepoDetailsOneArgs = {
  object: GithubRepoDetailsInsertInput;
  onConflict: InputMaybe<GithubRepoDetailsOnConflict>;
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
export type Mutation_RootMarkInvoiceAsReceivedArgs = {
  paymentReferences: Array<PaymentReference>;
};


/** mutation root */
export type Mutation_RootRequestPaymentArgs = {
  amountInUsd: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
  recipientId: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootUpdateProfileInfoArgs = {
  contactInformation: InputMaybe<ContactInformation>;
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
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
  recipientId: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "payment_requests" */
export type Payment_Requests_Max_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  budgetId: InputMaybe<OrderBy>;
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
  id: InputMaybe<OrderBy>;
  invoiceReceivedAt: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestorId: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Pop_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "payment_requests" */
export type Payment_Requests_Stddev_Samp_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
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
  id: InputMaybe<Scalars['uuid']>;
  invoiceReceivedAt: InputMaybe<Scalars['timestamp']>;
  recipientId: InputMaybe<Scalars['bigint']>;
  requestedAt: InputMaybe<Scalars['timestamp']>;
  requestorId: InputMaybe<Scalars['uuid']>;
};

/** order by sum() on columns of table "payment_requests" */
export type Payment_Requests_Sum_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "payment_requests" */
export type Payment_Requests_Var_Pop_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "payment_requests" */
export type Payment_Requests_Var_Samp_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  recipientId: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "payment_requests" */
export type Payment_Requests_Variance_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
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
  logoUrl: InputMaybe<Scalars['String']>;
  longDescription: InputMaybe<Scalars['String']>;
  name: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  shortDescription: InputMaybe<Scalars['String']>;
  telegramLink: InputMaybe<Scalars['String']>;
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

/** order by max() on columns of table "project_leads" */
export type Project_Leads_Max_Order_By = {
  projectId: InputMaybe<OrderBy>;
  userId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "project_leads" */
export type Project_Leads_Min_Order_By = {
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
  projectId: InputMaybe<Scalars['uuid']>;
  userId: InputMaybe<Scalars['uuid']>;
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
  /** fetch data from the table: "auth.github_users" */
  authGithubUsers: Array<AuthGithubUsers>;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk: Maybe<Budgets>;
  fetchIssue: Maybe<Issue>;
  fetchIssueByRepositoryId: Maybe<Issue>;
  fetchRepositoryDetails: Maybe<Repository>;
  fetchRepositoryPRs: Maybe<Array<Issue>>;
  fetchUserDetails: Maybe<User>;
  fetchUserDetailsById: Maybe<User>;
  /** fetch data from the table: "github_repo_details" */
  githubRepoDetails: Array<GithubRepoDetails>;
  /** fetch data from the table: "github_repo_details" using primary key columns */
  githubRepoDetailsByPk: Maybe<GithubRepoDetails>;
  hello: Scalars['String'];
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
  /** fetch data from the table: "pending_project_leader_invitations" using primary key columns */
  pendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk: Maybe<ProjectDetails>;
  /** fetch data from the table: "project_github_repos" */
  projectGithubRepos: Array<ProjectGithubRepos>;
  /** fetch data from the table: "project_github_repos" using primary key columns */
  projectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk: Maybe<ProjectLeads>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk: Maybe<Projects>;
  /** fetch data from the table: "projects_sponsors" */
  projectsSponsors: Array<ProjectsSponsors>;
  /** fetch data from the table: "projects_sponsors" using primary key columns */
  projectsSponsorsByPk: Maybe<ProjectsSponsors>;
  searchIssues: Maybe<Array<Issue>>;
  searchUsers: Maybe<Array<User>>;
  /** fetch data from the table: "sponsors" */
  sponsors: Array<Sponsors>;
  /** fetch data from the table: "sponsors" using primary key columns */
  sponsorsByPk: Maybe<Sponsors>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_info" */
  userInfo: Array<UserInfo>;
  /** fetch data from the table: "user_info" using primary key columns */
  userInfoByPk: Maybe<UserInfo>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** fetch data from the table: "work_items" using primary key columns */
  workItemsByPk: Maybe<WorkItems>;
};


export type Query_RootAuthGithubUsersArgs = {
  distinctOn: InputMaybe<Array<AuthGithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthGithubUsersOrderBy>>;
  where: InputMaybe<AuthGithubUsersBoolExp>;
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


export type Query_RootFetchRepositoryDetailsArgs = {
  id: Scalars['Int'];
};


export type Query_RootFetchRepositoryPRsArgs = {
  id: Scalars['Int'];
};


export type Query_RootFetchUserDetailsArgs = {
  username: Scalars['String'];
};


export type Query_RootFetchUserDetailsByIdArgs = {
  userId: Scalars['Int'];
};


export type Query_RootGithubRepoDetailsArgs = {
  distinctOn: InputMaybe<Array<GithubRepoDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubRepoDetailsOrderBy>>;
  where: InputMaybe<GithubRepoDetailsBoolExp>;
};


export type Query_RootGithubRepoDetailsByPkArgs = {
  id: Scalars['bigint'];
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


export type Query_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProjectsSponsorsArgs = {
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


export type Query_RootSearchIssuesArgs = {
  order: InputMaybe<Scalars['String']>;
  page: InputMaybe<Scalars['Int']>;
  perPage: InputMaybe<Scalars['Int']>;
  query: Scalars['String'];
  sort: InputMaybe<Scalars['String']>;
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


export type Query_RootSponsorsByPkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserArgs = {
  id: Scalars['uuid'];
};


export type Query_RootUserInfoArgs = {
  distinctOn: InputMaybe<Array<UserInfoSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<UserInfoOrderBy>>;
  where: InputMaybe<UserInfoBoolExp>;
};


export type Query_RootUserInfoByPkArgs = {
  userId: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
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


export type Query_RootWorkItemsByPkArgs = {
  issueNumber: Scalars['bigint'];
  paymentId: Scalars['uuid'];
  repoId: Scalars['bigint'];
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
  /** fetch data from the table: "auth.github_users" */
  authGithubUsers: Array<AuthGithubUsers>;
  /** fetch data from the table in a streaming manner: "auth.github_users" */
  authGithubUsersStream: Array<AuthGithubUsers>;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** An aggregate relationship */
  budgetsAggregate: BudgetsAggregate;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk: Maybe<Budgets>;
  /** fetch data from the table in a streaming manner: "budgets" */
  budgetsStream: Array<Budgets>;
  /** fetch data from the table: "github_repo_details" */
  githubRepoDetails: Array<GithubRepoDetails>;
  /** fetch data from the table: "github_repo_details" using primary key columns */
  githubRepoDetailsByPk: Maybe<GithubRepoDetails>;
  /** fetch data from the table in a streaming manner: "github_repo_details" */
  githubRepoDetailsStream: Array<GithubRepoDetails>;
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
  /** fetch data from the table: "pending_project_leader_invitations" using primary key columns */
  pendingProjectLeaderInvitationsByPk: Maybe<PendingProjectLeaderInvitations>;
  /** fetch data from the table in a streaming manner: "pending_project_leader_invitations" */
  pendingProjectLeaderInvitationsStream: Array<PendingProjectLeaderInvitations>;
  /** fetch data from the table: "project_details" */
  projectDetails: Array<ProjectDetails>;
  /** fetch data from the table: "project_details" using primary key columns */
  projectDetailsByPk: Maybe<ProjectDetails>;
  /** fetch data from the table in a streaming manner: "project_details" */
  projectDetailsStream: Array<ProjectDetails>;
  /** fetch data from the table: "project_github_repos" */
  projectGithubRepos: Array<ProjectGithubRepos>;
  /** fetch data from the table: "project_github_repos" using primary key columns */
  projectGithubReposByPk: Maybe<ProjectGithubRepos>;
  /** fetch data from the table in a streaming manner: "project_github_repos" */
  projectGithubReposStream: Array<ProjectGithubRepos>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk: Maybe<ProjectLeads>;
  /** fetch data from the table in a streaming manner: "project_leads" */
  projectLeadsStream: Array<ProjectLeads>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk: Maybe<Projects>;
  /** fetch data from the table: "projects_sponsors" */
  projectsSponsors: Array<ProjectsSponsors>;
  /** fetch data from the table: "projects_sponsors" using primary key columns */
  projectsSponsorsByPk: Maybe<ProjectsSponsors>;
  /** fetch data from the table in a streaming manner: "projects_sponsors" */
  projectsSponsorsStream: Array<ProjectsSponsors>;
  /** fetch data from the table in a streaming manner: "projects" */
  projectsStream: Array<Projects>;
  /** fetch data from the table: "sponsors" */
  sponsors: Array<Sponsors>;
  /** fetch data from the table: "sponsors" using primary key columns */
  sponsorsByPk: Maybe<Sponsors>;
  /** fetch data from the table in a streaming manner: "sponsors" */
  sponsorsStream: Array<Sponsors>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_info" */
  userInfo: Array<UserInfo>;
  /** fetch data from the table: "user_info" using primary key columns */
  userInfoByPk: Maybe<UserInfo>;
  /** fetch data from the table in a streaming manner: "user_info" */
  userInfoStream: Array<UserInfo>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
  /** fetch data from the table in a streaming manner: "auth.users" */
  usersStream: Array<Users>;
  /** An array relationship */
  workItems: Array<WorkItems>;
  /** fetch data from the table: "work_items" using primary key columns */
  workItemsByPk: Maybe<WorkItems>;
  /** fetch data from the table in a streaming manner: "work_items" */
  workItemsStream: Array<WorkItems>;
};


export type Subscription_RootAuthGithubUsersArgs = {
  distinctOn: InputMaybe<Array<AuthGithubUsersSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<AuthGithubUsersOrderBy>>;
  where: InputMaybe<AuthGithubUsersBoolExp>;
};


export type Subscription_RootAuthGithubUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Auth_Github_Users_StreamCursorInput>>;
  where: InputMaybe<AuthGithubUsersBoolExp>;
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


export type Subscription_RootGithubRepoDetailsArgs = {
  distinctOn: InputMaybe<Array<GithubRepoDetailsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<GithubRepoDetailsOrderBy>>;
  where: InputMaybe<GithubRepoDetailsBoolExp>;
};


export type Subscription_RootGithubRepoDetailsByPkArgs = {
  id: Scalars['bigint'];
};


export type Subscription_RootGithubRepoDetailsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Github_Repo_Details_StreamCursorInput>>;
  where: InputMaybe<GithubRepoDetailsBoolExp>;
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


export type Subscription_RootProjectsByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProjectsSponsorsArgs = {
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


export type Subscription_RootSponsorsArgs = {
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


export type Subscription_RootUserInfoArgs = {
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


export type Subscription_RootUsersArgs = {
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

/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type Users = {
  __typename?: 'users';
  activeMfaType: Maybe<Scalars['String']>;
  avatarUrl: Scalars['String'];
  createdAt: Maybe<Scalars['timestamptz']>;
  defaultRole: Maybe<Scalars['String']>;
  disabled: Maybe<Scalars['Boolean']>;
  displayName: Scalars['String'];
  email: Maybe<Scalars['citext']>;
  emailVerified: Maybe<Scalars['Boolean']>;
  /** An object relationship */
  githubUser: Maybe<AuthGithubUsers>;
  id: Scalars['uuid'];
  isAnonymous: Maybe<Scalars['Boolean']>;
  locale: Maybe<Scalars['String']>;
  metadata: Maybe<Scalars['jsonb']>;
  newEmail: Maybe<Scalars['citext']>;
  phoneNumber: Maybe<Scalars['String']>;
  phoneNumberVerified: Maybe<Scalars['Boolean']>;
  /** An array relationship */
  projectsLeaded: Array<ProjectLeads>;
  /** An object relationship */
  userInfo: Maybe<UserInfo>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersMetadataArgs = {
  path: InputMaybe<Scalars['String']>;
};


/** User account information. Don't modify its structure as Hasura Auth relies on it to function properly. */
export type UsersProjectsLeadedArgs = {
  distinctOn: InputMaybe<Array<ProjectLeadsSelectColumn>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Array<ProjectLeadsOrderBy>>;
  where: InputMaybe<ProjectLeadsBoolExp>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type UsersAppendInput = {
  metadata: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "auth.users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and: InputMaybe<Array<UsersBoolExp>>;
  _not: InputMaybe<UsersBoolExp>;
  _or: InputMaybe<Array<UsersBoolExp>>;
  activeMfaType: InputMaybe<StringComparisonExp>;
  avatarUrl: InputMaybe<StringComparisonExp>;
  createdAt: InputMaybe<TimestamptzComparisonExp>;
  defaultRole: InputMaybe<StringComparisonExp>;
  disabled: InputMaybe<BooleanComparisonExp>;
  displayName: InputMaybe<StringComparisonExp>;
  email: InputMaybe<CitextComparisonExp>;
  emailVerified: InputMaybe<BooleanComparisonExp>;
  githubUser: InputMaybe<AuthGithubUsersBoolExp>;
  id: InputMaybe<UuidComparisonExp>;
  isAnonymous: InputMaybe<BooleanComparisonExp>;
  locale: InputMaybe<StringComparisonExp>;
  metadata: InputMaybe<JsonbComparisonExp>;
  newEmail: InputMaybe<CitextComparisonExp>;
  phoneNumber: InputMaybe<StringComparisonExp>;
  phoneNumberVerified: InputMaybe<BooleanComparisonExp>;
  projectsLeaded: InputMaybe<ProjectLeadsBoolExp>;
  userInfo: InputMaybe<UserInfoBoolExp>;
};

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

/** response of any mutation on the table "auth.users" */
export type UsersMutationResponse = {
  __typename?: 'usersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** Ordering options when selecting data from "auth.users". */
export type UsersOrderBy = {
  activeMfaType: InputMaybe<OrderBy>;
  avatarUrl: InputMaybe<OrderBy>;
  createdAt: InputMaybe<OrderBy>;
  defaultRole: InputMaybe<OrderBy>;
  disabled: InputMaybe<OrderBy>;
  displayName: InputMaybe<OrderBy>;
  email: InputMaybe<OrderBy>;
  emailVerified: InputMaybe<OrderBy>;
  githubUser: InputMaybe<AuthGithubUsersOrderBy>;
  id: InputMaybe<OrderBy>;
  isAnonymous: InputMaybe<OrderBy>;
  locale: InputMaybe<OrderBy>;
  metadata: InputMaybe<OrderBy>;
  newEmail: InputMaybe<OrderBy>;
  phoneNumber: InputMaybe<OrderBy>;
  phoneNumberVerified: InputMaybe<OrderBy>;
  projectsLeadedAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  userInfo: InputMaybe<UserInfoOrderBy>;
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
  Locale = 'locale',
  /** column name */
  Metadata = 'metadata',
  /** column name */
  NewEmail = 'newEmail',
  /** column name */
  PhoneNumber = 'phoneNumber',
  /** column name */
  PhoneNumberVerified = 'phoneNumberVerified'
}

/** input type for updating data in table "auth.users" */
export type UsersSetInput = {
  email: InputMaybe<Scalars['citext']>;
  metadata: InputMaybe<Scalars['jsonb']>;
};

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
  defaultRole: InputMaybe<Scalars['String']>;
  disabled: InputMaybe<Scalars['Boolean']>;
  displayName: InputMaybe<Scalars['String']>;
  email: InputMaybe<Scalars['citext']>;
  emailVerified: InputMaybe<Scalars['Boolean']>;
  id: InputMaybe<Scalars['uuid']>;
  isAnonymous: InputMaybe<Scalars['Boolean']>;
  locale: InputMaybe<Scalars['String']>;
  metadata: InputMaybe<Scalars['jsonb']>;
  newEmail: InputMaybe<Scalars['citext']>;
  phoneNumber: InputMaybe<Scalars['String']>;
  phoneNumberVerified: InputMaybe<Scalars['Boolean']>;
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


export type UserIdentityQuery = { __typename?: 'query_root', userInfo: Array<{ __typename?: 'UserInfo', identity: any | null }> };

export type GetPaymentRequestIdsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestIdsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any }> };

export type IssueDetailsFragment = { __typename?: 'Issue', id: number, repoId: any, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null };

export type PaymentRequestDetailsFragment = { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', max: { __typename?: 'PaymentsMaxFields', processedAt: any | null } | null, sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, requestor: { __typename?: 'users', id: any, displayName: string, avatarUrl: string } | null, githubRecipient: { __typename?: 'User', id: number, login: string, avatarUrl: any } | null, workItems: Array<{ __typename?: 'WorkItems', githubIssue: { __typename?: 'Issue', id: number, repoId: any, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null } | null }> };

export type PaymentRequestDetailsQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type PaymentRequestDetailsQuery = { __typename?: 'query_root', paymentRequestsByPk: { __typename?: 'PaymentRequests', id: any, amountInUsd: any, requestedAt: any, invoiceReceivedAt: any | null, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', max: { __typename?: 'PaymentsMaxFields', processedAt: any | null } | null, sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null }, requestor: { __typename?: 'users', id: any, displayName: string, avatarUrl: string } | null, githubRecipient: { __typename?: 'User', id: number, login: string, avatarUrl: any } | null, workItems: Array<{ __typename?: 'WorkItems', githubIssue: { __typename?: 'Issue', id: number, repoId: any, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null } | null }> } | null };

export type ProjectCardGithubRepoFieldsFragment = { __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any } | null };

export type ProjectCardFieldsFragment = { __typename?: 'Projects', id: any, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null, initialAmount: any | null } | null } | null }, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }>, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, telegramLink: string | null, logoUrl: string | null, shortDescription: string } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, user: { __typename?: 'users', id: any, displayName: string, avatarUrl: string } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string, logoUrl: string, url: string | null } }> };

export type GithubUserFragment = { __typename?: 'User', id: number, login: string, avatarUrl: any };

export type GetGithubUserQueryVariables = Exact<{
  githubUserId: Scalars['Int'];
}>;


export type GetGithubUserQuery = { __typename?: 'query_root', fetchUserDetailsById: { __typename?: 'User', id: number, login: string, avatarUrl: any } | null };

export type GithubContributorFragment = { __typename?: 'User', id: number, login: string, avatarUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null };

export type FindUserQueryForPaymentFormQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type FindUserQueryForPaymentFormQuery = { __typename?: 'query_root', fetchUserDetails: { __typename?: 'User', id: number, login: string, avatarUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null } | null };

export type PaymentRequestFragment = { __typename?: 'PaymentRequests', id: any, recipientId: any, amountInUsd: any, requestedAt: any, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }>, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }> };

export type GetPaymentRequestsForProjectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetPaymentRequestsForProjectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, initialAmount: any, remainingAmount: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, recipientId: any, amountInUsd: any, requestedAt: any, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }>, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }> }> }> } | null };

export type RequestPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  contributorId: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
}>;


export type RequestPaymentMutation = { __typename?: 'mutation_root', requestPayment: any };

export type UserPayoutSettingsFragment = { __typename?: 'UserInfo', identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean | null };

export type GetUserPayoutSettingsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetUserPayoutSettingsQuery = { __typename?: 'query_root', authGithubUsers: Array<{ __typename?: 'AuthGithubUsers', user: { __typename?: 'users', userInfo: { __typename?: 'UserInfo', identity: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean | null } | null } | null }> };

export type PendingProjectLeaderInvitationsQueryVariables = Exact<{
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type PendingProjectLeaderInvitationsQuery = { __typename?: 'query_root', pendingProjectLeaderInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, projectId: any }> };

export type PendingUserPaymentsQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type PendingUserPaymentsQuery = { __typename?: 'query_root', user: { __typename?: 'users', githubUser: { __typename?: 'AuthGithubUsers', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } }> } | null } | null };

export type MarkInvoiceAsReceivedMutationVariables = Exact<{
  paymentReferences: Array<PaymentReference> | PaymentReference;
}>;


export type MarkInvoiceAsReceivedMutation = { __typename?: 'mutation_root', markInvoiceAsReceived: number };

export type WorkItemFragment = { __typename?: 'WorkItems', repoId: any, issueNumber: any };

export type UserPaymentRequestFragment = { __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, shortDescription: string, logoUrl: string | null } | null } | null } | null };

export type GetPaymentRequestsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, invoiceReceivedAt: any | null, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, shortDescription: string, logoUrl: string | null } | null } | null } | null }> };

export type UpdateProfileInfoMutationVariables = Exact<{
  contactInformation: InputMaybe<ContactInformation>;
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
}>;


export type UpdateProfileInfoMutation = { __typename?: 'mutation_root', updateProfileInfo: any };

export type ProfileQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type ProfileQuery = { __typename?: 'query_root', userInfoByPk: { __typename?: 'UserInfo', userId: any, identity: any | null, contactInformation: any | null, location: any | null, payoutSettings: any | null, arePayoutSettingsValid: boolean | null } | null };

export type ContributorsTableFieldsFragment = { __typename?: 'User', id: number, login: string, avatarUrl: any, htmlUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }> }> };

export type GithubRepoContributorsFieldsFragment = { __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: any, htmlUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }> }> }> } | null } | null };

export type GetProjectContributorsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string } | null, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: any, htmlUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }> }> }> } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number, login: string, avatarUrl: any, htmlUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }> }> } | null }> }> } | null };

export type GetProjectRemainingBudgetQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectRemainingBudgetQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, remainingAmount: any }> } | null };

export type GithubRepoStaticDetailsFragment = { __typename?: 'GithubRepoDetails', id: any, languages: any };

export type GithubRepoDynamicDetailsFragment = { __typename?: 'Repository', id: number, owner: string, name: string, description: string, stars: number, forksCount: number, htmlUrl: any };

export type GetGithubRepositoryDetailsQueryVariables = Exact<{
  githubRepoId: Scalars['bigint'];
}>;


export type GetGithubRepositoryDetailsQuery = { __typename?: 'query_root', githubRepoDetailsByPk: { __typename?: 'GithubRepoDetails', id: any, languages: any, content: { __typename?: 'Repository', id: number, owner: string, name: string, description: string, stars: number, forksCount: number, htmlUrl: any } | null } | null };

export type ProjectLeadFragment = { __typename?: 'users', id: any, displayName: string, avatarUrl: string };

export type SponsorFragment = { __typename?: 'Sponsors', id: any, name: string, logoUrl: string, url: string | null };

export type GetProjectContributorsForOverviewQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsForOverviewQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoDetails: { __typename?: 'GithubRepoDetails', content: { __typename?: 'Repository', contributors: Array<{ __typename?: 'User', login: string, avatarUrl: any }> } | null } | null }> } | null };

export type GetProjectOverviewDetailsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectOverviewDetailsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, longDescription: string, logoUrl: string | null } | null, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', content: { __typename?: 'Repository', stars: number } | null } | null }> } | null };

export type SearchGithubUsersByHandleSubstringQueryVariables = Exact<{
  handleSubstringQuery: Scalars['String'];
}>;


export type SearchGithubUsersByHandleSubstringQuery = { __typename?: 'query_root', searchUsers: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null }> | null };

export type GetProjectContributorsForPaymentSelectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsForPaymentSelectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoDetails: { __typename?: 'GithubRepoDetails', content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null }> } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number, login: string, avatarUrl: any, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null } | null }> }> } | null };

export type FetchIssueQueryVariables = Exact<{
  repoOwner: Scalars['String'];
  repoName: Scalars['String'];
  issueNumber: Scalars['Int'];
}>;


export type FetchIssueQuery = { __typename?: 'query_root', fetchIssue: { __typename?: 'Issue', id: number, repoId: any, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null } | null };

export type SearchIssuesQueryVariables = Exact<{
  query: Scalars['String'];
  order: InputMaybe<Scalars['String']>;
  sort: InputMaybe<Scalars['String']>;
  perPage: InputMaybe<Scalars['Int']>;
}>;


export type SearchIssuesQuery = { __typename?: 'query_root', searchIssues: Array<{ __typename?: 'Issue', id: number, repoId: any, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null }> | null };

export type RepositoryOwnerAndNameFragment = { __typename?: 'Repository', owner: string, name: string };

export type GetPaidWorkItemsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetPaidWorkItemsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', owner: string, name: string } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, workItems: Array<{ __typename?: 'WorkItems', repoId: any, issueNumber: any }> }> }> } | null };

export type FetchIssueQueryVariables = Exact<{
  repoOwner: Scalars['String'];
  repoName: Scalars['String'];
  issueNumber: Scalars['Int'];
}>;


export type FetchIssueQuery = { __typename?: 'query_root', fetchIssue: { __typename?: 'Issue', id: number, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null } | null };

export type GetProjectReposQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectReposQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, owner: string, name: string } | null }> } | null };

export type CreateIssueMutationVariables = Exact<{
  projectId: Scalars['Uuid'];
  githubRepoId: Scalars['Int'];
  title: Scalars['String'];
  description: Scalars['String'];
}>;


export type CreateIssueMutation = { __typename?: 'mutation_root', createIssue: { __typename?: 'Issue', id: number, number: number, type: Type, status: Status, title: string, htmlUrl: any, createdAt: any, closedAt: any | null, mergedAt: any | null } };

export type SidebarProjectDetailsFragment = { __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }> };

export type GetProjectsForSidebarQueryVariables = Exact<{
  ledProjectIds: InputMaybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectsForSidebarQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }> }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetProjectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null, initialAmount: any | null } | null } | null }, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }>, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, telegramLink: string | null, logoUrl: string | null, shortDescription: string } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, user: { __typename?: 'users', id: any, displayName: string, avatarUrl: string } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string, logoUrl: string, url: string | null } }> } | null };

export type AcceptProjectLeaderInvitationMutationVariables = Exact<{
  invitationId: Scalars['Uuid'];
}>;


export type AcceptProjectLeaderInvitationMutation = { __typename?: 'mutation_root', acceptProjectLeaderInvitation: boolean };

export type GetProjectsQueryVariables = Exact<{
  languages: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  sponsors: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type GetProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, budgetsAggregate: { __typename?: 'BudgetsAggregate', aggregate: { __typename?: 'BudgetsAggregateFields', sum: { __typename?: 'BudgetsSumFields', spentAmount: any | null, initialAmount: any | null } | null } | null }, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }>, projectDetails: { __typename?: 'ProjectDetails', projectId: any, name: string, telegramLink: string | null, logoUrl: string | null, shortDescription: string } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any, user: { __typename?: 'users', id: any, displayName: string, avatarUrl: string } | null }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string, logoUrl: string, url: string | null } }> }> };

export type GetAllFilterOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllFilterOptionsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, projectSponsors: Array<{ __typename?: 'ProjectsSponsors', sponsor: { __typename?: 'Sponsors', id: any, name: string } }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any } | null }>, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, budgets: Array<{ __typename?: 'Budgets', id: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> }> };

export type GithubRepoLanguagesFieldsFragment = { __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, languages: any } | null };

export type VisibleProjectFragment = { __typename?: 'Projects', id: any, projectLeads: Array<{ __typename?: 'ProjectLeads', userId: any }>, githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any }>, budgets: Array<{ __typename?: 'Budgets', id: any }>, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, githubUserId: any }> };

export type ContributorIdFragment = { __typename?: 'User', id: number };

export type ProjectContributorsFragment = { __typename?: 'Projects', githubRepos: Array<{ __typename?: 'ProjectGithubRepos', githubRepoId: any, githubRepoDetails: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number }> } | null } | null }>, budgets: Array<{ __typename?: 'Budgets', id: any, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, githubRecipient: { __typename?: 'User', id: number } | null }> }> };

export const IssueDetailsFragmentDoc = gql`
    fragment IssueDetails on Issue {
  id
  repoId
  number
  type
  status
  title
  htmlUrl
  createdAt
  closedAt
  mergedAt
}
    `;
export const PaymentRequestDetailsFragmentDoc = gql`
    fragment PaymentRequestDetails on PaymentRequests {
  id
  amountInUsd
  requestedAt
  paymentsAggregate {
    aggregate {
      max {
        processedAt
      }
    }
  }
  invoiceReceivedAt
  requestor {
    id
    displayName
    avatarUrl
  }
  githubRecipient {
    id
    login
    avatarUrl
  }
  workItems {
    githubIssue {
      ...IssueDetails
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
    ${IssueDetailsFragmentDoc}`;
export const ContributorIdFragmentDoc = gql`
    fragment ContributorId on User {
  id
}
    `;
export const ProjectContributorsFragmentDoc = gql`
    fragment ProjectContributors on Projects {
  githubRepos {
    githubRepoId
    githubRepoDetails {
      id
      content {
        id
        contributors {
          ...ContributorId
        }
      }
    }
  }
  budgets {
    id
    paymentRequests {
      id
      githubRecipient {
        ...ContributorId
      }
    }
  }
}
    ${ContributorIdFragmentDoc}`;
export const ProjectLeadFragmentDoc = gql`
    fragment ProjectLead on users {
  id
  displayName
  avatarUrl
}
    `;
export const ProjectCardGithubRepoFieldsFragmentDoc = gql`
    fragment ProjectCardGithubRepoFields on ProjectGithubRepos {
  githubRepoId
  githubRepoDetails {
    id
    languages
  }
}
    `;
export const SponsorFragmentDoc = gql`
    fragment Sponsor on Sponsors {
  id
  name
  logoUrl
  url
}
    `;
export const ProjectCardFieldsFragmentDoc = gql`
    fragment ProjectCardFields on Projects {
  id
  ...ProjectContributors
  budgetsAggregate {
    aggregate {
      sum {
        spentAmount
        initialAmount
      }
    }
  }
  budgets {
    id
  }
  projectDetails {
    projectId
    name
    telegramLink
    logoUrl
    shortDescription
  }
  pendingInvitations {
    id
    githubUserId
  }
  projectLeads {
    userId
    user {
      ...ProjectLead
    }
  }
  githubRepos {
    ...ProjectCardGithubRepoFields
  }
  projectSponsors {
    sponsor {
      ...Sponsor
    }
  }
}
    ${ProjectContributorsFragmentDoc}
${ProjectLeadFragmentDoc}
${ProjectCardGithubRepoFieldsFragmentDoc}
${SponsorFragmentDoc}`;
export const GithubUserFragmentDoc = gql`
    fragment GithubUser on User {
  id
  login
  avatarUrl
}
    `;
export const GithubContributorFragmentDoc = gql`
    fragment GithubContributor on User {
  ...GithubUser
  user {
    userId
  }
}
    ${GithubUserFragmentDoc}`;
export const PaymentRequestFragmentDoc = gql`
    fragment PaymentRequest on PaymentRequests {
  id
  recipientId
  amountInUsd
  workItems {
    repoId
    issueNumber
  }
  payments {
    amount
    currencyCode
  }
  requestedAt
}
    `;
export const UserPayoutSettingsFragmentDoc = gql`
    fragment UserPayoutSettings on UserInfo {
  identity
  location
  payoutSettings
  arePayoutSettingsValid
}
    `;
export const WorkItemFragmentDoc = gql`
    fragment WorkItem on WorkItems {
  repoId
  issueNumber
}
    `;
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
export const ContributorsTableFieldsFragmentDoc = gql`
    fragment ContributorsTableFields on User {
  id
  login
  avatarUrl
  htmlUrl
  user {
    userId
  }
  paymentRequests {
    id
    budget {
      id
      projectId
    }
    amountInUsd
    workItems {
      repoId
      issueNumber
    }
  }
}
    `;
export const GithubRepoContributorsFieldsFragmentDoc = gql`
    fragment GithubRepoContributorsFields on ProjectGithubRepos {
  githubRepoId
  githubRepoDetails {
    id
    content {
      id
      contributors {
        ...ContributorsTableFields
      }
    }
  }
}
    ${ContributorsTableFieldsFragmentDoc}`;
export const GithubRepoStaticDetailsFragmentDoc = gql`
    fragment GithubRepoStaticDetails on GithubRepoDetails {
  id
  languages
}
    `;
export const GithubRepoDynamicDetailsFragmentDoc = gql`
    fragment GithubRepoDynamicDetails on Repository {
  id
  owner
  name
  description
  stars
  forksCount
  htmlUrl
}
    `;
export const RepositoryOwnerAndNameFragmentDoc = gql`
    fragment RepositoryOwnerAndName on Repository {
  owner
  name
}
    `;
export const SidebarProjectDetailsFragmentDoc = gql`
    fragment SidebarProjectDetails on Projects {
  ...ProjectContributors
  id
  projectDetails {
    projectId
    name
    logoUrl
  }
  pendingInvitations {
    id
  }
}
    ${ProjectContributorsFragmentDoc}`;
export const GithubRepoLanguagesFieldsFragmentDoc = gql`
    fragment GithubRepoLanguagesFields on ProjectGithubRepos {
  githubRepoId
  githubRepoDetails {
    id
    languages
  }
}
    `;
export const VisibleProjectFragmentDoc = gql`
    fragment VisibleProject on Projects {
  id
  projectLeads {
    userId
  }
  githubRepos {
    githubRepoId
  }
  budgets {
    id
  }
  pendingInvitations {
    id
    githubUserId
  }
}
    `;
export const UserIdentityDocument = gql`
    query UserIdentity($userId: uuid!) {
  userInfo(where: {userId: {_eq: $userId}}) {
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
  paymentRequests(where: {recipientId: {_eq: $githubUserId}}) {
    id
  }
}
    `;

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
export const GetGithubUserDocument = gql`
    query GetGithubUser($githubUserId: Int!) {
  fetchUserDetailsById(userId: $githubUserId) {
    ...GithubUser
  }
}
    ${GithubUserFragmentDoc}`;

/**
 * __useGetGithubUserQuery__
 *
 * To run a query within a React component, call `useGetGithubUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGithubUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGithubUserQuery({
 *   variables: {
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useGetGithubUserQuery(baseOptions: Apollo.QueryHookOptions<GetGithubUserQuery, GetGithubUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGithubUserQuery, GetGithubUserQueryVariables>(GetGithubUserDocument, options);
      }
export function useGetGithubUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGithubUserQuery, GetGithubUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGithubUserQuery, GetGithubUserQueryVariables>(GetGithubUserDocument, options);
        }
export type GetGithubUserQueryHookResult = ReturnType<typeof useGetGithubUserQuery>;
export type GetGithubUserLazyQueryHookResult = ReturnType<typeof useGetGithubUserLazyQuery>;
export type GetGithubUserQueryResult = Apollo.QueryResult<GetGithubUserQuery, GetGithubUserQueryVariables>;
export const FindUserQueryForPaymentFormDocument = gql`
    query FindUserQueryForPaymentForm($username: String!) {
  fetchUserDetails(username: $username) {
    ...GithubContributor
  }
}
    ${GithubContributorFragmentDoc}`;

/**
 * __useFindUserQueryForPaymentFormQuery__
 *
 * To run a query within a React component, call `useFindUserQueryForPaymentFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQueryForPaymentFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQueryForPaymentFormQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindUserQueryForPaymentFormQuery(baseOptions: Apollo.QueryHookOptions<FindUserQueryForPaymentFormQuery, FindUserQueryForPaymentFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserQueryForPaymentFormQuery, FindUserQueryForPaymentFormQueryVariables>(FindUserQueryForPaymentFormDocument, options);
      }
export function useFindUserQueryForPaymentFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQueryForPaymentFormQuery, FindUserQueryForPaymentFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserQueryForPaymentFormQuery, FindUserQueryForPaymentFormQueryVariables>(FindUserQueryForPaymentFormDocument, options);
        }
export type FindUserQueryForPaymentFormQueryHookResult = ReturnType<typeof useFindUserQueryForPaymentFormQuery>;
export type FindUserQueryForPaymentFormLazyQueryHookResult = ReturnType<typeof useFindUserQueryForPaymentFormLazyQuery>;
export type FindUserQueryForPaymentFormQueryResult = Apollo.QueryResult<FindUserQueryForPaymentFormQuery, FindUserQueryForPaymentFormQueryVariables>;
export const GetPaymentRequestsForProjectDocument = gql`
    query GetPaymentRequestsForProject($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    budgets {
      id
      initialAmount
      remainingAmount
      paymentRequests {
        ...PaymentRequest
      }
    }
  }
}
    ${PaymentRequestFragmentDoc}`;

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
    mutation RequestPayment($amount: Int!, $contributorId: Int!, $projectId: Uuid!, $reason: Reason!) {
  requestPayment(
    amountInUsd: $amount
    projectId: $projectId
    reason: $reason
    recipientId: $contributorId
  )
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
export const GetUserPayoutSettingsDocument = gql`
    query GetUserPayoutSettings($githubUserId: bigint!) {
  authGithubUsers(where: {githubUserId: {_eq: $githubUserId}}) {
    user {
      userInfo {
        ...UserPayoutSettings
      }
    }
  }
}
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
  user(id: $userId) {
    githubUser {
      paymentRequests {
        id
        amountInUsd
        paymentsAggregate {
          aggregate {
            sum {
              amount
            }
          }
        }
      }
    }
  }
}
    `;

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
export const UpdateProfileInfoDocument = gql`
    mutation updateProfileInfo($contactInformation: ContactInformation, $identity: IdentityInput, $location: Location, $payoutSettings: PayoutSettingsInput) {
  updateProfileInfo(
    identity: $identity
    location: $location
    payoutSettings: $payoutSettings
    contactInformation: $contactInformation
  )
}
    `;
export type UpdateProfileInfoMutationFn = Apollo.MutationFunction<UpdateProfileInfoMutation, UpdateProfileInfoMutationVariables>;

/**
 * __useUpdateProfileInfoMutation__
 *
 * To run a mutation, you first call `useUpdateProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileInfoMutation, { data, loading, error }] = useUpdateProfileInfoMutation({
 *   variables: {
 *      contactInformation: // value for 'contactInformation'
 *      identity: // value for 'identity'
 *      location: // value for 'location'
 *      payoutSettings: // value for 'payoutSettings'
 *   },
 * });
 */
export function useUpdateProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileInfoMutation, UpdateProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileInfoMutation, UpdateProfileInfoMutationVariables>(UpdateProfileInfoDocument, options);
      }
export type UpdateProfileInfoMutationHookResult = ReturnType<typeof useUpdateProfileInfoMutation>;
export type UpdateProfileInfoMutationResult = Apollo.MutationResult<UpdateProfileInfoMutation>;
export type UpdateProfileInfoMutationOptions = Apollo.BaseMutationOptions<UpdateProfileInfoMutation, UpdateProfileInfoMutationVariables>;
export const ProfileDocument = gql`
    query Profile($userId: uuid!) {
  userInfoByPk(userId: $userId) {
    userId
    identity
    contactInformation
    location
    ...UserPayoutSettings
  }
}
    ${UserPayoutSettingsFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const GetProjectContributorsDocument = gql`
    query GetProjectContributors($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    projectDetails {
      projectId
      name
    }
    githubRepos {
      ...GithubRepoContributorsFields
    }
    budgets {
      id
      paymentRequests {
        id
        githubRecipient {
          ...ContributorsTableFields
        }
      }
    }
  }
}
    ${GithubRepoContributorsFieldsFragmentDoc}
${ContributorsTableFieldsFragmentDoc}`;

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
  githubRepoDetailsByPk(id: $githubRepoId) {
    ...GithubRepoStaticDetails
    content {
      ...GithubRepoDynamicDetails
    }
  }
}
    ${GithubRepoStaticDetailsFragmentDoc}
${GithubRepoDynamicDetailsFragmentDoc}`;

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
export const GetProjectContributorsForOverviewDocument = gql`
    query GetProjectContributorsForOverview($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    githubRepos {
      githubRepoDetails {
        content {
          contributors {
            login
            avatarUrl
          }
        }
      }
    }
  }
}
    `;

/**
 * __useGetProjectContributorsForOverviewQuery__
 *
 * To run a query within a React component, call `useGetProjectContributorsForOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectContributorsForOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectContributorsForOverviewQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectContributorsForOverviewQuery(baseOptions: Apollo.QueryHookOptions<GetProjectContributorsForOverviewQuery, GetProjectContributorsForOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectContributorsForOverviewQuery, GetProjectContributorsForOverviewQueryVariables>(GetProjectContributorsForOverviewDocument, options);
      }
export function useGetProjectContributorsForOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectContributorsForOverviewQuery, GetProjectContributorsForOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectContributorsForOverviewQuery, GetProjectContributorsForOverviewQueryVariables>(GetProjectContributorsForOverviewDocument, options);
        }
export type GetProjectContributorsForOverviewQueryHookResult = ReturnType<typeof useGetProjectContributorsForOverviewQuery>;
export type GetProjectContributorsForOverviewLazyQueryHookResult = ReturnType<typeof useGetProjectContributorsForOverviewLazyQuery>;
export type GetProjectContributorsForOverviewQueryResult = Apollo.QueryResult<GetProjectContributorsForOverviewQuery, GetProjectContributorsForOverviewQueryVariables>;
export const GetProjectOverviewDetailsDocument = gql`
    query GetProjectOverviewDetails($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    projectDetails {
      projectId
      name
      longDescription
      logoUrl
    }
    githubRepos {
      githubRepoId
      githubRepoDetails {
        content {
          stars
        }
      }
    }
  }
}
    `;

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
export const SearchGithubUsersByHandleSubstringDocument = gql`
    query SearchGithubUsersByHandleSubstring($handleSubstringQuery: String!) {
  searchUsers(query: $handleSubstringQuery, sort: "followers", order: "desc") {
    id
    login
    avatarUrl
    user {
      userId
    }
  }
}
    `;

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
    id
    githubRepos {
      githubRepoDetails {
        content {
          id
          contributors {
            ...GithubContributor
          }
        }
      }
    }
    budgets {
      paymentRequests {
        id
        githubRecipient {
          ...GithubContributor
        }
      }
    }
  }
}
    ${GithubContributorFragmentDoc}`;

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
export const SearchIssuesDocument = gql`
    query searchIssues($query: String!, $order: String, $sort: String, $perPage: Int) {
  searchIssues(query: $query, order: $order, sort: $sort, perPage: $perPage) {
    ...IssueDetails
  }
}
    ${IssueDetailsFragmentDoc}`;

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
 *      query: // value for 'query'
 *      order: // value for 'order'
 *      sort: // value for 'sort'
 *      perPage: // value for 'perPage'
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
    githubRepos {
      githubRepoDetails {
        id
        content {
          ...RepositoryOwnerAndName
        }
      }
    }
    budgets {
      id
      paymentRequests {
        id
        workItems {
          repoId
          issueNumber
        }
      }
    }
  }
}
    ${RepositoryOwnerAndNameFragmentDoc}`;

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
    ...IssueDetails
  }
}
    ${IssueDetailsFragmentDoc}`;

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
    githubRepos {
      githubRepoDetails {
        ...RepositoryOwnerAndName
      }
    }
  }
}
    ${RepositoryOwnerAndNameFragmentDoc}`;

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
    ...IssueDetails
  }
}
    ${IssueDetailsFragmentDoc}`;
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
    ...VisibleProject
  }
}
    ${SidebarProjectDetailsFragmentDoc}
${VisibleProjectFragmentDoc}`;

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
export const GetProjectDocument = gql`
    query GetProject($id: uuid!) {
  projectsByPk(id: $id) {
    ...ProjectCardFields
  }
}
    ${ProjectCardFieldsFragmentDoc}`;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
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
export const GetProjectsDocument = gql`
    query GetProjects($languages: [String!], $sponsors: [String!]) {
  projects(orderBy: {budgetsAggregate: {sum: {spentAmount: DESC}}}) {
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
 *      languages: // value for 'languages'
 *      sponsors: // value for 'sponsors'
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
    ...VisibleProject
    projectSponsors {
      sponsor {
        id
        name
      }
    }
    githubRepos {
      ...GithubRepoLanguagesFields
    }
  }
}
    ${VisibleProjectFragmentDoc}
${GithubRepoLanguagesFieldsFragmentDoc}`;

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
export const CancelPaymentRequestDocument = gql`
    mutation cancelPaymentRequest($projectId: Uuid!, $paymentId: Uuid!) {
  cancelPaymentRequest(projectId: $projectId, paymentId: $paymentId)
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
export const RejectInvoiceDocument = gql`
    mutation rejectInvoice($paymentReferences: [PaymentReference!]!) {
  rejectInvoice(paymentReferences: $paymentReferences)
}
    `;
export type RejectInvoiceMutationFn = Apollo.MutationFunction<RejectInvoiceMutation, RejectInvoiceMutationVariables>;

/**
 * __useRejectInvoiceMutation__
 *
 * To run a mutation, you first call `useRejectInvoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectInvoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectInvoiceMutation, { data, loading, error }] = useRejectInvoiceMutation({
 *   variables: {
 *      paymentReferences: // value for 'paymentReferences'
 *   },
 * });
 */
export function useRejectInvoiceMutation(baseOptions?: Apollo.MutationHookOptions<RejectInvoiceMutation, RejectInvoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectInvoiceMutation, RejectInvoiceMutationVariables>(RejectInvoiceDocument, options);
      }
export type RejectInvoiceMutationHookResult = ReturnType<typeof useRejectInvoiceMutation>;
export type RejectInvoiceMutationResult = Apollo.MutationResult<RejectInvoiceMutation>;
export type RejectInvoiceMutationOptions = Apollo.BaseMutationOptions<RejectInvoiceMutation, RejectInvoiceMutationVariables>;
export const AddEthPaymentReceiptDocument = gql`
    mutation addEthPaymentReceipt($projectId: Uuid!, $paymentId: Uuid!, $amount: String!, $currencyCode: String!, $recipientIdentity: EthereumIdentityInput!, $transactionHash: String!) {
  addEthPaymentReceipt(
    projectId: $projectId
    paymentId: $paymentId
    amount: $amount
    currencyCode: $currencyCode
    recipientIdentity: $recipientIdentity
    transactionHash: $transactionHash
  )
}
    `;
export type AddEthPaymentReceiptMutationFn = Apollo.MutationFunction<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>;

/**
 * __useAddEthPaymentReceiptMutation__
 *
 * To run a mutation, you first call `useAddEthPaymentReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEthPaymentReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEthPaymentReceiptMutation, { data, loading, error }] = useAddEthPaymentReceiptMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      paymentId: // value for 'paymentId'
 *      amount: // value for 'amount'
 *      currencyCode: // value for 'currencyCode'
 *      recipientIdentity: // value for 'recipientIdentity'
 *      transactionHash: // value for 'transactionHash'
 *   },
 * });
 */
export function useAddEthPaymentReceiptMutation(baseOptions?: Apollo.MutationHookOptions<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>(AddEthPaymentReceiptDocument, options);
      }
export type AddEthPaymentReceiptMutationHookResult = ReturnType<typeof useAddEthPaymentReceiptMutation>;
export type AddEthPaymentReceiptMutationResult = Apollo.MutationResult<AddEthPaymentReceiptMutation>;
export type AddEthPaymentReceiptMutationOptions = Apollo.BaseMutationOptions<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>;
export const AddFiatPaymentReceiptDocument = gql`
    mutation addFiatPaymentReceipt($projectId: Uuid!, $paymentId: Uuid!, $amount: String!, $currencyCode: String!, $recipientIban: String!, $transactionReference: String!) {
  addFiatPaymentReceipt(
    projectId: $projectId
    paymentId: $paymentId
    amount: $amount
    currencyCode: $currencyCode
    recipientIban: $recipientIban
    transactionReference: $transactionReference
  )
}
    `;
export type AddFiatPaymentReceiptMutationFn = Apollo.MutationFunction<AddFiatPaymentReceiptMutation, AddFiatPaymentReceiptMutationVariables>;

/**
 * __useAddFiatPaymentReceiptMutation__
 *
 * To run a mutation, you first call `useAddFiatPaymentReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFiatPaymentReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFiatPaymentReceiptMutation, { data, loading, error }] = useAddFiatPaymentReceiptMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      paymentId: // value for 'paymentId'
 *      amount: // value for 'amount'
 *      currencyCode: // value for 'currencyCode'
 *      recipientIban: // value for 'recipientIban'
 *      transactionReference: // value for 'transactionReference'
 *   },
 * });
 */
export function useAddFiatPaymentReceiptMutation(baseOptions?: Apollo.MutationHookOptions<AddFiatPaymentReceiptMutation, AddFiatPaymentReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFiatPaymentReceiptMutation, AddFiatPaymentReceiptMutationVariables>(AddFiatPaymentReceiptDocument, options);
      }
export type AddFiatPaymentReceiptMutationHookResult = ReturnType<typeof useAddFiatPaymentReceiptMutation>;
export type AddFiatPaymentReceiptMutationResult = Apollo.MutationResult<AddFiatPaymentReceiptMutation>;
export type AddFiatPaymentReceiptMutationOptions = Apollo.BaseMutationOptions<AddFiatPaymentReceiptMutation, AddFiatPaymentReceiptMutationVariables>;
export const PaymentRequestsByPkDocument = gql`
    query paymentRequestsByPk($paymentId: uuid!) {
  paymentRequestsByPk(id: $paymentId) {
    id
  }
}
    `;

/**
 * __usePaymentRequestsByPkQuery__
 *
 * To run a query within a React component, call `usePaymentRequestsByPkQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentRequestsByPkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentRequestsByPkQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function usePaymentRequestsByPkQuery(baseOptions: Apollo.QueryHookOptions<PaymentRequestsByPkQuery, PaymentRequestsByPkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PaymentRequestsByPkQuery, PaymentRequestsByPkQueryVariables>(PaymentRequestsByPkDocument, options);
      }
export function usePaymentRequestsByPkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PaymentRequestsByPkQuery, PaymentRequestsByPkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PaymentRequestsByPkQuery, PaymentRequestsByPkQueryVariables>(PaymentRequestsByPkDocument, options);
        }
export type PaymentRequestsByPkQueryHookResult = ReturnType<typeof usePaymentRequestsByPkQuery>;
export type PaymentRequestsByPkLazyQueryHookResult = ReturnType<typeof usePaymentRequestsByPkLazyQuery>;
export type PaymentRequestsByPkQueryResult = Apollo.QueryResult<PaymentRequestsByPkQuery, PaymentRequestsByPkQueryVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($projectName: String!, $telegramLink: Url!, $logoUrl: Url!, $shortDescription: String!, $longDescription: String!, $initialBudget: Int) {
  createProject(
    name: $projectName
    telegramLink: $telegramLink
    logoUrl: $logoUrl
    shortDescription: $shortDescription
    longDescription: $longDescription
    initialBudget: $initialBudget
  )
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      projectName: // value for 'projectName'
 *      telegramLink: // value for 'telegramLink'
 *      logoUrl: // value for 'logoUrl'
 *      shortDescription: // value for 'shortDescription'
 *      longDescription: // value for 'longDescription'
 *      initialBudget: // value for 'initialBudget'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation updateProject($projectId: Uuid!, $name: String, $telegramLink: Url, $logoUrl: Url, $shortDescription: String, $longDescription: String) {
  updateProject(
    id: $projectId
    name: $name
    telegramLink: $telegramLink
    logoUrl: $logoUrl
    shortDescription: $shortDescription
    longDescription: $longDescription
  )
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      name: // value for 'name'
 *      telegramLink: // value for 'telegramLink'
 *      logoUrl: // value for 'logoUrl'
 *      shortDescription: // value for 'shortDescription'
 *      longDescription: // value for 'longDescription'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const GetProjectBudgetDocument = gql`
    query getProjectBudget($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    budgets {
      id
    }
  }
}
    `;

/**
 * __useGetProjectBudgetQuery__
 *
 * To run a query within a React component, call `useGetProjectBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBudgetQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectBudgetQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBudgetQuery, GetProjectBudgetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBudgetQuery, GetProjectBudgetQueryVariables>(GetProjectBudgetDocument, options);
      }
export function useGetProjectBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBudgetQuery, GetProjectBudgetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBudgetQuery, GetProjectBudgetQueryVariables>(GetProjectBudgetDocument, options);
        }
export type GetProjectBudgetQueryHookResult = ReturnType<typeof useGetProjectBudgetQuery>;
export type GetProjectBudgetLazyQueryHookResult = ReturnType<typeof useGetProjectBudgetLazyQuery>;
export type GetProjectBudgetQueryResult = Apollo.QueryResult<GetProjectBudgetQuery, GetProjectBudgetQueryVariables>;
export const UpdateBudgetAllocationDocument = gql`
    mutation updateBudgetAllocation($projectId: Uuid!, $amount: Int!) {
  updateBudgetAllocation(projectId: $projectId, newRemainingAmountInUsd: $amount)
}
    `;
export type UpdateBudgetAllocationMutationFn = Apollo.MutationFunction<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>;

/**
 * __useUpdateBudgetAllocationMutation__
 *
 * To run a mutation, you first call `useUpdateBudgetAllocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBudgetAllocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBudgetAllocationMutation, { data, loading, error }] = useUpdateBudgetAllocationMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useUpdateBudgetAllocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>(UpdateBudgetAllocationDocument, options);
      }
export type UpdateBudgetAllocationMutationHookResult = ReturnType<typeof useUpdateBudgetAllocationMutation>;
export type UpdateBudgetAllocationMutationResult = Apollo.MutationResult<UpdateBudgetAllocationMutation>;
export type UpdateBudgetAllocationMutationOptions = Apollo.BaseMutationOptions<UpdateBudgetAllocationMutation, UpdateBudgetAllocationMutationVariables>;
export const LinkGithubRepoDocument = gql`
    mutation linkGithubRepo($projectId: Uuid!, $githubRepoId: Int!) {
  linkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
}
    `;
export type LinkGithubRepoMutationFn = Apollo.MutationFunction<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>;

/**
 * __useLinkGithubRepoMutation__
 *
 * To run a mutation, you first call `useLinkGithubRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLinkGithubRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [linkGithubRepoMutation, { data, loading, error }] = useLinkGithubRepoMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubRepoId: // value for 'githubRepoId'
 *   },
 * });
 */
export function useLinkGithubRepoMutation(baseOptions?: Apollo.MutationHookOptions<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>(LinkGithubRepoDocument, options);
      }
export type LinkGithubRepoMutationHookResult = ReturnType<typeof useLinkGithubRepoMutation>;
export type LinkGithubRepoMutationResult = Apollo.MutationResult<LinkGithubRepoMutation>;
export type LinkGithubRepoMutationOptions = Apollo.BaseMutationOptions<LinkGithubRepoMutation, LinkGithubRepoMutationVariables>;
export const UnlinkGithubRepoDocument = gql`
    mutation unlinkGithubRepo($projectId: Uuid!, $githubRepoId: Int!) {
  unlinkGithubRepo(projectId: $projectId, githubRepoId: $githubRepoId)
}
    `;
export type UnlinkGithubRepoMutationFn = Apollo.MutationFunction<UnlinkGithubRepoMutation, UnlinkGithubRepoMutationVariables>;

/**
 * __useUnlinkGithubRepoMutation__
 *
 * To run a mutation, you first call `useUnlinkGithubRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlinkGithubRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlinkGithubRepoMutation, { data, loading, error }] = useUnlinkGithubRepoMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubRepoId: // value for 'githubRepoId'
 *   },
 * });
 */
export function useUnlinkGithubRepoMutation(baseOptions?: Apollo.MutationHookOptions<UnlinkGithubRepoMutation, UnlinkGithubRepoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnlinkGithubRepoMutation, UnlinkGithubRepoMutationVariables>(UnlinkGithubRepoDocument, options);
      }
export type UnlinkGithubRepoMutationHookResult = ReturnType<typeof useUnlinkGithubRepoMutation>;
export type UnlinkGithubRepoMutationResult = Apollo.MutationResult<UnlinkGithubRepoMutation>;
export type UnlinkGithubRepoMutationOptions = Apollo.BaseMutationOptions<UnlinkGithubRepoMutation, UnlinkGithubRepoMutationVariables>;
export const UnassignProjectLeadDocument = gql`
    mutation unassignProjectLead($projectId: Uuid!, $userId: Uuid!) {
  unassignProjectLead(projectId: $projectId, userId: $userId)
}
    `;
export type UnassignProjectLeadMutationFn = Apollo.MutationFunction<UnassignProjectLeadMutation, UnassignProjectLeadMutationVariables>;

/**
 * __useUnassignProjectLeadMutation__
 *
 * To run a mutation, you first call `useUnassignProjectLeadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnassignProjectLeadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unassignProjectLeadMutation, { data, loading, error }] = useUnassignProjectLeadMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUnassignProjectLeadMutation(baseOptions?: Apollo.MutationHookOptions<UnassignProjectLeadMutation, UnassignProjectLeadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnassignProjectLeadMutation, UnassignProjectLeadMutationVariables>(UnassignProjectLeadDocument, options);
      }
export type UnassignProjectLeadMutationHookResult = ReturnType<typeof useUnassignProjectLeadMutation>;
export type UnassignProjectLeadMutationResult = Apollo.MutationResult<UnassignProjectLeadMutation>;
export type UnassignProjectLeadMutationOptions = Apollo.BaseMutationOptions<UnassignProjectLeadMutation, UnassignProjectLeadMutationVariables>;
export const InviteProjectLeaderDocument = gql`
    mutation inviteProjectLeader($projectId: Uuid!, $githubUserId: Int!) {
  inviteProjectLeader(projectId: $projectId, githubUserId: $githubUserId)
}
    `;
export type InviteProjectLeaderMutationFn = Apollo.MutationFunction<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>;

/**
 * __useInviteProjectLeaderMutation__
 *
 * To run a mutation, you first call `useInviteProjectLeaderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteProjectLeaderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteProjectLeaderMutation, { data, loading, error }] = useInviteProjectLeaderMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      githubUserId: // value for 'githubUserId'
 *   },
 * });
 */
export function useInviteProjectLeaderMutation(baseOptions?: Apollo.MutationHookOptions<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>(InviteProjectLeaderDocument, options);
      }
export type InviteProjectLeaderMutationHookResult = ReturnType<typeof useInviteProjectLeaderMutation>;
export type InviteProjectLeaderMutationResult = Apollo.MutationResult<InviteProjectLeaderMutation>;
export type InviteProjectLeaderMutationOptions = Apollo.BaseMutationOptions<InviteProjectLeaderMutation, InviteProjectLeaderMutationVariables>;
export const CreateSponsorDocument = gql`
    mutation createSponsor($name: String!, $logoUrl: Url!, $url: Url) {
  createSponsor(name: $name, logoUrl: $logoUrl, url: $url)
}
    `;
export type CreateSponsorMutationFn = Apollo.MutationFunction<CreateSponsorMutation, CreateSponsorMutationVariables>;

/**
 * __useCreateSponsorMutation__
 *
 * To run a mutation, you first call `useCreateSponsorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSponsorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSponsorMutation, { data, loading, error }] = useCreateSponsorMutation({
 *   variables: {
 *      name: // value for 'name'
 *      logoUrl: // value for 'logoUrl'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useCreateSponsorMutation(baseOptions?: Apollo.MutationHookOptions<CreateSponsorMutation, CreateSponsorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSponsorMutation, CreateSponsorMutationVariables>(CreateSponsorDocument, options);
      }
export type CreateSponsorMutationHookResult = ReturnType<typeof useCreateSponsorMutation>;
export type CreateSponsorMutationResult = Apollo.MutationResult<CreateSponsorMutation>;
export type CreateSponsorMutationOptions = Apollo.BaseMutationOptions<CreateSponsorMutation, CreateSponsorMutationVariables>;
export const UpdateSponsorDocument = gql`
    mutation updateSponsor($sponsorId: Uuid!, $name: String, $logoUrl: Url, $url: Url) {
  updateSponsor(sponsorId: $sponsorId, name: $name, logoUrl: $logoUrl, url: $url)
}
    `;
export type UpdateSponsorMutationFn = Apollo.MutationFunction<UpdateSponsorMutation, UpdateSponsorMutationVariables>;

/**
 * __useUpdateSponsorMutation__
 *
 * To run a mutation, you first call `useUpdateSponsorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSponsorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSponsorMutation, { data, loading, error }] = useUpdateSponsorMutation({
 *   variables: {
 *      sponsorId: // value for 'sponsorId'
 *      name: // value for 'name'
 *      logoUrl: // value for 'logoUrl'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateSponsorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSponsorMutation, UpdateSponsorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSponsorMutation, UpdateSponsorMutationVariables>(UpdateSponsorDocument, options);
      }
export type UpdateSponsorMutationHookResult = ReturnType<typeof useUpdateSponsorMutation>;
export type UpdateSponsorMutationResult = Apollo.MutationResult<UpdateSponsorMutation>;
export type UpdateSponsorMutationOptions = Apollo.BaseMutationOptions<UpdateSponsorMutation, UpdateSponsorMutationVariables>;
export const AddSponsorToProjectDocument = gql`
    mutation addSponsorToProject($projectId: Uuid!, $sponsorId: Uuid!) {
  addSponsorToProject(projectId: $projectId, sponsorId: $sponsorId)
}
    `;
export type AddSponsorToProjectMutationFn = Apollo.MutationFunction<AddSponsorToProjectMutation, AddSponsorToProjectMutationVariables>;

/**
 * __useAddSponsorToProjectMutation__
 *
 * To run a mutation, you first call `useAddSponsorToProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSponsorToProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSponsorToProjectMutation, { data, loading, error }] = useAddSponsorToProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      sponsorId: // value for 'sponsorId'
 *   },
 * });
 */
export function useAddSponsorToProjectMutation(baseOptions?: Apollo.MutationHookOptions<AddSponsorToProjectMutation, AddSponsorToProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddSponsorToProjectMutation, AddSponsorToProjectMutationVariables>(AddSponsorToProjectDocument, options);
      }
export type AddSponsorToProjectMutationHookResult = ReturnType<typeof useAddSponsorToProjectMutation>;
export type AddSponsorToProjectMutationResult = Apollo.MutationResult<AddSponsorToProjectMutation>;
export type AddSponsorToProjectMutationOptions = Apollo.BaseMutationOptions<AddSponsorToProjectMutation, AddSponsorToProjectMutationVariables>;
export const RemoveSponsorFromProjectDocument = gql`
    mutation removeSponsorFromProject($projectId: Uuid!, $sponsorId: Uuid!) {
  removeSponsorFromProject(projectId: $projectId, sponsorId: $sponsorId)
}
    `;
export type RemoveSponsorFromProjectMutationFn = Apollo.MutationFunction<RemoveSponsorFromProjectMutation, RemoveSponsorFromProjectMutationVariables>;

/**
 * __useRemoveSponsorFromProjectMutation__
 *
 * To run a mutation, you first call `useRemoveSponsorFromProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSponsorFromProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSponsorFromProjectMutation, { data, loading, error }] = useRemoveSponsorFromProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      sponsorId: // value for 'sponsorId'
 *   },
 * });
 */
export function useRemoveSponsorFromProjectMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSponsorFromProjectMutation, RemoveSponsorFromProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSponsorFromProjectMutation, RemoveSponsorFromProjectMutationVariables>(RemoveSponsorFromProjectDocument, options);
      }
export type RemoveSponsorFromProjectMutationHookResult = ReturnType<typeof useRemoveSponsorFromProjectMutation>;
export type RemoveSponsorFromProjectMutationResult = Apollo.MutationResult<RemoveSponsorFromProjectMutation>;
export type RemoveSponsorFromProjectMutationOptions = Apollo.BaseMutationOptions<RemoveSponsorFromProjectMutation, RemoveSponsorFromProjectMutationVariables>;
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: citext!) {
  users(where: {email: {_eq: $email}}) {
    id
  }
}
    `;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const SetUserEmailVerifiedDocument = gql`
    mutation setUserEmailVerified($userId: uuid!) {
  updateUser(pk_columns: {id: $userId}, _set: {emailVerified: true}) {
    id
  }
}
    `;
export type SetUserEmailVerifiedMutationFn = Apollo.MutationFunction<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>;

/**
 * __useSetUserEmailVerifiedMutation__
 *
 * To run a mutation, you first call `useSetUserEmailVerifiedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserEmailVerifiedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserEmailVerifiedMutation, { data, loading, error }] = useSetUserEmailVerifiedMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useSetUserEmailVerifiedMutation(baseOptions?: Apollo.MutationHookOptions<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>(SetUserEmailVerifiedDocument, options);
      }
export type SetUserEmailVerifiedMutationHookResult = ReturnType<typeof useSetUserEmailVerifiedMutation>;
export type SetUserEmailVerifiedMutationResult = Apollo.MutationResult<SetUserEmailVerifiedMutation>;
export type SetUserEmailVerifiedMutationOptions = Apollo.BaseMutationOptions<SetUserEmailVerifiedMutation, SetUserEmailVerifiedMutationVariables>;
export const CreateGithubAuthUserDocument = gql`
    mutation createGithubAuthUser($userId: uuid!, $githubUserId: String!, $accessToken: String!) {
  insertAuthUserProvider(
    object: {userId: $userId, providerId: "github", providerUserId: $githubUserId, accessToken: $accessToken}
    onConflict: {constraint: user_providers_provider_id_provider_user_id_key, update_columns: userId}
  ) {
    id
  }
}
    `;
export type CreateGithubAuthUserMutationFn = Apollo.MutationFunction<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>;

/**
 * __useCreateGithubAuthUserMutation__
 *
 * To run a mutation, you first call `useCreateGithubAuthUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGithubAuthUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGithubAuthUserMutation, { data, loading, error }] = useCreateGithubAuthUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      githubUserId: // value for 'githubUserId'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useCreateGithubAuthUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>(CreateGithubAuthUserDocument, options);
      }
export type CreateGithubAuthUserMutationHookResult = ReturnType<typeof useCreateGithubAuthUserMutation>;
export type CreateGithubAuthUserMutationResult = Apollo.MutationResult<CreateGithubAuthUserMutation>;
export type CreateGithubAuthUserMutationOptions = Apollo.BaseMutationOptions<CreateGithubAuthUserMutation, CreateGithubAuthUserMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($contactInformation: ContactInformation!, $identity: IdentityInput!, $location: Location!, $payoutSettings: PayoutSettingsInput!) {
  updateProfileInfo(
    contactInformation: $contactInformation
    identity: $identity
    location: $location
    payoutSettings: $payoutSettings
  )
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      contactInformation: // value for 'contactInformation'
 *      identity: // value for 'identity'
 *      location: // value for 'location'
 *      payoutSettings: // value for 'payoutSettings'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
