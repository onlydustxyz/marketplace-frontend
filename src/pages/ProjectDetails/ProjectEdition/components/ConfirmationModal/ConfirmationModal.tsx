import { useContext } from "react";
import { Modal } from "src/components/New/Modal";
import { useIntl } from "src/hooks/useIntl";
import { EditContext } from "../../EditContext";
import { useNavigationBlocker } from "src/hooks/useNavigationBlocker/useNavigationBlocker";
export const ConfirmationModal = () => {
  const { form } = useContext(EditContext);
  const { T } = useIntl();
  const [isBlock, unBlock] = useNavigationBlocker({
    shouldBlockNavigation: !!form?.formState.isDirty,
  });
  //   const [showModal] = useNavigationBlocker({
  //     shouldBlockNavigation: true,
  //     shouldUnBlock: () => false,
  //   });

  //   return null;
  return (
    <Modal
      isOpen={isBlock}
      title={T("project.details.edit.confirmationModal.title")}
      description={T("project.details.edit.confirmationModal.content")}
      confirm={{
        text: T("project.details.edit.confirmationModal.save"),
        onClick: () => {
          //   alert("Confirmed");
          unBlock("confirm");
        },
      }}
      cancel={{
        text: T("project.details.edit.confirmationModal.discard"),
        onClick: () => {
          //   alert("Cancelled");
          unBlock("confirm");
        },
      }}
      onClose={() => {
        // alert("Closing");
        unBlock("cancel");
      }}
    />
  );
};
