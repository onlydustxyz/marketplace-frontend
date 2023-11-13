import { useBeforeUnload } from "react-use";
import { Modal } from "src/components/New/Modal";
import { useIntl } from "src/hooks/useIntl";

export const ConfirmationModal = () => {
  const { T } = useIntl();
  const test = useBeforeUnload(true, "coucou");
  return (
    <Modal
      isOpen={true}
      title={T("project.details.edit.confirmationModal.title")}
      description={T("project.details.edit.confirmationModal.content")}
      confirm={{
        text: T("project.details.edit.confirmationModal.save"),
        onClick: () => {
          alert("Confirmed");
        },
      }}
      cancel={{
        text: T("project.details.edit.confirmationModal.discard"),
        onClick: () => {
          alert("Cancelled");
        },
      }}
      onClose={() => {
        alert("Closing");
      }}
    />
  );
};
