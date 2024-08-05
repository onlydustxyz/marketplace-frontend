import { useMemo } from "react";

import { TContributors } from "app/(v1)/ecosystems/[ecosystemSlug]/components/contributors/contributors.types";

import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Typography } from "components/layout/typography/typography";

const MAX_CONTRIBUTORS = 3;
export function Contributors({ topContributors, contributorsCount }: TContributors.Props) {
  const nbContributors = useMemo(() => contributorsCount ?? 0, [contributorsCount]);
  const isMaxContributors = useMemo(() => nbContributors > MAX_CONTRIBUTORS, [nbContributors]);

  if (!topContributors?.length) return null;

  return (
    <div className={"flex items-center"}>
      <ContributorsAvatars contributors={topContributors} avatarProps={{ size: "xs" }} enableTooltip={false} />
      {isMaxContributors ? (
        <Typography
          variant={"body-s"}
          className={"ml-1 text-spaceBlue-100"}
          translate={{
            token: "v2.pages.ecosystems.detail.projectGoodFirstIssues.contributors",
            params: { count: nbContributors - MAX_CONTRIBUTORS },
          }}
        />
      ) : null}
    </div>
  );
}
