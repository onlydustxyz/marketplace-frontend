import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { HeaderCell } from "src/components/Contribution/ContributionTable";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import User3Line from "src/icons/User3Line";
import { ContributionStatus, Contribution as ContributionT, GithubContributionType } from "src/types";
import { TableColumns } from "./index";
import Contributor from "src/components/Contributor";

export function useContributionTable() {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: T("contributions.table.date"),
    },
    {
      sort: TableColumns.Repo,
      icon: <GitRepositoryLine />,
      label: T("contributions.table.repo"),
    },
    {
      sort: TableColumns.Contributor,
      icon: <User3Line />,
      label: T("contributions.table.contributor"),
    },
    {
      sort: TableColumns.Contribution,
      icon: <StackLine />,
      label: T("contributions.table.contribution"),
      width: HeaderCellWidth.Third,
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: T("contributions.table.linkedTo"),
      className: "justify-end",
    },
  ];

  const bodyRow = (contribution?: ContributionT) => {
    if (!contribution) return null;

    const { createdAt, completedAt, githubStatus, id, repo, status, type } = contribution;
    const lineId = `project-contribution-${id}`;
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
        <Cell height={CellHeight.Compact}>{repo.name}</Cell>
        <Cell height={CellHeight.Compact}>
          {"contributor" in contribution ? <Contributor contributor={contribution.contributor} clickable /> : null}
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} />
        </Cell>
        <Cell className="justify-end gap-1" height={CellHeight.Compact}>
          {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
