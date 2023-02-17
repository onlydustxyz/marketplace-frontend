import { gql } from "@apollo/client";
import Card from "src/components/Card";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
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
  telegramLink: string | null;
}

export default function OverviewPanel({
  contributors,
  leads,
  totalSpentAmountInUsd,
  sponsors,
  telegramLink,
}: OverviewPanelProps) {
  const { T } = useIntl();
  return (
    <Card className="h-fit p-0 basis-96 flex flex-col divide-y divide-greyscale-50/8" padded={false}>
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
                <RoundedImage
                  key={contributor.login}
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  size={ImageSize.ExtraSmall}
                  rounding={Rounding.Circle}
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
      {telegramLink && (
        <Section icon={SectionIcon.Telegram} title={T("project.details.overview.telegram")}>
          <div className="text-spacePurple-500 font-semibold text-sm">
            <ExternalLink text={telegramLink} url={telegramLink} />
          </div>
        </Section>
      )}
    </Card>
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
