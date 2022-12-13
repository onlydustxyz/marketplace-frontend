import githubLogo from "assets/img/github-logo.svg";
import telegramLogo from "assets/img/telegram-logo.svg";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import RemainingBudget from "../RemainingBudget";
import { MouseEvent } from "react";
import { useIntl } from "src/hooks/useIntl";
import { buildGithubLink } from "src/utils/stringUtils";

interface ProjectInformationProps {
  name: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  } | null;
  details?: {
    description?: string | null;
    telegramLink?: string | null;
  } | null;
  githubRepoInfo?: {
    owner: string;
    name: string;
    contributors: { login: string }[];
  };
}

const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};

export default function ProjectInformation({ name, details, budget, githubRepoInfo }: ProjectInformationProps) {
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
          <RemainingBudget initialAmount={budget?.initialAmount} remainingAmount={budget?.remainingAmount} />
        </div>
        <div className="flex flex-1 flex-row space-x-3 justify-end">
          {githubRepoInfo?.owner && githubRepoInfo?.name && (
            <LinkWithLogo link={buildGithubLink(githubRepoInfo?.owner, githubRepoInfo?.name)} logo={githubLogo} />
          )}
          {details?.telegramLink && <LinkWithLogo link={details?.telegramLink} logo={telegramLogo} />}
        </div>
      </div>
      {githubRepoInfo && githubRepoInfo?.contributors?.[0]?.login && githubRepoInfo?.contributors?.length && (
        <GithubRepoInfo
          technology="Cairo"
          leadContributor={githubRepoInfo?.contributors?.[0]?.login}
          numberOfContributors={githubRepoInfo?.contributors?.length}
        />
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

interface TelegramLinkProps {
  link: string;
  logo: string;
}

function LinkWithLogo({ link, logo }: TelegramLinkProps) {
  return (
    <div className="border-1 rounded-md p-2 grayscale bg-white border-slate-500 opacity-80 hover:opacity-50">
      <div onClick={linkClickHandlerFactory(link)}>
        <img className="md:w-8 w-4" src={logo} alt="Telegram Logo" />
      </div>
    </div>
  );
}

interface GithubRepoInfoProps {
  technology: string;
  leadContributor: string;
  numberOfContributors: number;
}

function GithubRepoInfo({ technology, leadContributor, numberOfContributors }: GithubRepoInfoProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-row justify-between items-center">
      <GithubDetails title={T("project.details.overview.technologies")}>{technology}</GithubDetails>
      <GithubDetails title={T("project.details.overview.projectLeader")}>{leadContributor}</GithubDetails>
      <GithubDetails title={T("project.details.overview.contributors")}>{numberOfContributors}</GithubDetails>
    </div>
  );
}
