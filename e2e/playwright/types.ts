import { EthereumIdentityInput, Identity, Location, PayoutSettings, Reason, Visibility } from "./__generated/graphql";

export type Url = string;
export type Uuid = string;

export type UserFixture = {
  email: string;
  github: {
    id: number;
    login: string;
    bio?: string;
    avatarUrl?: string;
  };
  payoutInfo?: UserPayoutInfo;
  onboardingWizardCompleted?: boolean;
  admin?: boolean;
};

export type UserPayoutInfo = {
  populate?: boolean;
  identity: Identity | null;
  location: Location | null;
  payoutSettings: PayoutSettings | null;
};

export type User = UserFixture & {
  id: string;
  password: string;
  token: string;
  session: string;
};

export type ProjectFixture = {
  name: string;
  shortDescription: string;
  longDescription: string;
  telegramLink: Url | null;
  logoUrl: Url | null;
  initialBudget: number | null;
  leaders?: string[];
  pendingLeaderInvitations?: string[];
  repos?: string[];
  sponsors?: string[];
  hiring?: boolean;
  rank?: number;
  visibility?: Visibility;
};

export type Project = ProjectFixture & {
  id: string;
  key: string;
};

export type Repo = {
  id: number;
  name: string;
  owner: string;
  languages: Record<string, number>;
};

export type Sponsor = {
  id: Uuid;
  name: string;
};
export type PaymentFixture = {
  project: string;
  recipientGithubId: number;
  requestor: string;
  items: PaymentItem[];
};

export type PaymentItem = {
  amount: number;
  reason: Reason;
  receipts?: PaymentReceipt[];
};

export type PaymentReceipt = {
  amount: number;
  currencyCode: string;
  recipientETHIdentity?: EthereumIdentityInput;
  recipientIBAN?: string;
  transactionHashOrReference: string;
};

export type Payment = Omit<PaymentFixture, "items"> &
  PaymentItem & {
    id: string;
  };
