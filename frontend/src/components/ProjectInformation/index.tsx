import onlyDustLogo from "assets/img/onlydust-logo.png";
import { buildGithubLink, buildLanguageString } from "src/utils/stringUtils";
import { Contributor, LanguageMap } from "src/types";
import TelegramLink from "../TelegramLink";
import GithubLink from "../GithubLink";
import CodeSSlashLine from "src/icons/CodeSSlashLine";
import RoundedImage from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import { formatDollars } from "src/utils/money";

interface ProjectInformationProps {
  name: string;
  displayName?: string;
  totalSpentAmountInUsd?: number;
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
  totalSpentAmountInUsd,
  details,
  lead,
  githubRepoInfo,
}: ProjectInformationProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-row w-full divide-x divide-stone-100/[0.08] gap-6 justify-items-center font-walsheim">
      <div className="flex flex-col basis-4/12 gap-y-5">
        <div className="flex flex-row gap-4 items-start">
          <RoundedImage src={details?.logoUrl || onlyDustLogo} alt="Project Logo" size="lg" className="mt-1" />
          <div className="flex flex-col">
            <div className="text-2xl font-medium font-belwe">{name}</div>
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
          <div className="flex flex-row border border-neutral-600 w-fit px-3 py-1 rounded-2xl gap-2 text-md">
            <div className="flex items-center justify-center">
              <CodeSSlashLine className="text-gray-400" />
            </div>
            <div>{buildLanguageString(githubRepoInfo?.languages)}</div>
          </div>
        )}
      </div>
      <div className="flex flex-col basis-8/12 pl-6 gap-5 justify-between">
        <div className="text-lg line-clamp-3">{details?.description}</div>
        <div className="flex flex-row divide-x divide-stone-100/[0.08]">
          <div className="flex flex-row gap-2 pr-6">
            {details?.telegramLink && <TelegramLink link={details?.telegramLink} />}
            {githubRepoInfo?.owner && githubRepoInfo?.name && (
              <GithubLink link={buildGithubLink(githubRepoInfo?.owner, githubRepoInfo?.name)} />
            )}
          </div>
          <div className="flex text-sm gap-4 items-center pl-6">
            {!!githubRepoInfo?.contributors?.length && (
              <span>{T("project.details.contributors.count", { count: githubRepoInfo?.contributors?.length })}</span>
            )}
            {totalSpentAmountInUsd !== undefined && (
              <span>{T("project.amountGranted", { amount: formatDollars(totalSpentAmountInUsd) })}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
