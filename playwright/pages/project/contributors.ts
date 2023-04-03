import { Page, Locator } from "@playwright/test";
import { NewPaymentPage } from "./payments";

export class ProjectContributorsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  contributorsTable = async () => new ContributorsTable(this, this.page.locator("#contributors_table"));
}

export class ContributorsTable {
  readonly table: Locator;
  readonly page: ProjectContributorsPage;

  constructor(page: ProjectContributorsPage, table: Locator) {
    this.page = page;
    this.table = table;
  }

  nth = (index: number) => new ContributorLine(this.page, this.table.getByRole("row").nth(index));
  byName = (name: string) => new ContributorLine(this.page, this.table.getByRole("row").filter({ hasText: name }));
}

export class ContributorLine {
  readonly row: Locator;
  readonly page: ProjectContributorsPage;

  constructor(page: ProjectContributorsPage, row: Locator) {
    this.page = page;
    this.row = row;
  }

  totalEarned = () => this.row.getByRole("cell").nth(1).textContent();
  paidContributions = () => this.row.getByRole("cell").nth(2).textContent();
  leftToPay = () => this.row.getByRole("cell").nth(3).textContent();

  pay = async () => {
    await this.row.hover();
    await this.row.getByRole("button").click();
    return new NewPaymentPage(this.page.page);
  };
}
