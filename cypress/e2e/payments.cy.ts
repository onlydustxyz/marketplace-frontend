import { Project } from "../support/commands/populate/projects";
import { User } from "../support/commands/populate/users";
import { PaymentRequest } from "../support/commands/populate/payments";

describe("As a contributor, I", () => {
  let user: User;
  let project: Project;
  let paymentRequest: PaymentRequest;

  beforeEach(function () {
    project = this.projects["Project A"];
    user = this.users["Oscar"];
    paymentRequest = this.paymentRequests["Project A"][21149076][0];
  });

  it("can see the list of my payments", function () {
    cy.visitApp({ path: "payments", token: user.token });

    cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(3)").should("have.text", "$200");
      cy.get("td:nth-child(4)").should(
        "have.text",
        "Payout info missing" + "Fill in your payment information to get paid"
      );
    });

    cy.fillPayoutSettings(user.token);

    cy.contains("Payments").click();

    cy.get("#payment_table tbody tr:nth-child(1)").within(() => {
      cy.get("td:nth-child(3)").should("have.text", "$200");
      cy.get("td:nth-child(4)").should(
        "have.text",
        "Processing" + "Payment is being processed by our team. Typically 3 to 5 days to receive payment"
      );
    });

    cy.addEthPaymentReceipt(
      project.id,
      paymentRequest.id,
      paymentRequest.amount.toString(),
      "USDC",
      { type: "ETHEREUM_ADDRESS", optEthAddress: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" },
      "0x5b48f0c340e70e63c011ca41495ff423b9a4fe6975c58df0f066d80fe4d2dcca"
    );
  });
});
