import paymentLogo from "assets/img/payment.png";
import CurrencyLine from "src/icons/CurrencyLine";
import { useT } from "talkr";
import Button, { ButtonSize, Width } from "../Button";

interface ProjectPaymentTableFallbackProps {
  onClick: () => void;
}

export default function ProjectPaymentTableFallback({ onClick }: ProjectPaymentTableFallbackProps) {
  const { T } = useT();
  return (
    <div className="flex flex-col items-center gap-8 w-full p-2">
      <div className="w-36">
        <img src={paymentLogo} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-2xl font-belwe text-greyscale-50 leading-8">
          {T("project.details.tableFallback.noPayments")}
        </span>
        <span className="text-base font-walsheim text-greyscale-50 leading-6">
          {T("project.details.tableFallback.send")}
        </span>
      </div>
      <div onClick={onClick}>
        <Button width={Width.Full} size={ButtonSize.Large}>
          <CurrencyLine />
          <span>{T("project.details.tableFallback.newPayment")}</span>
        </Button>
      </div>
    </div>
  );
}
