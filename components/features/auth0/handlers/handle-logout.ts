import { LogoutOptions } from "@auth0/auth0-react/src/auth0-context";

export default function handleLogout(logout: (options?: LogoutOptions) => Promise<void>) {
  logout({
    logoutParams: {
      returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || "/",
    },
  });
}
