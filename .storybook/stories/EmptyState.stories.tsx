import { WorkItemType } from "src/__generated/graphql";
import EmptyState from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/EmptyState/index";

export default {
  title: "EmptyState",
  component: EmptyState,
};

export const Default = {
  render: () => <EmptyState type={WorkItemType.Issue} />,
};
