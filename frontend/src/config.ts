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
  HASURA_AUTH_BASE_URL: import.meta.env.VITE_HASURA_AUTH_BASE_URL,
  ASSET_PATH: import.meta.env.ASSET_PATH,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  HASURA_BASE_URL: import.meta.env.VITE_HASURA_BASE_URL,
  HASURA_BASE_WS_URL: import.meta.env.VITE_HASURA_BASE_WS_URL,
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL ?? `${import.meta.env.VITE_HASURA_AUTH_BASE_URL}/signin/provider/github`,
  ENVIRONMENT: import.meta.env.VITE_ENV,
  MAINTENANCE: import.meta.env.VITE_MAINTENANCE,
  GTM_ID: import.meta.env.VITE_GTM_ID,
  LANGUAGES_FILTER: import.meta.env.VITE_LANGUAGES_FILTER,
};

export default config;
