import { ContributionCountFragment, Maybe, UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import MapPinLine from "src/icons/MapPinLine";
import { daysFromNow, formatDateShort, weekNumber } from "src/utils/date";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import GlobalLine from "src/icons/GlobalLine";
import SocialLink from "./SocialLink";
import GithubLogo from "src/icons/GithubLogo";
import TwitterFill from "src/icons/TwitterFill";
import Telegram from "src/assets/icons/Telegram";

import classNames from "classnames";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { chain, range, slice, sortBy } from "lodash";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import Tag, { TagSize } from "src/components/Tag";
import MailLine from "src/icons/MailLine";
import DiscordFill from "src/icons/DiscordFill";
import { Section } from "./Section";
import ProjectCard, { Project } from "./ProjectCard";
import StatCard from "./StatCard";
import { formatMoneyAmount } from "src/utils/money";
import Card from "src/components/Card";
import ArrowRightUpLine from "src/icons/ArrowRightUpLine";
import ContributionGraph from "./ContributionGraph";
import { filterRemovedLanguages } from "src/utils/languages";
import { Link, generatePath } from "react-router-dom";
import { RoutePaths } from "src/App";
import ExternalLink from "src/components/ExternalLink";
import { withTooltip } from "src/components/Tooltip";
import ArrowRightLine from "src/icons/ArrowRightLine";
import ArrowRightDownLine from "src/icons/ArrowRightDownLine";

export enum HeaderColor {
  Blue = "blue",
  Cyan = "cyan",
  Magenta = "magenta",
  Yellow = "yellow",
}

type Props = {
  profile: UserProfileFragment;
  projects: Project[];
  open: boolean;
  setOpen: (value: boolean) => void;
  headerColor: HeaderColor;
};

const MAX_CONTRIBUTION_COUNTS = 13;

const EMPTY_DATA: ContributionCountFragment[] = range(0, MAX_CONTRIBUTION_COUNTS)
  .map(c => daysFromNow(7 * c))
  .map(date => ({
    year: date.getFullYear(),
    week: weekNumber(date),
    paidCount: 0,
    unpaidCount: 0,
  }));

export default function View({ profile, projects, headerColor, setOpen, ...rest }: Props) {
  const { T } = useIntl();

  const languages = filterRemovedLanguages(sortBy(Object.keys(profile.languages), l => profile.languages[l]).reverse());

  const contributionsCount = chain(profile.contributionCounts)
    .unionWith(EMPTY_DATA, (e1, e2) => e1.year === e2.year && e1.week === e2.week)
    .sortBy(["year", "week"])
    .reverse()
    .take(MAX_CONTRIBUTION_COUNTS)
    .reverse()
    .value();

  const [lastWeek, thisWeek] = slice(contributionsCount, -2);
  const variationSinceLastWeek =
    thisWeek.paidCount + thisWeek.unpaidCount - (lastWeek.paidCount + lastWeek.unpaidCount);

  const website = parseWebsite(profile.website);

  return (
    <SidePanel {...rest} setOpen={setOpen}>
      <div className="flex flex-col h-full">
        <div className="z-10">
          <div
            className={classNames("h-24 w-full bg-cover shrink-0", {
              "bg-profile-blue": headerColor === HeaderColor.Blue,
              "bg-profile-cyan": headerColor === HeaderColor.Cyan,
              "bg-profile-magenta": headerColor === HeaderColor.Magenta,
              "bg-profile-yellow": headerColor === HeaderColor.Yellow,
            })}
          />

          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              className="rounded-full w-24 h-24 ml-8 -mt-12 outline outline-4 outline-greyscale-50/12"
            />
          )}
        </div>

        <div className="-mt-10 pt-16 mr-2 mb-2 scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
          <div className="flex flex-col gap-6 px-8">
            <div className="flex flex-col gap-2">
              <div data-testid="login" className="font-belwe font-normal text-3xl text-white">
                {profile.login}
              </div>
              {profile.location && (
                <div className="flex flex-row gap-2 items-center font-walsheim font-normal text-base text-greyscale-400">
                  <MapPinLine />
                  {profile.location}
                </div>
              )}
            </div>

            {(profile.bio || profile.location || profile.createdAt) && (
              <div className="flex flex-col gap-4 font-walsheim font-normal">
                {profile.bio && (
                  <ReactMarkdown className="text-greyscale-50 text-lg prose" remarkPlugins={[remarkGfm]}>
                    {profile.bio}
                  </ReactMarkdown>
                )}
                {website && (
                  <div className="flex flex-row gap-1 items-center text-base text-greyscale-300">
                    <GlobalLine />
                    <ExternalLink url={website.url} text={website.hostname} />
                  </div>
                )}

                {profile.createdAt ? (
                  <div className="flex flex-row gap-1 items-center text-base text-greyscale-300">
                    <img id={`od-logo-${profile.login}`} src={onlyDustLogo} className="h-3.5" />
                    {T("profile.joinedAt", {
                      joinedAt: formatDateShort(new Date(profile.createdAt)),
                    })}
                  </div>
                ) : (
                  profile.contributionStatsAggregate.aggregate?.min?.minDate && (
                    <div className="text-base text-greyscale-300">
                      {T("profile.firstContributedAt", {
                        firstContributedAt: formatDateShort(
                          new Date(profile.contributionStatsAggregate.aggregate?.min?.minDate)
                        ),
                      })}
                    </div>
                  )
                )}
              </div>
            )}
            <div className="flex flex-row gap-2 items-center">
              {profile.htmlUrl && (
                <SocialLink link={profile.htmlUrl}>
                  <GithubLogo />
                </SocialLink>
              )}
              {profile.telegram && (
                <SocialLink link={profile.telegram}>
                  <Telegram className="fill-greyscale-200" size={20} />
                </SocialLink>
              )}
              {profile.twitter && (
                <SocialLink link={profile.twitter}>
                  <TwitterFill />
                </SocialLink>
              )}
              {profile.discord && (
                <SocialLink copyableValue={profile.discord} copyableValueName={T("profile.discord")}>
                  <DiscordFill />
                </SocialLink>
              )}
              {profile.linkedin && (
                <SocialLink link={profile.linkedin}>
                  <LinkedinBoxFill />
                </SocialLink>
              )}
              {profile.email && (
                <SocialLink copyableValue={profile.email} copyableValueName={T("profile.email")}>
                  <MailLine />
                </SocialLink>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 px-8 py-12">
            {languages.length > 0 && (
              <Section title={T("profile.sections.technologies.title")}>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language, index) => (
                    <Tag key={language} size={TagSize.Medium}>
                      <div className="w-4 h-4 flex items-center justify-center text-xs text-greyscale-50 bg-white/5 rounded-[4px]">
                        {index + 1}
                      </div>
                      <div className="text-greyscale-50 text-sm">{language}</div>
                    </Tag>
                  ))}
                </div>
              </Section>
            )}
            <Section title={T("profile.sections.stats.title")}>
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  title={T("profile.sections.stats.contributorOn")}
                  counter={profile.projectsContributedAggregate.aggregate?.count + ""}
                  description={T("profile.sections.stats.projects", {
                    count: profile.projectsContributedAggregate.aggregate?.count,
                  })}
                />
                <StatCard
                  title={T("profile.sections.stats.leadOn")}
                  counter={profile.projectsLeaded.length.toString()}
                  description={T("profile.sections.stats.projects", { count: profile.projectsLeaded.length })}
                />
                <StatCard
                  title={T("profile.sections.stats.granted")}
                  counter={formatMoneyAmount({
                    amount: profile.paymentStatsAggregate.aggregate?.sum?.moneyGranted || 0,
                    notation: "compact",
                  })}
                />
                <Card
                  blurred
                  padded={false}
                  className="flex flex-col bg-noise-light px-4 py-2 col-span-3 overflow-visible"
                >
                  <div className="flex flex-row items-center gap-3">
                    <div className="font-walsheim font-medium text-sm uppercase text-greyscale-300 w-full">
                      {T("profile.sections.stats.contributions")}
                    </div>
                    <div className="font-belwe font-normal text-4xl pb-1 text-greyscale-50">
                      {profile.contributionStatsAggregate.aggregate?.sum?.totalCount || 0}
                    </div>
                    <div
                      className="flex flex-row items-center gap-0.5 rounded-full py-0.5 px-2 bg-white/5 border border-greyscale-50/12 backdrop-blur-lg shadow-heavy text-sm"
                      {...withTooltip(T("contributionGraph.progressionTooltip"))}
                    >
                      {variationSinceLastWeek < 0 ? (
                        <ArrowRightDownLine className="text-orange-300" />
                      ) : variationSinceLastWeek === 0 ? (
                        <ArrowRightLine className="text-spacePurple-200" />
                      ) : (
                        <ArrowRightUpLine className="text-spacePurple-500" />
                      )}
                      <div className="text-greyscale-200">
                        {new Intl.NumberFormat("en-US", {
                          signDisplay: "always",
                        }).format(variationSinceLastWeek)}
                      </div>
                    </div>
                  </div>
                  <ContributionGraph entries={contributionsCount} />
                </Card>
              </div>
            </Section>
            {projects.length > 0 && (
              <Section title={T("profile.sections.projects.title")}>
                <div className="grid grid-cols-3 gap-3">
                  {projects.map(project => (
                    <Link
                      onClick={() => setOpen(false)}
                      key={project.id}
                      to={generatePath(RoutePaths.ProjectDetails, { projectId: project.id })}
                    >
                      <ProjectCard {...project} />
                    </Link>
                  ))}
                </div>
              </Section>
            )}
          </div>
        </div>
      </div>
    </SidePanel>
  );
}

export const parseWebsite = (website: Maybe<string>) => {
  try {
    const url = new URL(website || "");
    return {
      hostname: url.hostname,
      url: url.toString(),
    };
  } catch (e) {
    const regex = /^(https?:\/\/)?([^\s:/?#]+)(.*)?$/;

    const matches = (website || "").match(regex);
    if (matches) {
      const protocol = matches[1];
      const hostname = matches[2];
      const path = matches[3];
      return {
        hostname,
        url: `${protocol || "https://"}${hostname}${path || ""}`,
      };
    }
  }
};
