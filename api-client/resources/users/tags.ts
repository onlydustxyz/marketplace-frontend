import { apiResources } from "api-client/config/resources";

export default {
  root: `${apiResources.users}-root`,
  public_profile_by_login: (githubLogin: string) => `${apiResources.users}-public-profile-by-login-${githubLogin}`,
  public_profile_by_id: (githubId: number) => `${apiResources.users}-public-profile-by-id-${githubId}`,
};
