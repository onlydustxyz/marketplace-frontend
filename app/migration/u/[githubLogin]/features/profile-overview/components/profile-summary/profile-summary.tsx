import { TProfileSummary } from "app/migration/u/[githubLogin]/features/profile-overview/components/profile-summary/profile-summary.types";

import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { ProfileDate } from "./profile-date/profile-date";

export function ProfileSummary(props: TProfileSummary.Props) {
  const { bio, socials, githubRegistrationDate, onlydustRegistrationDate } = props;

  return (
    <div className="flex w-full flex-col gap-3 py-0 md:gap-6 md:py-5">
      {bio ? (
        <Typography variant="body-m" className="text-spaceBlue-100">
          {bio}
        </Typography>
      ) : null}

      <div className="flex flex-col-reverse flex-wrap-reverse justify-between gap-5 md:flex-row md:gap-3">
        <div className="flex items-center gap-2">
          {socials.map(social => (
            <BaseLink
              key={social.url}
              href={social.url}
              className="h-10 w-10 items-center justify-center rounded-xl bg-noise-heavy p-2"
            >
              <Icon remixName={social.iconName} size={24} />
            </BaseLink>
          ))}
        </div>

        <ProfileDate
          githubRegistrationDate={githubRegistrationDate}
          onlydustRegistrationDate={onlydustRegistrationDate}
        />
      </div>
    </div>
  );
}
