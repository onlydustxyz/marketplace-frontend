import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TPublicRepoScopePermissionModal } from "components/features/grant-permission/components/public-repo-scope-permission-modal/public-repo-scope-permission-modal.types";
import { Icon } from "components/layout/icon/icon";
import { Modal } from "components/molecules/modal";

export function ReadWriteIssuePermissionModal({
  isOpen,
  handleClose,
  handleMoreInfoOpen,
  handleOpenDrawer,
}: TPublicRepoScopePermissionModal.Props) {
  function handleRedirectToGithubFlow() {}
  return (
    <Modal
      titleProps={{
        translate: { token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.title" },
      }}
      isOpen={isOpen}
      onOpenChange={isModalOpen => (!isModalOpen ? handleClose() : null)}
      footer={{
        endContent: (
          <div className="flex gap-4">
            <Button
              variant="secondary-light"
              size="l"
              onClick={handleMoreInfoOpen}
              translate={{
                token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.moreInfo",
              }}
            />
            <Button
              variant="primary"
              startContent={<Icon remixName="ri-github-line" />}
              size="l"
              onClick={handleRedirectToGithubFlow}
              translate={{
                token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.footerButtons.grantPermissions",
              }}
            />
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
            size="s"
            translate={{
              token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.description",
            }}
          />
        </div>
        <Paper container="3" border="none">
          <Typo
            variant="default"
            size="xs"
            translate={{
              token: "v2.features.githubPermissions.readWriteIssue.modals.permissions.claims.write",
            }}
          />
        </Paper>
      </div>
    </Modal>
  );
}
