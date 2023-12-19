import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import Table from "src/components/Table";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell from "src/components/Table/HeaderCell";
import EmptyTablePlaceholder from "./commons/EmptyTablePlaceholder/EmptyTablePlaceholder";
import { useStrugglingContributorsTable } from "./hooks/useStrugglingContributorsTable";
import ProjectApi from "src/api/Project";
import CollapsibleCard from "src/components/New/Cards/CollapsibleCard";
import QuestionLine from "src/icons/QuestionLine";

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

  if (isLoading) {
    return <div>skeleton</div>;
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
