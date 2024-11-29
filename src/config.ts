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
  HASURA_AUTH_BASE_URL: process.env.NEXT_PUBLIC_HASURA_AUTH_BASE_URL,
  ASSET_PATH: process.env.ASSET_PATH,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  HASURA_BASE_URL: process.env.NEXT_PUBLIC_HASURA_BASE_URL,
  HASURA_BASE_WS_URL: process.env.NEXT_PUBLIC_HASURA_BASE_WS_URL,
  LOGIN_URL: process.env.NEXT_PUBLIC_LOGIN_URL,
  ENVIRONMENT: process.env.NEXT_PUBLIC_ENV,
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
  LANGUAGES_FILTER: process.env.NEXT_PUBLIC_LANGUAGES_FILTER,
  GENERIC_METADATA_URL: process.env.NEXT_PUBLIC_GENERIC_METADATA_URL,
};

export default config;
