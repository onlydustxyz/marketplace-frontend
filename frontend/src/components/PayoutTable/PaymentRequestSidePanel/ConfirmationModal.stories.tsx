import ConfirmationModal from "./ConfirmationModal";

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
