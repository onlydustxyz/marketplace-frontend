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
    <Card padded={false} fullWidth={false} className="w-60 divide-solid divide-y divide-greyscale-50/8">
      <div className="p-4 flex flex-col items-center text-center gap-2">
        <div className="font-belwe font-normal text-greyscale-50 text-base">
          {T("payment.table.detailsPanel.cancelPayment.modal.title")}
        </div>
        <div className="font-walsheim font-normal text-spaceBlue-200 text-sm">
          {T("payment.table.detailsPanel.cancelPayment.modal.description")}
        </div>
      </div>
      <div className="p-3 flex flex-row items-stretch gap-2">
        <Button type={ButtonType.Secondary} size={ButtonSize.Xs} width={Width.Full} onClick={onClose}>
          {T("payment.table.detailsPanel.cancelPayment.modal.cancelButton")}
        </Button>
        <Button
          size={ButtonSize.Xs}
          width={Width.Full}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {T("payment.table.detailsPanel.cancelPayment.modal.confirmButton")}
        </Button>
      </div>
    </Card>
  );
}
