import { UserProfileFragment } from "src/__generated/graphql";
import SidePanel from "src/components/SidePanel";
import { useIntl } from "src/hooks/useIntl";
import MapPinLine from "src/icons/MapPinLine";
import { formatDateShort } from "src/utils/date";
import onlyDustLogo from "assets/img/onlydust-logo.png";
import GlobalLine from "src/icons/GlobalLine";
import SocialLink from "./SocialLink";
import GithubLogo from "src/icons/GithubLogo";
import TwitterFill from "src/icons/TwitterFill";
import Telegram from "src/assets/icons/Telegram";

import classNames from "classnames";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { sortBy } from "lodash";
import LinkedinBoxFill from "src/icons/LinkedinBoxFill";
import Tag, { TagSize } from "src/components/Tag";
import MailLine from "src/icons/MailLine";
import DiscordFill from "src/icons/DiscordFill";
import { Section } from "./Section";
import ProjectCard, { Project } from "./ProjectCard";
import StatCard from "./StatCard";
import { formatMoneyAmount } from "src/utils/money";

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

export default function View({ profile, projects, headerColor, ...rest }: Props) {
  const { T } = useIntl();

  const languages = sortBy(Object.keys(profile.languages), l => profile.languages[l]).reverse();

  return (
    <SidePanel {...rest}>
      <div className="flex flex-col h-full">
        <div
          className={classNames("h-36 w-full bg-cover shrink-0", {
            "bg-profile-blue": headerColor === HeaderColor.Blue,
            "bg-profile-cyan": headerColor === HeaderColor.Cyan,
            "bg-profile-magenta": headerColor === HeaderColor.Magenta,
            "bg-profile-yellow": headerColor === HeaderColor.Yellow,
          })}
        />

        <div className="flex flex-col gap-6 px-8">
          {profile.avatarUrl && (
            <img
              src={profile.avatarUrl}
              className="rounded-full w-24 h-24 -mt-12 outline outline-4 outline-greyscale-50/12"
            />
          )}
          <div className="flex flex-col gap-2">
            <div className="font-belwe font-normal text-3xl text-white">{profile.login}</div>
            {profile.location && (
              <div className="flex flex-row gap-2 items-center font-walsheim font-normal text-base text-greyscale-400">
                <MapPinLine />
                {profile.location}
              </div>
            )}
          </div>
        </div>

        <div className="-pr-4 pr-4 overflow-auto scrollbar-thin scrollbar-w-2 scrollbar-thumb-spaceBlue-500 scrollbar-thumb-rounded">
          <div className="flex flex-col gap-6 pt-6 px-8">
            {(profile.bio || profile.location || profile.createdAt) && (
              <div className="flex flex-col gap-4 font-walsheim font-normal">
                {profile.bio && (
                  <ReactMarkdown className="text-greyscale-50 text-lg prose" remarkPlugins={[remarkGfm]}>
                    {profile.bio}
                  </ReactMarkdown>
                )}
                {profile.website && (
                  <div className="flex flex-row gap-1 items-center text-base text-greyscale-300">
                    <GlobalLine /> {new URL(profile.website).hostname}
                  </div>
                )}
                {profile.createdAt && (
                  <div className="flex flex-row gap-1 items-center text-base text-greyscale-300">
                    <img id={`od-logo-${profile.login}`} src={onlyDustLogo} className="h-3.5 mt-px" />
                    {T("profile.joinedAt", {
                      joinedAt: formatDateShort(new Date(profile.createdAt)),
                    })}
                  </div>
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
                <SocialLink link={profile.discord}>
                  <DiscordFill />
                </SocialLink>
              )}
              {profile.linkedin && (
                <SocialLink link={profile.linkedin}>
                  <LinkedinBoxFill />
                </SocialLink>
              )}
              {profile.email && (
                <SocialLink link={profile.email}>
                  <MailLine />
                </SocialLink>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-8 px-8 py-12">
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
            <Section title={T("profile.sections.stats.title")}>
              <div className="grid grid-cols-3 gap-4">
                <StatCard
                  title={T("profile.sections.stats.contributorOn")}
                  counter={"12"}
                  description={T("profile.sections.stats.projects", { count: 12 })}
                />
                <StatCard
                  title={T("profile.sections.stats.leadOn")}
                  counter={"1"}
                  description={T("profile.sections.stats.projects", { count: 1 })}
                />
                <StatCard
                  title={T("profile.sections.stats.granted")}
                  counter={formatMoneyAmount({ amount: 17000, notation: "compact" })}
                />
              </div>
            </Section>
            <Section title={T("profile.sections.projects.title")}>
              <div className="grid grid-cols-3 gap-3">
                {projects.map(project => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </Section>
          </div>
          {!profile.createdAt && profile.firstContributedAt && (
            <div>
              {T("profile.firstContributedAt", {
                firstContributedAt: formatDateShort(new Date(profile.firstContributedAt)),
              })}
            </div>
          )}
        </div>
      </div>
    </SidePanel>
  );
}
