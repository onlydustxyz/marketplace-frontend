import { GetAllContributionsQuery, GithubIssueStatus } from "src/__generated/graphql";
import { SortingFields } from "./hooks/useRewardSorting";

export type Branded<T, B> = T & { __brand: B };

// https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

//https://stackoverflow.com/a/47914631
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export enum HasuraUserRole {
  Public = "public",
  RegisteredUser = "registered_user",
  Admin = "admin",
}

export enum CustomUserRole {
  ProjectLead = "projectLead",
}

export type UserRole = HasuraUserRole | CustomUserRole;

export type TokenSet = {
  accessToken: AccessToken;
  accessTokenExpiresIn: number;
  creationDate: Date;
  refreshToken: RefreshToken;
  user: TokenSetUser;
};

export type AccessToken = Branded<string, "AccessToken">;
export type RefreshToken = Branded<Uuid, "RefreshToken">;

export type ImpersonationSet = {
  password: string;
  userId: Uuid;
};

export type TokenSetUser = {
  id: Uuid;
  createdAt: Date;
  email: string;
  locale: Locale;
  isAnonymous: boolean;
  defaultRole: HasuraUserRole;
  emailVerified: boolean;
  phoneNumber: PhoneNumber | null;
  phoneNumberVerified: boolean;
  activeMfaType: string | null;
  roles: HasuraUserRole[];
};

export type User = TokenSetUser & {
  login: string;
  avatarUrl: Url | null;
};

type Url = string;
type Uuid = string;
export type Email = string;
export type PhoneNumber = string;

export type Sortable = {
  sortingFields?: SortingFields;
};

export enum Currency {
  USD = "USD",
  ETH = "ETH",
  STARK = "STARK",
  APT = "APT",
  OP = "OP",
}

export enum PaymentStatus {
  ACCEPTED = "ACCEPTED",
  WAITING_PAYMENT = "WAITING_PAYMENT",
}

export function getPaymentStatusOrder({
  status,
  pendingPayoutInfo,
  pendingInvoice,
}: {
  status: PaymentStatus;
  pendingPayoutInfo: boolean;
  pendingInvoice?: boolean;
}): number {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return pendingPayoutInfo || pendingInvoice ? -1 : 0;
    case PaymentStatus.ACCEPTED:
      return 1;
  }
}

export type Locale = "en" | "fr";

export const CLAIMS_KEY = "https://hasura.io/jwt/claims";
export const PROJECTS_LED_KEY = "x-hasura-projectsLeaded";
export const GITHUB_USERID_KEY = "x-hasura-githubUserId";

export interface HasuraJWT {
  [CLAIMS_KEY]?: {
    [PROJECTS_LED_KEY]?: string;
    [GITHUB_USERID_KEY]?: string;
  };
}

export type LanguageMap = { [languageName: string]: number };

export type PayoutSettings = {
  EthTransfer?: {
    Address?: string;
    Name?: string;
  };
  WireTransfer?: {
    IBAN?: string;
    BIC?: string;
  };
};

export type Contributor = {
  githubUserId: number;
  login: string;
  avatarUrl: string | null;
  userId?: string;
};

export enum GithubIssueType {
  Issue,
  PullRequest,
}

export enum GithubPullRequestStatus {
  Merged = "MERGED",
  Open = "OPEN",
  Closed = "CLOSED",
}

export enum GithubCodeReviewStatus {
  Pending = "PENDING",
  ChangeRequested = "CHANGE_REQUESTED",
  Completed = "COMPLETED",
}

export enum GithubCodeReviewOutcome {
  Approved = "approved",
  ChangesRequested = "changes_requested",
}

export enum GithubContributionType {
  Issue = "ISSUE",
  PullRequest = "PULL_REQUEST",
  CodeReview = "CODE_REVIEW",
}

export enum GithubContributionStatus {
  InProgress = "in_progress",
  Completed = "complete",
  Canceled = "canceled",
}

export enum GithubContributionReviewStatus {
  PendingReviewer = "pendingReviewer",
  UnderReview = "underReview",
  Approved = "approved",
  ChangesRequested = "changesRequested",
}

export enum GithubPullRequestDraft {
  Draft = "DRAFT",
}

export type GithubItemStatus =
  | GithubPullRequestStatus
  | GithubIssueStatus
  | GithubCodeReviewStatus
  | GithubPullRequestDraft;

type GithubPullRequestTypeStatusDict<T> = Record<
  GithubContributionType.PullRequest,
  Record<GithubPullRequestStatus | GithubPullRequestDraft, T>
>;

type GithubIssueTypeStatusDict<T> = Record<GithubContributionType.Issue, Record<GithubIssueStatus, T>>;

type GithubCodeReviewTypeStatusDict<T> = Record<GithubContributionType.CodeReview, Record<GithubCodeReviewStatus, T>>;

export type GithubTypeStatusDict<T> = GithubPullRequestTypeStatusDict<T> &
  GithubIssueTypeStatusDict<T> &
  GithubCodeReviewTypeStatusDict<T>;

export type QueryContribution = GetAllContributionsQuery["contributions"][number];

export interface Leader {
  id: string;
  githubUserId: number;
  login: string;
  htmlUrl: string | null;
  avatarUrl: string;
}
export interface Sponsor {
  id: string | null;
  name: string | null;
  url: string | null;
  logoUrl: string | null;
}
export interface Technologies {
  [key: string]: number;
}

export interface TopContributor {
  githubUserId: number;
  login: string;
  htmlUrl: string;
  avatarUrl: string;
}

interface Languages {
  [key: string]: number;
}

export interface Repo {
  id: number;
  owner: string;
  name: string;
  description: string;
  stars: number;
  forkCount: number;
  htmlUrl: string;
  hasIssues: boolean;
  languages?: Languages;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription?: string;
  logoUrl: string;
  moreInfoUrl: string;
  hiring: boolean;
  visibility: string;
  repoCount: number;
  contributorCount: number;
  leaders: Leader[];
  sponsors: Sponsor[];
  technologies: Technologies;
  topContributors: TopContributor[];
  repos: Repo[];
  isInvitedAsProjectLead: boolean;
  remainingUsdBudget: number;
}

export type Reward = {
  paymentId: string;
  paymentRequest: {
    amount: number;
    currency: string;
    hoursWorked: number;
    invoiceReceivedAt: Date | null;
    payments: {
      processedAt: Date;
    }[];
    paymentsAggregate: {
      aggregate: {
        sum: {
          amount: number | null;
        };
      };
    };
    recipientId: number;
    requestedAt: Date;
    requestor: {
      avatarUrl: string;
      githubUserId: number;
      htmlUrl: string;
      login: string;
    };
  };
};

export type ContributorT = {
  avatarUrl: string | null;
  codeReviewToReward: number | null;
  contributionCount: number;
  contributionToRewardCount: number | null; // not rewarded yet
  earned: number | null;
  githubUserId: number;
  issueToReward: number | null;
  login: string;
  pullRequestToReward: number | null;
  rewardCount: number; // already rewarded
  isRegistered?: boolean;
};

export type Contributors = {
  contributors: ContributorT[];
  totalItemNumber: number;
  totalPageNumber: number;
  nextPageIndex: number;
  hasMore: boolean;
};

export type PageData = {
  totalPageNumber: number;
  totalItemNumber: number;
  hasMore: boolean;
  nextPageIndex: number;
  contributors: ContributorT[];
};

export type PagesData = {
  pages: PageData[];
  pageParams: number[];
};
