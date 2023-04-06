import { Locator, Page } from "@playwright/test";

export class PaymentsPage {
  readonly page: Page;
  readonly payments: Locator;
  readonly sidePanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.payments = page.getByTestId("payment-line");
    this.sidePanel = page.getByRole("dialog");
  }
}
