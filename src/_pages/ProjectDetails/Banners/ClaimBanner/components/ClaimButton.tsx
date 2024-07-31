import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/navigation";

import Button, { ButtonSize, ButtonType } from "src/components/Button";
import MagicLine from "src/icons/MagicLine";

import { NEXT_ROUTER } from "constants/router";

import { useIntl } from "hooks/translate/use-translate";

type ClaimButton = { callback: () => void };

export function ClaimButton({ callback }: ClaimButton) {
  const { T } = useIntl();
  const { isAuthenticated } = useAuth0();
  const router = useRouter();

  const startprojectClaim = async () => {
    if (isAuthenticated) {
      callback();
    } else {
      router.push(NEXT_ROUTER.signup.root);
    }
  };

  return (
    <Button type={ButtonType.Primary} size={ButtonSize.Sm} onClick={startprojectClaim}>
      <MagicLine className="text-xl font-normal text-black" />
      {T("project.claim.banner.button")}
    </Button>
  );
}
