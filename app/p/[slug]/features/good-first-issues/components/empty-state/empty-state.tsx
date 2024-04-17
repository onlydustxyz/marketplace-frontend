import Image from "next/image";

import { IMAGES } from "src/assets/img";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { TEmptyState } from "./empty-state.types";

// TODO: Add in Translate
export function EmptyState({ organizations }: TEmptyState.Props) {
  const { T } = useIntl();

  const repositories = organizations?.flatMap(organization =>
    organization.repos.map(repo => `${organization.login}/${repo.name}`)
  );

  const baseUrl = "https://github.com/search?type=issues&state=open&q=";
  const repoQueries = repositories?.map(repo => `repo:${repo}`).join("+");
  const url = `${baseUrl}${repoQueries}`;

  return (
    <Flex direction="col" alignItems="center" className="gap-6 px-6 pb-12 pt-4">
      <Flex direction="col" alignItems="center" className="gap-4">
        <Image src={IMAGES.global.categories} width={80} height={80} alt={T("emptyStatePictureFallback")} />

        <Flex direction="col" className="gap-1">
          <Typography variant="title-m" className="text-center">
            No good first issues listed.
          </Typography>

          <Typography variant="body-s" className="text-center text-spaceBlue-200">
            This project might have other open issues on its Github page.
          </Typography>
        </Flex>
      </Flex>

      <BaseLink href={url}>
        <Button variant="primary">
          <Icon remixName="ri-github-fill" size={20} className="text-spaceBlue-900" />
          See all issues on Github
        </Button>
      </BaseLink>
    </Flex>
  );
}
