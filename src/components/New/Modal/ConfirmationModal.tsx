import { FC } from "react";
import Button, { ButtonSize, ButtonType, Width } from "src/components/Button";
import Card from "src/components/Card";

export interface ConfirmationModalProps {
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ title, message, onClose, onConfirm }) => {
  return (
    <Card
      padded={false}
      fullWidth={false}
      withBg={false}
      className="w-56 divide-y divide-greyscale-50/12 bg-greyscale-900"
    >
      <div className="flex flex-col items-center gap-2.5 p-4 text-center">
        <h6 className="font-belwe text-base text-greyscale-50">{title}</h6>
        <p className="text-sm font-normal text-greyscale-200">{message}</p>
      </div>
      <div className="flex gap-2 p-4">
        <Button type={ButtonType.Secondary} size={ButtonSize.Xs} width={Width.Full} onClick={onClose}>
          Go back
        </Button>
        <Button
          size={ButtonSize.Xs}
          width={Width.Full}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      </div>
    </Card>
  );
};
