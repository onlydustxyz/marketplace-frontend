import { useMemo, useState } from "react";

import { Button } from "components/ds/button/button";
import { GrantPermission } from "components/features/grant-permission/grant-permission";
import { Translate } from "components/layout/translate/translate";

import { TApplyButton } from "./apply-button.types";

export function ApplyButton({ hasApplied, onDrawerOpen }: TApplyButton.Props) {
  const [isOpenGrantPermission, setIsOpenGrantPermission] = useState(false);

  const renderButton = useMemo(() => {
    if (hasApplied) {
      return (
        <Button variant="secondary" size="s" onClick={onDrawerOpen} className="whitespace-nowrap">
          <Translate token="v2.pages.project.overview.goodFirstIssues.button.viewApplication" />
        </Button>
      );
    }

    return (
      <Button variant="primary" size="s" onClick={onDrawerOpen}>
        <Translate token="v2.pages.project.overview.goodFirstIssues.button.apply" />
      </Button>
    );
  }, [hasApplied]);

  return (
    <>
      {renderButton}
      <GrantPermission
        isOpen={isOpenGrantPermission}
        handleClose={() => setIsOpenGrantPermission(false)}
        handleOpenDrawer={onDrawerOpen}
      />
    </>
  );
}
