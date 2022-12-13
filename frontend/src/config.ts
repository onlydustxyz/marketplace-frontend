const config = {
  HASURA_AUTH_BASE_URL: import.meta.env.VITE_HASURA_AUTH_BASE_URL,
  HASURA_BASE_URL: import.meta.env.VITE_HASURA_BASE_URL,
  HASURA_ADMIN_SECRET: import.meta.env.VITE_HASURA_ADMIN_SECRET,
};

export default config;
