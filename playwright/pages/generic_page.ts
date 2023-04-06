import { expect, Locator, Page } from "@playwright/test";
import { User } from "../types";

export class GenericPage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly profileButton: Locator;
  readonly impersonationBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByTestId("github-signin-button");
    this.profileButton = page.getByTestId("profile-button");
    this.impersonationBanner = page.getByTestId("impersonation-banner");
  }

  async expectToBeAnonymous() {
    await expect(this.profileButton).not.toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async expectToBeImpersonating(user: User) {
    await expect(this.impersonationBanner).toBeVisible();
    await expect(this.profileButton).toHaveText(user.github.login);
  }
}
