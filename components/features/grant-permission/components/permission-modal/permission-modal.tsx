import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import githubGrantPermissionImage from "public/images/banners/github-grant-permission-banner.png";
import { useEffect } from "react";
import { useLocalStorage } from "react-use";

import { Button } from "components/atoms/button/variants/button-default";
import { Paper } from "components/atoms/paper";
import { Typo } from "components/atoms/typo/variants/typo-default";
import { TPermissionModal } from "components/features/grant-permission/components/permission-modal/permission-modal.types";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Modal } from "components/molecules/modal";

import { useCurrentUser } from "hooks/users/use-current-user/use-current-user";

export function PermissionModal({ isOpen, onClose, onMoreInfoOpen }: TPermissionModal.Props) {
  const [scopeStorage, setScopesStorage] = useLocalStorage("auth0-scope");
  const { loginWithRedirect } = useAuth0();

  const { user } = useCurrentUser();
  const canApply = user?.isAuthorizedToApplyOnGithubIssues;

  useEffect(() => {
    if (scopeStorage && !canApply) {
      // handleLoginWithRedirect(loginWithRedirect);
    }
  }, [scopeStorage]);

  function handleAddDynamicScopes() {
    setScopesStorage("public_repo read:org read:user");
  }
  return (
    <Modal
      title={<Translate token="v2.features.githubGrantPermissions.modals.permissions.title" />}
      isOpen={isOpen}
      onClose={onClose}
      footerEndContent={
        <div className="flex gap-4">
          <Button variant="secondary-light" size="l" onClick={onMoreInfoOpen}>
            <Translate token="v2.features.githubGrantPermissions.modals.permissions.footerButtons.moreInfo" />
          </Button>
          <Button
            variant="primary"
            startContent={<Icon remixName="ri-github-line" />}
            size="l"
            onClick={handleAddDynamicScopes}
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
