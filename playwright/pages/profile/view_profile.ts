import { BrowserContext, Locator, Page } from "@playwright/test";
import { EditProfilePage } from "./edit_profile";

export class ViewProfilePage {
  readonly page: Page;
  readonly context: BrowserContext;

  public readonly login: Locator;
  public readonly location: Locator;
  public readonly bio: Locator;
  public readonly github: Locator;
  public readonly telegram: Locator;
  public readonly twitter: Locator;
  public readonly discord: Locator;
  public readonly linkedin: Locator;
  public readonly email: Locator;
  public readonly completionScore: Locator;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;

    this.login = this.page.getByTestId("login");
    this.location = this.page.getByTestId("location");
    this.bio = this.page.getByTestId("bio");
    this.github = this.page.getByTestId("github");
    this.telegram = this.page.getByTestId("telegram");
    this.twitter = this.page.getByTestId("twitter");
    this.discord = this.page.getByTestId("discord");
    this.linkedin = this.page.getByTestId("linkedin");
    this.email = this.page.getByTestId("email");
    this.completionScore = this.page.getByText("profile completion");
  }

  goto = async () => {
    await this.page.getByTestId("profile-button").click();
    await this.page.getByText(/public profile/i).click();
  };

  openPublicProfile = async () => {
    await this.page.getByTestId("open-public-profile-btn").click();
    const publicProfilePage = await this.context.waitForEvent("page");
    await publicProfilePage.waitForLoadState();
    return new ViewProfilePage(publicProfilePage, this.context);
  };

  edit = async () => {
    await this.page.getByRole("button", { name: "Edit profile" }).click();
    return new EditProfilePage(this.page, this.context);
  };

  technology = (language: string) => this.page.getByText(language);
}
