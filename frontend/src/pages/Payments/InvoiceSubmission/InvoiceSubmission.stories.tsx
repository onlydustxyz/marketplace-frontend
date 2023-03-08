import InvoiceSubmission from ".";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
};

export const Default = {
  render: () => (
    <div style={{ width: 320 }}>
      <InvoiceSubmission paymentRequestsIds={["payment-1", "payment-2", "payment-3"]} githubUserId={123456} />
    </div>
  ),
};
