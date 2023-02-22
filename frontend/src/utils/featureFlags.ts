export enum FeatureFlags {
  /**
   * @owner @oscarwroche
   * @feature https://linear.app/onlydust/issue/B-685/aauser-my-token-is-not-refreshed-in-background-until-i-make-a-new
   * @expiration 2023-02-30
   */
  REMOVE_TIMER_BASED_TOKEN_RELOAD = "REMOVE_TIMER_BASED_TOKEN_RELOAD",
  MULTIPLE_REPOSITORIES_PER_PROJECT = "MULTIPLE_REPOSITORIES_PER_PROJECT",
}

type FeatureFlagsConfig = Record<FeatureFlags, boolean>;

const featureFlags: FeatureFlagsConfig = {
  REMOVE_TIMER_BASED_TOKEN_RELOAD: import.meta.env.VITE_FF_REMOVE_TIMER_BASED_TOKEN_RELOAD === "true",
  MULTIPLE_REPOSITORIES_PER_PROJECT: import.meta.env.VITE_FF_MULTIPLE_REPOSITORIES_PER_PROJECT === "true",
};

export const isFeatureEnabled = (feature: keyof FeatureFlagsConfig) => {
  return featureFlags[feature];
};
