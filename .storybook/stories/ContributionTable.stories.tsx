import { ComponentProps } from "react";
import { OrderBy } from "src/__generated/graphql";
import MeApi from "src/api/me";
import IssueOpen from "src/assets/icons/IssueOpen";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { Contribution } from "src/components/Contribution/Contribution";
import { ContributionDate } from "src/components/Contribution/ContributionDate";
import { ContributionLinked } from "src/components/Contribution/ContributionLinked";
import { ContributionProjectRepo } from "src/components/Contribution/ContributionProjectRepo";
import { ContributionTable, TableColumns } from "src/components/Contribution/ContributionTable";
import Cell, { CellHeight } from "src/components/Table/Cell";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Line from "src/components/Table/Line";
import { TooltipPosition, Variant as TooltipVariant } from "src/components/Tooltip";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
import { ContributionStatus, Contribution as ContributionT, GithubContributionType } from "src/types";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withImpersonationClaimsProvider from "../decorators/withImpersonationClaimsProvider";
import withQueryClientProvider from "../decorators/withQueryClientProvider";
import withTokenSetProvider from "../decorators/withTokenSetProvider";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

export default {
  title: "ContributionTable",
  component: ContributionTable,
  decorators: [
    withRouter(),
    withAuthProvider({ userId: USER_ID }),
    withTokenSetProvider,
    withImpersonationClaimsProvider,
    withQueryClientProvider,
  ],
};

const defaultProps: ComponentProps<typeof ContributionTable> = {
  id: "in_progress_contributions_table",
  title: "In progress",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum aliquam. Placeat, quisquam neque quaerat mollitia magnam asperiores quam porro dignissimos, laboriosam minima nulla consequuntur omnis. Officia deserunt dicta excepturi!",
  icon: className => <ProgressCircle className={className} />,
  sort: {
    sort: TableColumns.Date,
    direction: OrderBy.Desc,
  },
  onSort: sort => {
    alert("Sorting");
  },
  headerCells: [
    {
      sort: TableColumns.Date,
      icon: <TimeLine />,
      label: "Date",
    },
    {
      sort: TableColumns.Project,
      icon: <Folder3Line />,
      label: "Project/Repo",
      width: HeaderCellWidth.Quarter,
    },
    {
      sort: TableColumns.Contribution,
      icon: <StackLine />,
      label: "Contribution",
      width: HeaderCellWidth.Half,
    },
    {
      sort: TableColumns.Linked,
      icon: (
        <span>
          <IssueOpen className="h-3 w-3" />
        </span>
      ),
      label: "Linked to",
      className: "justify-end",
    },
  ],
  bodyRow: (contribution?: ContributionT) => {
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
          {ContributionLinked({ contribution }) ? <ContributionLinked contribution={contribution} /> : "-"}
        </Cell>
      </Line>
    );
  },
  query: MeApi.queries.useMyContributions({
    queryParams: {
      statuses: ContributionStatus.InProgress,
      // ...sort.IN_PROGRESS,
      // ...filterQueryParams,
    },
  }),
};

export const Default = {
  render: (args: typeof ContributionTable) => <ContributionTable {...defaultProps} {...args} />,
};
