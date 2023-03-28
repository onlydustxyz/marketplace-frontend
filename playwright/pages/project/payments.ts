import { Page, expect, Locator } from "@playwright/test";
import { Project, User } from "../../types";

export class ProjectPaymentsPage {
  readonly page: Page;
  readonly project: Project;
  readonly url: string;

  constructor(page: Page, project: Project) {
    this.page = page;
    this.project = project;
    this.url = `/projects/${project.id}/payments`;
  }

  goto = () => this.page.goto(this.url);

  remainingBudget = () => this.page.locator("#remainingBudget").textContent();

  paymentList = () => new PaymentTable(this.page.locator("#payment_table"));

  newPayment = async () => {
    await this.page.getByText("New payment").click();
    await expect(this.page).toHaveURL(`${this.url}/new`);
    return new NewPaymentPage(this.page);
  };

  sidePanel = () => this.page.getByRole("dialog");
}

export class NewPaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  requestPayment = async ({
    recipient,
    otherIssues,
    pullRequestIndexes = [],
  }: {
    recipient?: User;
    pullRequestIndexes?: number[];
    otherIssues?: string[];
  }) => {
    if (recipient) {
      await this.page.getByRole("button", { name: "Search by Github handle" }).click();
      await this.page.getByTestId("contributor-selection-input").fill(recipient.github.login);
      await this.page.getByRole("listitem").first().click();
    }

    await this.page.getByTestId("add-work-item-btn").click();

    const elligiblePulls = this.page.getByTestId("elligible-pulls").locator("div");
    await Promise.all(
      pullRequestIndexes
        .sort()
        .reverse()
        .map(i => elligiblePulls.nth(i).getByRole("button").click())
    );

    if (otherIssues) {
      await this.page.locator("[data-testid=add-other-pr-toggle]").click();

      for (const issue of otherIssues) {
        await this.page.locator("#otherPrLink").fill(issue);
        await this.page.getByTestId("add-other-pr-btn").click();
        await expect(this.page.getByText(`#${issue.split("/").at(-1)}`)).toBeVisible();
      }
    }

    await this.page.getByTestId("close-add-work-item-panel-btn").click();
    await this.page.getByText("Confirm payment").click();
  };

  contributorText = () => this.page.getByTestId("contributor-selection-value").textContent();
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

  paymentId = () => this.row.getAttribute("data-paymentId");
  status = () => this.row.getByRole("cell").nth(3).locator("div").nth(1).textContent();
  click = () => this.row.click();
}
