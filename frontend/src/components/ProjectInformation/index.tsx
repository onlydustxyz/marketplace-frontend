import onlyDustLogo from "assets/img/onlydust-logo.png";
import { buildGithubLink, buildLanguageString } from "src/utils/stringUtils";
import ProjectLead from "../LeadContributor";
import { Contributor, LanguageMap } from "src/types";
import TelegramLink from "../TelegramLink";
import GithubLink from "../GithubLink";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import RoundedImage from "src/components/RoundedImage";

interface ProjectInformationProps {
  name: string;
  displayName?: string;
  budget?: {
    remainingAmount: number;
    initialAmount: number;
  } | null;
  details?: {
    description?: string | null;
    telegramLink?: string | null;
    logoUrl?: string | null;
  } | null;
  lead?: {
    displayName: string;
    avatarUrl: string;
  } | null;
  githubRepoInfo?: {
    owner?: string;
    name?: string;
    contributors?: Contributor[];
    languages: LanguageMap;
  };
}

export default function ProjectInformation({
  name,
  displayName,
  details,
  lead,
  githubRepoInfo,
}: ProjectInformationProps) {
  return (
    <div className="flex flex-row w-full divide-x divide-neutral-600 gap-5 justify-items-center font-walsheim">
      <div className="flex flex-col basis-4/12 gap-5 justify-around">
        <div className="flex flex-row gap-3 items-center">
          <RoundedImage src={details?.logoUrl || onlyDustLogo} alt="Project Logo" className="object-cover w-12 h-12" />
          <div className="flex flex-col">
            <div className="text-2xl font-medium">{name}</div>
            {lead && (
              <div className="text-md text-neutral-300 font-bold flex flex-row gap-1 items-center">
                <div>Led by </div>
                <div className="text-purple-700">{lead?.displayName}</div>{" "}
                <img src={lead?.avatarUrl} className="w-3 md:w-4 h-3 md:h-4 rounded-full" />
              </div>
            )}
          </div>
        </div>
        {githubRepoInfo?.languages && (
          <div className="flex flex-row border border-neutral-600 w-fit px-2 py-1 rounded-2xl gap-2 text-md">
            <div className="flex items-center justify-center">
              <CodeSSlashLine className="text-gray-400" />
            </div>
            <div>{buildLanguageString(githubRepoInfo?.languages)}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col basis-8/12 pl-8 justify-around gap-5">
        <div className="text-lg line-clamp-3 h-20">{details?.description}</div>
        <div className="flex flex-row divide-x divide-neutral-600">
          <div className="flex flex-row gap-3 pr-5">
            {githubRepoInfo?.owner && githubRepoInfo?.name && (
              <GithubLink link={buildGithubLink(githubRepoInfo?.owner, githubRepoInfo?.name)} />
            )}
            {details?.telegramLink && <TelegramLink link={details?.telegramLink} />}
          </div>
          {!!githubRepoInfo?.contributors?.length && (
            <NumberOfContributors numberOfContributors={githubRepoInfo?.contributors?.length} />
          )}
        </div>
      </div>
    </div>
  );
}

interface NumberOfContributorsProps {
  numberOfContributors: number;
}

function NumberOfContributors({ numberOfContributors }: NumberOfContributorsProps) {
  return (
    <div className="flex flex-row w-full justify-center items-center text-xl">
      {numberOfContributors} contributor
      {numberOfContributors <= 1 ? "" : "s"}
    </div>
  );
}
