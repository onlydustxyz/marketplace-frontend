import { ReactNode } from "react";

import { components } from "src/__generated/api";
import IssueOpen from "src/assets/icons/IssueOpen";
import Contributor from "src/components/Contributor";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import User3Line from "src/icons/User3Line";

import { useIntl } from "hooks/translate/use-translate";

import ActivityGraph from "../commons/ActivityGraph/ActivityGraph";

type HeaderCell = {
  icon: ReactNode;
  label: string;
  width?: HeaderCellWidth;
  className?: string;
};

export function useMostActiveContributorsTable() {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      icon: <User3Line />,
      label: T("project.details.insights.mostActives.table.contributor"),
      width: HeaderCellWidth.Fifth,
    },
    {
      icon: <StackLine />,
      label: T("project.details.insights.mostActives.table.closedPrs"),
    },
    {
      icon: <TimeLine />,
      label: T("project.details.insights.mostActives.table.completedIssues"),
    },
    {
      icon: <GitRepositoryLine />,
      label: T("project.details.insights.mostActives.table.codeReviews"),
    },
    {
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: T("project.details.insights.mostActives.table.activity"),
      width: HeaderCellWidth.Fifth,
      className: "justify-end",
    },
  ];

  const bodyRow = (contributor?: components["schemas"]["ProjectContributorActivityPageItemResponse"]) => {
    if (!contributor) return null;

    const {
      completedPullRequestCount,
      completedIssueCount,
      completedCodeReviewCount,
      login,
      contributionCountPerWeeks,
    } = contributor;

    return (
      <Line key={login} className="group border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <Contributor contributor={contributor} clickable />
        </Cell>
        <Cell height={CellHeight.Compact}>{completedPullRequestCount}</Cell>
        <Cell height={CellHeight.Compact}>{completedIssueCount}</Cell>

        <Cell height={CellHeight.Compact}>{completedCodeReviewCount}</Cell>
        <Cell height={CellHeight.Compact} className="justify-end">
          <ActivityGraph data={contributionCountPerWeeks ?? []} />
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
