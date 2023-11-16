import { useNavigate } from "react-router-dom";
import { RoutePaths } from "src/App";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import { SessionMethod, useSessionDispatch } from "src/hooks/useSession";
import config from "src/config";
import { useState } from "react";
import ConfirmationPopOver from "src/components/New/Popover/confirmationPopover";
import {
  STORAGE_KEY_CREATE_PROJECT_FORM,
  STORAGE_KEY_CREATE_PROJECT_STEP,
} from "src/pages/ProjectCreation/hooks/useProjectCreationStorage";
import { ProjectCreationSteps } from "src/pages/ProjectCreation/types/ProjectCreationSteps";

export const LOGIN_URL = `${config.LOGIN_URL}?redirect_url=${encodeURI(window.location.origin)}`;

export default function SubmitProject() {
  const { T } = useIntl();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [modalOpened, setModalOpened] = useState(false);

  const toggleModal = () => setModalOpened(!modalOpened);
  const closeModal = () => setModalOpened(false);

  const dispatchSession = useSessionDispatch();

  const onCancel = () => {
    localStorage.removeItem(STORAGE_KEY_CREATE_PROJECT_STEP);
    localStorage.removeItem(STORAGE_KEY_CREATE_PROJECT_FORM);
    startProjectCreation();
  };

  const onResume = () => {
    const actualStep = localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP);
    if (actualStep !== ProjectCreationSteps.ORGANIZATIONS) {
      localStorage.setItem(STORAGE_KEY_CREATE_PROJECT_STEP, JSON.stringify(ProjectCreationSteps.REPOSITORIES));
    }
    startProjectCreation();
  };

  const startProjectCreation = () => {
    if (isLoggedIn) {
      navigate(RoutePaths.ProjectCreation);
    } else {
      dispatchSession({ method: SessionMethod.SetVisitedPageBeforeLogin, value: RoutePaths.ProjectCreation });
      window.location.replace(LOGIN_URL);
    }
  };

  return (
    <Card className="mb-4 flex h-fit flex-row gap-4 p-6">
      <div className="flex-1 text-sm leading-4">{T("project.details.create.description")}</div>
      <div className="relative z-10">
        <ConfirmationPopOver
          onClose={closeModal}
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
          <Button
            htmlType="submit"
            size={ButtonSize.Sm}
            type={ButtonType.Primary}
            width={Width.Fit}
            onClick={toggleModal}
          >
            <i className="ri-magic-line" />
            {T("project.details.create.submit.button")}
          </Button>
        </ConfirmationPopOver>
      </div>
    </Card>
  );
}
