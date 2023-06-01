import { Locator, Page } from "@playwright/test";

export class ProfileSidePanelPage {
  readonly page: Page;

  public readonly login: Locator;

  constructor(page: Page) {
    this.page = page;

    this.login = this.page.locator("[data-testid=login]");
  }

  async goto() {
    await this.page.getByTestId("profile-button").click();
    await this.page.getByText(/public profile/i).click();
  }
}
