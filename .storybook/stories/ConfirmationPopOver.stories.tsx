import { ConfirmationPopOver } from "src/components/New/Popover/ConfirmationPopover";

export default {
  title: "ConfirmationModal",
  component: ConfirmationPopOver,
};

export const Default = {
  render: () => (
    <ConfirmationPopOver
      onClose={() => null}
      title="title"
      description="description"
      confirm={{
        label: "confirm",
        onClick: () => null,
      }}
      cancel={{
        label: "cancel",
        onClick: () => null,
      }}
    >
      <button>open</button>
    </ConfirmationPopOver>
  ),
};
