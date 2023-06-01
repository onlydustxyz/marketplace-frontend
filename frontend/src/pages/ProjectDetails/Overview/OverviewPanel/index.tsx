import Card from "src/components/Card";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import isDefined from "src/utils/isDefined";
import { formatMoneyAmount } from "src/utils/money";
import { GithubUserFragment, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import Section, { SectionIcon } from "./Section";
import ClickableUser from "src/components/ClickableUser";

interface Props {
  leads?: ProjectLeadFragment[];
  totalSpentAmountInUsd?: number;
  totalInitialAmountInUsd?: number;
  sponsors: SponsorFragment[];
  telegramLink: string | null;
  topContributors: Pick<GithubUserFragment, "login" | "avatarUrl">[];
  totalContributorsCount: number;
}

export default function OverviewPanel({
  leads,
  totalSpentAmountInUsd,
  totalInitialAmountInUsd,
  sponsors,
  telegramLink,
  topContributors,
  totalContributorsCount,
}: Props) {
  const { T } = useIntl();

  const projectLeads = leads?.filter(lead => isDefined(lead?.login)) || [];

  return (
    <Card
      fullWidth={false}
      className="h-fit p-0 flex flex-col shrink-0 w-80 divide-y divide-greyscale-50/8"
      padded={false}
    >
      {projectLeads.length > 0 && (
        <Section
          testId="project-leads"
          icon={SectionIcon.Star}
          title={T("project.details.overview.projectLeader", { count: projectLeads.length })}
        >
          <div className="flex flex-row flex-wrap gap-3">
            {projectLeads.map(lead => (
              <ClickableUser
                key={lead.id}
                name={lead.login || ""}
                avatarUrl={lead.avatarUrl}
                githubUserId={lead.githubUserId}
              />
            ))}
          </div>
        </Section>
      )}
      {totalContributorsCount > 0 && (
        <Section
          icon={SectionIcon.User}
          title={T("project.details.overview.contributors", { count: totalContributorsCount })}
        >
          <div className="flex flex-row items-center text-sm text-greyscale-50 font-normal gap-2">
            <div className="flex flex-row -space-x-1">
              {topContributors.map(contributor => (
                <RoundedImage
                  key={contributor.login}
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  size={ImageSize.Xs}
                  rounding={Rounding.Circle}
                />
              ))}
            </div>
            <div data-testid="contributors-count">{totalContributorsCount}</div>
          </div>
        </Section>
      )}
      {totalSpentAmountInUsd !== undefined && totalInitialAmountInUsd !== undefined && (
        <Section icon={SectionIcon.Funds} title={T("project.details.overview.totalSpentAmountInUsd")}>
          <div data-testid="money-granted-amount" className="text-sm text-greyscale-50 font-normal">
            {T("project.details.overview.amountGranted", {
              granted: formatMoneyAmount({ amount: totalSpentAmountInUsd, notation: "compact" }),
              total: formatMoneyAmount({ amount: totalInitialAmountInUsd, notation: "compact" }),
              leftToSpend: formatMoneyAmount({
                amount: totalInitialAmountInUsd - totalSpentAmountInUsd,
                notation: "compact",
              }),
            })}
          </div>
        </Section>
      )}
      {sponsors?.length > 0 && (
        <Section
          testId="sponsors"
          icon={SectionIcon.Service}
          title={T("project.details.overview.sponsors", { count: sponsors.length })}
        >
          <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
            {sponsors.map(sponsor => (
              <ClickableUser
                key={sponsor.id}
                name={sponsor.name}
                avatarUrl={sponsor.logoUrl}
                externalUrl={sponsor.url}
              />
            ))}
          </div>
        </Section>
      )}
      {telegramLink && (
        <Section testId="more-info" icon={SectionIcon.Link} title={T("project.details.overview.moreInfo")}>
          <div data-testid="more-info-link" className="flex text-spacePurple-500 font-semibold text-sm overflow-hidden">
            <ExternalLink text={telegramLink.replace(/^https?:\/\//i, "").replace(/\/$/, "")} url={telegramLink} />
          </div>
        </Section>
      )}
    </Card>
  );
}
