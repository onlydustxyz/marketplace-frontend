import { useEffect, useState } from "react";

import { MoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal";
import { PermissionModal } from "components/features/grant-permission/components/permission-modal/permission-modal";

import { TGrantPermissionModal } from "./grant-permission-modal.types";

export function GrantPermission({ isOpen, onClose }: TGrantPermissionModal.Props) {
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);

  useEffect(() => {
    setIsPermissionOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <PermissionModal
        isOpen={isPermissionOpen}
        onClose={() => {
          setIsPermissionOpen(false);
          onClose();
        }}
        onMoreInfoOpen={() => {
          setIsPermissionOpen(false);
          setIsMoreInfoOpen(true);
          onClose();
        }}
      />

      <MoreInfoModal
        isOpen={isMoreInfoOpen}
        onClose={() => {
          setIsMoreInfoOpen(false);
          onClose();
        }}
        onDone={() => {
          setIsMoreInfoOpen(false);
          setIsPermissionOpen(true);
        }}
      />
    </>
  );
}
