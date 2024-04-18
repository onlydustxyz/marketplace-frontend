import { ContributorsAvatars } from "components/features/contributors-avatars/contributors-avatars";
import { Flex } from "components/layout/flex/flex";
import { Typography } from "components/layout/typography/typography";

import { Section } from "../section/section";
import { TContributors } from "./contributors.types";

export function Contributors({ contributorCount, topContributors }: TContributors.Props) {
  if (!contributorCount) {
    return null;
  }

  return (
    <Section
      title={{
        token: "v2.pages.project.overview.projectDetails.contributors",
        params: {
          count: contributorCount,
        },
      }}
      remixIconName="ri-user-3-line"
    >
      <Flex alignItems="center" className="gap-2">
        <ContributorsAvatars contributors={topContributors} avatarProps={{ size: "s" }} />

        <Typography variant="body-s">{contributorCount}</Typography>
      </Flex>
    </Section>
  );
}
