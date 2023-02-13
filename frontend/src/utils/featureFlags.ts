export enum FeatureFlags {
  /**
   * @owner @oscarwroche
   * @feature https://linear.app/onlydust/issue/B-358/fix-unwanted-component-reloads
   * @expiration 2023-02-21
   */
  FIX_TOKEN_RELOAD = "FIX_TOKEN_RELOAD",
}

type FeatureFlagsConfig = Record<FeatureFlags, boolean>;

const featureFlags: FeatureFlagsConfig = {
  FIX_TOKEN_RELOAD: import.meta.env.VITE_FF_FIX_TOKEN_RELOAD === "true",
};

export const isFeatureEnabled = (feature: keyof FeatureFlagsConfig) => {
  return featureFlags[feature];
};
