import { Leader } from "src/types";

import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TContributors } from "./contributors.types";

export function Contributors({ contributorCount, topContributors }: TContributors.Props) {
  if (contributorCount === 0) {
    return null;
  }

  return (
    <Section
      title={{
        token: "project.details.overview.contributors",
        params: {
          count: contributorCount,
        },
      }}
      remixIconName="ri-user-3-line"
    >
      <Flex alignItems="center" className="gap-2">
        <ContributorsAvatars contributors={topContributors as Leader[]} avatarProps={{ size: "s" }} />

        <Typography variant="body-s">{contributorCount}</Typography>
      </Flex>
    </Section>
  );
}
