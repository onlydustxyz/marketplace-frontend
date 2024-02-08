import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { RoutePaths } from "src/App";
import { STORAGE_KEY_CREATE_PROJECT_STEP } from "src/_pages/ProjectCreation/hooks/useProjectCreationStorage";

import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { Popover } from "components/ds/modals/popover/popover";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { AddProjectModal } from "./modal/add-project-modal";

export function AddProject() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const canResume = useMemo(() => !!localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP), []);
  const navigate = useNavigate();
  const startProjectCreation = async () => {
    if (isAuthenticated) {
      navigate(RoutePaths.ProjectCreation);
    } else {
      await handleLoginWithRedirect(loginWithRedirect);
    }
  };

  return (
    <Card background="base" border="light" className="flex items-center gap-4">
      <Typography variant="body-s">
        <Translate token="v2.pages.projects.addProject.label" />
      </Typography>

      {canResume ? (
        <Popover placement={"bottom-start"} content={<AddProjectModal startProjectCreation={startProjectCreation} />}>
          <Button size="s">
            <Icon remixName="ri-magic-line" size={14} />
            <Translate token="v2.pages.projects.addProject.btn" />
          </Button>
        </Popover>
      ) : (
        <Button size="s" onClick={startProjectCreation}>
          <Icon remixName="ri-magic-line" size={14} />
          <Translate token="v2.pages.projects.addProject.btn" />
        </Button>
      )}
    </Card>
  );
}
