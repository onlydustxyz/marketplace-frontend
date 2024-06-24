import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useState } from "react";

import { Button } from "components/ds/button/button";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { GrantPermission } from "components/features/grant-permission/grant-permission";
import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";
import { Translate } from "components/layout/translate/translate";

import { TApplyButton } from "./apply-button.types";

export function ApplyButton({ hasApplied, drawerState }: TApplyButton.Props) {
  const [isOpenGrantPermission, setIsOpenGrantPermission] = useState(false);
  const [, setIsApplyIssueDrawerOpen] = drawerState;
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const { canApply, scopeStorage, handleAddPublicRepoScope } = usePublicRepoScope({});

  function handleViewApplication() {
    // Open apply consult drawer
    if (canApply) {
      setIsApplyIssueDrawerOpen(true);
    }
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

    if (!scopeStorage) {
      handleAddPublicRepoScope();
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
      <GrantPermission
        isOpen={isOpenGrantPermission}
        handleClose={() => setIsOpenGrantPermission(false)}
        handleOpenDrawer={handleViewApplication}
      />
    </>
  );
}
