import { LogoutOptions } from "@auth0/auth0-react/src/auth0-context";

export default function handleLogout(
  logout: (options?: LogoutOptions) => Promise<void>,
  getImpersonateHeaders: () => Record<string, string> | undefined,
  clearImpersonateClaim: () => void
) {
  const impersonateHeaders = getImpersonateHeaders();

  if (impersonateHeaders) {
    clearImpersonateClaim();
    window.location.reload();
  } else {
    logout({
      logoutParams: {
        returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || "/",
      },
    });
  }
}
