export const viewportConfig = {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
};

const config = {
  HASURA_AUTH_BASE_URL: import.meta.env.NEXT_PUBLIC_HASURA_AUTH_BASE_URL,
  ASSET_PATH: import.meta.env.ASSET_PATH,
  API_BASE_URL: import.meta.env.NEXT_PUBLIC_API_BASE_URL,
  HASURA_BASE_URL: import.meta.env.NEXT_PUBLIC_HASURA_BASE_URL,
  HASURA_BASE_WS_URL: import.meta.env.NEXT_PUBLIC_HASURA_BASE_WS_URL,
  LOGIN_URL: import.meta.env.NEXT_PUBLIC_LOGIN_URL,
  ENVIRONMENT: import.meta.env.NEXT_PUBLIC_ENV,
  MAINTENANCE: import.meta.env.NEXT_PUBLIC_MAINTENANCE,
  GTM_ID: import.meta.env.NEXT_PUBLIC_GTM_ID,
  LANGUAGES_FILTER: import.meta.env.NEXT_PUBLIC_LANGUAGES_FILTER,
  CLOUDFLARE_RESIZE_W_100_PREFIX: import.meta.env.NEXT_PUBLIC_CLOUDFLARE_RESIZE_W_100_PREFIX,
  GENERIC_METADATA_URL: import.meta.env.NEXT_PUBLIC_GENERIC_METADATA_URL,
};

export default config;
