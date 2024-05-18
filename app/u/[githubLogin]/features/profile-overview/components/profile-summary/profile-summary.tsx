import { PublicProfileChannelsUnion } from "api-client/resources/users/types";

import ProfileDate from "app/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-date/profile-date";
import { TProfileSummary } from "app/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary.types";
import { SocialLink } from "app/u/[githubLogin]/features/profile-overview/components/profile-summary/social-link/social-link";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

export function ProfileSummary(props: TProfileSummary.Props) {
  const { bio, contacts, signedUpOnGithubAt, signedUpAt } = props;

  const contactIconMapping: Record<PublicProfileChannelsUnion, RemixIconsName> = {
    EMAIL: "ri-mail-line",
    TELEGRAM: "ri-telegram-fill",
    TWITTER: "ri-twitter-x-fill",
    DISCORD: "ri-discord-fill",
    LINKEDIN: "ri-linkedin-box-fill",
    WHATSAPP: "ri-whatsapp-fill",
  };

  return (
    <div className="flex w-full flex-col gap-3 py-0 md:gap-6 md:py-5">
      {bio ? (
        <Typography variant="body-m" className="line-clamp-5 text-spaceBlue-100">
          {bio}
        </Typography>
      ) : null}

      <div className="flex flex-col-reverse flex-wrap-reverse justify-between gap-5 md:flex-row md:gap-3">
        {contacts?.length ? (
          <div className="flex items-center gap-2">
            {contacts
              .filter(item => item.channel !== "EMAIL" && item.visibility !== "private")
              .map(c => {
                const args = {
                  link:
                    c.channel === "TELEGRAM" || c.channel === "TWITTER" || c.channel === "LINKEDIN"
                      ? c.contact
                      : undefined,
                  copyableValue: c.channel === "WHATSAPP" || c.channel === "DISCORD" ? c.contact : undefined,
                  copyableValueName: c.channel,
                };
                return (
                  <SocialLink key={c.contact} {...args}>
                    <Icon remixName={contactIconMapping[c.channel]} size={24} />
                  </SocialLink>
                );
              })}
          </div>
        ) : null}

        <ProfileDate signedUpOnGithubAt={signedUpOnGithubAt} signedUpAt={signedUpAt} />
      </div>
    </div>
  );
}
