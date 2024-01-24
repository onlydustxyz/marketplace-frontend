import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient } from "@tanstack/react-query";
import { useImpersonation } from "components/features/impersonation/use-impersonation";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import { usePosthog } from "src/hooks/usePosthog";
import LogoutBoxRLine from "src/icons/LogoutBoxRLine";

const queryClient = new QueryClient();
export function LogoutButton() {
  const { T } = useIntl();
  const { capture, reset } = usePosthog();
  const { isImpersonating, clearImpersonateClaim } = useImpersonation();
  const { logout } = useAuth0();
  function handleClick() {
    capture("user_logged_out");
    reset();

    if (isImpersonating) {
      clearImpersonateClaim();
      queryClient.invalidateQueries();
      window.location.reload();
    } else {
      logout({
        logoutParams: {
          returnTo: process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL || "/",
        },
      });
    }
  }

  return (
    <Button type={ButtonType.Secondary} size={ButtonSize.Xs} onClick={handleClick} data-testid="logout-button">
      <LogoutBoxRLine className="border-greyscale-50 text-sm" />
      {T("navbar.logout")}
    </Button>
  );
}
