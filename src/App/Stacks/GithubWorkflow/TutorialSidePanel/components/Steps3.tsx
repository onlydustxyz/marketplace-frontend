import { IMAGES } from "src/assets/img";
import InformationLine from "src/icons/InformationLine";

import { useIntl } from "hooks/translate/use-translate";

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
      <img
        src={IMAGES.github.tutorial.step3}
        alt={T("project.githubLinkTutorial.steps.three.alt")}
        className="h-auto w-full rounded-2xl"
        loading="lazy"
      />
      <div className="flex flex-row items-start justify-start gap-2">
        <InformationLine className="text-base leading-4 text-spaceBlue-200" />
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
          {T("project.githubLinkTutorial.steps.three.informations")}
        </p>
      </div>
    </div>
  );
}
