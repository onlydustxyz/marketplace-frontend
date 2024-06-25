"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { ApplicationsTable } from "app/p/[slug]/applications/features/applications-table/applications-table";

import { MissingGithubAppInstallBanner } from "src/_pages/ProjectDetails/Banners/MissingGithubAppInstallBanner";
import StillFetchingBanner from "src/_pages/ProjectDetails/Banners/StillFetchingBanner";
import { useContributionTable } from "src/_pages/ProjectDetails/Contributions/useContributionTable";
import Title from "src/_pages/ProjectDetails/Title";
import { EditProjectButton } from "src/_pages/ProjectDetails/components/EditProjectButton";
import { RewardProjectButton } from "src/_pages/ProjectDetails/components/RewardProjectButton";
import ProjectApi from "src/api/Project";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionTable, TableColumns, type TableSort } from "src/components/Contribution/ContributionTable";
import Flex from "src/components/Utils/Flex";
import { ContributionStatus, OrderBy } from "src/types";
import { getOrgsWithUnauthorizedRepos } from "src/utils/getOrgsWithUnauthorizedRepos";

import { PosthogOnMount } from "components/features/posthog/components/posthog-on-mount/posthog-on-mount";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";

import { useIntl } from "hooks/translate/use-translate";

const initialSort: TableSort = {
  sort: TableColumns.Date,
  direction: OrderBy.Desc,
};

export default function ProjectApplicationsPage() {
  const { T } = useIntl();
  const { slug = "" } = useParams<{ slug?: string }>();

  const { data: project, isLoading: isLoadingProject } = ProjectApi.queries.useGetProjectBySlug({
    params: { slug },
  });

  const orgsWithUnauthorizedRepos = project ? getOrgsWithUnauthorizedRepos(project) : [];
  const hasOrgsWithUnauthorizedRepos = orgsWithUnauthorizedRepos.length > 0;

  const { headerCells, bodyRow } = useContributionTable();

  const [sortStorage, setSortStorage] = useLocalStorage(
    "project-contributions-table-sort-v2-0-0",
    JSON.stringify(initialSort)
  );
  const [sort, setSort] = useState<typeof initialSort>(sortStorage ? JSON.parse(sortStorage) : initialSort);

  const props = {
    id: "applied_contributions_table",
    title: T("contributions.applied.title"),
    description: T("contributions.applied.description"),
    icon: className => <ProgressCircle className={className} />,
    sort,
    onSort: sort => {
      setSort(prevState => {
        const state = { ...prevState, [ContributionStatus.InProgress]: sort };

        setSortStorage(JSON.stringify(state));

        return state;
      });
    },
    headerCells,
    bodyRow,
    query: ProjectApi.queries.useProjectContributionsInfiniteList({
      params: {
        projectId: project?.id ?? "",
        queryParams: {
          // TODO @hayden handle status/request
          statuses: ContributionStatus.InProgress,
          ...sort,
        },
      },
    }),
    canCollapse: false,
  };

  return (
    <>
      <PosthogOnMount eventName={"project_applications_list_viewed"} />

      <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-center md:justify-between md:gap-2">
        <Title>{T("project.details.applications.title")}</Title>
        {!hasOrgsWithUnauthorizedRepos ? (
          <Flex className="w-full justify-start gap-2 md:w-auto md:justify-end">
            <EditProjectButton projectKey={slug} />
            {project && <RewardProjectButton project={project} />}
          </Flex>
        ) : null}
      </div>

      {!project?.indexingComplete && !isLoadingProject ? <StillFetchingBanner /> : null}

      {project && hasOrgsWithUnauthorizedRepos ? (
        <MissingGithubAppInstallBanner slug={project.slug} orgs={orgsWithUnauthorizedRepos} />
      ) : null}

      <ApplicationsTable projectId={project?.id} />

      <ScrollView>
        <ContributionTable {...props} />
      </ScrollView>
    </>
  );
}
