import { Locator, Page } from "@playwright/test";
import { EditProfilePage } from "./edit_profile";

export class ViewProfilePage {
  readonly page: Page;

  public readonly login: Locator;
  public readonly location: Locator;
  public readonly bio: Locator;
  public readonly github: Locator;
  public readonly telegram: Locator;
  public readonly twitter: Locator;
  public readonly discord: Locator;
  public readonly linkedin: Locator;
  public readonly email: Locator;

  constructor(page: Page) {
    this.page = page;

    this.login = this.page.getByTestId("login");
    this.location = this.page.getByTestId("location");
    this.bio = this.page.getByTestId("bio");
    this.github = this.page.getByTestId("github");
    this.telegram = this.page.getByTestId("telegram");
    this.twitter = this.page.getByTestId("twitter");
    this.discord = this.page.getByTestId("discord");
    this.linkedin = this.page.getByTestId("linkedin");
    this.email = this.page.getByTestId("email");
  }

  goto = async () => {
    await this.page.getByTestId("profile-button").click();
    await this.page.getByText(/public profile/i).click();
  };

  edit = async () => {
    await this.page.getByRole("button", { name: "Edit profile" }).click();
    return new EditProfilePage(this.page);
  };

  technology = (language: string) => this.page.getByText(language);
}
