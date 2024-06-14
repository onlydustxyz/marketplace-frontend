import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

import { Button } from "components/ds/button/button";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Translate } from "components/layout/translate/translate";

import { TApplyButton } from "./apply-button.types";

export function ApplyButton({ hasApplied, canApply }: TApplyButton.Props) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  function handleApply() {
    if (!isAuthenticated) {
      handleLoginWithRedirect(loginWithRedirect);
    }

    if (!canApply) {
      // Open github grant permissions modal
    }
  }

  function handleConsultApplication() {
    // Open application consult drawer
  }

  return useMemo(() => {
    if (hasApplied) {
      return (
        <Button variant="secondary" size="s" onClick={handleConsultApplication} className="whitespace-nowrap">
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
}
