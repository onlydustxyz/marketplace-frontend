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
  initialAmount: Maybe<Scalars['numeric']>;
  /** An array relationship */
  paymentRequests: Array<PaymentRequests>;
  /** An aggregate relationship */
  paymentRequestsAggregate: PaymentRequestsAggregate;
  /** An object relationship */
  project: Maybe<Projects>;
  projectId: Maybe<Scalars['uuid']>;
  remainingAmount: Maybe<Scalars['numeric']>;
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
};

/** Ordering options when selecting data from "budgets". */
export type BudgetsOrderBy = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  paymentRequestsAggregate: InputMaybe<PaymentRequestsAggregateOrderBy>;
  project: InputMaybe<ProjectsOrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
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
  RemainingAmount = 'remainingAmount'
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

export type CompanyIdentity = {
  name: Scalars['String'];
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

export enum Encoding {
  Base64 = 'BASE64'
}

export type File = {
  __typename?: 'File';
  content: Scalars['String'];
  encoding: Encoding;
};

/** columns and relationships of "github_repo_details" */
export type GithubRepoDetails = {
  __typename?: 'GithubRepoDetails';
  content: Repository;
  id: Scalars['bigint'];
  languages: Scalars['jsonb'];
  name: Scalars['String'];
  owner: Scalars['String'];
  pullRequests: Array<PullRequest>;
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
  name: InputMaybe<StringComparisonExp>;
  owner: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "github_repo_details". */
export type GithubRepoDetailsOrderBy = {
  id: InputMaybe<OrderBy>;
  languages: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  owner: InputMaybe<OrderBy>;
};

/** select columns of table "github_repo_details" */
export enum GithubRepoDetailsSelectColumn {
  /** column name */
  Id = 'id',
  /** column name */
  Languages = 'languages',
  /** column name */
  Name = 'name',
  /** column name */
  Owner = 'owner'
}

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

/** columns and relationships of "payment_requests" */
export type PaymentRequests = {
  __typename?: 'PaymentRequests';
  amountInUsd: Scalars['bigint'];
  /** An object relationship */
  budget: Maybe<Budgets>;
  budgetId: Scalars['uuid'];
  githubRecipient: User;
  id: Scalars['uuid'];
  /** An array relationship */
  payments: Array<Payments>;
  /** An aggregate relationship */
  paymentsAggregate: PaymentsAggregate;
  reason: Scalars['jsonb'];
  /** An object relationship */
  recipient: Maybe<AuthGithubUsers>;
  recipientId: Scalars['bigint'];
  requestedAt: Scalars['timestamp'];
  /** An object relationship */
  requestor: Maybe<Users>;
  requestorId: Scalars['uuid'];
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
export type PaymentRequestsReasonArgs = {
  path: InputMaybe<Scalars['String']>;
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
  payments: InputMaybe<PaymentsBoolExp>;
  payments_aggregate: InputMaybe<Payments_Aggregate_Bool_Exp>;
  reason: InputMaybe<JsonbComparisonExp>;
  recipient: InputMaybe<AuthGithubUsersBoolExp>;
  recipientId: InputMaybe<BigintComparisonExp>;
  requestedAt: InputMaybe<TimestampComparisonExp>;
  requestor: InputMaybe<UsersBoolExp>;
  requestorId: InputMaybe<UuidComparisonExp>;
};

/** aggregate max on columns */
export type PaymentRequestsMaxFields = {
  __typename?: 'PaymentRequestsMaxFields';
  amountInUsd: Maybe<Scalars['bigint']>;
  budgetId: Maybe<Scalars['uuid']>;
  id: Maybe<Scalars['uuid']>;
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
  paymentsAggregate: InputMaybe<PaymentsAggregateOrderBy>;
  reason: InputMaybe<OrderBy>;
  recipient: InputMaybe<AuthGithubUsersOrderBy>;
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestor: InputMaybe<UsersOrderBy>;
  requestorId: InputMaybe<OrderBy>;
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
  Reason = 'reason',
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
  receipt: InputMaybe<JsonbComparisonExp>;
  requestId: InputMaybe<UuidComparisonExp>;
};

/** aggregate max on columns */
export type PaymentsMaxFields = {
  __typename?: 'PaymentsMaxFields';
  amount: Maybe<Scalars['numeric']>;
  currencyCode: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  requestId: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type PaymentsMinFields = {
  __typename?: 'PaymentsMinFields';
  amount: Maybe<Scalars['numeric']>;
  currencyCode: Maybe<Scalars['String']>;
  id: Maybe<Scalars['uuid']>;
  requestId: Maybe<Scalars['uuid']>;
};

/** Ordering options when selecting data from "payments". */
export type PaymentsOrderBy = {
  amount: InputMaybe<OrderBy>;
  currencyCode: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  paymentRequest: InputMaybe<PaymentRequestsOrderBy>;
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
  description: Maybe<Scalars['String']>;
  logoUrl: Maybe<Scalars['String']>;
  projectId: Scalars['uuid'];
  telegramLink: Maybe<Scalars['String']>;
};

/** Boolean expression to filter rows from the table "project_details". All fields are combined with a logical 'AND'. */
export type ProjectDetailsBoolExp = {
  _and: InputMaybe<Array<ProjectDetailsBoolExp>>;
  _not: InputMaybe<ProjectDetailsBoolExp>;
  _or: InputMaybe<Array<ProjectDetailsBoolExp>>;
  description: InputMaybe<StringComparisonExp>;
  logoUrl: InputMaybe<StringComparisonExp>;
  projectId: InputMaybe<UuidComparisonExp>;
  telegramLink: InputMaybe<StringComparisonExp>;
};

/** Ordering options when selecting data from "project_details". */
export type ProjectDetailsOrderBy = {
  description: InputMaybe<OrderBy>;
  logoUrl: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  telegramLink: InputMaybe<OrderBy>;
};

/** select columns of table "project_details" */
export enum ProjectDetailsSelectColumn {
  /** column name */
  Description = 'description',
  /** column name */
  LogoUrl = 'logoUrl',
  /** column name */
  ProjectId = 'projectId',
  /** column name */
  TelegramLink = 'telegramLink'
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
  /** An object relationship */
  githubRepo: Maybe<GithubRepoDetails>;
  githubRepoId: Scalars['bigint'];
  id: Scalars['uuid'];
  name: Scalars['String'];
  /** An array relationship */
  pendingInvitations: Array<PendingProjectLeaderInvitations>;
  /** An object relationship */
  projectDetails: Maybe<ProjectDetails>;
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  totalSpentAmountInUsd: Scalars['bigint'];
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

/** Boolean expression to filter rows from the table "projects". All fields are combined with a logical 'AND'. */
export type ProjectsBoolExp = {
  _and: InputMaybe<Array<ProjectsBoolExp>>;
  _not: InputMaybe<ProjectsBoolExp>;
  _or: InputMaybe<Array<ProjectsBoolExp>>;
  budgets: InputMaybe<BudgetsBoolExp>;
  githubRepo: InputMaybe<GithubRepoDetailsBoolExp>;
  githubRepoId: InputMaybe<BigintComparisonExp>;
  id: InputMaybe<UuidComparisonExp>;
  name: InputMaybe<StringComparisonExp>;
  pendingInvitations: InputMaybe<PendingProjectLeaderInvitationsBoolExp>;
  projectDetails: InputMaybe<ProjectDetailsBoolExp>;
  projectLeads: InputMaybe<ProjectLeadsBoolExp>;
  totalSpentAmountInUsd: InputMaybe<BigintComparisonExp>;
};

/** Ordering options when selecting data from "projects". */
export type ProjectsOrderBy = {
  budgetsAggregate: InputMaybe<BudgetsAggregateOrderBy>;
  githubRepo: InputMaybe<GithubRepoDetailsOrderBy>;
  githubRepoId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
  name: InputMaybe<OrderBy>;
  pendingInvitationsAggregate: InputMaybe<PendingProjectLeaderInvitationsAggregateOrderBy>;
  projectDetails: InputMaybe<ProjectDetailsOrderBy>;
  projectLeadsAggregate: InputMaybe<ProjectLeadsAggregateOrderBy>;
  totalSpentAmountInUsd: InputMaybe<OrderBy>;
};

/** select columns of table "projects" */
export enum ProjectsSelectColumn {
  /** column name */
  GithubRepoId = 'githubRepoId',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  TotalSpentAmountInUsd = 'totalSpentAmountInUsd'
}

export type PullRequest = {
  __typename?: 'PullRequest';
  assigneeId: Maybe<Scalars['Int']>;
  closedAt: Maybe<Scalars['DateTimeUtc']>;
  createdAt: Scalars['DateTimeUtc'];
  id: Scalars['Int'];
  status: Status;
  title: Scalars['String'];
};

export type Reason = {
  workItems: InputMaybe<Array<Scalars['String']>>;
};

export type Repository = {
  __typename?: 'Repository';
  contributors: Array<User>;
  id: Scalars['Int'];
  logoUrl: Scalars['String'];
  readme: Maybe<File>;
};

export enum Status {
  Closed = 'CLOSED',
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

export type User = {
  __typename?: 'User';
  avatarUrl: Scalars['String'];
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
  email: Maybe<Scalars['String']>;
  identity: Maybe<Scalars['jsonb']>;
  location: Maybe<Scalars['jsonb']>;
  payoutSettings: Maybe<Scalars['jsonb']>;
  userId: Scalars['uuid'];
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
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "user_info". All fields are combined with a logical 'AND'. */
export type UserInfoBoolExp = {
  _and: InputMaybe<Array<UserInfoBoolExp>>;
  _not: InputMaybe<UserInfoBoolExp>;
  _or: InputMaybe<Array<UserInfoBoolExp>>;
  email: InputMaybe<StringComparisonExp>;
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
  identity: InputMaybe<Array<Scalars['String']>>;
  location: InputMaybe<Array<Scalars['String']>>;
  payoutSettings: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type UserInfoDeleteElemInput = {
  identity: InputMaybe<Scalars['Int']>;
  location: InputMaybe<Scalars['Int']>;
  payoutSettings: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type UserInfoDeleteKeyInput = {
  identity: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  payoutSettings: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "user_info" */
export type UserInfoInsertInput = {
  email: InputMaybe<Scalars['String']>;
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
  email: InputMaybe<OrderBy>;
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
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "user_info" */
export enum UserInfoSelectColumn {
  /** column name */
  Email = 'email',
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
  email: InputMaybe<Scalars['String']>;
  identity: InputMaybe<Scalars['jsonb']>;
  location: InputMaybe<Scalars['jsonb']>;
  payoutSettings: InputMaybe<Scalars['jsonb']>;
  userId: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "user_info" */
export enum UserInfoUpdateColumn {
  /** column name */
  Email = 'email',
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

/** order by avg() on columns of table "budgets" */
export type Budgets_Avg_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by max() on columns of table "budgets" */
export type Budgets_Max_Order_By = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "budgets" */
export type Budgets_Min_Order_By = {
  id: InputMaybe<OrderBy>;
  initialAmount: InputMaybe<OrderBy>;
  projectId: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by stddev() on columns of table "budgets" */
export type Budgets_Stddev_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by stddev_pop() on columns of table "budgets" */
export type Budgets_Stddev_Pop_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by stddev_samp() on columns of table "budgets" */
export type Budgets_Stddev_Samp_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
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
};

/** order by sum() on columns of table "budgets" */
export type Budgets_Sum_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by var_pop() on columns of table "budgets" */
export type Budgets_Var_Pop_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by var_samp() on columns of table "budgets" */
export type Budgets_Var_Samp_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
};

/** order by variance() on columns of table "budgets" */
export type Budgets_Variance_Order_By = {
  initialAmount: InputMaybe<OrderBy>;
  remainingAmount: InputMaybe<OrderBy>;
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
  name: InputMaybe<Scalars['String']>;
  owner: InputMaybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  acceptProjectLeaderInvitation: Scalars['Boolean'];
  /** delete data from the table: "user_info" */
  deleteUserInfo: Maybe<UserInfoMutationResponse>;
  /** delete single row from the table: "user_info" */
  deleteUserInfoByPk: Maybe<UserInfo>;
  /** insert data into the table: "user_info" */
  insertUserInfo: Maybe<UserInfoMutationResponse>;
  /** insert a single row into the table: "user_info" */
  insertUserInfoOne: Maybe<UserInfo>;
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
export type Mutation_RootDeleteUserInfoArgs = {
  where: UserInfoBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserInfoByPkArgs = {
  userId: Scalars['uuid'];
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
export type Mutation_RootRequestPaymentArgs = {
  amountInUsd: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
  recipientId: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootUpdateProfileInfoArgs = {
  email: InputMaybe<Scalars['Email']>;
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
  recipientId: InputMaybe<OrderBy>;
  requestedAt: InputMaybe<OrderBy>;
  requestorId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payment_requests" */
export type Payment_Requests_Min_Order_By = {
  amountInUsd: InputMaybe<OrderBy>;
  budgetId: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
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
  reason: InputMaybe<Scalars['jsonb']>;
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
  requestId: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "payments" */
export type Payments_Min_Order_By = {
  amount: InputMaybe<OrderBy>;
  currencyCode: InputMaybe<OrderBy>;
  id: InputMaybe<OrderBy>;
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
  description: InputMaybe<Scalars['String']>;
  logoUrl: InputMaybe<Scalars['String']>;
  projectId: InputMaybe<Scalars['uuid']>;
  telegramLink: InputMaybe<Scalars['String']>;
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

/** Streaming cursor of the table "projects" */
export type Projects_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Projects_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Projects_StreamCursorValueInput = {
  githubRepoId: InputMaybe<Scalars['bigint']>;
  id: InputMaybe<Scalars['uuid']>;
  name: InputMaybe<Scalars['String']>;
  totalSpentAmountInUsd: InputMaybe<Scalars['bigint']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "auth.github_users" */
  authGithubUsers: Array<AuthGithubUsers>;
  /** An array relationship */
  budgets: Array<Budgets>;
  /** fetch data from the table: "budgets" using primary key columns */
  budgetsByPk: Maybe<Budgets>;
  fetchRepositoryDetails: Repository;
  fetchRepositoryPRs: Array<PullRequest>;
  fetchUserDetails: User;
  fetchUserDetailsById: User;
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
  /** An array relationship */
  projectLeads: Array<ProjectLeads>;
  /** fetch data from the table: "project_leads" using primary key columns */
  projectLeadsByPk: Maybe<ProjectLeads>;
  /** fetch data from the table: "projects" */
  projects: Array<Projects>;
  /** fetch data from the table: "projects" using primary key columns */
  projectsByPk: Maybe<Projects>;
  /** fetch data from the table: "auth.users" using primary key columns */
  user: Maybe<Users>;
  /** fetch data from the table: "user_info" */
  userInfo: Array<UserInfo>;
  /** fetch data from the table: "user_info" using primary key columns */
  userInfoByPk: Maybe<UserInfo>;
  /** fetch data from the table: "auth.users" */
  users: Array<Users>;
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


export type Query_RootBudgetsByPkArgs = {
  id: Scalars['uuid'];
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

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "auth.github_users" */
  authGithubUsers: Array<AuthGithubUsers>;
  /** fetch data from the table in a streaming manner: "auth.github_users" */
  authGithubUsersStream: Array<AuthGithubUsers>;
  /** An array relationship */
  budgets: Array<Budgets>;
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
  /** fetch data from the table in a streaming manner: "projects" */
  projectsStream: Array<Projects>;
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


export type Subscription_RootProjectsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Projects_StreamCursorInput>>;
  where: InputMaybe<ProjectsBoolExp>;
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

/** Streaming cursor of the table "user_info" */
export type User_Info_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: User_Info_StreamCursorValueInput;
  /** cursor ordering */
  ordering: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Info_StreamCursorValueInput = {
  email: InputMaybe<Scalars['String']>;
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
  id: Maybe<Scalars['uuid']>;
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

export type ContributorsTableFieldsFragment = { __typename?: 'User', id: number, login: string, avatarUrl: string, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, reason: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null }> };

export type GetFirstLeadProjectIdQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetFirstLeadProjectIdQuery = { __typename?: 'query_root', user: { __typename?: 'users', id: any | null, projectsLeaded: Array<{ __typename?: 'ProjectLeads', projectId: any }> } | null };

export type GetPaymentRequestIdsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestIdsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any }> };

export type ProjectCardFieldsFragment = { __typename?: 'Projects', id: any, name: string, totalSpentAmountInUsd: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, description: string | null, telegramLink: string | null, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', user: { __typename?: 'users', displayName: string, avatarUrl: string } | null }>, githubRepo: { __typename?: 'GithubRepoDetails', id: any, name: string, owner: string, languages: any, content: { __typename?: 'Repository', id: number, logoUrl: string, contributors: Array<{ __typename?: 'User', login: string, avatarUrl: string }> } } | null };

export type GithubUserFragment = { __typename?: 'User', id: number, login: string, avatarUrl: string };

export type GetGithubUserQueryVariables = Exact<{
  githubUserId: Scalars['Int'];
}>;


export type GetGithubUserQuery = { __typename?: 'query_root', fetchUserDetailsById: { __typename?: 'User', id: number, login: string, avatarUrl: string } };

export type GithubContributorFragment = { __typename?: 'User', id: number, login: string, avatarUrl: string, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null };

export type FindUserQueryForPaymentFormQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type FindUserQueryForPaymentFormQuery = { __typename?: 'query_root', fetchUserDetails: { __typename?: 'User', id: number, login: string, avatarUrl: string, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null } };

export type PaymentRequestFragment = { __typename?: 'PaymentRequests', id: any, recipientId: any, amountInUsd: any, reason: any, requestedAt: any, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, recipient: { __typename?: 'AuthGithubUsers', user: { __typename?: 'users', userInfo: { __typename?: 'UserInfo', payoutSettings: any | null } | null } | null } | null };

export type OnNewPaymentRequestsSubscriptionVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type OnNewPaymentRequestsSubscription = { __typename?: 'subscription_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, initialAmount: any | null, remainingAmount: any | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, recipientId: any, amountInUsd: any, reason: any, requestedAt: any, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, recipient: { __typename?: 'AuthGithubUsers', user: { __typename?: 'users', userInfo: { __typename?: 'UserInfo', payoutSettings: any | null } | null } | null } | null }> }> } | null };

export type RequestPaymentMutationVariables = Exact<{
  amount: Scalars['Int'];
  contributorId: Scalars['Int'];
  projectId: Scalars['Uuid'];
  reason: Reason;
}>;


export type RequestPaymentMutation = { __typename?: 'mutation_root', requestPayment: any };

export type PendingProjectLeaderInvitationsQueryVariables = Exact<{
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type PendingProjectLeaderInvitationsQuery = { __typename?: 'query_root', pendingProjectLeaderInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any, projectId: any }> };

export type PendingUserPaymentsAndPayoutSettingsQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type PendingUserPaymentsAndPayoutSettingsQuery = { __typename?: 'query_root', user: { __typename?: 'users', userInfo: { __typename?: 'UserInfo', userId: any, payoutSettings: any | null } | null, githubUser: { __typename?: 'AuthGithubUsers', paymentRequests: Array<{ __typename?: 'PaymentRequests', amountInUsd: any, paymentsAggregate: { __typename?: 'PaymentsAggregate', aggregate: { __typename?: 'PaymentsAggregateFields', sum: { __typename?: 'PaymentsSumFields', amount: any | null } | null } | null } }> } | null } | null };

export type GetPaymentRequestsQueryVariables = Exact<{
  githubUserId: Scalars['bigint'];
}>;


export type GetPaymentRequestsQuery = { __typename?: 'query_root', paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, requestedAt: any, amountInUsd: any, reason: any, payments: Array<{ __typename?: 'Payments', amount: any, currencyCode: string }>, budget: { __typename?: 'Budgets', id: any, project: { __typename?: 'Projects', id: any, name: string, projectDetails: { __typename?: 'ProjectDetails', projectId: any, description: string | null, logoUrl: string | null } | null, githubRepo: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, logoUrl: string } } | null } | null } | null }> };

export type PayoutSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type PayoutSettingsQuery = { __typename?: 'query_root', userInfo: Array<{ __typename?: 'UserInfo', payoutSettings: any | null }> };

export type UpdateProfileInfoMutationVariables = Exact<{
  email: InputMaybe<Scalars['Email']>;
  identity: InputMaybe<IdentityInput>;
  location: InputMaybe<Location>;
  payoutSettings: InputMaybe<PayoutSettingsInput>;
}>;


export type UpdateProfileInfoMutation = { __typename?: 'mutation_root', updateProfileInfo: any };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'query_root', userInfo: Array<{ __typename?: 'UserInfo', userId: any, identity: any | null, email: string | null, location: any | null, payoutSettings: any | null }> };

export type GetProjectContributorsQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, name: string, githubRepo: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: string, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null, paymentRequests: Array<{ __typename?: 'PaymentRequests', id: any, amountInUsd: any, reason: any, budget: { __typename?: 'Budgets', id: any, projectId: any | null } | null }> }> } } | null } | null };

export type GetProjectRemainingBudgetQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectRemainingBudgetQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, budgets: Array<{ __typename?: 'Budgets', id: any, remainingAmount: any | null }> } | null };

export type GetProjectContributorsForPaymentSelectQueryVariables = Exact<{
  projectId: Scalars['uuid'];
}>;


export type GetProjectContributorsForPaymentSelectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, githubRepo: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, contributors: Array<{ __typename?: 'User', id: number, login: string, avatarUrl: string, user: { __typename?: 'AuthGithubUsers', userId: any | null } | null }> } } | null } | null };

export type GetProjectsForSidebarQueryVariables = Exact<{
  ledProjectIds: InputMaybe<Array<Scalars['uuid']> | Scalars['uuid']>;
  githubUserId: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectsForSidebarQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, name: string, projectDetails: { __typename?: 'ProjectDetails', projectId: any, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any }>, githubRepo: { __typename?: 'GithubRepoDetails', id: any, content: { __typename?: 'Repository', id: number, logoUrl: string, contributors: Array<{ __typename?: 'User', login: string }> } } | null }> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['uuid'];
  githubUserId?: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectQuery = { __typename?: 'query_root', projectsByPk: { __typename?: 'Projects', id: any, name: string, totalSpentAmountInUsd: any, githubRepo: { __typename?: 'GithubRepoDetails', id: any, name: string, owner: string, languages: any, content: { __typename?: 'Repository', id: number, logoUrl: string, readme: { __typename?: 'File', content: string } | null, contributors: Array<{ __typename?: 'User', login: string, avatarUrl: string }> } } | null, projectDetails: { __typename?: 'ProjectDetails', projectId: any, description: string | null, telegramLink: string | null, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', user: { __typename?: 'users', displayName: string, avatarUrl: string } | null }> } | null };

export type AcceptProjectLeaderInvitationMutationVariables = Exact<{
  invitationId: Scalars['Uuid'];
}>;


export type AcceptProjectLeaderInvitationMutation = { __typename?: 'mutation_root', acceptProjectLeaderInvitation: boolean };

export type GetProjectsQueryVariables = Exact<{
  githubUserId?: InputMaybe<Scalars['bigint']>;
}>;


export type GetProjectsQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', id: any, name: string, totalSpentAmountInUsd: any, projectDetails: { __typename?: 'ProjectDetails', projectId: any, description: string | null, telegramLink: string | null, logoUrl: string | null } | null, pendingInvitations: Array<{ __typename?: 'PendingProjectLeaderInvitations', id: any }>, projectLeads: Array<{ __typename?: 'ProjectLeads', user: { __typename?: 'users', displayName: string, avatarUrl: string } | null }>, githubRepo: { __typename?: 'GithubRepoDetails', id: any, name: string, owner: string, languages: any, content: { __typename?: 'Repository', id: number, logoUrl: string, contributors: Array<{ __typename?: 'User', login: string, avatarUrl: string }> } } | null }> };

export type GetAllTechnologiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTechnologiesQuery = { __typename?: 'query_root', projects: Array<{ __typename?: 'Projects', githubRepo: { __typename?: 'GithubRepoDetails', id: any, languages: any } | null }> };

export const ContributorsTableFieldsFragmentDoc = gql`
    fragment ContributorsTableFields on User {
  id
  login
  avatarUrl
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
    reason
  }
}
    `;
export const ProjectCardFieldsFragmentDoc = gql`
    fragment ProjectCardFields on Projects {
  id
  name
  totalSpentAmountInUsd
  projectDetails {
    projectId
    description
    telegramLink
    logoUrl
  }
  pendingInvitations(where: {githubUserId: {_eq: $githubUserId}}) {
    id
  }
  projectLeads {
    user {
      displayName
      avatarUrl
    }
  }
  githubRepo {
    id
    name
    owner
    content {
      id
      contributors {
        login
        avatarUrl
      }
      logoUrl
    }
    languages
  }
}
    `;
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
  reason
  payments {
    amount
    currencyCode
  }
  requestedAt
  recipient {
    user {
      userInfo {
        payoutSettings
      }
    }
  }
}
    `;
export const GetFirstLeadProjectIdDocument = gql`
    query GetFirstLeadProjectId($userId: uuid!) {
  user(id: $userId) {
    id
    projectsLeaded(limit: 1) {
      projectId
    }
  }
}
    `;

/**
 * __useGetFirstLeadProjectIdQuery__
 *
 * To run a query within a React component, call `useGetFirstLeadProjectIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFirstLeadProjectIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFirstLeadProjectIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetFirstLeadProjectIdQuery(baseOptions: Apollo.QueryHookOptions<GetFirstLeadProjectIdQuery, GetFirstLeadProjectIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFirstLeadProjectIdQuery, GetFirstLeadProjectIdQueryVariables>(GetFirstLeadProjectIdDocument, options);
      }
export function useGetFirstLeadProjectIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFirstLeadProjectIdQuery, GetFirstLeadProjectIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFirstLeadProjectIdQuery, GetFirstLeadProjectIdQueryVariables>(GetFirstLeadProjectIdDocument, options);
        }
export type GetFirstLeadProjectIdQueryHookResult = ReturnType<typeof useGetFirstLeadProjectIdQuery>;
export type GetFirstLeadProjectIdLazyQueryHookResult = ReturnType<typeof useGetFirstLeadProjectIdLazyQuery>;
export type GetFirstLeadProjectIdQueryResult = Apollo.QueryResult<GetFirstLeadProjectIdQuery, GetFirstLeadProjectIdQueryVariables>;
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
export const OnNewPaymentRequestsDocument = gql`
    subscription OnNewPaymentRequests($projectId: uuid!) {
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
 * __useOnNewPaymentRequestsSubscription__
 *
 * To run a query within a React component, call `useOnNewPaymentRequestsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnNewPaymentRequestsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnNewPaymentRequestsSubscription({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useOnNewPaymentRequestsSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnNewPaymentRequestsSubscription, OnNewPaymentRequestsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnNewPaymentRequestsSubscription, OnNewPaymentRequestsSubscriptionVariables>(OnNewPaymentRequestsDocument, options);
      }
export type OnNewPaymentRequestsSubscriptionHookResult = ReturnType<typeof useOnNewPaymentRequestsSubscription>;
export type OnNewPaymentRequestsSubscriptionResult = Apollo.SubscriptionResult<OnNewPaymentRequestsSubscription>;
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
export const PendingUserPaymentsAndPayoutSettingsDocument = gql`
    query PendingUserPaymentsAndPayoutSettings($userId: uuid!) {
  user(id: $userId) {
    userInfo {
      userId
      payoutSettings
    }
    githubUser {
      paymentRequests {
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
 * __usePendingUserPaymentsAndPayoutSettingsQuery__
 *
 * To run a query within a React component, call `usePendingUserPaymentsAndPayoutSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingUserPaymentsAndPayoutSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingUserPaymentsAndPayoutSettingsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePendingUserPaymentsAndPayoutSettingsQuery(baseOptions: Apollo.QueryHookOptions<PendingUserPaymentsAndPayoutSettingsQuery, PendingUserPaymentsAndPayoutSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingUserPaymentsAndPayoutSettingsQuery, PendingUserPaymentsAndPayoutSettingsQueryVariables>(PendingUserPaymentsAndPayoutSettingsDocument, options);
      }
export function usePendingUserPaymentsAndPayoutSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingUserPaymentsAndPayoutSettingsQuery, PendingUserPaymentsAndPayoutSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingUserPaymentsAndPayoutSettingsQuery, PendingUserPaymentsAndPayoutSettingsQueryVariables>(PendingUserPaymentsAndPayoutSettingsDocument, options);
        }
export type PendingUserPaymentsAndPayoutSettingsQueryHookResult = ReturnType<typeof usePendingUserPaymentsAndPayoutSettingsQuery>;
export type PendingUserPaymentsAndPayoutSettingsLazyQueryHookResult = ReturnType<typeof usePendingUserPaymentsAndPayoutSettingsLazyQuery>;
export type PendingUserPaymentsAndPayoutSettingsQueryResult = Apollo.QueryResult<PendingUserPaymentsAndPayoutSettingsQuery, PendingUserPaymentsAndPayoutSettingsQueryVariables>;
export const GetPaymentRequestsDocument = gql`
    query GetPaymentRequests($githubUserId: bigint!) {
  paymentRequests(where: {recipientId: {_eq: $githubUserId}}) {
    id
    requestedAt
    payments {
      amount
      currencyCode
    }
    amountInUsd
    reason
    budget {
      id
      project {
        id
        name
        projectDetails {
          projectId
          description
          logoUrl
        }
        githubRepo {
          id
          content {
            id
            logoUrl
          }
        }
      }
    }
  }
}
    `;

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
export const PayoutSettingsDocument = gql`
    query PayoutSettings {
  userInfo {
    payoutSettings
  }
}
    `;

/**
 * __usePayoutSettingsQuery__
 *
 * To run a query within a React component, call `usePayoutSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePayoutSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePayoutSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePayoutSettingsQuery(baseOptions?: Apollo.QueryHookOptions<PayoutSettingsQuery, PayoutSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PayoutSettingsQuery, PayoutSettingsQueryVariables>(PayoutSettingsDocument, options);
      }
export function usePayoutSettingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PayoutSettingsQuery, PayoutSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PayoutSettingsQuery, PayoutSettingsQueryVariables>(PayoutSettingsDocument, options);
        }
export type PayoutSettingsQueryHookResult = ReturnType<typeof usePayoutSettingsQuery>;
export type PayoutSettingsLazyQueryHookResult = ReturnType<typeof usePayoutSettingsLazyQuery>;
export type PayoutSettingsQueryResult = Apollo.QueryResult<PayoutSettingsQuery, PayoutSettingsQueryVariables>;
export const UpdateProfileInfoDocument = gql`
    mutation updateProfileInfo($email: Email, $identity: IdentityInput, $location: Location, $payoutSettings: PayoutSettingsInput) {
  updateProfileInfo(
    identity: $identity
    location: $location
    payoutSettings: $payoutSettings
    email: $email
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
 *      email: // value for 'email'
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
    query Profile {
  userInfo {
    userId
    identity
    email
    location
    payoutSettings
  }
}
    `;

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
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
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
    name
    githubRepo {
      id
      content {
        id
        contributors {
          ...ContributorsTableFields
        }
      }
    }
  }
}
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
export const GetProjectContributorsForPaymentSelectDocument = gql`
    query GetProjectContributorsForPaymentSelect($projectId: uuid!) {
  projectsByPk(id: $projectId) {
    id
    githubRepo {
      id
      content {
        id
        contributors {
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
export const GetProjectsForSidebarDocument = gql`
    query GetProjectsForSidebar($ledProjectIds: [uuid!], $githubUserId: bigint) {
  projects(
    where: {_or: [{id: {_in: $ledProjectIds}}, {pendingInvitations: {githubUserId: {_eq: $githubUserId}}}]}
    orderBy: {pendingInvitationsAggregate: {count: DESC}}
  ) {
    id
    name
    projectDetails {
      projectId
      logoUrl
    }
    pendingInvitations {
      id
    }
    githubRepo {
      id
      content {
        id
        contributors {
          login
        }
        logoUrl
      }
    }
  }
}
    `;

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
    query GetProject($id: uuid!, $githubUserId: bigint = 0) {
  projectsByPk(id: $id) {
    ...ProjectCardFields
    githubRepo {
      id
      content {
        id
        readme {
          content
        }
      }
    }
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
 *      githubUserId: // value for 'githubUserId'
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
    query GetProjects($githubUserId: bigint = 0) {
  projects {
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
 *      githubUserId: // value for 'githubUserId'
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
export const GetAllTechnologiesDocument = gql`
    query GetAllTechnologies {
  projects {
    githubRepo {
      id
      languages
    }
  }
}
    `;

/**
 * __useGetAllTechnologiesQuery__
 *
 * To run a query within a React component, call `useGetAllTechnologiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTechnologiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTechnologiesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTechnologiesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTechnologiesQuery, GetAllTechnologiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTechnologiesQuery, GetAllTechnologiesQueryVariables>(GetAllTechnologiesDocument, options);
      }
export function useGetAllTechnologiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTechnologiesQuery, GetAllTechnologiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTechnologiesQuery, GetAllTechnologiesQueryVariables>(GetAllTechnologiesDocument, options);
        }
export type GetAllTechnologiesQueryHookResult = ReturnType<typeof useGetAllTechnologiesQuery>;
export type GetAllTechnologiesLazyQueryHookResult = ReturnType<typeof useGetAllTechnologiesLazyQuery>;
export type GetAllTechnologiesQueryResult = Apollo.QueryResult<GetAllTechnologiesQuery, GetAllTechnologiesQueryVariables>;