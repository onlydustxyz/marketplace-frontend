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
import { ProjectPaymentsPage } from "./pages/project/payments";
import { EditProfilePage } from "./pages/edit_profile_page";
import { populateReceipt } from "./commands/populate/populate_payments";

test.describe("As a project lead, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can request a payment", async ({ page, projects, users, repos, signIn, context, request }) => {
    test.slow();
    const recipient = users.Anthony;
    const project = projects.ProjectA;

    await signIn(users.TokioRs);
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
    expect(await overviewPage.grantedAmount()).toBe("$13.4K / $100K");

    const contributorsPage = await projectPage.contributors();
    const contributors = await contributorsPage.contributorsTable();

    expect(await contributors.byName("AnthonyBuisset").totalEarned()).toBe("-");
    expect(await contributors.byName("AnthonyBuisset").paidContributions()).toBe("-");
    expect(await contributors.byName("AnthonyBuisset").leftToPay()).toContain("1");

    expect(await contributors.byName("oscarwroche").totalEarned()).toBe("$200");
    expect(await contributors.byName("oscarwroche").paidContributions()).toBe("1");
    expect(await contributors.byName("oscarwroche").leftToPay()).toContain("1");

    expect(await contributors.byName("ofux").totalEarned()).toBe("$13,200");
    expect(await contributors.byName("ofux").paidContributions()).toBe("7");
    expect(await contributors.byName("ofux").leftToPay()).toBe("-");

    const newPaymentPage = await contributors.byName(recipient.github.login).pay();
    expect(await newPaymentPage.contributorText()).toEqual(recipient.github.login);

    await newPaymentPage.requestPayment({
      otherPullRequests: [
        "https://github.com/od-mocks/cool-repo-A/pull/1",
        "https://github.com/od-mocks/cool-repo-A/pull/2",
      ],
      issuesIndexes: [18, 19, 20, 21],
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
          repository: repos[project.repos?.at(0) || ""].name,
        },
      ],
    });

    const paymentsPage = new ProjectPaymentsPage(page, project);
    expect(await paymentsPage.remainingBudget()).toBe("$85,600");

    const payment = paymentsPage.paymentList().nth(1);
    await payment.click();

    const sidePanel = paymentsPage.sidePanel();

    expect(sidePanel.getByText(`Payment #${(await payment.paymentId())?.substring(0, 5).toUpperCase()}`)).toBeVisible();
    await expect(sidePanel.getByText("$1,000")).toBeVisible();
    await expect(sidePanel.getByText("from tokio-rs (you)")).toBeVisible();
    await expect(sidePanel.getByText("to AnthonyBuisset")).toBeVisible();
    await expect(sidePanel.getByText("Created a few seconds ago")).toBeVisible();
    await expect(sidePanel.getByText("Created a few seconds ago")).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#4 · Create a-new-file.txt" }).first()).toBeVisible(); // auto added
    await expect(sidePanel.locator("div").filter({ hasText: "#2 · Another update README.md" }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#1 · Update README.md" }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#6 · This is a new issue" }).first()).toBeVisible();
    await expect(
      sidePanel.locator("div").filter({ hasText: "#7 · This one has been cancelled" }).first()
    ).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#8 · Yet another issue..." }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#9 · Completed, at last !" }).first()).toBeVisible();
    await expect(sidePanel.locator("div").filter({ hasText: "#79 · " }).first()).toBeVisible();
    await expect(
      sidePanel.locator("div").filter({ hasText: " · Monthly contracting subscription" }).first()
    ).toBeVisible();
    const otherWorkIssueLink = sidePanel
      .locator("div")
      .filter({ hasText: ` · Documentation by ${recipient.github.login}` })
      .last();
    await expect(otherWorkIssueLink).toBeVisible();
    await otherWorkIssueLink.click();

    const githubIssuePage = await context.waitForEvent("page");
    await githubIssuePage.waitForLoadState();
    await expect(githubIssuePage.getByText("to AnthonyBuisset")).toBeVisible();
    await expect(githubIssuePage.getByText("10 items included")).toBeVisible();
    await expect(githubIssuePage.getByText("$1,000 for 2 days of work")).toBeVisible();

    const paymentId = await payment.paymentId();
    if (paymentId) {
      await populateReceipt(paymentId, project, {
        currencyCode: "USDC",
        recipientETHIdentity: {
          type: EthereumIdentityType.EthereumName,
          optEthAddress: null,
          optEthName: "vitalik.eth",
        },
        transactionHashOrReference: "0xb9db5477fc9c50bfbf2253c55d03724ebee12db8dacda22cc1add1605a5a6cba",
        amount: 100,
      });
    }

    const githubIssueUrl = githubIssuePage.url();
    const githubApiIssueUrl = githubIssueUrl.replace("github.com", "api.github.com/repos");

    const githubApiIssue = await request.get(githubApiIssueUrl);

    expect(await githubApiIssue.json()).toMatchObject({
      state: "closed",
    });

    const githubApiIssueCommentsUrl = githubApiIssueUrl.concat("/comments");
    const githubApiIssueComments = await request.get(githubApiIssueCommentsUrl);

    expect(await githubApiIssueComments.json()).toContainEqual(
      expect.objectContaining({
        body: expect.stringContaining("has been processed and payment is complete."),
      })
    );

    await sidePanel.getByRole("button").click();
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

    const projectPaymentsPage = new ProjectPaymentsPage(page, project);

    const listPaymentsAs = async (user: User) => {
      await signIn(user);
      await projectPaymentsPage.goto();
      await projectPaymentsPage.reload();
    };

    await listPaymentsAs(leader);

    // 1. Request a payment, payment is "pending"
    const newPaymentPage = await projectPaymentsPage.newPayment();
    await newPaymentPage.requestPayment({
      recipient,
      otherPullRequests: ["https://github.com/od-mocks/cool-repo-A/pull/1"],
    });

    const paymentRow = projectPaymentsPage.paymentList().nth(1);

    await listPaymentsAs(otherLeader);
    expect(await paymentRow.status()).toBe("Pending");

    // 2. Edit profile info, payment is "processing"
    const editProfilePage = new EditProfilePage(page);
    await signIn(recipient);
    await editProfilePage.goto();
    recipient.profile && (await editProfilePage.fillForm(recipient.profile));
    await editProfilePage.submitForm();

    await listPaymentsAs(otherLeader);
    expect(await projectPaymentsPage.paymentList().nth(1).status()).toBe("Processing");

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
