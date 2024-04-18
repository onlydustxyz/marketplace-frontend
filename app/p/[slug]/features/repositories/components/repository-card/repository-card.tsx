import { Button } from "components/ds/button/button";
import { Card } from "components/ds/card/card";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TRepositoryCard } from "./repository-card.types";

export function RepositoryCard({ repository }: TRepositoryCard.Props) {
  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col" className="gap-3 p-4">
        <Flex direction="col" className="gap-2">
          <Flex alignItems="center" justifyContent="between" className="gap-4">
            <Typography variant="body-m-bold">{repository.name}</Typography>

            <BaseLink href={repository.htmlUrl}>
              <Button variant="secondary" size="s" iconOnly>
                <Icon remixName="ri-github-fill" className="fill-neutral-100" />
              </Button>
            </BaseLink>
          </Flex>

          <Typography variant="body-s" className="text-greyscale-200">
            {repository.description ? (
              repository.description
            ) : (
              <Translate token="project.details.overview.repositories.descriptionPlaceholder" />
            )}
          </Typography>
        </Flex>

        <Flex alignItems="center" className="gap-5">
          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-star-line" className="text-greyscale-200" />

            <Typography variant="special-label" className="text-greyscale-200">
              {repository.stars || 0}
            </Typography>
          </Flex>

          <Flex alignItems="center" className="gap-1">
            <Icon remixName="ri-git-fork-line" className="text-greyscale-200" />

            <Typography variant="special-label" className="text-greyscale-200">
              {repository.forkCount || 0}
            </Typography>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
