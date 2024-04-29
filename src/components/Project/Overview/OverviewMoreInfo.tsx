import { useAuth0 } from "@auth0/auth0-react";

import { SocialIcon } from "src/_pages/ProjectDetails/ProjectEdition/pages/Information/components/SocialIcon";
import { UseGetProjectBySlugResponse } from "src/api/Project/queries";
import Telegram from "src/assets/icons/Telegram";

import { Link } from "components/ds/link/link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { useIntl } from "hooks/translate/use-translate";

import FakeExternalLink from "./FakeExternalLink";
import Section, { SectionIcon } from "./OverviewSection";

export interface ProjectOverviewMoreInfoProps {
  moreInfos: UseGetProjectBySlugResponse["moreInfos"];
}

export const ProjectOverviewMoreInfo = ({ moreInfos }: ProjectOverviewMoreInfoProps) => {
  const { T } = useIntl();
  const { isAuthenticated } = useAuth0();

  return moreInfos.length ? (
    <Section testId="more-info" icon={SectionIcon.Link} title={T("project.details.overview.moreInfo")}>
      <div data-testid="more-info-link" className="flex overflow-hidden">
        {isAuthenticated ? (
          <ul data-testid="more-info-link" className="space-y-2 overflow-hidden">
            {moreInfos.map(({ url, value }) => {
              const validUrl = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

              return (
                <li key={validUrl} className="flex items-center">
                  <SocialIcon search={validUrl} className="mr-1 inline-flex h-4 w-4 items-center" />

                  <Link href={validUrl}>{value || validUrl.replace(/^https?:\/\//i, "").replace(/\/$/, "")}</Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <Typography variant="body-s" className="flex flex-col gap-2">
            <FakeExternalLink
              text={T("common.channel.telegram")}
              icon={({ className }) => <Telegram className={className} size={16} />}
            />
            <FakeExternalLink
              text={T("common.channel.discord")}
              icon={({ className }) => <Icon remixName="ri-discord-fill" className={className} />}
            />
            <FakeExternalLink
              text={T("common.channel.twitter")}
              icon={({ className }) => <Icon remixName="ri-twitter-x-fill" className={className} />}
            />
          </Typography>
        )}
      </div>
    </Section>
  ) : null;
};
