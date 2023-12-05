import Telegram from "src/assets/icons/Telegram";
import Card from "src/components/Card";
import Contributor from "src/components/Contributor";
import ExternalLink from "src/components/ExternalLink";
import RoundedImage, { ImageSize, Rounding } from "src/components/RoundedImage";
import Flex from "src/components/Utils/Flex";
import { useAuth } from "src/hooks/useAuth";
import { useIntl } from "src/hooks/useIntl";
import DiscordFill from "src/icons/DiscordFill";
import TwitterFill from "src/icons/TwitterFill";
import { Leader, Sponsor as SponsorType, TopContributor } from "src/types";
import isDefined from "src/utils/isDefined";
import { SocialIcon } from "../../ProjectEdition/pages/Information/components/SocialIcon";
import FakeExternalLink from "./FakeExternalLink";
import Section, { SectionIcon } from "./Section";
import Sponsor from "./Sponsor";
import { components } from "src/__generated/api";

const filterLeadsByLogin = (leads?: Leader[]) => leads?.filter(lead => isDefined(lead?.login)) || [];

interface Props {
  leads?: Leader[];
  invitedLeads?: Leader[];
  sponsors: SponsorType[];
  moreInfos: components["schemas"]["MoreInfo"][];
  topContributors: TopContributor[];
  totalContributorsCount: number;
  showPendingInvites: boolean;
}

export default function OverviewPanel({
  leads,
  invitedLeads,
  sponsors,
  moreInfos,
  topContributors,
  totalContributorsCount,
  showPendingInvites,
}: Props) {
  const { T } = useIntl();
  const { isLoggedIn } = useAuth();

  const projectLeads = filterLeadsByLogin(leads);
  const projectInvitedLeads = filterLeadsByLogin(invitedLeads);

  const contributorProps = (lead: Leader) => ({
    contributor: {
      login: lead.login || "",
      avatarUrl: lead.avatarUrl,
      githubUserId: lead.githubUserId,
    },
    clickable: true,
  });

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
              <Contributor key={lead.id} {...contributorProps(lead)} />
            ))}

            {showPendingInvites &&
              projectInvitedLeads.map(lead => (
                <Flex key={lead.login} className="gap-1">
                  <Contributor {...contributorProps(lead)} />
                  <span className="text-sm text-spaceBlue-200">({T("common.pendingInvite")})</span>
                </Flex>
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

      {moreInfos.length && (
        <Section testId="more-info" icon={SectionIcon.Link} title={T("project.details.overview.moreInfo")}>
          <div data-testid="more-info-link" className="flex overflow-hidden text-sm font-semibold text-spacePurple-500">
            {isLoggedIn ? (
              <ul
                data-testid="more-info-link"
                className="space-y-2 overflow-hidden text-sm font-semibold text-spacePurple-500"
              >
                {moreInfos.map(moreInfo => (
                  <li key={moreInfo.url} className="flex">
                    <SocialIcon search={moreInfo.url} className="mr-1 inline-block h-4 w-4 text-spacePurple-500" />
                    <ExternalLink
                      text={moreInfo.value || moreInfo.url.replace(/^https?:\/\//i, "").replace(/\/$/, "")}
                      url={moreInfo.url}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-2">
                <FakeExternalLink
                  text={T("common.channel.telegram")}
                  icon={({ className }) => <Telegram className={className} size={16} />}
                />
                <FakeExternalLink
                  text={T("common.channel.discord")}
                  icon={({ className }) => <DiscordFill className={className} />}
                />
                <FakeExternalLink
                  text={T("common.channel.twitter")}
                  icon={({ className }) => <TwitterFill className={className} />}
                />
              </div>
            )}
          </div>
        </Section>
      )}
    </Card>
  );
}
