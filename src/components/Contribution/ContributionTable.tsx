import { PropsWithChildren, ReactNode, useState } from "react";
import { OrderBy } from "src/__generated/graphql";
import ProjectApi from "src/api/Project";
import MeApi from "src/api/me";
import { ContributionCard } from "src/components/Contribution/ContributionCard";
import Table from "src/components/Table";
import HeaderCell, { HeaderCellWidth } from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { viewportConfig } from "src/config";
import { useIntl } from "src/hooks/useIntl";
import ArrowDownSLine from "src/icons/ArrowDownSLine";
import SortingArrow from "src/pages/ProjectDetails/Contributors/ContributorsTable/SortingArrow";
import { Contribution as ContributionT } from "src/types";
import { cn } from "src/utils/cn";
import { useMediaQuery } from "usehooks-ts";
import { ShowMore } from "../Table/ShowMore";
import { ContributionTableSkeleton } from "./ContributionTableSkeleton";

function Message({ children }: PropsWithChildren) {
  return <p className="whitespace-pre-line text-center font-walsheim text-sm text-greyscale-50">{children}</p>;
}

function TableText({ children, colSpan }: PropsWithChildren<{ colSpan: number }>) {
  return (
    <tr>
      <td colSpan={colSpan}>
        <div className="pt-6">
          <Message>{children}</Message>
        </div>
      </td>
    </tr>
  );
}

export enum TableColumns {
  Date = "CREATED_AT",
  Project = "PROJECT_REPO_NAME",
  Repo = "REPO_NAME",
  Contributor = "CONTRIBUTOR_LOGIN",
  Contribution = "GITHUB_NUMBER_TITLE",
  Linked = "LINKS_COUNT",
}

export type TableSort = {
  sort: TableColumns;
  direction: OrderBy.Asc | OrderBy.Desc;
};

export type HeaderCell = {
  sort: TableColumns;
  icon: ReactNode;
  label: string;
  width?: HeaderCellWidth;
  className?: string;
};

type Props = {
  bodyRow: (contribution?: ContributionT) => ReactNode;
  description: string;
  fullTable?: boolean;
  headerCells: HeaderCell[];
  icon: (className: string) => ReactNode;
  id: string;
  onSort: (sort: TableSort) => void;
  query: ReturnType<
    typeof MeApi.queries.useMyContributions | typeof ProjectApi.queries.useProjectContributionsInfiniteList
  >;
  sort: TableSort;
  title: string;
};

export function ContributionTable({
  bodyRow,
  description,
  fullTable = true,
  headerCells,
  icon,
  id,
  onSort,
  query,
  sort,
  title,
}: Props) {
  const { T } = useIntl();
  const [collapsed, setCollapsed] = useState(false);

  // Used for performance optimization, avoid rendering large invisible DOM
  const isLg = useMediaQuery(`(min-width: ${viewportConfig.breakpoints.lg}px)`);

  const nbColumns = headerCells.length;
  const sortDirection = sort.direction === OrderBy.Asc ? "up" : "down";
  const newSortDirection = sort.direction === OrderBy.Asc ? OrderBy.Desc : OrderBy.Asc;

  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;

  const contributions = data?.pages?.flatMap(data => data.contributions);
  const hasContributions = Boolean(contributions?.length);

  function renderMobileContent() {
    if (isError) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.error")}</Message>
        </div>
      );
    }

    if (!hasContributions) {
      return (
        <div className="py-6">
          <Message>{T("contributions.table.empty")}</Message>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        {contributions?.map(contribution => (
          <ContributionCard
            key={`${contribution.id}-${contribution.project.name}`}
            contribution={contribution}
            className={cn({ "bg-card-background-light": fullTable })}
          />
        ))}

        {hasNextPage ? (
          <div className="py-2">
            <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={!fullTable} />
          </div>
        ) : null}
      </div>
    );
  }

  function renderDesktopContent() {
    if (isError) {
      return <TableText colSpan={nbColumns}>{T("contributions.table.error")}</TableText>;
    }

    if (!hasContributions) {
      return <TableText colSpan={nbColumns}>{T("contributions.table.empty")}</TableText>;
    }

    return contributions?.map(bodyRow);
  }

  return isLoading ? (
    <ContributionTableSkeleton />
  ) : (
    <section
      className={cn("overflow-hidden rounded-2xl border-card-border-medium", {
        "border bg-card-background-base shadow-heavy": fullTable,
        "lg:border lg:bg-card-background-base lg:shadow-heavy": !fullTable,
      })}
    >
      {fullTable ? (
        <header
          className={cn("flex items-start justify-between gap-6 bg-card-background-light px-6 py-4 md:items-center", {
            "cursor-pointer": hasContributions,
            "border-b border-card-border-light": !collapsed && hasContributions,
          })}
          onClick={hasContributions ? () => setCollapsed(prevState => !prevState) : undefined}
        >
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-card-background-medium p-3 leading-none text-greyscale-50">
              {icon("h-5 w-5 text-xl leading-none text-base")}
            </div>
            <div className="font-walsheim">
              <p className="text-base font-medium text-greyscale-50">{title}</p>
              <p className="text-sm text-spaceBlue-200">{description}</p>
            </div>
          </div>
          {hasContributions ? (
            <span
              className={cn("flex h-6 w-6 items-center justify-center", {
                "rotate-180": !collapsed,
              })}
            >
              <ArrowDownSLine className="text-xl text-greyscale-50" />
            </span>
          ) : null}
        </header>
      ) : null}

      {
        //Show the content if we're on a specific tab or if there are contributions
        hasContributions || !fullTable ? (
          <div className={cn("p-3 lg:hidden", { hidden: collapsed })}>{!isLg ? renderMobileContent() : null}</div>
        ) : null
      }

      {
        //Show the table if we're on a specific tab or if there are contributions
        hasContributions || !fullTable ? (
          <div
            className={cn("hidden px-4 pt-6 lg:block", isLg && hasNextPage ? "pb-0" : "pb-6", {
              "lg:hidden": collapsed,
            })}
          >
            <Table
              id={id}
              theadClassName="border-card-border-medium"
              headers={
                <HeaderLine>
                  {headerCells.map(cell => (
                    <HeaderCell
                      key={cell.sort?.toString()}
                      onClick={() => {
                        onSort({
                          sort: cell.sort,
                          direction: newSortDirection,
                        });
                      }}
                      width={cell.width}
                      className={cell.className}
                      horizontalMargin
                    >
                      {cell.icon}
                      <span>{cell.label}</span>
                      {sort.sort === cell.sort ? <SortingArrow direction={sortDirection} visible /> : null}
                    </HeaderCell>
                  ))}
                </HeaderLine>
              }
            >
              {isLg ? renderDesktopContent() : null}
            </Table>
            {hasNextPage ? (
              <div className="py-3">
                <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={!fullTable} />
              </div>
            ) : null}
          </div>
        ) : null
      }
    </section>
  );
}
