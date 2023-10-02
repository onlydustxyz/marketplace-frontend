import { formatPaymentId } from "./formatPaymentId";

const paymentId = "93cd4cee-482b-4a10-9a65-341b6f3b3670";

describe("formatPaymentId", () => {
  it("should return the first 5 characters of the payment id", () => {
    const formattedPaymentId = formatPaymentId(paymentId);

    expect(formattedPaymentId).toBe("#93cd4");
  });
});
