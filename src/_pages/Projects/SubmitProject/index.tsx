import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";
import { useMemo, useState } from "react";
import ConfirmationPopOver from "src/components/New/Popover/ConfirmationPopover";
import {
  STORAGE_KEY_CREATE_PROJECT_STEP,
  useResetStorage,
} from "src/_pages/ProjectCreation/hooks/useProjectCreationStorage";
import { ProjectCreationSteps } from "src/_pages/ProjectCreation/types/ProjectCreationSteps";
import {
  GITHUB_PERMISSIONS,
  useLazyGetUserPermissions,
} from "src/hooks/useGithubUserPermissions/useGithubUserPermissions";
import { cn } from "src/utils/cn";
import { useAuth0 } from "@auth0/auth0-react";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login.ts";

export default function SubmitProject({ className }: { className?: string }) {
  const { T } = useIntl();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [getPermission] = useLazyGetUserPermissions();
  const [modalOpened, setModalOpened] = useState(false);
  const { reset: clearStorage } = useResetStorage();
  const toggleModal = () => setModalOpened(!modalOpened);
  const closeModal = () => setModalOpened(false);
  const canResume = useMemo(() => !!localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP), []);

  const onCancel = () => {
    clearStorage();
    startProjectCreation();
  };

  const onClick = () => {
    if (canResume) {
      toggleModal();
    } else {
      clearStorage();
      startProjectCreation();
    }
  };

  const onResume = () => {
    const actualStep = localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP);
    if (actualStep !== ProjectCreationSteps.ORGANIZATIONS) {
      localStorage.setItem(STORAGE_KEY_CREATE_PROJECT_STEP, JSON.stringify(ProjectCreationSteps.REPOSITORIES));
    }
    startProjectCreation();
  };

  const startProjectCreation = async () => {
    const hasRequirePermission = await getPermission(GITHUB_PERMISSIONS.READ_ORG);
    if (isAuthenticated && hasRequirePermission) {
      navigate(RoutePaths.ProjectCreation);
    } else {
      await handleLoginWithRedirect(loginWithRedirect);
    }
  };

  return (
    <Card className={cn("mb-4 flex h-fit flex-row gap-4 p-6", className)}>
      <div className="flex-1 text-sm leading-4">{T("project.details.create.description")}</div>
      <div className="relative z-10">
        <ConfirmationPopOver
          onClose={closeModal}
          disabled={!canResume}
          className="right-0 md:right-auto"
          confirm={{
            label: T("project.details.create.startPopOver.resume"),
            onClick: onResume,
          }}
          title={T("project.details.create.startPopOver.title")}
          description={T("project.details.create.startPopOver.description")}
          cancel={{
            label: T("project.details.create.startPopOver.restart"),
            onClick: onCancel,
          }}
        >
          <Button size={ButtonSize.Sm} type={ButtonType.Primary} width={Width.Fit} onClick={onClick}>
            <i className="ri-magic-line" />
            {T("project.details.create.submit.button")}
          </Button>
        </ConfirmationPopOver>
      </div>
    </Card>
  );
}
