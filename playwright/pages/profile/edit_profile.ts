import { Locator, Page, expect } from "@playwright/test";
import { ViewProfilePage } from "./view_profile";

export class EditProfilePage {
  readonly page: Page;

  public readonly login: Locator;
  public readonly avatar: Locator;
  public readonly avatarFileInput: Locator;
  public readonly location: Locator;
  public readonly bio: Locator;
  public readonly website: Locator;
  public readonly githubHandle: Locator;
  public readonly email: Locator;
  public readonly emailVisibility: Locator;
  public readonly telegram: Locator;
  public readonly telegramVisibility: Locator;
  public readonly twitter: Locator;
  public readonly twitterVisibility: Locator;
  public readonly discord: Locator;
  public readonly discordVisibility: Locator;
  public readonly linkedin: Locator;
  public readonly linkedinVisibility: Locator;
  public readonly technologiesInput: Locator;
  public readonly lookingForAJob: Locator;
  public readonly dirtyTag: Locator;
  public readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.login = this.page.locator("[data-testid=login]");
    this.avatar = this.page.locator("[data-testid=avatarUrl]");
    this.avatarFileInput = this.page.locator("[data-testid=avatarFileInput]");
    this.location = this.page.getByTestId("location");
    this.bio = this.page.getByTestId("bio");
    this.website = this.page.getByTestId("website");
    this.githubHandle = this.page.getByTestId("githubHandle");
    this.email = this.page.getByTestId("email");
    this.emailVisibility = this.page.getByTestId("visibilityToggle").nth(1);
    this.telegram = this.page.getByTestId("telegram");
    this.telegramVisibility = this.page.getByTestId("visibilityToggle").nth(2);
    this.twitter = this.page.getByTestId("twitter");
    this.twitterVisibility = this.page.getByTestId("visibilityToggle").nth(3);
    this.discord = this.page.getByTestId("discord");
    this.discordVisibility = this.page.getByTestId("visibilityToggle").nth(4);
    this.linkedin = this.page.getByTestId("linkedin");
    this.linkedinVisibility = this.page.getByTestId("visibilityToggle").nth(5);
    this.technologiesInput = this.page.getByTestId("technologiesCombobox").getByRole("combobox");
    this.lookingForAJob = this.page.locator("div").filter({ hasText: "I'm looking for a job" }).getByRole("switch");
    this.dirtyTag = this.page.getByTestId("dirtyTag");
    this.closeButton = this.page.getByTestId("close-add-work-item-panel-btn");
  }

  selectedTechnology = (technology: string) => this.page.locator(`[data-technology='${technology}']`);

  addTechnology = async (technology: string) => {
    await this.technologiesInput.fill(technology);
    await this.page.getByRole("option", { name: technology, exact: true }).click();
    await expect(this.selectedTechnology(technology)).toBeVisible();
  };

  removeTechnology = async (technology: string) => {
    const selectedTechnology = this.selectedTechnology(technology);
    await selectedTechnology.getByRole("button").first().click();
    await expect(selectedTechnology).not.toBeVisible();
  };

  weeklyTimeAllocation = (timeAllocation: string) => this.page.getByRole("option", { name: timeAllocation });

  save = async () => {
    await this.page.getByRole("button", { name: "Done" }).click();
    return new ViewProfilePage(this.page);
  };
}
