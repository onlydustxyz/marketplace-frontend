import { useStackGithubWorkflowTutorial } from "src/App/Stacks/Stacks";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import GithubLogo from "src/icons/GithubLogo";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

export interface GithubSyncSettingsProps {
  title: string;
  message?: string;
  showButton?: string;
  settingsButton?: string;
  PoolingFeedback?: React.ReactElement;
}

export const GithubSyncSettings = ({
  title,
  message,
  settingsButton,
  PoolingFeedback,
  showButton,
}: GithubSyncSettingsProps) => {
  const [openTutorialPanel] = useStackGithubWorkflowTutorial();
  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <p className="font-walsheim text-sm font-medium uppercase">{title}</p>
        {message ? (
          <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">
            {message}
            &nbsp;
            <button
              className="text-body-s-bold cursor-pointer font-bold text-spacePurple-500"
              onClick={openTutorialPanel}
            >
              {showButton}
            </button>
          </p>
        ) : null}
      </div>
      <div className="center flex w-full flex-col items-center gap-5 lg:flex-row">
        {settingsButton ? (
          <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="w-full">
              <GithubLogo />
              {settingsButton}
            </Button>
          </a>
        ) : null}
        {PoolingFeedback ? PoolingFeedback : null}
      </div>
    </div>
  );
};
