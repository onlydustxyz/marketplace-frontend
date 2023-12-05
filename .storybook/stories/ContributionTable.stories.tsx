import { ComponentProps } from "react";
import { OrderBy } from "src/__generated/graphql";
import IssueOpen from "src/assets/icons/IssueOpen";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionTable } from "src/components/Contribution/ContributionTable";
import { HeaderCellWidth } from "src/components/Table/HeaderCell";
import Folder3Line from "src/icons/Folder3Line";
import StackLine from "src/icons/StackLine";
import TimeLine from "src/icons/TimeLine";
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

enum TableColumns {
  Date = "CREATED_AT",
  Project = "PROJECT_REPO_NAME",
  Id = "GITHUB_NUMBER_TITLE",
  Linked = "LINKS_COUNT",
}

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
  queryProps: [{}, {}],
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
      sort: TableColumns.Id,
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
};

export const Default = {
  render: (args: typeof ContributionTable) => <ContributionTable {...defaultProps} {...args} />,
};
