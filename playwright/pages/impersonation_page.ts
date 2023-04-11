import { Locator, Page } from "@playwright/test";
import { User } from "../types";

export class ImpersonationPage {
  private readonly page: Page;
  private readonly passwordInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordInput = page.getByLabel("password");
  }

  async goto(user: User) {
    this.page.goto(`/impersonate/${user.id}`);
  }

  async submitForm() {
    await this.passwordInput.fill(process.env.HASURA_GRAPHQL_ADMIN_SECRET || "");
    await this.passwordInput.press("Enter");
  }
}
