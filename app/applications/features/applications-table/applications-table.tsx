"use client";

import { mapIssueToContribution } from "app/p/[slug]/applications/features/applications-table/application-table.utils";

import { IMAGES } from "src/assets/img";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ShowMore } from "src/components/Table/ShowMore";
import { viewportConfig } from "src/config";
import { cn } from "src/utils/cn";

import { Button } from "components/atoms/button/variants/button-default";
import { Typo } from "components/atoms/typo";
import { Table } from "components/ds/table/table";
import { ApplyIssueDrawer } from "components/features/apply-issue-drawer/apply-issue-drawer";
import { TableContainer } from "components/features/table-container/table-container";
import { EmptyState } from "components/layout/placeholders/empty-state/empty-state";
import { Translate } from "components/layout/translate/translate";

import { useClientMediaQuery } from "hooks/layout/useClientMediaQuery/use-client-media-query";
import { useIntl } from "hooks/translate/use-translate";

import { useApplicationsTable } from "./applications-table.hooks";

function Error() {
  return (
    <Typo
      as={"p"}
      translate={{ token: "v2.pages.applications.table.error" }}
      classNames={{ base: "py-6 text-greyscale-50 text-center" }}
    />
  );
}

export function ApplicationsTable() {
  const { T } = useIntl();
  const isLg = useClientMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const { query, applications, hasApplications, columns, rows, applyIssueDrawerState, handleOpenDrawer } =
    useApplicationsTable();
  const { isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;

  function renderMobileContent() {
    if (isError) {
      return <Error />;
    }

    if (!hasApplications) {
      return (
        <EmptyState
          illustrationSrc={IMAGES.global.categories}
          title={{ token: "v2.pages.applications.table.empty.title" }}
          description={{ token: "v2.pages.applications.table.empty.description" }}
        />
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {applications?.map(application => {
          const contribution = mapIssueToContribution({
            ...application.issue,
            author: { ...application.issue.author, isRegistered: false },
            repository: { ...application.issue.repo, owner: "" },
            createdAt: application.receivedAt,
            project: {
              ...application.project,
              // Unused, just to make Typescript happy ❤️
              shortDescription: "",
              visibility: "PRIVATE",
              languages: [],
            },
          });

          return (
            <ContributionCard
              key={`${contribution.id}-${contribution.githubTitle}`}
              contribution={contribution}
              className={"bg-card-background-light"}
              action={
                <Button
                  variant={"secondary-light"}
                  size={"m"}
                  onClick={() => handleOpenDrawer({ issueId: application.issue.id, applicationId: application.id })}
                >
                  <Translate token={"v2.pages.applications.table.rows.seeApplication"} />
                </Button>
              }
              shouldOpenContributionPanel={false}
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
        label={T("v2.pages.applications.table.title")}
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
          title: { token: "v2.pages.applications.table.empty.title" },
          description: { token: "v2.pages.applications.table.empty.description" },
        }}
      />
    );
  }

  return (
    <TableContainer
      title={"v2.pages.applications.table.title"}
      description={"v2.pages.applications.table.description"}
      icon={<div className={"h-5 w-5 rounded-full border-2 border-dashed"} />}
    >
      <div className={"p-3 lg:hidden"}>{!isLg ? renderMobileContent() : null}</div>

      <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
        {isLg ? renderDesktopContent() : null}
      </div>

      <ApplyIssueDrawer state={applyIssueDrawerState} />
    </TableContainer>
  );
}
