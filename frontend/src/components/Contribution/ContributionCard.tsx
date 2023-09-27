import { ComponentProps } from "react";

import { GetAllContributionsQuery } from "src/__generated/graphql";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";

export function ContributionCard({
  contribution,
}: {
  contribution: GetAllContributionsQuery["contributions"][number];
}) {
  return (
    <article className="flex flex-col gap-2 rounded-xl bg-whiteFakeOpacity-5 p-4">
      <ContributionProjectRepo
        project={contribution.project as ComponentProps<typeof ContributionProjectRepo>["project"]}
        repo={contribution.githubRepo as ComponentProps<typeof ContributionProjectRepo>["repo"]}
      />
      <Contribution contribution={contribution} isMobile />
    </article>
  );
}
