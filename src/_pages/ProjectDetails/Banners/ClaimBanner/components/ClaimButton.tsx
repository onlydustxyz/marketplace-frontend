import { useAuth0 } from "@auth0/auth0-react";

import Button, { ButtonSize, ButtonType } from "src/components/Button";
import MagicLine from "src/icons/MagicLine";

import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";

import { useIntl } from "hooks/translate/use-translate";

type ClaimButton = { callback: () => void };

export function ClaimButton({ callback }: ClaimButton) {
  const { T } = useIntl();
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const startprojectClaim = async () => {
    if (isAuthenticated) {
      callback();
    } else {
      await handleLoginWithRedirect(loginWithRedirect);
    }
  };

  return (
    <Button type={ButtonType.Primary} size={ButtonSize.Sm} onClick={startprojectClaim}>
      <MagicLine className="text-xl font-normal text-black" />
      {T("project.claim.banner.button")}
    </Button>
  );
}
