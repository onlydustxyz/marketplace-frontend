import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TPermissionModal } from "components/features/grant-permission/components/permission-modal/permission-modal.types";
import { usePublicRepoScope } from "components/features/grant-permission/hooks/use-public-repo-scope";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

export function PermissionModal({ isOpen, onClose, onMoreInfoOpen }: TPermissionModal.Props) {
  const { handleAddPublicRepoScope } = usePublicRepoScope(onClose);
  return (
    <Modal
      titleProps={{
        translate: { token: "v2.features.githubGrantPermissions.modals.permissions.title" },
      }}
      isOpen={isOpen}
      onOpenChange={isModalOpen => (!isModalOpen ? onClose() : null)}
      footer={{
        endContent: (
          <div className="flex gap-4">
            <Button variant="secondary-light" size="l" onClick={onMoreInfoOpen}>
              <Translate token="v2.features.githubGrantPermissions.modals.permissions.footerButtons.moreInfo" />
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
        ),
      }}
    >
      <div className="flex flex-col gap-4">
        <Image
          src={githubGrantPermissionImage}
          alt="github grant permission"
          className="h-full w-full object-cover object-center"
          loading={"lazy"}
          width={320}
          height={50}
        />
        <div className="flex flex-col">
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubGrantPermissions.modals.permissions.description",
            }}
          />
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubGrantPermissions.modals.permissions.specialMention",
            }}
          />
        </div>
        <Paper container="3">
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubGrantPermissions.modals.permissions.claims.write",
            }}
          />
        </Paper>
      </div>
    </Modal>
  );
}
