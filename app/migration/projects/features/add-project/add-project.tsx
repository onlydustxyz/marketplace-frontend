import { Card } from "components/ds/card/card";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { AddProjectModal } from "app/migration/projects/features/add-project/modal/add-project-modal";
import { Button } from "components/ds/button/button";
import { Icon } from "components/layout/icon/icon";
import { Popover } from "components/ds/modals/popover/popover";
import { RoutePaths } from "src/App";
import { handleLoginWithRedirect } from "components/features/auth0/handlers/handle-login";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import { STORAGE_KEY_CREATE_PROJECT_STEP } from "src/_pages/ProjectCreation/hooks/useProjectCreationStorage";
import { useRouter } from "next/navigation";

export function AddProject() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const canResume = useMemo(() => !!localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP), []);
  const router = useRouter();
  const startProjectCreation = async () => {
    if (isAuthenticated) {
      router.push(RoutePaths.ProjectCreation, { scroll: false });
    } else {
      await handleLoginWithRedirect(loginWithRedirect);
    }
  };

  return (
    <Card background="base" border="medium" className="flex items-center gap-4">
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
