import IssueOpen from "src/assets/icons/IssueOpen";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { HeaderCell, TableColumns } from "src/components/Contribution/ContributionTable";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import GitRepositoryLine from "src/icons/GitRepositoryLine";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import User3Line from "src/icons/User3Line";
import { Contribution as ContributionT, GithubContributionType } from "src/types";

import { Link } from "components/ds/link/link";
import { Contributor } from "components/features/contributor/contributor";

import { useIntl } from "hooks/translate/use-translate";

export function useContributionTable() {
  const { T } = useIntl();

  const headerCells: HeaderCell[] = [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: T("contributions.table.date"),
      props: { thClassName: "w-[140px]" },
    },
    {
      sort: TableColumns.Repo,
      icon: <GitRepositoryLine />,
      label: T("contributions.table.repo"),
      props: { width: HeaderCellWidth.Sixth },
    },
    {
      sort: TableColumns.Contributor,
      icon: <User3Line />,
      label: T("contributions.table.contributor"),
      props: { width: HeaderCellWidth.Sixth },
    },
    {
      sort: TableColumns.Contribution,
      icon: <StackLine />,
      label: T("contributions.table.contribution"),
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: T("contributions.table.linkedTo"),
      props: {
        className: "justify-end",
        thClassName: "w-[130px]",
      },
    },
  ];

  const bodyRow = (contribution?: ContributionT) => {
    if (!contribution) return null;

    const { githubStatus, id, repo, status, type, lastUpdatedAt } = contribution;
    const lineId = `project-contribution-${id}`;

    return (
      <Line key={lineId} className="border-card-border-light">
        <Cell height={CellHeight.Compact}>
          <ContributionDate
            id={lineId}
            type={type as GithubContributionType}
            status={githubStatus}
            contributionStatus={status}
            date={new Date(lastUpdatedAt ?? "")}
            tooltipProps={{ variant: TooltipVariant.Default, position: TooltipPosition.Bottom }}
          />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Link href={repo.htmlUrl}>{repo.name}</Link>
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contributor
            githubUserId={contribution.contributor.githubUserId}
            login={contribution.contributor.login}
            avatarUrl={contribution.contributor.avatarUrl}
            isRegistered={contribution.contributor.isRegistered}
            clickable
          />
        </Cell>
        <Cell height={CellHeight.Compact}>
          <Contribution contribution={contribution} />
        </Cell>
        <Cell className="justify-end gap-1" height={CellHeight.Compact}>
          {ContributionLinked({ contribution }) ? (
            <ContributionLinked contribution={contribution} maxLinked={1} />
          ) : (
            "-"
          )}
        </Cell>
      </Line>
    );
  };

  return { headerCells, bodyRow };
}
