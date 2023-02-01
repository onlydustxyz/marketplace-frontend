export type Branded<T, B> = T & { __brand: B };

// https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

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
};

type Url = string;
type Uuid = string;
export type Email = string;
export type PhoneNumber = string;

export type Payment = {
  id: string;
  requestedAt: Date;
  project: Project;
  reason: string;
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

export function getPaymentStatusOrder(status: PaymentStatus): number {
  switch (status) {
    case PaymentStatus.WAITING_PAYMENT:
      return 0;
    case PaymentStatus.ACCEPTED:
      return 1;
  }
}

export type Project = {
  id: string;
  title: string;
  description: string;
  logoUrl?: string;
};

type Locale = "en" | "fr";

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

export type Contributor = { login: string; avatarUrl: string };
