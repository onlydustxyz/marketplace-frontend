"use client";

import {
  STORAGE_KEY_CREATE_PROJECT_STEP,
  useResetStorage,
} from "src/_pages/ProjectCreation/hooks/useProjectCreationStorage";
import { ProjectCreationSteps } from "src/_pages/ProjectCreation/types/ProjectCreationSteps";

import { Button } from "components/ds/button/button";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function AddProjectModal({ startProjectCreation }: { startProjectCreation(): void }) {
  const { reset: clearStorage } = useResetStorage();

  function onCancel() {
    clearStorage();
    startProjectCreation();
  }

  function onResume() {
    const actualStep = localStorage.getItem(STORAGE_KEY_CREATE_PROJECT_STEP);
    if (actualStep !== ProjectCreationSteps.ORGANIZATIONS) {
      localStorage.setItem(STORAGE_KEY_CREATE_PROJECT_STEP, JSON.stringify(ProjectCreationSteps.REPOSITORIES));
    }
    startProjectCreation();
  }

  return (
    <div className="w-60">
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Typography
          variant="title-s"
          className="text-greyscale-50"
          translate={{ token: "v2.pages.projects.addProject.resumeModal.title" }}
        />

        <Typography
          variant="body-s"
          className="text-spaceBlue-200"
          translate={{ token: "v2.pages.projects.addProject.resumeModal.description" }}
        />
      </div>

      <div className="mt-4 flex flex-row items-stretch gap-2 p-3">
        <Button variant={"secondary"} size="xs" width="full" onClick={onCancel}>
          <Translate token="v2.pages.projects.addProject.resumeModal.restartBtn" />
        </Button>

        <Button size="xs" width="full" onClick={onResume}>
          <Translate token="v2.pages.projects.addProject.resumeModal.resumeBtn" />
        </Button>
      </div>
    </div>
  );
}
