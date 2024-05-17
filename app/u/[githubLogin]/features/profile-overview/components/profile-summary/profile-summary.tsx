import { PublicProfileChannelsUnion } from "api-client/resources/users/types";

import { TProfileSummary } from "app/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary.types";

import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Typography } from "components/layout/typography/typography";

import { ProfileDate } from "./profile-date/profile-date";

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
            {contacts.map(c => (
              <BaseLink
                key={c.contact}
                href={c.contact}
                className="h-10 w-10 items-center justify-center rounded-xl bg-noise-heavy p-2"
              >
                <Icon remixName={contactIconMapping[c.channel]} size={24} />
              </BaseLink>
            ))}
          </div>
        ) : null}

        <ProfileDate signedUpOnGithubAt={signedUpOnGithubAt} signedUpAt={signedUpAt} />
      </div>
    </div>
  );
}
