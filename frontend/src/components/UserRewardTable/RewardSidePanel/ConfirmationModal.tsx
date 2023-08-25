import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";

type Props = {
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({ onClose, onConfirm }: Props) {
  const { T } = useIntl();

  return (
    <Card padded={false} fullWidth={false} withBg={false} className="w-60 divide-y divide-solid divide-greyscale-50/8">
      <div className="flex flex-col items-center gap-2 p-4 text-center">
        <div className="font-belwe text-base font-normal text-greyscale-50">
          {T("reward.table.detailsPanel.cancelReward.modal.title")}
        </div>
        <div className="font-walsheim text-sm font-normal text-spaceBlue-200">
          {T("reward.table.detailsPanel.cancelReward.modal.description")}
        </div>
      </div>
      <div className="flex flex-row items-stretch gap-2 p-3">
        <Button type={ButtonType.Secondary} size={ButtonSize.Xs} width={Width.Full} onClick={onClose}>
          {T("reward.table.detailsPanel.cancelReward.modal.cancelButton")}
        </Button>
        <Button
          size={ButtonSize.Xs}
          width={Width.Full}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {T("reward.table.detailsPanel.cancelReward.modal.confirmButton")}
        </Button>
      </div>
    </Card>
  );
}
