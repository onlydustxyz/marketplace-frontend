export enum FeatureFlags {}

type FeatureFlagsConfig = Record<FeatureFlags, boolean>;

const featureFlags: FeatureFlagsConfig = {};

export const isFeatureEnabled = (feature: keyof FeatureFlagsConfig) => {
  return featureFlags[feature];
};
