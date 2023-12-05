import { useIntl } from "src/hooks/useIntl";
import Steps3Gif from "src/assets/img/github_tutorial_step_3.gif";
import InformationLine from "src/icons/InformationLine";

export default function TutorialSidePanelSteps3() {
  const { T } = useIntl();

  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <p className="font-walsheim text-sm font-medium uppercase">
          {T("project.githubLinkTutorial.steps.three.title")}
        </p>
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
          {T("project.githubLinkTutorial.steps.three.subTitle")}
        </p>
      </div>
      <img src={Steps3Gif} alt="steps 2" className="h-auto w-full" />
      <div className="flex flex-row items-start justify-start gap-2">
        <InformationLine className="text-base leading-4 text-spaceBlue-200" />
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
          {T("project.githubLinkTutorial.steps.three.informations")}
        </p>
      </div>
    </div>
  );
}
