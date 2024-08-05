"use client";

import { format } from "date-fns";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { Avatar } from "components/ds/avatar/avatar";
import { withClientOnly } from "components/layout/client-only/client-only";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TProfileDate } from "./profile-date.types";

function ProfileDate({ signedUpOnGithubAt, signedUpAt }: TProfileDate.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  if (signedUpOnGithubAt || signedUpAt) {
    return (
      <div className="flex flex-nowrap gap-3">
        {signedUpOnGithubAt ? (
          <div className="flex items-center gap-1">
            <Icon remixName="ri-github-fill" size={isMd ? 18 : 14} />
            <Typography variant={isMd ? "body-m" : "body-s"}>
              {format(new Date(signedUpOnGithubAt), "MMMM yyyy")}
            </Typography>
          </div>
        ) : null}

        {signedUpAt ? (
          <div className="flex items-center gap-1">
            <Avatar size={isMd ? "s" : "xs"} isBordered={false} />
            <Typography variant={isMd ? "body-m" : "body-s"}>{format(new Date(signedUpAt), "MMMM yyyy")}</Typography>
          </div>
        ) : null}
      </div>
    );
  }
  return null;
}

export default withClientOnly(ProfileDate);
