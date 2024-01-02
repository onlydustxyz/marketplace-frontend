import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    // Get the connection name from the Auth0 Dashboard
    authorizationParams: { connection: process.env.NEXT_AUTH0_DEFAULT_CONNECTION_NAME },
  }),
});
