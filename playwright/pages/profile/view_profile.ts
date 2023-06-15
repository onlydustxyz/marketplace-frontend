import { Locator, Page } from "@playwright/test";
import { EditProfilePage } from "./edit_profile";

export class ViewProfilePage {
  readonly page: Page;

  public readonly login: Locator;
  public readonly bio: Locator;
  public readonly github: Locator;

  constructor(page: Page) {
    this.page = page;

    this.login = this.page.locator("[data-testid=login]");
  }

  async goto() {
    await this.page.getByTestId("profile-button").click();
    await this.page.getByText(/public profile/i).click();
  }

  async edit() {
    await this.page.getByRole("button", { name: "Edit profile" }).click();
    return new EditProfilePage(this.page);
  }
}
