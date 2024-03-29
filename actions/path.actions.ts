import { ACTIONS_CONFIG } from "./config.actions";

export const BASE_API_V1 = (path: string) => ACTIONS_CONFIG.v1(path);

export const ACTION_PATH = {
  /* --------------------------------- PROJECT -------------------------------- */
  PROJECT_DETAILS: (slug: string) => BASE_API_V1(`projects/${slug}`),
  PROJECTS_BY_SLUG: (slug: string) => BASE_API_V1(`projects/slug/${slug}`),
  USER_PROFILE_BY_GITHUB_LOGIN: (githubLogin: string) => BASE_API_V1(`users/login/${githubLogin}`),
  USER_PROFILE_BY_GITHUB_ID: (githubId: string) => BASE_API_V1(`users/${githubId}`),

  /* ----------------------------------- ME ----------------------------------- */
  ME: BASE_API_V1("me"),

  /* ----------------------------- BILLING PROFILES --------------------------- */
  INVOICE_PREVIEW_BY_ID: (billingProfileId: string) =>
    BASE_API_V1(`billing-profiles/${billingProfileId}/invoice-preview`),
};
