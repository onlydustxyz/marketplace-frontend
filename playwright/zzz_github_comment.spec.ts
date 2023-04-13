import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { ProjectPaymentsPage } from "./pages/project/payments";

test.describe("As DustyBot, I", () => {
  test("can comment and close an issue", async ({ page, projects, users, signIn, context }) => {
    const recipient = users.Anthony;
    const project = projects.ProjectA;

    await signIn(users.TokioRs);

    const paymentsPage = new ProjectPaymentsPage(page, project);
    paymentsPage.goto();

    const payment = paymentsPage.paymentList().nth(1);
    await payment.click();

    const sidePanel = paymentsPage.sidePanel();
    const otherWorkIssueLink = sidePanel
      .locator("div")
      .filter({ hasText: ` · Documentation by ${recipient.github.login}` })
      .last();
    await expect(otherWorkIssueLink).toBeVisible();
    await otherWorkIssueLink.click();

    const pagePromise = context.waitForEvent("page");
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
    await expect(newPage.getByText("has been processed and payment is complete")).toBeVisible();
    await expect(newPage.getByText("closed this as completed")).toBeVisible();

    await sidePanel.getByRole("button").click();
  });
});
