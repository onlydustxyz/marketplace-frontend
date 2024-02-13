export namespace SUMSUB_CONST {
  export const APP_TOKEN = process.env.SUMSUB_SDK_APP_TOKEN ?? "";
  export const SECRET_KEY = process.env.SUMSUB_SDK_SECRET_KEY ?? "";
  export const BASE_URL = "https://api.sumsub.com";

  export const KYC_LEVEL = process.env.NEXT_PUBLIC_SUMSUB_KYC_LEVEL ?? "";
  export const KYB_LEVEL = process.env.NEXT_PUBLIC_SUMSUB_KYB_LEVEL ?? "";
  export const DEFAULT_LEVEL = KYC_LEVEL;
}
