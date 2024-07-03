import { useParams } from "next/navigation";

import { mapIssueToContribution } from "app/p/[slug]/applications/features/applications-table/application-table.utils";
import { useApplicationsTable } from "app/p/[slug]/applications/features/applications-table/applications-table.hooks";

import { IMAGES } from "src/assets/img";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionTableSkeleton } from "src/components/Contribution/ContributionTableSkeleton";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { Table } from "components/ds/table/table";
import { TableContainer } from "components/features/table-container/table-container";
import { BaseLink } from "components/layout/base-link/base-link";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";
import { useIntl } from "hooks/translate/use-translate";

function Error() {
  return (
    <Typo
      as={"p"}
      translate={{ token: "v2.pages.project.applications.table.error" }}
      classNames={{ base: "py-6 text-greyscale-50 text-center" }}
    />
  );
}

export function ApplicationsTable({ projectId = "" }: { projectId?: string }) {
  const { T } = useIntl();
  const isLg = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);
  const { slug = "" } = useParams<{ slug?: string }>();

  const { query, issues, hasIssues, sortDescriptor, columns, rows, handleSort } = useApplicationsTable({ projectId });
  const { isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;

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
                  size={"m"}
                  as={BaseLink}
                  htmlProps={{ href: NEXT_ROUTER.projects.details.applications.details(slug, String(issue.id)) }}
                >
                  <Translate token={"v2.pages.project.applications.table.rows.reviewApplication"} />
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
        layout={"fixed"}
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
    <TableContainer
      title={"v2.pages.project.applications.table.title"}
      description={"v2.pages.project.applications.table.description"}
      icon={<div className={"h-5 w-5 rounded-full border-2 border-dashed"} />}
    >
      <div className={"p-3 lg:hidden"}>{!isLg ? renderMobileContent() : null}</div>

      <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
        {isLg ? renderDesktopContent() : null}
      </div>
    </TableContainer>
  );
}
