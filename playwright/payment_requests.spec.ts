import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { ProjectPage } from "./pages/project";
import { User } from "./types";
import { mutateAsAdmin, retry } from "./commands/common";
import {
  AddEthPaymentReceiptDocument,
  AddEthPaymentReceiptMutation,
  AddEthPaymentReceiptMutationVariables,
  EthereumIdentityType,
} from "./__generated/graphql";
import { ProjectPaymentsPage } from "./pages/project/payments";
import { EditPayoutInfoPage } from "./pages/edit_payout_info_page";
import { populateReceipt } from "./commands/populate/populate_payments";

test.describe("As a project lead, I", () => {
  test.beforeEach(async () => {
    restoreDB();
    test.slow();
  });

  test("can request a payment", async ({
    page,
    projects,
    users,
    repos,
    signIn,
    context,
    request,
    acceptTermsAndConditions,
  }) => {
    const recipient = users.Anthony;
    const project = projects.ProjectA;

    await signIn(users.TokioRs);
    await acceptTermsAndConditions();
    const projectPage = await new ProjectPage(page, project).goto();
    const overviewPage = await projectPage.overview();

    expect(await overviewPage.description()).toBe(project.longDescription);
    await Promise.all(
      project.repos?.map(async repo => expect(overviewPage.repository(repos[repo].id)).toBeVisible()) || []
    );

    await Promise.all(
      project.leaders?.map(async leader =>
        expect(await overviewPage.projectLeads()).toContain(users[leader].github.login)
      ) || []
    );
    await Promise.all(
      project.sponsors?.map(async sponsor => expect(await overviewPage.sponsors()).toContain(sponsor)) || []
    );

    expect(await overviewPage.contributorsCount()).toBe(3);
    expect(await overviewPage.grantedAmount()).toBe("$13.4k / $100k — $86.6k left to spend");

    const contributorsPage = await projectPage.contributors();
    const contributors = await contributorsPage.contributorsTable();

    expect(await contributors.byName("AnthonyBuisset").totalEarned()).toBe("-");
    expect(await contributors.byName("AnthonyBuisset").paidContributions()).toBe("-");
    expect(await contributors.byName("AnthonyBuisset").leftToPay()).toContain("2");

    expect(await contributors.byName("oscarwroche").totalEarned()).toBe("$200");
    expect(await contributors.byName("oscarwroche").paidContributions()).toBe("1");
    expect(await contributors.byName("oscarwroche").leftToPay()).toContain("1");

    expect(await contributors.byName("ofux").totalEarned()).toBe("$13,200");
    expect(await contributors.byName("ofux").paidContributions()).toBe("2");
    expect(await contributors.byName("ofux").leftToPay()).toBe("-");

    const newPaymentPage = await contributors.byName(recipient.github.login).pay();
    expect(await newPaymentPage.contributorText()).toEqual(recipient.github.login);

    // Play with ignored items
    {
      const issueNumber = "#15";
      // ignore/unignore
      await newPaymentPage.addWorkItemButton().click();
      await newPaymentPage.issuesTab().click();
      await expect(newPaymentPage.showIgnoredToggle()).not.toBeVisible();
      await expect(newPaymentPage.workItem(issueNumber)).toBeVisible();
      await newPaymentPage.ignoreWorkItem(issueNumber);
      await expect(newPaymentPage.workItem(issueNumber)).not.toBeVisible();
      await newPaymentPage.showIgnoredToggle().click();
      await expect(newPaymentPage.workItem(issueNumber)).toBeVisible();
      await newPaymentPage.ignoreWorkItem(issueNumber); // unignore
      await expect(newPaymentPage.showIgnoredToggle()).not.toBeVisible();
      await expect(newPaymentPage.workItem(issueNumber)).toBeVisible();

      // ignore/add/auto-unignore
      await newPaymentPage.ignoreWorkItem(issueNumber);

      await Promise.all([
        page.waitForResponse(async resp => (await resp.json()).data.unignoreIssue && resp.status() === 200),
        newPaymentPage.addWorkItem(issueNumber),
      ]);

      await newPaymentPage.closeWorkItemsPanelButton().click();
      await page
        .locator("[data-testid='added-work-items'] > div", { hasText: issueNumber })
        .getByRole("button")
        .click(); // remove from payment request
      await newPaymentPage.addWorkItemButton().click();
      await expect(newPaymentPage.showIgnoredToggle()).not.toBeVisible();
      await expect(newPaymentPage.workItem(issueNumber)).toBeVisible();
      await newPaymentPage.closeWorkItemsPanelButton().click();
    }

    await newPaymentPage.requestPayment({
      otherPullRequests: [
        "https://github.com/od-mocks/cool-repo-A/pull/1",
        "https://github.com/od-mocks/cool-repo-A/pull/2",
      ],
      issuesIndexes: [0, 1, 2, 3],
      otherIssues: ["https://github.com/onlydustxyz/marketplace/issues/79"],
      otherWorks: [
        {
          kind: "subscription",
          title: "Monthly contracting subscription",
          description: "Paid monthly 100$",
          repository: repos[project.repos?.at(1) || ""].name,
        },
        {
          description: "Real cool documentation",
          repository: repos[project.repos?.at(1) || ""].name, // TODO: Put back to 0 when E-495 is fixed
        },
      ],
    });

    const paymentsPage = new ProjectPaymentsPage(page, project);

    const remainingBudget = await retry(
      () => paymentsPage.remainingBudget(),
      remainingBudget => remainingBudget === "$85,600",
      100
    );
    expect(remainingBudget).toBe("$85,600");

    const payment = paymentsPage.paymentList().nth(1);
    await payment.click();

    const sidePanel = paymentsPage.sidePanel();

    expect(sidePanel.getByText(`Payment #${(await payment.paymentId())?.substring(0, 5).toUpperCase()}`)).toBeVisible();
    await expect(sidePanel.getByText("$1,000")).toBeVisible();
    await expect(sidePanel.getByText("from")).toBeVisible();
    await expect(sidePanel.locator("div", { hasText: "#4 · Create a-new-file.txt" }).first()).toBeVisible(); // auto added
    await expect(sidePanel.locator("div", { hasText: "#2 · Another update README.md" }).first()).toBeVisible();
    await expect(sidePanel.locator("div", { hasText: "#1 · Update README.md" }).first()).toBeVisible();
    await expect(sidePanel.locator("div", { hasText: "#79 · " }).first()).toBeVisible();
    await expect(sidePanel.locator("div", { hasText: " · Monthly contracting subscription" }).first()).toBeVisible();
    const otherWorkIssueLink = sidePanel.getByText(" · Documentation by").first();
    await expect(otherWorkIssueLink).toBeVisible();
    await otherWorkIssueLink.click();

    const githubIssuePage = await context.waitForEvent("page");
    await githubIssuePage.waitForLoadState();
    const githubIssueUrl = githubIssuePage.url();

    const paymentId = await payment.paymentId();
    await populateReceipt(paymentId || "not found", project, {
      currencyCode: "USDC",
      recipientETHIdentity: {
        type: EthereumIdentityType.EthereumName,
        optEthAddress: null,
        optEthName: "vitalik.eth",
      },
      transactionHashOrReference: "0xb9db5477fc9c50bfbf2253c55d03724ebee12db8dacda22cc1add1605a5a6cba",
      amount: 100,
    });

    const githubApiIssueUrl = githubIssueUrl.replace("github.com", "api.github.com/repos");

    const issue = await retry(
      () =>
        request
          .get(githubApiIssueUrl, { headers: { Authorization: `Bearer ${process.env.GITHUB_PAT}` } })
          .then(res => res.json()),
      issue => issue.state !== "open"
    );
    expect(issue.state).toBe("closed");

    await page.reload();

    await payment.click();
    expect(sidePanel.getByTestId("cancel-payment-button")).not.toBeVisible();

    await sidePanel.getByTestId("close-add-work-item-panel-btn").click();
  });

  test("can cancel a pending payment request", async ({ page, projects, users, signIn, acceptTermsAndConditions }) => {
    const project = projects.Kakarot;
    const leader = users.TokioRs;
    const recipient = users.Anthony;

    const projectPaymentsPage = new ProjectPaymentsPage(page, project);

    await signIn(leader);
    await acceptTermsAndConditions();
    await projectPaymentsPage.goto();
    await projectPaymentsPage.reload();

    const newPaymentPage = await projectPaymentsPage.newPayment();
    await newPaymentPage.requestPayment({
      recipient,
      otherPullRequests: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
    });

    const payment = projectPaymentsPage.paymentList().nth(1);
    const paymentId = (await payment.paymentId()) || "";
    await payment.click();
    await projectPaymentsPage.cancelCurrentPayment();
    expect(page.locator("div", { hasText: paymentId })).not.toBeVisible();
  });

  test("can see payments made by other project leads on the same project", async ({
    page,
    projects,
    users,
    signIn,
    acceptTermsAndConditions,
  }) => {
    const project = projects.Kakarot;
    const leader = users.TokioRs;
    const otherLeader = users.Olivier;
    const recipient = users.Anthony;

    const projectPaymentsPage = new ProjectPaymentsPage(page, project);

    const listPaymentsAs = async (user: User, shouldAcceptTermsAndConditions?: boolean) => {
      await signIn(user);
      if (shouldAcceptTermsAndConditions) {
        await acceptTermsAndConditions();
      }
      await projectPaymentsPage.goto();
      await projectPaymentsPage.reload();
    };

    await listPaymentsAs(leader, true);

    // 1. Request a payment, payment is "pending"
    const newPaymentPage = await projectPaymentsPage.newPayment();
    await newPaymentPage.requestPayment({
      recipient,
      otherPullRequests: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
    });

    const paymentRow = projectPaymentsPage.paymentList().nth(1);
    const pendingStatus = await retry(
      async () => {
        await listPaymentsAs(otherLeader, true);
        return paymentRow.status();
      },
      value => value === "Pending"
    );
    expect(pendingStatus).toBe("Pending");

    // 2. Edit payout info, payment is "processing"
    const editPayoutInfoPage = new EditPayoutInfoPage(page);
    await signIn(recipient);
    await acceptTermsAndConditions();
    await editPayoutInfoPage.goto();
    recipient.payoutInfo && (await editPayoutInfoPage.fillForm(recipient.payoutInfo));
    await editPayoutInfoPage.submitForm();

    const processingStatus = await retry(
      async () => {
        await listPaymentsAs(otherLeader);
        return projectPaymentsPage.paymentList().nth(1).status();
      },
      value => value === "Processing"
    );
    expect(processingStatus).toBe("Processing");

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

    const completeStatus = await retry(
      async () => {
        await page.reload();
        await listPaymentsAs(otherLeader);
        return projectPaymentsPage.paymentList().nth(1).status();
      },
      value => value === "Complete"
    );
    expect(completeStatus).toBe("Complete");
  });
});
