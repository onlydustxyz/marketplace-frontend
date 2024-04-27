import { format } from "date-fns";

import { TProfileSummary } from "app/migration/u/[githubLogin]/features/profile-summary/profile-summary.types";

import { Avatar } from "components/ds/avatar/avatar";
import { BaseLink } from "components/layout/base-link/base-link";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

export function ProfileSummary(props: TProfileSummary.Props) {
  const { bio, socials, githubRegistrationDate, onlydustRegistrationDate } = props;
  return (
    <div className="flex w-full flex-col gap-4 p-4 lg:p-6">
      {bio ? (
        <Typography variant="body-m" className="text-spaceBlue-100">
          {bio}
        </Typography>
      ) : null}
      <div className="flex flex-wrap-reverse justify-between gap-4">
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
        <div className="flex flex-nowrap gap-2">
          <div className="flex items-center gap-1">
            <Icon remixName="ri-github-fill" size={18} />
            <Typography variant="body-m">{format(new Date(githubRegistrationDate), "MMMM yyyy")}</Typography>
          </div>
          <div className="flex items-center gap-1">
            <Avatar size="s" isBordered={false} />
            <Typography variant="body-m">{format(new Date(onlydustRegistrationDate), "MMMM yyyy")}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
