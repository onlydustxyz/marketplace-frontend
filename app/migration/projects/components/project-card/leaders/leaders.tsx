"use client";

import { useMemo } from "react";

import { Contributor } from "components/features/contributor/contributor";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TLeaders } from "./leaders.types";

export function Leaders({ leaders }: TLeaders.Props) {
  const hasOnlyOneLead = useMemo(() => {
    if (leaders.length === 1 && leaders[0].login) {
      const lead = leaders[0];
      return (
        <div className="flex flex-row items-center gap-1 text-snow">
          <Contributor
            githubUserId={lead.githubUserId}
            login={lead.login}
            avatarUrl={null}
            isRegistered={false}
            clickable
          />
        </div>
      );
    }

    return null;
  }, [leaders]);

  // Render a placeholder if no leaders
  if (!leaders.length) {
    return (
      <div className="flex flex-row items-center gap-1 text-snow">
        <div className="od-text-body-s flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="v2.features.leaders.notLed" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-1 font-walsheim text-snow">
      <ContributorsAvatars contributors={leaders} avatarProps={{ size: "xs" }} />

      <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
        {leaders.length > 1 ? (
          <Typography
            variant="body-s"
            className="truncate"
            translate={{ token: "v2.features.leaders.ledBy", params: { count: leaders.length } }}
          />
        ) : null}
        {hasOnlyOneLead}
      </div>
    </div>
  );
}
