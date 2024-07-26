import { QueryClient } from "@tanstack/react-query";
import { meApiClient } from "api-client/resources/me";
import { useClientBootstrapContext } from "core/bootstrap/client-bootstrap-context";

import { usePosthog } from "src/hooks/usePosthog";

import { useImpersonation } from "components/features/impersonation/use-impersonation";

const queryClient = new QueryClient();

export function useLogout() {
  const { capture, reset } = usePosthog();
  const { isImpersonating, clearImpersonateClaim } = useImpersonation();
  const {
    clientBootstrap: { authProvider },
  } = useClientBootstrapContext();
  const { logout } = authProvider ?? {};
  const { mutateAsync: logoutUser } = meApiClient.mutations.useLogoutUser({});

  async function handleLogout() {
    capture("user_logged_out");
    reset();

    if (isImpersonating) {
      clearImpersonateClaim();
      queryClient.invalidateQueries();
      window.location.reload();
    } else {
      await logoutUser({});
      logout?.({
        logoutParams: {
          returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || "/",
        },
      });
    }
  }

  return { handleLogout };
}
