export enum FeatureFlags {
  /**
   * @owner @bernardstanislas
   * @feature https://linear.app/onlydust/issue/E-173/sidebar-sections-should-have-dedicated-urls-eg-to-ease-navigation-with
   * @expiration 2023-02-20
   */
  PROJECT_SIDEBAR_URLS = "PROJECT_SIDEBAR_URLS",
}

type FeatureFlagsConfig = Record<FeatureFlags, boolean>;

const featureFlags: FeatureFlagsConfig = {
  PROJECT_SIDEBAR_URLS: import.meta.env.VITE_FF_PROJECT_SIDEBAR_URLS === "true",
};

export const isFeatureEnabled = (feature: keyof FeatureFlagsConfig) => {
  return featureFlags[feature];
};
