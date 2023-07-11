import { Page, expect, Locator } from "@playwright/test";
import { Project, User } from "../../types";
import { sortBy } from "lodash";
import { sleep } from "../../commands/common";

export class ProjectPaymentsPage {
  readonly page: Page;
  readonly project: Project;
  readonly url: string;

  constructor(page: Page, project: Project) {
    this.page = page;
    this.project = project;
    this.url = `/p/${project.key}/payments`;
  }

  goto = () => this.page.goto(this.url);
  reload = () => this.page.reload();

  remainingBudget = () => this.page.locator("#remainingBudget").textContent();

  paymentList = () => new PaymentTable(this.page.locator("#payment_table"));

  newPayment = async () => {
    await this.page.getByText("New payment").click();
    await expect(this.page).toHaveURL(`${this.url}/new`);
    return new NewPaymentPage(this.page);
  };

  sidePanel = () => this.page.getByRole("dialog");

  cancelCurrentPayment = async () => {
    await this.sidePanel().getByTestId("cancel-payment-button").click();
    await this.sidePanel().getByText("Confirm").click();
  };
}

export class NewPaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  requestPayment = async ({
    recipient,
    pullRequestIndexes = [],
    otherPullRequests = [],
    issuesIndexes = [],
    otherIssues = [],
    otherWorks = [],
  }: {
    recipient?: User;
    pullRequestIndexes?: number[];
    otherPullRequests?: string[];
    issuesIndexes?: number[];
    otherIssues?: string[];
    otherWorks?: {
      kind?: "documentation" | "meeting" | "subscription" | "other";
      title?: string;
      description: string;
      repository?: string;
    }[];
  }) => {
    // Set recipient
    if (recipient) {
      await this.page.getByText("Search by Github handle").click();
      await this.page.getByTestId("contributor-selection-input").fill(recipient.github.login);
      await this.page.getByRole("option", { name: recipient.github.login }).first().click();
    }

    // Add work items
    await this.addWorkItemButton().click();

    // Add PRs
    if (pullRequestIndexes.length + otherPullRequests.length > 0) {
      await this.pullRequestsTab().click();

      // Select PR in list
      const eligiblePulls = this.page.getByTestId("eligible-pulls").getByRole("button");
      for (const index of pullRequestIndexes.sort().reverse()) {
        await eligiblePulls.nth(index * 2).click();
      }

      // Add other PR
      if (otherPullRequests.length > 0) {
        await this.page.locator("[data-testid=add-other-pullRequests-toggle]").click();

        for (const pr of otherPullRequests) {
          await this.page.locator("#otherPullRequestLink").fill(pr);
          await this.page.getByTestId("add-other-pullRequests-btn").click();
          await expect(this.page.getByText(`#${pr.split("/").at(-1)}`)).toBeVisible();
        }
      }
    }

    // Add issues
    if (issuesIndexes.length + otherIssues.length > 0) {
      await this.issuesTab().click();

      // Select issues in list
      const eligibleIssues = this.page.getByTestId("eligible-issues").getByRole("button");
      for (const index of sortBy(issuesIndexes).reverse()) {
        await eligibleIssues.nth(index * 2).click();
      }

      // Add other issues
      if (otherIssues.length > 0) {
        await this.page.locator("[data-testid=add-other-issues-toggle]").click();

        for (const issue of otherIssues) {
          await this.page.locator("#otherIssueLink").fill(issue);
          await this.page.getByTestId("add-other-issues-btn").click();
          await expect(this.page.getByText(`#${issue.split("/").at(-1)}`)).toBeVisible();
        }
      }
    }

    // Add other work
    if (otherWorks.length > 0) {
      await this.otherWorkTab().click();

      for (const otherWork of otherWorks) {
        const addedWorkItemsCount = await this.page.locator("[data-testid=added-work-items] > div").count();

        otherWork.kind && (await this.page.getByRole("option", { name: otherWork.kind }).click());
        otherWork.title && (await this.page.getByTestId("other-work-title").fill(otherWork.title));
        await this.page.getByTestId("other-work-description").fill(otherWork.description);
        if (otherWork.repository) {
          await this.page.getByTestId("select-repo-button").click();
          await this.page.getByTestId("select-repo-options").locator("div", { hasText: otherWork.repository }).click();
        }
        await this.page.getByRole("button", { name: "create and add issue" }).click();

        await expect(this.page.locator("[data-testid=added-work-items] > div")).toHaveCount(addedWorkItemsCount + 1);
        await sleep(1000);
      }
    }

    // Close panel and submit payment request
    await this.closeWorkItemsPanelButton().click();
    await this.page.getByText("Confirm payment").click();
  };

  contributorText = () => this.page.getByTestId("contributor-selection-value").textContent();

  addWorkItemButton = () => this.page.getByTestId("add-work-item-btn");
  closeWorkItemsPanelButton = () => this.page.getByTestId("close-add-work-item-panel-btn");

  pullRequestsTab = () => this.page.getByTestId("tab-pull-requests");
  issuesTab = () => this.page.getByTestId("tab-issues");
  otherWorkTab = () => this.page.getByTestId("tab-other-work");

  workItem = (text: string) => this.page.locator("[data-testid='eligible-issues'] > div", { hasText: text });
  addWorkItem = (text: string) => this.workItem(text).locator("button").first().click();
  ignoreWorkItem = (text: string) => this.workItem(text).locator("button").nth(1).click();
  showIgnoredToggle = () => this.page.getByRole("switch").nth(2);
}

export class PaymentTable {
  readonly table: Locator;

  constructor(table: Locator) {
    this.table = table;
  }

  nth = (index: number) => new PaymentLine(this.table.getByRole("row").nth(index));
}

export class PaymentLine {
  readonly row: Locator;

  constructor(row: Locator) {
    this.row = row;
  }

  paymentId = () => this.row.getAttribute("data-payment-id");
  status = () => this.row.getByRole("cell").nth(3).locator("div").nth(1).textContent();
  click = () => this.row.click();
}
