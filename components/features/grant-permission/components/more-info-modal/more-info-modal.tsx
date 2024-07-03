import Image from "next/image";
import grantPublicRepoPermission from "public/images/github/grant-public-repo-permission.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TMoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal.types";
import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";
import { Icon } from "components/layout/icon/icon";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

export function MoreInfoModal({ isOpen, handleClose, handleBack, handleOpenDrawer }: TMoreInfoModal.Props) {
  const { T } = useIntl();
  const { handleVerifyPermissions } = usePublicRepoScope({
    onSuccessCallback: () => {
      handleClose();
      handleOpenDrawer();
    },
  });

  return (
    <Modal
      titleProps={{
        translate: { token: "v2.features.githubPermissions.publicRepoScope.modals.moreInfos.title" },
      }}
      isOpen={isOpen}
      onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
      footer={{
        endContent: (
          <div className="flex gap-4">
            <Button
              variant="secondary-light"
              size="l"
              onClick={handleBack}
              translate={{
                token: "v2.features.githubPermissions.publicRepoScope.modals.moreInfos.footerButtons.back",
              }}
            />
            <Button
              variant="primary"
              startContent={<Icon remixName="ri-github-line" />}
              size="l"
              onClick={() => handleVerifyPermissions("create")}
              translate={{
                token:
                  "v2.features.githubPermissions.publicRepoScope.modals.permissions.footerButtons.grantPermissions",
              }}
            />
          </div>
        ),
      }}
    >
      <Paper container="1">
        <div className="flex flex-col gap-4">
          <Typo
            variant="default"
            size="s"
            translate={{
              token: "v2.features.githubPermissions.publicRepoScope.modals.moreInfos.description",
            }}
          />
          <Paper container="4">
            <Image
              src={grantPublicRepoPermission}
              alt={T("v2.features.githubPermissions.publicRepoScope.modals.moreInfos.description")}
              className="rounded-lg"
              priority={false}
            />
          </Paper>
        </div>
      </Paper>
    </Modal>
  );
}
