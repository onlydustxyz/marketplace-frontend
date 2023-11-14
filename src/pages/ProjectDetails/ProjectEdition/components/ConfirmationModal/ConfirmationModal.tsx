import { useContext } from "react";
import { Modal } from "src/components/New/Modal";
import { useIntl } from "src/hooks/useIntl";
import { EditContext } from "../../EditContext";
import { useNavigationBlocker } from "src/hooks/useNavigationBlocker/useNavigationBlocker";
export const ConfirmationModal = () => {
  const { form } = useContext(EditContext);
  const { T } = useIntl();
  //   const [shouldUnBlock, setShouldUnBlock] = useState(false);
  //   const [shouldUnBlock, setShouldUnBlock] = useState(false);
  //   useNavigationBlocker({ shouldBlockNavigation: true });
  //   const [showModal] = useNavigationBlocker({
  //     shouldBlockNavigation: !shouldUnBlock && !!form?.formState.isDirty,
  //     shouldUnBlock: () => shouldUnBlock,
  //   });
  const [isBlock, unBlock] = useNavigationBlocker({
    shouldBlockNavigation: true,
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
