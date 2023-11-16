import { Modal } from "src/components/New/Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Default = {
  render: () => (
    <Modal
      isOpen={true}
      title="You have unsaved changes"
      description="If you leave this page, any whanges you have made will be lost."
      confirm={{
        text: "Confirm",
        onClick: () => {
          alert("Confirmed");
        },
      }}
      cancel={{
        text: "Cancel",
        onClick: () => {
          alert("Cancelled");
        },
      }}
      onClose={() => {
        alert("Closing");
      }}
    />
  ),
};
