import EmptyState from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/EmptyState/index";
import { WorkItemType } from "src/types";

export default {
  title: "EmptyState",
  component: EmptyState,
};

export const Default = {
  render: () => <EmptyState type={WorkItemType.Issue} />,
};
