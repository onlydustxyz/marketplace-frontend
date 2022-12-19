import githubLogo from "assets/img/github-logo.svg";
import telegramLogo from "assets/img/telegram-logo.svg";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import CodeIcon from "src/assets/icons/Code";
import { MouseEvent } from "react";
import { buildGithubLink } from "src/utils/stringUtils";
import { useT } from "talkr";

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
    owner?: string;
    name?: string;
    contributors?: { login: string }[];
  };
}

const linkClickHandlerFactory = (url: string) => (e: MouseEvent<HTMLDivElement>) => {
  e.preventDefault();
  window?.open(url, "_blank")?.focus();
};

export default function ProjectInformation({ name, details, githubRepoInfo }: ProjectInformationProps) {
  const { T } = useT();
  return (
    <div className="flex flex-row w-full divide-x divide-neutral-600 gap-5 justify-items-center font-walsheim">
      <div className="flex flex-col basis-4/12 gap-5 justify-around">
        <div className="flex flex-row gap-3 items-center">
          <div className="border-4 border-neutral-600 p-2 rounded-2xl">
            <img className="md:w-8 w-4 hover:opacity-90" src={onlyDustLogo} alt="Project Logo" />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-medium">{name}</div>
            {githubRepoInfo?.contributors?.[0]?.login && (
              <div className="text-md text-neutral-500 font-medium">
                {T("project.ledBy")} <span className="text-purple-700">{githubRepoInfo?.contributors?.[0]?.login}</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row border border-neutral-600 w-fit px-2 py-1 rounded-2xl gap-2 text-md">
          <div>
            <CodeIcon className="fill-gray-400" />
          </div>
          <div>Cairo</div>
        </div>
      </div>
      <div className="flex flex-col basis-8/12 pl-8 justify-around gap-5">
        <div className="text-lg">{details?.description}</div>
        <div className="flex flex-row divide-x divide-neutral-600">
          <div className="flex flex-row gap-3 pr-5">
            {githubRepoInfo?.owner && githubRepoInfo?.name && (
              <LinkWithLogo link={buildGithubLink(githubRepoInfo?.owner, githubRepoInfo?.name)} logo={githubLogo} />
            )}
            {details?.telegramLink && <LinkWithLogo link={details?.telegramLink} logo={telegramLogo} />}
          </div>
          <div className="flex flex-row w-full justify-center items-center gap-10">
            {githubRepoInfo?.contributors?.length && (
              <div className="flex">
                {githubRepoInfo?.contributors?.length} contributor
                {githubRepoInfo?.contributors?.length && githubRepoInfo?.contributors?.length <= 1 ? "" : "s"}
              </div>
            )}
            <div className="flex">8 contributions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TelegramLinkProps {
  link: string;
  logo: string;
}

function LinkWithLogo({ link, logo }: TelegramLinkProps) {
  return (
    <div className="border-2 rounded-xl p-2 grayscale border-slate-500 opacity-80 hover:opacity-50 hover:cursor-pointer">
      <div onClick={linkClickHandlerFactory(link)}>
        <img className="md:w-10 w-5" src={logo} alt="Telegram Logo" />
      </div>
    </div>
  );
}
