"use client";

import { Contributor } from "components/features/contributor/contributor";
import { Translate } from "components/layout/translate/translate";
import { useMemo } from "react";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { TLeaders } from "./leaders.types";

export function Leaders({ leaders }: TLeaders.Props) {
  const asOnlyOneLead = useMemo(() => {
    if (leaders.length === 1 && leaders[0].login) {
      const lead = leaders[0];
      return (
        <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
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
      <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.noLed" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-1 pt-0.5 text-sm text-spaceBlue-200">
      {leaders.length > 0 ? (
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.ledBy" params={{ count: leaders.length }} />
          {asOnlyOneLead}
        </div>
      ) : null}
      <ContributorsAvatars contributors={leaders} />
    </div>
  );
}
