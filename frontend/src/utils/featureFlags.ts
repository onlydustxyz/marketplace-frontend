export enum FeatureFlags {
  /**
   * @owner @bernardstanislas
   * @feature https://linear.app/onlydust/issue/E-380/build-responsive-mvp
   * @expiration 2023-02-23
   */
  RESPONSIVENESS = "RESPONSIVENESS",
}

type FeatureFlagsConfig = Record<FeatureFlags, boolean>;

const featureFlags: FeatureFlagsConfig = {
  RESPONSIVENESS: import.meta.env.VITE_FF_RESPONSIVENESS === "true",
};

export const isFeatureEnabled = (feature: keyof FeatureFlagsConfig) => {
  return featureFlags[feature];
};

export const RESPONSIVE = isFeatureEnabled(FeatureFlags.RESPONSIVENESS);
