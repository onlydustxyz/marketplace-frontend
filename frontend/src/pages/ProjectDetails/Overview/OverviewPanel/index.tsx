import { gql } from "@apollo/client";
import { useIntl } from "src/hooks/useIntl";
import { Contributor } from "src/types";
import { formatMoneyAmount } from "src/utils/money";
import { ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import ClickableUser from "./ClickableUser";
import Section, { SectionIcon } from "./Section";

interface OverviewPanelProps {
  contributors?: Contributor[];
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd?: number;
  sponsors: SponsorFragment[];
}

export default function OverviewPanel({ contributors, leads, totalSpentAmountInUsd, sponsors }: OverviewPanelProps) {
  const { T } = useIntl();
  return (
    <div className="flex flex-col gap-3 divide-y divide-greyscale-50/8">
      {leads?.length && (
        <Section icon={SectionIcon.Star} title={T("project.details.overview.projectLeader")}>
          <div className="flex flex-row flex-wrap gap-3">
            {leads.map(lead => (
              <ClickableUser
                key={lead.displayName}
                name={lead.displayName}
                logoUrl={lead.avatarUrl}
                url={`https://github.com/${lead.displayName}`}
              />
            ))}
          </div>
        </Section>
      )}
      {contributors?.length && (
        <Section icon={SectionIcon.User} title={T("project.details.overview.contributors")}>
          <div className="flex flex-row items-center text-sm text-greyscale-50 font-normal gap-2">
            <div className="flex flex-row -space-x-1">
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
      {sponsors.length > 0 && (
        <Section icon={SectionIcon.Service} title={T("project.details.overview.sponsors")}>
          <div className="flex flex-row flex-wrap gap-3">
            {sponsors.map(sponsor => (
              <ClickableUser key={sponsor.id} name={sponsor.name} logoUrl={sponsor.logoUrl} url={sponsor.url} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

export const PROJECT_LEAD_FRAGMENT = gql`
  fragment ProjectLead on users {
    displayName
    avatarUrl
  }
`;

export const SPONSOR_FRAGMENT = gql`
  fragment Sponsor on Sponsors {
    id
    name
    logoUrl
    url
  }
`;
