export type Branded<T, B> = T & { __brand: B };

export enum HasuraUserRole {
  Public = "public",
  RegisteredUser = "registered_user",
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
  user: User;
};

export type AccessToken = Branded<string, "AccessToken">;
export type RefreshToken = Branded<Uuid, "RefreshToken">;

export type User = {
  id: Uuid;
  createdAt: Date;
  displayName: string;
  avatarUrl: Url | null;
  locale: Locale;
  isAnonymous: boolean;
  defaultRole: HasuraUserRole;
  emailVerified: boolean;
  phoneNumber: PhoneNumber | null;
  phoneNumberVerified: boolean;
  activeMfaType: null;
  roles: HasuraUserRole[];
} & UserInfo;

export type UserInfo = {
  metadata?: {
    paymentReceiverType?: PaymentReceiverType;
    firstName?: string;
    lastName?: string;
    location?: Location;
    payoutSettings?: PayoutSettings;
  };
  email: Email;
};

type Date = string;
type Url = string;
type Uuid = string;
export type Email = string;
export type PhoneNumber = string;
export type Location = {
  address: string;
  zipcode: string;
  city: string;
  country: string;
};
export type PayoutSettings = {
  type: PayoutSettingsType;
  settings: {
    ethWalletAddress?: string;
    iban?: string;
    bic?: string;
  };
};

export enum PayoutSettingsType {
  ETH = "ETH",
  IBAN = "IBAN",
}

export type Payment = {
  id: string;
  project: Project;
  amount: {
    value: number;
    currency: Currency;
  };
  status: PaymentStatus;
};

export enum Currency {
  USD = "USD",
  ETH = "ETH",
  USDC = "USDC",
}

export enum PaymentStatus {
  ACCEPTED = "ACCEPTED",
  WAITING_PAYMENT = "WAITING_PAYMENT",
}

export type Project = {
  id: string;
  title: string;
  description: string;
};

type Locale = "en" | "fr";

export enum PaymentReceiverType {
  INDIVIDUAL = "INDIVIDUAL",
  COMPANY = "COMPANY",
}

export const CLAIMS_KEY = "https://hasura.io/jwt/claims";
export const PROJECTS_LED_KEY = "x-hasura-projectsLeaded";

export interface HasuraJWT {
  [CLAIMS_KEY]?: {
    [PROJECTS_LED_KEY]?: string;
  };
}

export type LanguageMap = { [languageName: string]: number };
