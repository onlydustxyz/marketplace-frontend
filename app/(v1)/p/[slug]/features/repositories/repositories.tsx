import { useMemo } from "react";

import { Avatar } from "components/ds/avatar/avatar";
import { Badge } from "components/ds/badge/badge";
import { Card } from "components/ds/card/card";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Typography } from "components/layout/typography/typography";

import { RepositoryCard } from "./components/repository-card/repository-card";
import { TRepositories } from "./repositories.types";

export function Repositories({ organizations }: TRepositories.Props) {
  const repoCount = useMemo(() => organizations?.flatMap(({ repos }) => repos).length ?? 0, [organizations]);

  return (
    <Card background="base" hasPadding={false}>
      <Flex direction="col">
        <Flex alignItems="center" justifyContent="between" className="gap-6 border-b border-greyscale-50/8 px-6 py-4">
          <Flex alignItems="center" className="gap-2">
            <Icon remixName="ri-git-repository-line" size={20} />

            <Typography variant="body-m-bold" translate={{ token: "v2.pages.project.overview.repositories.title" }} />
          </Flex>

          <Badge value={repoCount} size="s" />
        </Flex>

        <Flex direction="col" className="divide-y divide-greyscale-50/8">
          {organizations?.map(organization => (
            <Flex key={organization.name} direction="col" className="gap-4 px-6 py-4">
              <Flex alignItems="center" className="gap-2">
                <Avatar src={organization.avatarUrl} shape="square" size="s" />

                <Typography variant="special-label" className="uppercase text-spaceBlue-200">
                  {organization.name}
                </Typography>
              </Flex>

              {organization.repos
                ?.sort((a, b) => (b.stars || 0) - (a.stars || 0))
                .map(repository => (
                  <RepositoryCard key={repository.id} repository={repository} />
                ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Card>
  );
}
