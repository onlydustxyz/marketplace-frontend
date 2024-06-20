import { useEffect, useState } from "react";

import { MoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal";
import { PermissionModal } from "components/features/grant-permission/components/permission-modal/permission-modal";
import { TGrantPermissionModal } from "components/features/grant-permission/grant-permission.types";

export function GrantPermission({ isOpen, handleClose }: TGrantPermissionModal.Props) {
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
      <PermissionModal
        isOpen={isPermissionOpen}
        handleClose={handlePermissionClose}
        handleMoreInfoOpen={handleMoreInfoOpen}
      />

      <MoreInfoModal isOpen={isMoreInfoOpen} handleClose={handleMoreInfoClose} handleBack={handleMoreInfoDone} />
    </>
  );
}
