import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { Button } from "components/ds/button/button";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { GrantPermission } from "components/features/grant-permission/grant-permission-modal";
import { Translate } from "components/layout/translate/translate";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

import { TApplyButton } from "./apply-button.types";

export function ApplyButton({ hasApplied }: TApplyButton.Props) {
  const [isOpenGrantPermission, setIsOpenGrantPermission] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  function handleViewApplication() {
    // Open apply consult drawer
  }

  function handleApply() {
    if (!isAuthenticated) {
      handleLoginWithRedirect(loginWithRedirect);
    }

    if (!canApply) {
      // Open github grant permissions modal
      setIsOpenGrantPermission(true);
      return;
    }

    //  Open apply form drawer
    handleViewApplication();
  }

  const renderButton = useMemo(() => {
    if (hasApplied) {
      return (
        <Button variant="secondary" size="s" onClick={handleViewApplication} className="whitespace-nowrap">
          <Translate token="v2.pages.project.overview.goodFirstIssues.button.alreadyApplied" />
        </Button>
      );
    }

    return (
      <Button variant="primary" size="s" onClick={handleApply}>
        <Translate token="v2.pages.project.overview.goodFirstIssues.button.apply" />
      </Button>
    );
  }, [hasApplied, canApply]);

  return (
    <>
      {renderButton}
      <GrantPermission isOpen={isOpenGrantPermission} onClose={() => setIsOpenGrantPermission(false)} />
    </>
  );
}
