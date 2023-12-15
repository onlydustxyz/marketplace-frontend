import { PropsWithChildren } from "react";
import ProjectApi from "src/api/Project";
import { ShowMore } from "src/components/Table/ShowMore";
import { useIntl } from "src/hooks/useIntl";
import { useMostActiveContributorsTable } from "./useMostActiveContributorsTable";
import Table from "src/components/Table";
import HeaderLine from "src/components/Table/HeaderLine";
import HeaderCell from "src/components/Table/HeaderCell";

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

export default function ChurnedContributors({
  query,
}: {
  query: ReturnType<typeof ProjectApi.queries.useProjectContributorsMostActivesInfiniteList>;
}) {
  const { T } = useIntl();
  const { headerCells, bodyRow } = useMostActiveContributorsTable();
  const nbColumns = headerCells.length;
  const { data, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage } = query;
  const mostActive = data?.pages?.flatMap(data => data.contributors);
  const hasContributors = Boolean(mostActive?.length);

  function renderDesktopContent() {
    if (isError) {
      return <TableText colSpan={nbColumns}>{T("contributions.table.error")}</TableText>;
    }

    if (!hasContributors) {
      return <TableText colSpan={nbColumns}>{T("contributions.table.empty")}</TableText>;
    }

    return mostActive?.map(bodyRow);
  }

  if (isLoading) {
    return <div>skeleton</div>;
  }

  return (
    <>
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
    </>
  );
}
