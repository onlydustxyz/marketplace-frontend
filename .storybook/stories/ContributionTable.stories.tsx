import { ComponentProps } from "react";
import { OrderBy, UserIdentityDocument } from "src/__generated/graphql";
import ProgressCircle from "src/assets/icons/ProgressCircle";
import { ContributionTable, TableColumns } from "src/components/Contribution/ContributionTable";
import { GithubContributionStatus } from "src/types";
import { withRouter } from "storybook-addon-react-router-v6";
import withAuthProvider from "../decorators/withAuthProvider";
import withContributorProfilePanelProvider from "../decorators/withContributorProfilePanelProvider";
import withMockedProvider from "../decorators/withMockedProvider";
import { contributionTable } from "../mocks/contributionTable";

const USER_ID = "e2ee731a-2697-4306-bf4b-c807f6fda0d7";

const mocks = [
  {
    request: {
      query: UserIdentityDocument,
      variables: { userId: USER_ID },
    },
    result: {
      data: {
        userPayoutInfo: [
          {
            userId: USER_ID,
            lastname: "Bar",
            firstname: "Foo",
          },
        ],
      },
    },
  },
];

export default {
  title: "ContributionTable",
  component: ContributionTable,
  decorators: [
    withRouter(),
    withMockedProvider(mocks),
    withAuthProvider({ userId: USER_ID }),
    withContributorProfilePanelProvider,
  ],
};

const defaultProps: ComponentProps<typeof ContributionTable> = {
  id: "in_progress_contributions_table",
  title: "In progress",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, rerum aliquam. Placeat, quisquam neque quaerat mollitia magnam asperiores quam porro dignissimos, laboriosam minima nulla consequuntur omnis. Officia deserunt dicta excepturi!",
  icon: className => <ProgressCircle className={className} />,
  onHeaderClick: () => {
    alert("Header clicked!");
  },
  data: contributionTable,
  loading: false,
  error: undefined,
  status: GithubContributionStatus.InProgress,
  sort: {
    column: TableColumns.Date,
    direction: OrderBy.Desc,
    orderBy: { createdAt: OrderBy.Desc },
  },
  onSort: sort => {
    alert("Sorting");
  },
};

export const Default = {
  render: (args: typeof ContributionTable) => <ContributionTable {...defaultProps} {...args} />,
};

export const Loading = {
  render: (args: typeof ContributionTable) => <ContributionTable {...defaultProps} {...args} loading={true} />,
};
