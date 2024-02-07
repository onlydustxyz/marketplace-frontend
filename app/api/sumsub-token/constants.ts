export namespace SUMSUB_CONST {
  export const APP_TOKEN = process.env.SUMSUB_APP_TOKEN ?? "";
  export const SECRET_KEY = process.env.SUMSUB_SECRET_KEY ?? "";
  export const BASE_URL = "https://api.sumsub.com";

  export const KYC_LEVEL = "basic-kyc-level";
  export const KYB_LEVEL = "basic-kyb-level";
  export const DEFAULT_LEVEL = KYC_LEVEL;
}
