"use client";

import { format } from "date-fns";
import { useMediaQuery } from "usehooks-ts";

import { viewportConfig } from "src/config";

import { Avatar } from "components/ds/avatar/avatar";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TProfileDate } from "./profile-date.types";

export function ProfileDate({ githubRegistrationDate, onlydustRegistrationDate }: TProfileDate.Props) {
  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  return (
    <div className="flex flex-nowrap gap-3">
      <div className="flex items-center gap-1">
        <Icon remixName="ri-github-fill" size={isMd ? 18 : 14} />
        <Typography variant={isMd ? "body-m" : "body-s"}>
          {format(new Date(githubRegistrationDate), "MMMM yyyy")}
        </Typography>
      </div>

      <div className="flex items-center gap-1">
        <Avatar size={isMd ? "s" : "xs"} isBordered={false} />
        <Typography variant={isMd ? "body-m" : "body-s"}>
          {format(new Date(onlydustRegistrationDate), "MMMM yyyy")}
        </Typography>
      </div>
    </div>
  );
}
