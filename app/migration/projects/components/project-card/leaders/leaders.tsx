"use client";

import { useMemo } from "react";

import { Contributor } from "components/features/contributor/contributor";
import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Translate } from "components/layout/translate/translate";

import { TLeaders } from "./leaders.types";

export function Leaders({ leaders }: TLeaders.Props) {
  const asOnlyOneLead = useMemo(() => {
    if (leaders.length === 1 && leaders[0].login) {
      const lead = leaders[0];
      return (
        <div className="font flex flex-row items-center gap-1 pt-0.5 font-walsheim text-sm text-snow">
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
      <div className="flex flex-row items-center gap-1 pt-0.5 font-walsheim text-sm text-snow">
        <div className="flex flex-row gap-1 truncate whitespace-nowrap">
          <Translate token="project.noLed" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center gap-1 pt-0.5 font-walsheim text-sm text-snow">
      <ContributorsAvatars contributors={leaders} />
      {leaders.length > 0 ? (
        <div className="flex flex-row items-center gap-1 truncate whitespace-nowrap">
          <Translate token="project.ledBy" params={{ count: leaders.length }} />
          {asOnlyOneLead}
        </div>
      ) : null}
    </div>
  );
}
