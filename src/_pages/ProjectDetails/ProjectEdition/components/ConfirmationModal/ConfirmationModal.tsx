import { useContext } from "react";
import { Modal } from "src/components/New/Modal";
import { useIntl } from "src/hooks/useIntl";
import { EditContext } from "../../EditContext";
import { useNavigationBlocker } from "src/hooks/useNavigationBlocker/useNavigationBlocker";

export const ConfirmationModal = () => {
  const { form, formHelpers, githubWorklow } = useContext(EditContext);
  const { T } = useIntl();
  const [isBlock, unBlock] = useNavigationBlocker({
    shouldBlockNavigation: !githubWorklow.inGithubWorkflow && !!form?.formState.isDirty,
  });

  const onSaveBeforeLeave = () => {
    unBlock("confirm");
    formHelpers.triggerSubmit();
  };

  const onDiscardBeforeLeave = () => {
    unBlock("confirm");
    formHelpers.resetBeforLeave();
  };

  const onCancel = () => {
    unBlock("cancel");
  };

  return (
    <Modal
      isOpen={isBlock}
      title={T("project.details.edit.confirmationModal.title")}
      description={T("project.details.edit.confirmationModal.content")}
      confirm={{
        text: T("project.details.edit.confirmationModal.save"),
        onClick: onSaveBeforeLeave,
      }}
      cancel={{
        text: T("project.details.edit.confirmationModal.discard"),
        onClick: onDiscardBeforeLeave,
      }}
      onClose={onCancel}
    />
  );
};
