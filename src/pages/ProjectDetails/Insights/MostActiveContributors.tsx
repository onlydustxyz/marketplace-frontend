import ProjectApi from "src/api/Project";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import { useMostActiveContributorsTable } from "./hooks/useMostActiveContributorsTable";
import Table from "src/components/Table";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell from "src/components/Table/HeaderCell";
import EmptyTablePlaceholder from "./commons/EmptyTablePlaceholder/EmptyTablePlaceholder";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import Sparkling2Line from "src/icons/Sparkling2Line";

export default function MostActiveContributors({ projectId }: { projectId: string | undefined }) {
  const { T } = useIntl();
  const { headerCells, bodyRow } = useMostActiveContributorsTable();
  const nbColumns = headerCells.length;
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributorsMostActivesInfiniteList({
      params: { projectId: projectId ?? "" },
    });
  const mostActiveContributors = data?.pages?.flatMap(data => data.contributors);
  const hasContributors = Boolean(mostActiveContributors?.length);

  function renderDesktopContent() {
    if (isError) {
      return <EmptyTablePlaceholder colSpan={nbColumns}>{T("contributions.table.error")}</EmptyTablePlaceholder>;
    }

    if (!hasContributors) {
      return <EmptyTablePlaceholder colSpan={nbColumns}>{T("contributions.table.empty")}</EmptyTablePlaceholder>;
    }

    return mostActiveContributors?.map(bodyRow);
  }

  if (isLoading) {
    return <div>skeleton</div>;
  }

  return (
    <CollapsibleCard
      title={T("project.details.insights.mostActives.sectionTitle")}
      description={T("project.details.insights.mostActives.sectionSubtitle")}
      icon={<Sparkling2Line />}
      isEmpty={!hasContributors}
      hasShowMore={hasNextPage}
    >
      <div className="">
        <Table
          id="most-active-contributors"
          theadClassName="border-card-border-medium"
          headers={
            <HeaderLine>
              {headerCells.map(cell => (
                <HeaderCell key={cell.label} width={cell.width} className={cell.className} horizontalMargin>
                  {cell.icon}
                  <span>{cell.label}</span>
                </HeaderCell>
              ))}
            </HeaderLine>
          }
        >
          {renderDesktopContent()}
        </Table>
      </div>
      {hasNextPage ? (
        <div className="py-3">
          <ShowMore onClick={fetchNextPage} loading={isFetchingNextPage} isInfinite={false} />
        </div>
      ) : null}
    </CollapsibleCard>
  );
}
