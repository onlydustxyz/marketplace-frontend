import { MarketplaceApiVersion } from "./api-version";
import { MARKETPLACE_API_BASE_URL } from "./base-url";

export const marketplaceApiBasePaths = {
  [MarketplaceApiVersion.v1]: (path: string) => `${MARKETPLACE_API_BASE_URL}/api/${MarketplaceApiVersion.v1}/${path}`,
  [MarketplaceApiVersion.v2]: (path: string) => `${MARKETPLACE_API_BASE_URL}/api/${MarketplaceApiVersion.v2}/${path}`,
};
