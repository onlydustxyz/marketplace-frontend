import EmptyState from "src/pages/ProjectDetails/Rewards/RewardForm/WorkItemSidePanel/EmptyState/index";

const indexedAtMock = "2023-10-06T09:00:00.00000";

export default {
  title: "EmptyState",
  component: EmptyState,
};

export const Default = {
  render: () => <EmptyState indexedAt={indexedAtMock} />,
};
