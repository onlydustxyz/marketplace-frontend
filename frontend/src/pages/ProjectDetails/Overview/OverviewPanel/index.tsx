import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/types";
import { formatMoneyAmount } from "src/utils/money";
import { GithubUserFragment } from "src/__generated/graphql";
import ClickableUser from "./ClickableUser";
import Section, { SectionIcon } from "./Section";

interface OverviewPanelProps {
  contributors?: Contributor[];
  lead?: GithubUserFragment;
  totalSpentAmountInUsd?: number;
}

export default function OverviewPanel({ contributors, lead, totalSpentAmountInUsd }: OverviewPanelProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-3 divide-y divide-greyscale-50/8">
      {lead && (
        <Section icon={SectionIcon.Star} title={T("project.details.overview.projectLeader")}>
          <ClickableUser name={lead.login} logoUrl={lead.avatarUrl} url={`https://github.com/${lead.login}`} />
        </Section>
      )}
      {contributors?.length !== undefined && (
        <Section icon={SectionIcon.User} title={T("project.details.overview.contributors")}>
          <div className="flex flex-row items-center text-sm text-greyscale-50 font-normal gap-2">
            <div className="flex flex-row gap-px">
              {contributors.slice(0, 3).map(contributor => (
                <img
                  key={contributor.login}
                  src={contributor.avatarUrl}
                  className="w-3 md:w-4 h-3 md:h-4 rounded-full"
                />
              ))}
            </div>
            <div>{contributors.length}</div>
          </div>
        </Section>
      )}
      {totalSpentAmountInUsd !== undefined && (
        <Section icon={SectionIcon.Funds} title={T("project.details.overview.totalSpentAmountInUsd")}>
          <div data-testid="money-granted-amount" className="text-sm text-greyscale-50 font-normal">
            {formatMoneyAmount(totalSpentAmountInUsd)}
          </div>
        </Section>
      )}
    </div>
  );
}
