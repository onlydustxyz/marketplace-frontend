import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Link } from "src/components/Link/Link";
import GithubLogo from "src/icons/GithubLogo";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

import { useIntl } from "hooks/translate/use-translate";

export default function TutorialSidePanelSteps1() {
  const { T } = useIntl();

  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <p className="font-walsheim text-sm font-medium uppercase">{T("project.githubLinkTutorial.steps.one.title")}</p>

      <Link href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
        <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="w-full">
          <GithubLogo />
          {T("project.githubLinkTutorial.steps.one.button")}
        </Button>
      </Link>
    </div>
  );
}
