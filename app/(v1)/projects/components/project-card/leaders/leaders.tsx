"use client";

import { useMemo } from "react";

import { Tooltip } from "components/ds/tooltip/tooltip";
import { Contributor } from "components/features/contributor/contributor";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TLeaders } from "./leaders.types";

export function Leaders({ leaders }: TLeaders.Props) {
  const sortedByLogin = useMemo(() => {
    return [...leaders].sort((a, b) => a.login.localeCompare(b.login));
  }, [leaders]);

  const hasOnlyOneLead = useMemo(() => {
    if (sortedByLogin.length === 1 && sortedByLogin[0].login) {
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
  }, [sortedByLogin]);

  // Render a placeholder if no leaders
  if (!sortedByLogin.length) {
    return (
      <div className="flex flex-row items-center gap-1 text-snow">
        <div className="od-text-body-s flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="v2.features.leaders.notLed" />
        </div>
      </div>
    );
  }

  return (
    <Tooltip
      content={<ContributorsAvatars.TooltipContent contributors={sortedByLogin} />}
      enabled={sortedByLogin.length > 1}
      canInteract={true}
    >
      <div className="flex flex-row items-center gap-1 font-walsheim text-snow">
        <ContributorsAvatars contributors={sortedByLogin} avatarProps={{ size: "xs" }} enableTooltip={false} />

        <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
          {sortedByLogin.length > 1 ? (
            <Typography
              variant="body-s"
              className="truncate"
              translate={{ token: "v2.features.leaders.ledBy", params: { count: sortedByLogin.length } }}
            />
          ) : null}
          {hasOnlyOneLead}
        </div>
      </div>
    </Tooltip>
  );
}
