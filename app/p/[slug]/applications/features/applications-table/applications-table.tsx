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
import { Table } from "components/ds/table/table";
import { BaseLink } from "components/layout/base-link/base-link";
import { ScrollView } from "components/layout/pages/scroll-view/scroll-view";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";

import { NEXT_ROUTER } from "constants/router";

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
                  size={"s"}
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
