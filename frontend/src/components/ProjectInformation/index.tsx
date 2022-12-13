import githubLogo from "assets/img/github-logo.svg";
import telegramLogo from "assets/img/telegram-logo.svg";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import RemainingBudget from "../RemainingBudget";
import { MouseEvent } from "react";
import { useIntl } from "src/hooks/useIntl";

interface ProjectInformationProps {
  name: string;
  details?: {
    description: string;
    telegramLink: string;
  };
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  };
  githubRepoInfo?: {
    githubLink: string;
    contributors: { login: string }[];
  };
}

const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};

export default function ProjectInformation({ name, details, budget, githubRepoInfo }: ProjectInformationProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row md:flex-nowrap flex-wrap justify-between items-center">
        <div className="flex flex-1 flex-col space-y-3">
          <div className="flex flex-row">
            <div>
              <img className="md:w-8 w-4 hover:opacity-90" src={onlyDustLogo} alt="GitHub Logo" />
            </div>
            <div className="px-3 font-bold text-2xl">{name}</div>
          </div>
          <div className="text-lg">{details?.description}</div>
        </div>
        <div className="flex flex-1 flex-col space-y-1 text-lg w-1/4">
          {budget && (
            <RemainingBudget initialAmount={budget?.initialAmount} remainingAmount={budget?.remainingAmount} />
          )}
        </div>
        <div className="flex flex-1 flex-row space-x-3 justify-end">
          {githubRepoInfo?.githubLink && (
            <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
              <div onClick={linkClickHandlerFactory(githubRepoInfo?.githubLink)}>
                <img className="md:w-8 w-4" src={githubLogo} alt="GitHub Logo" />
              </div>
            </div>
          )}
          {details?.telegramLink && (
            <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
              <div onClick={linkClickHandlerFactory(details?.telegramLink)}>
                <img className="md:w-8 w-4" src={telegramLogo} alt="Telegram Logo" />
              </div>
            </div>
          )}
        </div>
      </div>
      {githubRepoInfo && (
        <div className="flex flex-row justify-between items-center">
          <GithubDetails title={T("project.details.overview.technologies")}>Cairo</GithubDetails>
          <GithubDetails title={T("project.details.overview.projectLeader")}>
            {githubRepoInfo?.contributors?.[0]?.login}
          </GithubDetails>
          <GithubDetails title={T("project.details.overview.contributors")}>
            {githubRepoInfo?.contributors?.length}
          </GithubDetails>
        </div>
      )}
    </div>
  );
}

interface GithubDetailsProps extends React.PropsWithChildren {
  title: string;
}

function GithubDetails({ title, children }: GithubDetailsProps) {
  return (
    <div className="flex flex-col">
      <div className="flex text-lg font-bold">{title}</div>
      <div className="flex">{children}</div>
    </div>
  );
}
