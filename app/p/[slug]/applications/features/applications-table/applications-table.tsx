import { projectsApiClient } from "api-client/resources/projects";
import { useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import { Contribution, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import displayRelativeDate from "src/utils/displayRelativeDate";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
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

export function ApplicationsTable({ projectId = "" }: { projectId?: string }) {
  const { T } = useIntl();
  const isLg = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    projectsApiClient.queries.useGetProjectIssues({
      pathParams: {
        projectId,
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
        key: "date",
        children: <Translate token={"v2.pages.project.applications.table.columns.date"} />,
        icon: {
          remixName: "ri-time-line",
        },
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
        const { id } = row;

        return {
          key: String(id ?? ""),
          date: displayRelativeDate(row.createdAt),
          repository: "repository",
          applicants: "applicants",
          contribution: "contribution",
          actions: <div>Click me</div>,
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
          const contribution: Contribution = {
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

          return (
            <ContributionCard
              key={`${contribution.id}-${contribution.githubTitle}`}
              contribution={contribution}
              className={"bg-card-background-light"}
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
      />
    );
  }

  if (isLoading) {
    return <SkeletonEl width={"100%"} height={400} variant={"rounded"} />;
  }

  return (
    <section
      className={"overflow-hidden rounded-2xl border border-card-border-medium bg-card-background-base shadow-heavy"}
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

      <div className={"p-3 lg:hidden"}>{!isLg ? renderMobileContent() : null}</div>

      <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
        {isLg ? renderDesktopContent() : null}
      </div>
    </section>
  );
}
