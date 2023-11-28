import Button, { ButtonSize, ButtonType } from "src/components/Button";
import GithubLogo from "src/icons/GithubLogo";
import InformationLine from "src/icons/InformationLine";
import { OAuthGithubConfigLink } from "src/utils/githubSetupLink";

export interface GithubSyncSettingsProps {
  title: string;
  message: string;
  settingsButton: string;
  PoolingFeedback?: React.ReactElement;
}

export const GithubSyncSettings = ({ title, message, settingsButton, PoolingFeedback }: GithubSyncSettingsProps) => {
  return (
    <div className="card-light flex w-full flex-col items-start justify-start gap-6 rounded-2xl border bg-transparent p-5">
      <p className="font-walsheim text-sm font-medium uppercase">{title}</p>
      <div className="center flex w-full items-center gap-5">
        <a href={OAuthGithubConfigLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <Button type={ButtonType.Secondary} size={ButtonSize.Sm} className="w-full">
            <GithubLogo />
            {settingsButton}
          </Button>
        </a>
        {PoolingFeedback}
      </div>
      <div className="flex flex-row items-start justify-start gap-2">
        <InformationLine className="text-base leading-4 text-spaceBlue-200" />
        <p className="text-body-s font-walsheim font-normal text-spaceBlue-200">{message}</p>
      </div>
    </div>
  );
};
