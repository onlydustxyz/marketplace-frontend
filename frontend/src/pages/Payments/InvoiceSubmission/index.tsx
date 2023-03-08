import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";

type Props = {
  pendingPaymentRequestsCount: number;
};

export default function InvoiceSubmission({ pendingPaymentRequestsCount }: Props) {
  const { T } = useIntl();

  return (
    <Card>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-walsheim text-white">
          <span className="text-lg font-medium">{T("invoiceSubmission.title")}</span>
          <span className="text-sm font-normal">
            {T("invoiceSubmission.text", { count: pendingPaymentRequestsCount })}
          </span>
        </div>
        <Button width={Width.Full}>
          <Attachment2 className="text-xl" />
          {T("invoiceSubmission.submitButton")}
        </Button>
      </div>
    </Card>
  );
}
