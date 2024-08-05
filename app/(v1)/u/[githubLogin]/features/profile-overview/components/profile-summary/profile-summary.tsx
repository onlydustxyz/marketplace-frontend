import { PublicProfileChannelsUnion } from "api-client/resources/users/types";

import ProfileDate from "app/(v1)/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-date/profile-date";
import { TProfileSummary } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary.types";
import { SocialLink } from "app/(v1)/u/[githubLogin]/features/profile-overview/components/profile-summary/social-link/social-link";

import { Icon } from "components/layout/icon/icon";
import { RemixIconsName } from "components/layout/icon/remix-icon-names.types";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

export function ProfileSummary(props: TProfileSummary.Props) {
  const { bio, contacts, signedUpOnGithubAt, signedUpAt, htmlUrl } = props;

  const contactIconMapping: Record<Partial<PublicProfileChannelsUnion | "GITHUB">, RemixIconsName> = {
    TELEGRAM: "ri-telegram-2-fill",
    TWITTER: "ri-twitter-x-fill",
    DISCORD: "ri-discord-fill",
    LINKEDIN: "ri-linkedin-box-fill",
    WHATSAPP: "ri-whatsapp-fill",
    GITHUB: "ri-github-fill",
  };

  function getArgs(channel: PublicProfileChannelsUnion, contacts: string) {
    if (!contacts) return {};
    switch (channel) {
      case "TELEGRAM":
      case "TWITTER":
      case "LINKEDIN":
        return {
          link: contacts,
        };
      case "WHATSAPP":
      case "DISCORD":
        return {
          copyableValue: contacts,
          copyableValueName: channel,
        };
      default:
        return {};
    }
  }

  return (
    <div className="flex w-full flex-col gap-3 py-0 md:gap-6 md:py-5">
      <Typography variant="body-m" className="line-clamp-5 h-full text-spaceBlue-100">
        {bio || <Translate token="v2.pages.publicProfile.bio.empty" />}
      </Typography>

      <div className="flex flex-col-reverse flex-wrap-reverse justify-between gap-5 md:flex-row md:gap-3">
        <div className="flex items-center gap-2">
          <SocialLink key={htmlUrl} link={htmlUrl}>
            <Icon remixName={contactIconMapping["GITHUB"]} size={24} />
          </SocialLink>
          {contacts
            ?.filter(item => item.visibility !== "private")
            .map(c => {
              return (
                <SocialLink key={c.contact} {...getArgs(c.channel, c.contact)}>
                  <Icon remixName={contactIconMapping[c.channel]} size={24} />
                </SocialLink>
              );
            })}
        </div>
        <ProfileDate signedUpOnGithubAt={signedUpOnGithubAt} signedUpAt={signedUpAt} />
      </div>
    </div>
  );
}
