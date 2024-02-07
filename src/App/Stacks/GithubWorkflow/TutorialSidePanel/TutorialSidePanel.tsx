"use client";

import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";

import { useStackGithubWorkflowTutorial } from "../../Stacks";
import TutorialSidePanelHelp from "./components/Help";
import TutorialSidePanelSteps1 from "./components/Steps1";
import TutorialSidePanelSteps2 from "./components/Steps2";
import TutorialSidePanelSteps3 from "./components/Steps3";

export default function TutorialSidePanel() {
  const { T } = useIntl();
  const [, closePanel] = useStackGithubWorkflowTutorial();

  const onClose = () => {
    closePanel();
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex h-full flex-col px-4 pb-8">
        <div className="mb-8 px-2 font-belwe text-2xl font-normal text-greyscale-50">
          {T("project.githubLinkTutorial.title")}
        </div>
        <div className="px-2">
          <div className="text-body-m pb-2 font-normal text-greyscale-50">
            {T("project.githubLinkTutorial.subTitle")}
          </div>
        </div>
        <div className="my-6 h-[1px] w-full bg-card-border-medium" />
        <div className="scrollbar-sm flex flex-1 flex-col gap-6 overflow-auto px-2 pb-24">
          <TutorialSidePanelSteps1 />
          <TutorialSidePanelSteps2 />
          <TutorialSidePanelSteps3 />
          <TutorialSidePanelHelp />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-greyscale-900">
        <div className="flex h-auto w-full items-center justify-end gap-5 border-t border-card-border-light bg-card-background-light px-8 py-6">
          <Button type={ButtonType.Primary} size={ButtonSize.Md} onClick={onClose}>
            {T("project.githubLinkTutorial.close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
