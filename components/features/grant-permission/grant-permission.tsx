import { useEffect, useState } from "react";

import { MoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal";
import { PermissionModal } from "components/features/grant-permission/components/permission-modal/permission-modal";
import { TGrantPermissionModal } from "components/features/grant-permission/grant-permission.types";

export function GrantPermission({ isOpen, onClose }: TGrantPermissionModal.Props) {
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  useEffect(() => {
    setIsPermissionOpen(isOpen);
  }, [isOpen]);

  function handlePermissionClose() {
    setIsPermissionOpen(false);
    onClose();
  }

  function handleMoreInfoOpen() {
    setIsPermissionOpen(false);
    setIsMoreInfoOpen(true);
    onClose();
  }

  function handleMoreInfoClose() {
    setIsMoreInfoOpen(false);
    onClose();
  }

  function handleMoreInfoDone() {
    setIsMoreInfoOpen(false);
    setIsPermissionOpen(true);
  }

  return (
    <>
      <PermissionModal isOpen={isPermissionOpen} onClose={handlePermissionClose} onMoreInfoOpen={handleMoreInfoOpen} />

      <MoreInfoModal isOpen={isMoreInfoOpen} onClose={handleMoreInfoClose} onBack={handleMoreInfoDone} />
    </>
  );
}
