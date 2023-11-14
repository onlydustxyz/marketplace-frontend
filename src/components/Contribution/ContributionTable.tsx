import { PropsWithChildren, ReactNode, useMemo, useState } from "react";
import { OrderBy } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import Table from "src/components/Table";
import Cell, { CellHeight } from "src/components/Table/Cell";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import { ContributionStatus, GithubContributionType } from "src/types";
import { cn } from "src/utils/cn";
import { sortContributionsByLinked } from "src/utils/sortContributionsByLinked";
import { useMediaQuery } from "usehooks-ts";
import { ContributionTableSkeleton } from "./ContributionTableSkeleton";
import { UseMyContributionsResponse } from "src/api/Me/queries";
import { ShowMore } from "../Table/ShowMore";
import MeApi from "src/api/Me";

export enum TableColumns {
  Date = "CREATED_AT",
  Project = "PROJECT_REPO_NAME",
  Id = "GITHUB_NUMBER_TITLE",
  Linked = "LINKED",
}

export type TableSort = {
  sort: TableColumns;
  direction: OrderBy.Asc | OrderBy.Desc;
};

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
}

function TableText({ children }: PropsWithChildren) {
  return (
    <tr>
      <td colSpan={4}>
        <div className="pt-6">
          <Message>{children}</Message>
        </div>
      </td>
    </tr>
  );
}

