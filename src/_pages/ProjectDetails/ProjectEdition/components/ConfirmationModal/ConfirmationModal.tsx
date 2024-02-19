import { useNavigationState } from "providers/navigation-state/navigation-state";
import { useContext, useEffect } from "react";

import { Modal } from "src/components/New/Modal";
import { useIntl } from "src/hooks/useIntl";

import { EditContext } from "../../EditContext";

export const ConfirmationModal = () => {
  const { form, formHelpers, githubWorklow } = useContext(EditContext);
  const { T } = useIntl();

  const { block } = useNavigationState();

  useEffect(() => {
    const shouldBlock = !githubWorklow.inGithubWorkflow && !!form?.formState.isDirty;
    if (shouldBlock) {
      block.state.set();
    } else {
      block.state.unSet();
    }
  }, [form?.formState.isDirty, githubWorklow.inGithubWorkflow]);
  const onSaveBeforeLeave = () => {
    block.confirm();
    formHelpers.triggerSubmit();
  };

  const onDiscardBeforeLeave = () => {
    block.confirm();
    formHelpers.resetBeforLeave();
  };

  const onCancel = () => {
    block.cancel();
  };

  return (
    <Modal
      isOpen={block.confirmation.show}
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
