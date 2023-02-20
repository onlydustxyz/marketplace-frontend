import ProjectLead, { ProjectLeadProps } from "src/components/LeadContributor";
import { useIntl } from "src/hooks/useIntl";
import MoneyDollarCircleLine from "src/icons/MoneyDollarCircleLine";
import StarLine from "src/icons/StarLine";
import User3Line from "src/icons/User3Line";
import { Contributor } from "src/types";
import { formatMoneyAmount } from "src/utils/money";

interface OverviewPanelProps {
  githubRepoInfo?: {
    contributors?: Contributor[];
  };
  lead?: ProjectLeadProps | null;
  totalSpentAmountInUsd?: number;
}

export default function OverviewPanel__deprecated({ githubRepoInfo, lead, totalSpentAmountInUsd }: OverviewPanelProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-3 divide-y divide-slate-600/40">
      {lead && (
        <div>
          <div className="flex flex-row justify-between py-4 pb-1 px-5 gap-4">
            <div className="flex flex-row whitespace-nowrap gap-1 items-center">
              <StarLine className="p-px font-normal text-xl text-slate-400" />
              <div className="flex text-md font-medium text-base text-slate-400 uppercase">
                {T("project.details.overview.projectLeader")}
              </div>
            </div>
            <ProjectLead {...lead} />
          </div>
        </div>
      )}
      {githubRepoInfo?.contributors?.length !== undefined && (
        <div className="flex flex-row justify-between py-4 pb-1 px-5">
          <div className="flex flex-row gap-1 items-center">
            <User3Line className="p-px font-normal text-xl text-slate-400" />
            <div className="flex text-md font-medium text-base text-slate-400 uppercase">
              {T("project.details.overview.contributors")}
            </div>
          </div>
          <div className="flex flex-row items-center text-lg text-neutral-300 font-bold gap-2">
            <div className="flex flex-row gap-px">
              {githubRepoInfo.contributors.slice(0, 3).map(contributor => (
                <img
                  key={contributor.login}
                  src={contributor.avatarUrl}
                  className="w-3 md:w-4 h-3 md:h-4 rounded-full"
                />
              ))}
            </div>
            <div>{githubRepoInfo.contributors.length}</div>
          </div>
        </div>
      )}
      {totalSpentAmountInUsd !== undefined && (
        <div className="flex flex-row justify-between py-4 px-5">
          <div className="flex flex-row gap-1 items-center">
            <MoneyDollarCircleLine className="p-px font-normal text-xl text-slate-400" />
            <div className="flex text-md font-medium text-base text-slate-400 uppercase">
              {T("project.details.overview.totalSpentAmountInUsd")}
            </div>
          </div>
          <div data-testid="money-granted-amount" className="flex text-lg text-neutral-300 font-bold">
            {formatMoneyAmount(totalSpentAmountInUsd)}
          </div>
        </div>
      )}
    </div>
  );
}
