import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { TGrantPermissionModal } from "./grant-permission-modal.types";

export function GrantPermissionModal({ isOpen, onClose }: TGrantPermissionModal.Props) {
  return (
    <Modal
      titleProps={{
        variant: "branding",
        children: <Translate token="v2.features.githubGrantPermissions.modal.title" />,
      }}
      isOpen={isOpen}
      closeButtonProps={{
        onClick: () => onClose,
      }}
      footerEndContent={
        <div className="flex gap-4">
          <Button variant="secondary-light" size="l">
            <Typo
              variant="default"
              size="xs"
              translate={{
                token: "v2.features.githubGrantPermissions.modal.footerButtons.moreInfo",
              }}
            />
          </Button>
          <Button variant="primary" startContent={<Icon remixName="ri-github-line" />} size="l">
            <Typo
              variant="default"
              size="xs"
              translate={{
                token: "v2.features.githubGrantPermissions.modal.footerButtons.grantPermissions",
              }}
            />
          </Button>
        </div>
      }
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
              token: "v2.features.githubGrantPermissions.modal.description",
            }}
          />
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubGrantPermissions.modal.specialMention",
            }}
          />
        </div>
        <Paper container="3">
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubGrantPermissions.modal.claims.write",
            }}
          />
        </Paper>
      </div>
    </Modal>
  );
}
