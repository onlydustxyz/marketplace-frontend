import { ReactNode } from "react";

import { components } from "src/__generated/api";
import Button, { ButtonSize, ButtonType } from "src/components/Button";
import { Contribution } from "src/components/Contribution/Contribution";
import Contributor from "src/components/Contributor";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { useIntl } from "src/hooks/useIntl";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import SendPlane2Line from "src/icons/SendPlane2Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import User3Line from "src/icons/User3Line";

import { Link } from "components/ds/link/link";

import StruggleReasonBadge from "../commons/StruggleReasonBadge/StruggleReasonBadge";

type HeaderCell = {
  icon: ReactNode;
  label: string;
  width?: HeaderCellWidth;
  className?: string;
};

export function useStrugglingContributorsTable() {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      icon: <User3Line />,
      label: T("project.details.insights.staled.table.contributor"),
      width: HeaderCellWidth.Sixth,
    },
    {
      icon: <GitRepositoryLine />,
      label: T("project.details.insights.staled.table.repository"),
      width: HeaderCellWidth.Sixth,
    },
    {
      icon: <StackLine />,
      label: T("project.details.insights.staled.table.strugglingOn"),
      width: HeaderCellWidth.Third,
    },
    {
      icon: <TimeLine />,
      label: T("project.details.insights.staled.table.reason"),
      width: HeaderCellWidth.Fifth,
    },
    {
      icon: <div />,
      label: "",
      width: HeaderCellWidth.Sixth,
    },
  ];

  const bodyRow = (contribution?: components["schemas"]["ContributionPageItemResponse"]) => {
    if (!contribution) return null;

    const { id, contributor, repo, githubStatus, createdAt } = contribution;

    return (
      <Line key={id} className="group border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <Contributor contributor={contributor} clickable />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Link href={repo?.htmlUrl}>{repo?.name}</Link>
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} />
        </Cell>

        <Cell height={CellHeight.Compact}>
          <StruggleReasonBadge date={createdAt} githubStatus={githubStatus} />
        </Cell>
        <Cell height={CellHeight.Compact} className="invisible flex justify-end group-hover:visible">
          <Button
            type={ButtonType.Secondary}
            size={ButtonSize.Sm}
            onClick={() => console.log("Help")}
            data-testid="help-contributor-button"
          >
            <SendPlane2Line />
            {T("project.details.insights.staled.table.buttonLabel")}
          </Button>
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
