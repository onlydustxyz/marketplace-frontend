export const viewportConfig = {
  breakpoints: {
    sm: 640,
  },
};

const config = {
  HASURA_AUTH_BASE_URL: import.meta.env.VITE_HASURA_AUTH_BASE_URL,
  HASURA_BASE_URL: import.meta.env.VITE_HASURA_BASE_URL,
  HASURA_BASE_WS_URL: import.meta.env.VITE_HASURA_BASE_WS_URL,
  HASURA_ADMIN_SECRET: import.meta.env.VITE_HASURA_ADMIN_SECRET,
  LOGIN_URL: import.meta.env.VITE_LOGIN_URL ?? `${import.meta.env.VITE_HASURA_AUTH_BASE_URL}/signin/provider/github`,
};

export default config;
