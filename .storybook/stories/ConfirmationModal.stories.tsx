import ConfirmationModal from "src/components/UserRewardTable/RewardSidePanel/ConfirmationModal";

export default {
  title: "ConfirmationModal",
  component: ConfirmationModal,
};

export const Default = {
  render: () => (
    <ConfirmationModal
      onClose={() => {
        return;
      }}
      onConfirm={() => {
        return;
      }}
    />
  ),
};