export function ContributionTable({
  contributions = [],
  description,
  error,
  icon,
  id,
  loading,
  onHeaderClick,
  fullTable = true,
  title,
  sort,
  onSort,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
}: {
  contributions?: UseMyContributionsResponse["contributions"];
  description: string;
  error?: boolean;
  icon(className: string): ReactNode;
  id: string;
  loading: boolean;
  onHeaderClick: () => void;
  fullTable?: boolean;
  status: ContributionStatus;
  title: string;
  sort: TableSort;
  onSort: (sort: TableSort) => void;
  hasNextPage: ReturnType<typeof MeApi.queries.useMyContributions>["hasNextPage"];
  fetchNextPage: ReturnType<typeof MeApi.queries.useMyContributions>["fetchNextPage"];
  isFetchingNextPage: ReturnType<typeof MeApi.queries.useMyContributions>["isFetchingNextPage"];
}) {
  const { T } = useIntl();
  const [showAll, setShowAll] = useState(false);

  // Used for performance optimization, avoid rendering large invisible DOM
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const sortDirection = sort.direction === OrderBy.Asc ? "up" : "down";
  const newSortDirection = sort.direction === OrderBy.Asc ? OrderBy.Desc : OrderBy.Asc;

  const memoizedContributions = useMemo(() => {
    if (sort.sort === TableColumns.Linked) {
      // Need to clone the array because Array.sort() mutates the original
      const sortArr = contributions ? [...contributions] : [];

      return sortArr.sort((a, b) => sortContributionsByLinked([a, b], sort.direction));
    }

    return contributions;
  }, [contributions, sort]);

  function renderMobileContent() {
    if (error) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.error")}</Message>
        </div>
      );
    }

    if (memoizedContributions?.length === 0) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.empty")}</Message>
        </div>
      );
    }

    const nbContributions = memoizedContributions?.length ?? 0;
    const maxContributions = 2;
    const showAllContributions = nbContributions > maxContributions;
    const contributions = showAll ? memoizedContributions : memoizedContributions?.slice(0, maxContributions);

    return (
      <div className="flex flex-col gap-2">
        {contributions?.map(contribution => {
          return (
            <div
              key={`${contribution.id}-${contribution.project.name}`}
              className={cn("rounded-xl", {
                "bg-whiteFakeOpacity-5/95 lg:bg-none": !fullTable,
              })}
            >
              <ContributionCard contribution={contribution} />
            </div>
          );
        })}

        {showAllContributions && !showAll ? (
          <div className="px-3 py-3.5">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-greyscale-50 bg-white/5 px-4 py-3.5 font-walsheim font-medium leading-none text-greyscale-50 shadow-lg"
              onClick={() => setShowAll(true)}
            >
              <ArrowDownSLine className="text-xl leading-none" />
              {T("contributions.table.showAll", { count: nbContributions })}
            </button>
          </div>
        ) : null}
      </div>
    );
  }

  function renderDesktopContent() {
    if (error) {
      return <TableText>{T("contributions.table.error")}</TableText>;
    }

    if (memoizedContributions?.length === 0) {
      return <TableText>{T("contributions.table.empty")}</TableText>;
    }

    return memoizedContributions?.map(contribution => {
      const { createdAt, completedAt, githubStatus, id, project, repo, status, type } = contribution;
      const lineId = `${id}-${project.id}`;
      const lineDate = status === ContributionStatus.InProgress ? createdAt : completedAt;

      return (
        <Line key={lineId}>
          <Cell height={CellHeight.Compact}>
            <ContributionDate
              id={lineId}
              type={type as GithubContributionType}
              status={githubStatus}
              date={new Date(lineDate ?? "")}
              tooltipProps={{ variant: TooltipVariant.Blue, position: TooltipPosition.Bottom }}
            />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <ContributionProjectRepo project={project} repo={repo} />
          </Cell>
          <Cell height={CellHeight.Compact}>
            <Contribution contribution={contribution} />
          </Cell>
          <Cell className="justify-end gap-1" height={CellHeight.Compact}>
            {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
          </Cell>
        </Line>
      );
    });
  }

  return loading ? (
    <ContributionTableSkeleton />
  ) : (
    <section
      className={cn("overflow-hidden rounded-2xl border-greyscale-50/8", {
        "border bg-whiteFakeOpacity-5/95 shadow-2xl": fullTable,
        "lg:border lg:bg-whiteFakeOpacity-5/95 lg:shadow-2xl": !fullTable,
      })}
    >
      {fullTable ? (
        <header
          className="flex cursor-pointer items-start gap-3 border-b border-greyscale-50/8 bg-white/2 px-6 py-4"
          onClick={onHeaderClick}
        >
          <div className="rounded-lg bg-white/5 p-3 leading-none text-greyscale-50">
            {icon("h-5 w-5 text-xl leading-none text-base")}
          </div>
          <div className="font-walsheim">
            <p className="text-base font-medium text-greyscale-50">{title}</p>
            <p className="text-sm text-spaceBlue-200">{description}</p>
          </div>
        </header>
      ) : null}
      <div className="p-3 lg:hidden">{!isLg ? renderMobileContent() : null}</div>

      <div className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6")}>
        <Table
          id={id}
          headers={
            <HeaderLine>
              <HeaderCell
                horizontalMargin
                onClick={() => {
                  onSort({
                    sort: TableColumns.Date,
                    direction: newSortDirection,
                  });
                }}
              >
                <TimeLine />
                <span>{T("contributions.table.date")}</span>
                <SortingArrow direction={sortDirection} visible={sort.sort === TableColumns.Date} />
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Quarter}
                horizontalMargin
                onClick={() => {
                  onSort({
                    sort: TableColumns.Project,
                    direction: newSortDirection,
                  });
                }}
              >
                <Folder3Line />
                <span>{T("contributions.table.projectRepo")}</span>
                <SortingArrow direction={sortDirection} visible={sort.sort === TableColumns.Project} />
              </HeaderCell>
              <HeaderCell
                width={HeaderCellWidth.Half}
                horizontalMargin
                onClick={() => {
                  onSort({
                    sort: TableColumns.Id,
                    direction: newSortDirection,
                  });
                }}
              >
                <StackLine />
                <span>{T("contributions.table.contribution")}</span>
                <SortingArrow direction={sortDirection} visible={sort.sort === TableColumns.Id} />
              </HeaderCell>
              <HeaderCell
                horizontalMargin
                className="justify-end"
                onClick={() => {
                  onSort({
                    sort: TableColumns.Linked,
                    direction: newSortDirection,
                  });
                }}
              >
                <span>
                  <IssueOpen className="h-3 w-3" />
                </span>
                <span>{T("contributions.table.linkedTo")}</span>
                {sort.sort === TableColumns.Linked ? <SortingArrow direction={sortDirection} visible={true} /> : null}
              </HeaderCell>
            </HeaderLine>
          }
        >
          {isLg ? renderDesktopContent() : null}
        </Table>
        {isLg && hasNextPage ? (
          <div className="py-3">
            <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={!fullTable} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
