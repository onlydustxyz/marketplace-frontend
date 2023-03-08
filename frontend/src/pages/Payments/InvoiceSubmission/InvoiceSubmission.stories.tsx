import InvoiceSubmission from ".";

export default {
  title: "InvoiceSubmission",
  component: InvoiceSubmission,
};

export const Default = {
  render: () => (
    <div style={{ width: 320 }}>
      <InvoiceSubmission pendingPaymentRequestsCount={3} />
    </div>
  ),
};
