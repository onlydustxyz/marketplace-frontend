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
  HASURA_BASE_URL: import.meta.env.VITE_HASURA_BASE_URL,
  HASURA_BASE_WS_URL: import.meta.env.VITE_HASURA_BASE_WS_URL,
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL ?? `${import.meta.env.VITE_HASURA_AUTH_BASE_URL}/signin/provider/github`,
  ENVIRONMENT: import.meta.env.VITE_ENV,
};

export default config;
