import { SliderButton } from "@typeform/embed-react";
import Button, { Width } from "src/components/Button";
import Card from "src/components/Card";
import { useIntl } from "src/hooks/useIntl";
import Attachment2 from "src/icons/Attachment2";

type Props = {
  githubUserId: number;
  paymentRequestsIds: string[];
};

export default function InvoiceSubmission({ githubUserId, paymentRequestsIds }: Props) {
  const { T } = useIntl();

  return (
    <Card padded={false} className="py-5 px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1 font-walsheim text-white">
          <span className="text-lg font-medium">{T("invoiceSubmission.title")}</span>
          <span className="text-sm font-normal">
            {T("invoiceSubmission.text", { count: paymentRequestsIds.length })}
          </span>
        </div>
        <SliderButton
          id="Eg67bRev"
          iframeProps={{ title: T("invoiceSubmission.sidePanel.title") }}
          opacity={100}
          position="right"
          autoClose={true}
          medium="snippet"
          hidden={{
            githubID: githubUserId.toString(),
            requestIDs: paymentRequestsIds.join(","),
          }}
          transitiveSearchParams={true}
        >
          <Button width={Width.Full}>
            <Attachment2 className="text-xl" />
            {T("invoiceSubmission.submitButton")}
          </Button>
        </SliderButton>
      </div>
    </Card>
  );
}
