import { useEffect, useState } from "react";

import { MoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal";
import { PublicRepoScopePermissionModal } from "components/features/grant-permission/components/public-repo-scope-permission-modal/public-repo-scope-permission-modal";
import { TGrantPermissionModal } from "components/features/grant-permission/grant-permission.types";

export function GrantPermission({ isOpen, handleClose, handleOpenDrawer }: TGrantPermissionModal.Props) {
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  useEffect(() => {
    setIsPermissionOpen(isOpen);
  }, [isOpen]);

  function handlePermissionClose() {
    setIsPermissionOpen(false);
    handleClose();
  }

  function handleMoreInfoOpen() {
    setIsPermissionOpen(false);
    setIsMoreInfoOpen(true);
    handleClose();
  }

  function handleMoreInfoClose() {
    setIsMoreInfoOpen(false);
    handleClose();
  }

  function handleMoreInfoDone() {
    setIsMoreInfoOpen(false);
    setIsPermissionOpen(true);
  }

  return (
    <>
      <PublicRepoScopePermissionModal
        isOpen={isPermissionOpen}
        handleClose={handlePermissionClose}
        handleMoreInfoOpen={handleMoreInfoOpen}
        handleOpenDrawer={handleOpenDrawer}
      />

      <MoreInfoModal
        isOpen={isMoreInfoOpen}
        handleClose={handleMoreInfoClose}
        handleBack={handleMoreInfoDone}
        handleOpenDrawer={handleOpenDrawer}
      />
    </>
  );
}
