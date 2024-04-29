import { useNavigationState } from "providers/navigation-state/navigation-state";
import { useContext, useEffect } from "react";

import { Modal } from "src/components/New/Modal";

import { useIntl } from "hooks/translate/use-translate";

import { EditContext } from "../../EditContext";

export const ConfirmationModal = () => {
  const { form, formHelpers, githubWorklow } = useContext(EditContext);
  const { T } = useIntl();

  const { block } = useNavigationState();
  const [, setBlockState] = block.state;
  const [showConfirmation] = block.confirmation;

  useEffect(() => {
    const shouldBlock = !githubWorklow.inGithubWorkflow && !!form?.formState.isDirty;
    setBlockState(shouldBlock);
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
      isOpen={showConfirmation}
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
