import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.users}-root`,
  public_profile_by_login: (githubLogin: string) => `${apiResources.users}-public-profile-by-login-${githubLogin}`,
  public_ecosystems: (githubId: number) => `${apiResources.users}-public-ecosystems-by-id-${githubId}`,
  public_languages: (githubId: number) => `${apiResources.users}-public-languages-by-id-${githubId}`,
  public_stats: (githubId: number, ecosystemId?: string) =>
    `${apiResources.users}-public-stats-by-id-${githubId}-ecosystem-${ecosystemId || "all"}`,
};
