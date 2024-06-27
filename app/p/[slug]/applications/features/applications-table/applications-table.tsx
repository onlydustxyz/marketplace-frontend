import { SortDescriptor } from "@nextui-org/react";
import { projectsApiClient } from "api-client/resources/projects";
import { GetProjectIssuesPageResponse } from "api-client/resources/projects/types";
import { useMemo, useState } from "react";

import { IMAGES } from "src/assets/img";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionTableSkeleton } from "src/components/Contribution/ContributionTableSkeleton";
import { ShowMore } from "src/components/Table/ShowMore";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { Contribution as ContributionT, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Tag } from "components/atoms/tag";
import { Link } from "components/ds/link/link";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";
import { useIntl } from "hooks/translate/use-translate";

function Error() {
  return (
    <div className="py-6">
      <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">
        <Translate token={"contributions.table.error"} />
      </p>
    </div>
  );
}

function mapIssueToContribution(issue: GetProjectIssuesPageResponse["issues"][number]): ContributionT {
  return {
    id: String(issue.id),
    githubHtmlUrl: issue.htmlUrl,
    githubStatus: issue.status,
    githubTitle: issue.title,
    githubNumber: issue.number,
    repo: issue.repository,
    createdAt: issue.createdAt,
    lastUpdatedAt: issue.createdAt,

    // Should only show open issues
    status: "IN_PROGRESS",
    type: GithubContributionType.Issue,

    githubAuthor: issue.author,
    contributor: issue.author,
    project: { id: "", slug: "", name: "", shortDescription: "" },
    rewardIds: [],
    links: [],
  };
}

type QueryParams = NonNullable<Parameters<typeof projectsApiClient.queries.useGetProjectIssues>[0]["queryParams"]>;
type QueryParamsSort = QueryParams["sort"];

const initialFilters: { sort: QueryParamsSort; direction: SortDescriptor["direction"] } = {
  sort: "CREATED_AT",
  direction: "descending",
};

export function ApplicationsTable({ projectId = "" }: { projectId?: string }) {
  const { T } = useIntl();
  const isLg = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const [filters, setFilters] = useState(initialFilters);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: filters.sort,
    direction: filters.direction,
  });

  const queryParams: QueryParams = useMemo(
    () => ({
      sort: filters.sort,
      direction: filters.direction === "ascending" ? "ASC" : "DESC",
      isAssigned: false,
      isApplied: true,
    }),
    [filters]
  );

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    projectsApiClient.queries.useGetProjectIssues({
      pathParams: {
        projectId,
      },
      queryParams,
      options: {
        enabled: Boolean(projectId),
      },
    });

  const issues = useMemo(() => data?.pages?.flatMap(data => data.issues) ?? [], [data]);
  const hasIssues = Boolean(issues?.length);

  function handleSort(sort: SortDescriptor) {
    setSortDescriptor(sort);
    setFilters({ sort: sort.column as QueryParamsSort, direction: sort.direction });
  }

  const columns: TTable.Column[] = useMemo(
    () => [
      {
        key: "CREATED_AT",
        children: <Translate token={"v2.pages.project.applications.table.columns.date"} />,
        icon: {
          remixName: "ri-time-line",
        },
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
              className={"w-[300px]"}
            >
              <Contribution contribution={contribution} />
            </div>
          ),
          actions: (
            <div>
              <Button
                variant={"secondary-light"}
                size={"s"}
                // TODO @hayden add click event
              >
                <Translate token={"v2.pages.project.applications.table.rows.assign"} />
              </Button>
            </div>
          ),
        };
      }),
    [issues]
  );

  function renderMobileContent() {
    if (isError) {
      return <Error />;
    }

    if (!hasIssues) {
      return (
        <EmptyState
          illustrationSrc={IMAGES.global.categories}
          title={{ token: "v2.pages.project.applications.table.empty.title" }}
          description={{ token: "v2.pages.project.applications.table.empty.description" }}
        />
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {issues?.map(issue => {
          const contribution = mapIssueToContribution(issue);

          return (
            <ContributionCard
              key={`${contribution.id}-${contribution.githubTitle}`}
              contribution={contribution}
              className={"bg-card-background-light"}
              applicants={issue.applicants.length}
              action={
                <Button
                  variant={"secondary-light"}
                  size={"s"}
                  // TODO @hayden add click event
                >
                  <Translate token={"v2.pages.project.applications.table.rows.assign"} />
                </Button>
              }
            />
          );
        })}

        {hasNextPage ? (
          <div className="py-2">
            <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite />
          </div>
        ) : null}
      </div>
    );
  }

  function renderDesktopContent() {
    if (isError) {
      return <Error />;
    }

    return (
      <Table
        label={T("v2.pages.project.applications.table.title")}
        columns={columns}
        rows={rows}
        bottomContent={
          hasNextPage ? (
            <div className="pb-4">
              <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} />
            </div>
          ) : null
        }
        EmptyProps={{
          illustrationSrc: IMAGES.global.categories,
          title: { token: "v2.pages.project.applications.table.empty.title" },
          description: { token: "v2.pages.project.applications.table.empty.description" },
        }}
        sortDescriptor={sortDescriptor}
        onSortChange={handleSort}
      />
    );
  }

  if (isLoading) {
    return <ContributionTableSkeleton />;
  }

  return (
    <section
      className={
        "flex max-h-full flex-col overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base shadow-heavy"
      }
    >
      <header
        className={cn("flex items-start justify-between gap-6 bg-card-background-light px-6 py-4 md:items-center", {
          "border-b border-card-border-light": hasIssues,
        })}
      >
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-card-background-medium p-3 leading-none text-greyscale-50">
            <div className={"h-5 w-5 rounded-full border-2 border-dashed"} />
          </div>
          <div className="font-walsheim">
            <Translate
              as={"p"}
              token={"v2.pages.project.applications.table.title"}
              className="text-base font-medium text-greyscale-50"
            />
            <Translate
              as={"p"}
              token={"v2.pages.project.applications.table.description"}
              className="text-sm text-spaceBlue-200"
            />
          </div>
        </div>
      </header>
      <ScrollView>
        <div className={"p-3 lg:hidden"}>{!isLg ? renderMobileContent() : null}</div>

        <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
          {isLg ? renderDesktopContent() : null}
        </div>
      </ScrollView>
    </section>
  );
}
