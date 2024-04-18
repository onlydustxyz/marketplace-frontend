import Image from "next/image";
import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { getSearchLink } from "utils/github/search";

import { IMAGES } from "src/assets/img";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";

import { Button } from "components/ds/button/button";
import { BaseLink } from "components/layout/base-link/base-link";
import { Flex } from "components/layout/flex/flex";
import { Icon } from "components/layout/icon/icon";
import { Translate } from "components/layout/translate/translate";
import { Typography } from "components/layout/typography/typography";

import { TEmptyState } from "./empty-state.types";

export function EmptyState({ organizations, isProjectLeader }: TEmptyState.Props) {
  const { T } = useIntl();

  const isMd = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.md}px)`);

  const repositories = useMemo(() => {
    return organizations?.flatMap(organization => organization.repos.map(repo => `${organization.login}/${repo.name}`));
  }, [organizations]);

  const repoQueries = useMemo(() => {
    return repositories?.map(repo => `repo:${repo}`).join("+");
  }, [repositories]);

  const url = getSearchLink({
    type: "issues",
    state: "open",
    query: repoQueries,
  });

  return (
    <Flex direction="col" alignItems="center" className="gap-6 px-6 pb-12 pt-4">
      <Flex direction="col" alignItems="center" className="gap-4">
        <Image src={IMAGES.global.categories} width={80} height={80} alt={T("emptyStatePictureFallback")} />

        <Flex direction="col" className="gap-1">
          <Typography
            variant={isMd ? "title-m" : "title-s"}
            className="text-center"
            translate={{ token: "v2.pages.project.overview.goodFirstIssues.empty.title" }}
          />

          <Typography variant="body-s" className="text-center text-spaceBlue-200">
            <Translate
              token={
                isProjectLeader
                  ? "v2.pages.project.overview.goodFirstIssues.empty.description.lead"
                  : "v2.pages.project.overview.goodFirstIssues.empty.description.contributor"
              }
            />
          </Typography>
        </Flex>
      </Flex>

      <BaseLink href={url}>
        <Button variant="primary" size={isMd ? "m" : "s"}>
          <Icon remixName="ri-github-fill" size={20} className="text-spaceBlue-900" />
          <Translate
            token={
              isProjectLeader
                ? "v2.pages.project.overview.goodFirstIssues.empty.button.lead"
                : "v2.pages.project.overview.goodFirstIssues.empty.button.contributor"
            }
          />
        </Button>
      </BaseLink>
    </Flex>
  );
}
