import { useStackFeedback } from "src/App/Stacks/Stacks";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import SendPlane2Line from "src/icons/SendPlane2Line";

export default function TutorialSidePanelHelp() {
  const { T } = useIntl();
  const [openFeedback] = useStackFeedback();

  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <p className="font-walsheim text-sm font-medium uppercase">{T("project.githubLinkTutorial.info.title")}</p>
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
          {T("project.githubLinkTutorial.info.message")}
        </p>
      </div>
      <Button type={ButtonType.Secondary} size={ButtonSize.Sm} onClick={openFeedback}>
        <SendPlane2Line />
        {T("project.githubLinkTutorial.info.button")}
      </Button>
    </div>
  );
}
