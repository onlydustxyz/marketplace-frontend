import Card from "src/components/Card";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import { useIntl } from "src/hooks/useIntl";
import isDefined from "src/utils/isDefined";
import { GithubUserFragment, ProjectLeadFragment, SponsorFragment } from "src/__generated/graphql";
import Section, { SectionIcon } from "./Section";
import Contributor from "src/components/Contributor";
import Sponsor from "./Sponsor";

interface Props {
  leads?: ProjectLeadFragment[];
  sponsors: SponsorFragment[];
  moreInfoLink: string | null;
  topContributors: Pick<GithubUserFragment, "login" | "avatarUrl">[];
  totalContributorsCount: number;
}

export default function OverviewPanel({
  leads,
  sponsors,
  moreInfoLink,
  topContributors,
  totalContributorsCount,
}: Props) {
  const { T } = useIntl();

  const projectLeads = leads?.filter(lead => isDefined(lead?.login)) || [];

  return (
    <Card fullWidth={false} className="flex h-fit flex-col divide-y divide-greyscale-50/8 p-0" padded={false}>
      {projectLeads.length > 0 && (
        <Section
          testId="project-leads"
          icon={SectionIcon.Star}
          title={T("project.details.overview.projectLeader", { count: projectLeads.length })}
        >
          <div className="flex flex-row flex-wrap gap-3">
            {projectLeads.map(lead => (
              <Contributor
                key={lead.id}
                contributor={{
                  login: lead.login || "",
                  avatarUrl: lead.avatarUrl,
                  githubUserId: lead.githubUserId,
                }}
                clickable
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
          <div className="flex flex-row items-center gap-2 text-sm font-normal text-greyscale-50">
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
      {sponsors?.length > 0 && (
        <Section
          testId="sponsors"
          icon={SectionIcon.Service}
          title={T("project.details.overview.sponsors", { count: sponsors.length })}
        >
          <div data-testid="sponsors" className="flex flex-row flex-wrap gap-3">
            {sponsors.map(sponsor => (
              <Sponsor key={sponsor.id} name={sponsor.name} logoUrl={sponsor.logoUrl} externalUrl={sponsor.url} />
            ))}
          </div>
        </Section>
      )}
      {moreInfoLink && (
        <Section testId="more-info" icon={SectionIcon.Link} title={T("project.details.overview.moreInfo")}>
          <div data-testid="more-info-link" className="flex overflow-hidden text-sm font-semibold text-spacePurple-500">
            <ExternalLink text={moreInfoLink.replace(/^https?:\/\//i, "").replace(/\/$/, "")} url={moreInfoLink} />
          </div>
        </Section>
      )}
    </Card>
  );
}
