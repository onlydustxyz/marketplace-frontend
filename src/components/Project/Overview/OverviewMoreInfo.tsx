import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import Telegram from "src/assets/icons/Telegram";
import ExternalLink from "src/components/ExternalLink";
import { useIntl } from "src/hooks/useIntl";
import DiscordFill from "src/icons/DiscordFill";
import TwitterFill from "src/icons/TwitterFill";

import Section, { SectionIcon } from "./OverviewSection";
import { SocialIcon } from "src/_pages/ProjectDetails/ProjectEdition/pages/Information/components/SocialIcon";
import FakeExternalLink from "./FakeExternalLink";
import { useAuth0 } from "@auth0/auth0-react";

export interface ProjectOverviewMoreInfoProps {
  moreInfos: UseGetProjectBySlugResponse["moreInfos"];
}

export const ProjectOverviewMoreInfo = ({ moreInfos }: ProjectOverviewMoreInfoProps) => {
  const { T } = useIntl();
  const { isAuthenticated } = useAuth0();

  return moreInfos.length ? (
    <Section testId="more-info" icon={SectionIcon.Link} title={T("project.details.overview.moreInfo")}>
      <div data-testid="more-info-link" className="flex overflow-hidden text-sm font-semibold text-spacePurple-500">
        {isAuthenticated ? (
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
  ) : null;
};
