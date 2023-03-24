import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { ProjectPage } from "./pages/project";
import { User } from "./types";
import { mutateAsAdmin } from "./commands/common";
import {
  AddEthPaymentReceiptDocument,
  AddEthPaymentReceiptMutation,
  AddEthPaymentReceiptMutationVariables,
  EthereumIdentityType,
} from "./__generated/graphql";

test.describe("As a project lead, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test.only("can request a payment", async ({ page, projects, users, signIn }) => {
    const recipient = users.Anthony;

    const projectPage = new ProjectPage(page, projects.ProjectA);
    await signIn(users.TokioRs);
    await projectPage.goto();

    // TODO Expectations on overview page
    // expect(await paymentsPage.remainingBudget()).toBe("$50,000");

    const contributorsPage = await projectPage.contributors();
    const contributors = contributorsPage.contributorsTable();

    // TODO Expectations on contributors page

    const newPaymentPage = await (await contributors).byName(recipient.github.login).pay();
    await expect(newPaymentPage.contributor()).toHaveValue(recipient.github.login);

    await newPaymentPage.requestPayment({
      pullRequestIndexes: [0],
      otherIssues: ["https://github.com/od-mocks/cool-repo-A/pull/1", "https://github.com/od-mocks/cool-repo-A/pull/2"],
    });

    const paymentsPage = await projectPage.payments(); // TODO cache should be updated automatically

    const payment = paymentsPage.paymentList().nth(1);
    await payment.click();

    const sidePanel = paymentsPage.sidePanel();

    expect(sidePanel.getByText(`Payment #${(await payment.paymentId())?.substring(0, 5).toUpperCase()}`)).toBeVisible();
    // TODO expect amount
    await expect(sidePanel.getByText("from tokio-rs (you)")).toBeVisible();
    await expect(sidePanel.getByText("to AnthonyBuisset")).toBeVisible();
    await expect(sidePanel.getByText("Created a few seconds ago")).toBeVisible();
    await expect(sidePanel.getByText("Created a few seconds ago")).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#4 · Create a-new-file.txt" }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#2 · Another update README.md" }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#1 · Update README.md" }).first()).toBeVisible();

    await sidePanel.getByRole("button").click();

    expect(await paymentsPage.remainingBudget()).toBe("$85,600");
  });

  test("can see payments made by other project leads on the same project", async ({
    page,
    projects,
    users,
    signIn,
  }) => {
    const project = projects.Kakarot;
    const leader = users.TokioRs;
    const otherLeader = users.Olivier;
    const recipient = users.Anthony;

    const projectPaymentsPage = await new ProjectPage(page, project).payments();

    const listPaymentsAs = async (user: User) => {
      await signIn(user);
      await projectPaymentsPage.goto();
    };

    await listPaymentsAs(leader);

    // 1. Request a payment, payment is "pending"
    const newPaymentPage = await projectPaymentsPage.newPayment();
    await newPaymentPage.requestPayment({
      recipient,
      otherIssues: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
    });

    const paymentRow = projectPaymentsPage.paymentList().nth(1);

    await listPaymentsAs(otherLeader);
    expect(await paymentRow.status()).toBe("Pending");

    // 2. Edit profile info, payment is "processing"
    // TODO fillPayoutSettings(recipient);

    await listPaymentsAs(otherLeader);
    // TODO expect(await projectPaymentsPage.paymentList().nth(1).status()).toBe("Processing");

    // 3. Add receipt, payment is "complete"
    await mutateAsAdmin<AddEthPaymentReceiptMutation, AddEthPaymentReceiptMutationVariables>({
      mutation: AddEthPaymentReceiptDocument,
      variables: {
        projectId: project.id,
        paymentId: await paymentRow.paymentId(),
        amount: "1000",
        currencyCode: "USDC",
        recipientIdentity: {
          type: EthereumIdentityType.EthereumName,
          optEthName: "vitalik.eth",
          optEthAddress: null,
        },
        transactionHash: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
      },
    });

    await listPaymentsAs(otherLeader);
    expect(await projectPaymentsPage.paymentList().nth(1).status()).toBe("Complete");
  });
});
