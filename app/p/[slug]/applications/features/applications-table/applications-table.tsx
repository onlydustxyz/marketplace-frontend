import { projectsApiClient } from "api-client/resources/projects";
import { PropsWithChildren, useMemo } from "react";

import { IMAGES } from "src/assets/img";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { SkeletonEl } from "components/ds/skeleton/skeleton";
import { Table } from "components/ds/table/table";
import { TTable } from "components/ds/table/table.types";
import { Translate } from "components/layout/translate/translate";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";
import { useIntl } from "hooks/translate/use-translate";

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
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
          date: "date",
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
      return (
        <div className="py-6">
          <Message>{T("contributions.table.error")}</Message>
        </div>
      );
    }

    // if (!hasIssues) {
    //   return (
    //     <ContributionEmptyFallBack isMobile={true} nbColumns={nbColumns} activeTab={activeTab} filterRef={filterRef} />
    //   );
    // }

    return null;

    // return (
    //   <div className="flex flex-col gap-2">
    //     {issues?.map(issue => (
    //       <ContributionCard
    //         key={`${contribution.id}-${contribution.project.name}`}
    //         contribution={contribution}
    //         className={cn({ "bg-card-background-light": fullTable })}
    //       />
    //     ))}
    //
    //     {hasNextPage ? (
    //       <div className="py-2">
    //         <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite />
    //       </div>
    //     ) : null}
    //   </div>
    // );
  }

  // function renderDesktopContent() {
  //   if (isError) {
  //     return <TableText colSpan={nbColumns}>{T("contributions.table.error")}</TableText>;
  //   }
  //
  //   if (!hasIssues) {
  //     return (
  //       <ContributionEmptyFallBack
  //         isMobile={false}
  //         hasActiveFilters={hasActiveFilters}
  //         nbColumns={nbColumns}
  //         // activeTab={activeTab}
  //         filterRef={filterRef}
  //       />
  //     );
  //   }
  //
  //   return issues?.map(bodyRow);
  // }

  function renderDesktopContent() {
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
    return <SkeletonEl width={"100%"} height={400} />;
  }

  return (
    <section
      className={cn("overflow-hidden rounded-2xl border-card-border-medium", {
        // "border bg-card-background-base shadow-heavy": fullTable,
        // "lg:border lg:bg-card-background-base lg:shadow-heavy": !fullTable,
      })}
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

      {
        //Show the content if we're on a specific tab or if there are contributions
        hasIssues ? <div className={"p-3 lg:hidden"}>{!isLg ? renderMobileContent() : null}</div> : null
      }

      {
        //Show the table if we're on a specific tab or if there are contributions
        hasIssues ? (
          <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
            {isLg ? renderDesktopContent() : null}
          </div>
        ) : null
      }
    </section>
  );
}
