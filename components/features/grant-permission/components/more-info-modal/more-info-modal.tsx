import Image from "next/image";
import grantPublicRepoPermission from "public/images/github/grant-public-repo-permission.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TMoreInfoModal } from "components/features/grant-permission/components/more-info-modal/more-info-modal.types";
import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useIntl } from "hooks/translate/use-translate";

export function MoreInfoModal({ isOpen, onClose, onBack }: TMoreInfoModal.Props) {
  const { T } = useIntl();
  const { handleAddPublicRepoScope } = usePublicRepoScope(onClose);

  return (
    <Modal
      title={<Translate token="v2.features.githubGrantPermissions.modals.moreInfos.title" />}
      isOpen={isOpen}
      onClose={onClose}
      footerEndContent={
        <div className="flex gap-4">
          <Button variant="secondary-light" size="l" onClick={onBack}>
            <Typo
              variant="default"
              size="xs"
              translate={{
                token: "v2.features.githubGrantPermissions.modals.moreInfos.footerButtons.back",
              }}
            />
          </Button>
          <Button
            variant="primary"
            startContent={<Icon remixName="ri-github-line" />}
            size="l"
            onClick={handleAddPublicRepoScope}
          >
            <Typo
              variant="default"
              size="xs"
              translate={{
                token: "v2.features.githubGrantPermissions.modals.permissions.footerButtons.grantPermissions",
              }}
            />
          </Button>
        </div>
      }
    >
      <Paper container="1">
        <div className="flex flex-col gap-4">
          <Typo
            variant="default"
            size="l"
            translate={{
              token: "v2.features.githubGrantPermissions.modals.moreInfos.description",
            }}
          />
          <Paper container="4">
            <Image
              src={grantPublicRepoPermission}
              alt={T("v2.features.githubGrantPermissions.modals.moreInfos.description")}
              className="rounded-lg"
              priority={false}
            />
          </Paper>
        </div>
      </Paper>
    </Modal>
  );
}
