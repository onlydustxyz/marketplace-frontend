import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { useIntl } from "src/hooks/useIntl";
import GithubLogo from "src/icons/GithubLogo";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

export default function TutorialSidePanelSteps1() {
  const { T } = useIntl();

  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <p className="font-walsheim text-sm font-medium uppercase">{T("project.githubLinkTutorial.steps.one.title")}</p>

      <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
        <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="w-full">
          <GithubLogo />
          {T("project.githubLinkTutorial.steps.one.button")}
        </Button>
      </a>
    </div>
  );
}
