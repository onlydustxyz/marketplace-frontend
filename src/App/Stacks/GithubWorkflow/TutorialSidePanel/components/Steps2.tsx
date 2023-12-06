import { useIntl } from "src/hooks/useIntl";
import Steps2Image from "src/assets/img/github_tutorial_step_2.png";

export default function TutorialSidePanelSteps2() {
  const { T } = useIntl();

  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <p className="font-walsheim text-sm font-medium uppercase">{T("project.githubLinkTutorial.steps.two.title")}</p>
        <ul className="list-inside list-disc">
          <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {T("project.githubLinkTutorial.steps.two.bullets.title")}
          </p>
          <li className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {T("project.githubLinkTutorial.steps.two.bullets.one")}
          </li>
          <li className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {T("project.githubLinkTutorial.steps.two.bullets.two")}
          </li>
          <li className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {T("project.githubLinkTutorial.steps.two.bullets.three")}
          </li>
        </ul>
      </div>
      <img src={Steps2Image} alt="steps 2" className="h-auto w-full" />
    </div>
  );
}
