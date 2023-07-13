import { Locator, Page } from "@playwright/test";

export class RewardsPage {
  readonly page: Page;
  readonly rewards: Locator;
  readonly sidePanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rewards = page.getByTestId("payment-line");
    this.sidePanel = page.getByRole("dialog");
  }
}
