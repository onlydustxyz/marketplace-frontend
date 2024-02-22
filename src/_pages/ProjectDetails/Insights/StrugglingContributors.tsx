import ProjectApi from "src/api/Project";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import Skeleton from "src/components/Skeleton";
import Table from "src/components/Table";
import HeaderCell from "src/components/Table/HeaderCell";
import HeaderLine from "src/components/Table/HeaderLine";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import QuestionLine from "src/icons/QuestionLine";

import EmptyTablePlaceholder from "components/layout/placeholders/empty-table/empty-table-placeholder";

import { useStrugglingContributorsTable } from "./hooks/useStrugglingContributorsTable";

export default function StrugglingContributors({ projectId }: { projectId: string | undefined }) {
  const { T } = useIntl();
  const { headerCells, bodyRow } = useStrugglingContributorsTable();
  const nbColumns = headerCells.length;
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } =
    ProjectApi.queries.useProjectContributionsStaledInfiniteList({
      params: { projectId: projectId ?? "" },
    });
  const staledContributions = data?.pages?.flatMap(data => data.contributions);
  const hasContributions = Boolean(staledContributions?.length);

  function renderDesktopContent() {
    if (isLoading) {
      return (
        <tr>
          <td>
            <Skeleton variant="projectInsightTableContent" />
          </td>
        </tr>
      );
    }

    if (isError) {
      return (
        <EmptyTablePlaceholder colSpan={nbColumns}>
          {T("project.details.insights.errorPlaceholder")}
        </EmptyTablePlaceholder>
      );
    }

    if (!hasContributions) {
      return (
        <EmptyTablePlaceholder colSpan={nbColumns}>
          {T("project.details.insights.emptyPlaceholder")}
        </EmptyTablePlaceholder>
      );
    }

    return staledContributions?.map(bodyRow);
  }

  return (
    <CollapsibleCard
      title={T("project.details.insights.staled.sectionTitle")}
      description={T("project.details.insights.staled.sectionSubtitle")}
      icon={<QuestionLine />}
      isEmpty={!hasContributions}
      hasShowMore={hasNextPage}
    >
      <div className="">
        <Table
          id="struggling-contributors"
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
