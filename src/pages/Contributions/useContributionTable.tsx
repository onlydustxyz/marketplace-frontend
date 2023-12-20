import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { HeaderCell, TableColumns } from "src/components/Contribution/ContributionTable";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT, GithubContributionType } from "src/types";

export function useContributionTable() {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: T("contributions.table.date"),
    },
    {
      sort: TableColumns.Project,
      icon: <Folder3Line />,
      label: T("contributions.table.projectRepo"),
      props: { width: HeaderCellWidth.Quarter },
    },
    {
      sort: TableColumns.Contribution,
      icon: <StackLine />,
      label: T("contributions.table.contribution"),
      props: { width: HeaderCellWidth.Half },
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: T("contributions.table.linkedTo"),
      props: { className: "justify-end" },
    },
  ];

  const bodyRow = (contribution?: ContributionT) => {
    if (!contribution) return null;

    const { createdAt, completedAt, githubStatus, id, repo, status, type } = contribution;
    const lineId = `${id}-${contribution.project.id}`;
    const lineDate = status === ContributionStatus.InProgress ? createdAt : completedAt;

    return (
      <Line key={lineId} className="border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <ContributionDate
            id={lineId}
            type={type as GithubContributionType}
            status={githubStatus}
            contributionStatus={status}
            date={new Date(lineDate ?? "")}
            tooltipProps={{ variant: TooltipVariant.Default, position: TooltipPosition.Bottom }}
          />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <ContributionProjectRepo project={contribution.project} repo={repo} />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} />
        </Cell>
        <Cell className="justify-end gap-1" height={CellHeight.Compact}>
          {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} showExternal /> : "-"}
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
