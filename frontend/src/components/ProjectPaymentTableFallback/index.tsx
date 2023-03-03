import paymentLogo from "assets/img/payment.png";
import { Link } from "react-router-dom";
import { ProjectPaymentsRoutePaths } from "src/App";
import CurrencyLine from "src/icons/CurrencyLine";
import { useT } from "talkr";
import Button, { ButtonSize, Width } from "../Button";
import Tooltip, { TooltipPosition } from "../Tooltip";

interface ProjectPaymentTableFallbackProps {
  disabled?: boolean;
}

const ProjectPaymentTableFallback = ({ disabled = false }: ProjectPaymentTableFallbackProps) => {
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
      {disabled ? (
        <>
          <div id="disabled-new-payment-button">
            <Button size={ButtonSize.Lg} disabled>
              <CurrencyLine />
              <span>{T("project.details.tableFallback.newPayment")}</span>
            </Button>
          </div>
          <Tooltip anchorId="disabled-new-payment-button" position={TooltipPosition.Bottom}>
            <div className="w-fit">{T("project.details.tableFallback.disabledButtonTooltip")}</div>
          </Tooltip>
        </>
      ) : (
        <Link to={ProjectPaymentsRoutePaths.New}>
          <Button width={Width.Full} size={ButtonSize.Lg}>
            <CurrencyLine />
            <span>{T("project.details.tableFallback.newPayment")}</span>
          </Button>
        </Link>
      )}
    </div>
  );
};

export default ProjectPaymentTableFallback;
