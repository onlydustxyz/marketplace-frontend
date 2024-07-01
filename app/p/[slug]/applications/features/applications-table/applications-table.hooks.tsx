import { SortDescriptor } from "@nextui-org/react";
import { projectsApiClient } from "api-client/resources/projects";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

import { mapIssueToContribution } from "app/p/[slug]/applications/features/applications-table/application-table.utils";

import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { GithubContributionType } from "src/types";

import { Button } from "components/atoms/button/variants/button-default";
import { Tag } from "components/atoms/tag";
import { Link } from "components/ds/link/link";
import { TTable } from "components/ds/table/table.types";
import { BaseLink } from "components/layout/base-link/base-link";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

type QueryParams = NonNullable<Parameters<typeof projectsApiClient.queries.useGetProjectIssues>[0]["queryParams"]>;
type QueryParamsSort = QueryParams["sort"];

const initialFilters: { sort: QueryParamsSort; direction: SortDescriptor["direction"] } = {
  sort: "CREATED_AT",
  direction: "descending",
};

export function useApplicationsTable({ projectId = "" }: { projectId?: string }) {
  const { slug = "" } = useParams<{ slug?: string }>();
  const [filters, setFilters] = useState(initialFilters);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: filters.sort,
    direction: filters.direction,
  });

  const { data, ...query } = projectsApiClient.queries.useGetProjectIssues({
    pathParams: {
      projectId,
    },
    queryParams: {
      sort: filters.sort,
      direction: filters.direction === "ascending" ? "ASC" : "DESC",
      isAssigned: false,
      isApplied: true,
    },
    options: {
      enabled: Boolean(projectId),
    },
  });

  const issues = useMemo(() => data?.pages?.flatMap(data => data.issues) ?? [], [data]);
  const hasIssues = Boolean(issues?.length);

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "CREATED_AT",
        children: <Translate token={"v2.pages.project.applications.table.columns.date"} />,
        icon: {
          remixName: "ri-time-line",
        },
        width: 120,
        allowsSorting: true,
      },
      {
        key: "repository",
        children: <Translate token={"v2.pages.project.applications.table.columns.repository"} />,
        icon: {
          remixName: "ri-git-repository-line",
        },
      },
      {
        key: "applicants",
        children: <Translate token={"v2.pages.project.applications.table.columns.applicants"} />,
        icon: {
          remixName: "ri-user-line",
        },
        width: 150,
      },
      {
        key: "contribution",
        children: <Translate token={"v2.pages.project.applications.table.columns.contribution"} />,
        icon: {
          remixName: "ri-stack-line",
        },
      },
      {
        key: "actions",
        children: "",
        align: "end",
        width: 100,
      },
    ],
    []
  );

  const rows: TTable.Row[] = useMemo(
    () =>
      issues.map(row => {
        const repoName = row.repository.name;
        const truncateLength = 200;
        const contribution = mapIssueToContribution(row);

        return {
          key: String(row.id ?? ""),
          CREATED_AT: (
            <div className={"whitespace-nowrap"}>
              <ContributionDate
                id={String(row.id)}
                type={GithubContributionType.Issue}
                status={row.status}
                contributionStatus={"IN_PROGRESS"}
                date={new Date(row.createdAt)}
                tooltipProps={{ variant: TooltipVariant.Default, position: TooltipPosition.Bottom }}
              />
            </div>
          ),
          repository: (
            <Link href={row.repository.htmlUrl} className="whitespace-nowrap text-left" title={repoName}>
              {truncateLength && repoName.length > truncateLength
                ? repoName.substring(0, truncateLength) + "..."
                : repoName}
            </Link>
          ),
          applicants: (
            <Tag size={"xs"} style={"outline"} classNames={{ base: "inline-flex" }}>
              <Translate
                token={"v2.pages.project.applications.table.rows.countApplicants"}
                params={{ count: row.applicants.length }}
              />
            </Tag>
          ),
          contribution: (
            <div
            // TODO @hayden don't know if this a good idea, no simple solution right now to define column width
            // className={"w-[300px]"}
            >
              <Contribution contribution={contribution} />
            </div>
          ),
          actions: (
            <div className={"flex justify-end"}>
              <Button
                variant={"secondary-light"}
                size={"s"}
                as={BaseLink}
                htmlProps={{ href: NEXT_ROUTER.projects.details.applications.details(slug, String(row.id)) }}
              >
                <Translate token={"v2.pages.project.applications.table.rows.assign"} />
              </Button>
            </div>
          ),
        };
      }),
    [issues]
  );

  function handleSort(sort: SortDescriptor) {
    setSortDescriptor(sort);
    setFilters({ sort: sort.column as QueryParamsSort, direction: sort.direction });
  }

  return { query, issues, hasIssues, sortDescriptor, columns, rows, handleSort };
}
