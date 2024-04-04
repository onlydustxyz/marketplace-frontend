import { BASE_API_V1, BASE_API_V2 } from "src/api/ApiPath";

export const ME_PATH = {
  ROOT: BASE_API_V1("me"),
  CONTRIBUTIONS: BASE_API_V1("me/contributions"),
  PROJECT_LEADER_INVITATIONS: (projectId: string) => BASE_API_V1(`me/project-leader-invitations/${projectId}`),
  REWARDS: BASE_API_V1("me/rewards"),
  REWARD_DETAIL: (rewardId: string) => BASE_API_V1(`me/rewards/${rewardId}`),
  REWARDS_PENDING_INVOICE: BASE_API_V1("me/rewards/pending-invoice"),
  GITHUB_ORGANIZATIONS: BASE_API_V1("me/organizations"),
  CONTRIBUTED_PROJECTS: BASE_API_V1("me/contributed-projects"),
  CONTRIBUTED_REPOS: BASE_API_V1("me/contributed-repos"),
  CLAIM: (projectId: string) => BASE_API_V1(`me/project-claims/${projectId}`),
  APPLY_TO_PROJECT: BASE_API_V1("me/applications"),
  MARK_INVOICE_AS_RECEIVED: BASE_API_V1("me/invoices"),
  PAYOUT_SETTINGS: BASE_API_V1("me/payout-settings"),
  PROFILE: BASE_API_V1("me/profile"),
  REWARDS_CURRENCIES: BASE_API_V1("me/reward-currencies"),
  REWARDS_PROJECTS: BASE_API_V1("me/rewarding-projects"),
  PROFILE_PICTURE: BASE_API_V1("me/profile/avatar"),
  BILLING_INDIVIDUAL: BASE_API_V1("me/billing-profiles/individual"),
  BILLING_COMPANY: BASE_API_V1("me/billing-profiles/company"),
  BILLING_PROFILES: BASE_API_V1("me/billing-profiles"),
  BILLING_PROFILES_V2: BASE_API_V2("me/billing-profiles"),
  BILLING_PROFILES_INVITATIONS: (billingProfileId: string) =>
    BASE_API_V1(`me/billing-profiles/${billingProfileId}/invitations`),
  SYNC_GITHUB_PROFILE: BASE_API_V1("me/profile/github"),
  PAYOUT_PREFERENCES: BASE_API_V1("me/payout-preferences"),
};
