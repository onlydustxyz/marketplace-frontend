import { Locator, Page, expect } from "@playwright/test";

export class OnboardingWizzardPage {
  readonly page: Page;

  public readonly setup: Locator;
  public readonly next: Locator;
  public readonly submit: Locator;

  public readonly githubHandle: Locator;
  public readonly email: Locator;
  public readonly emailVisibility: Locator;
  public readonly telegram: Locator;
  public readonly telegramVisibility: Locator;
  public readonly whatsapp: Locator;
  public readonly whatsappVisibility: Locator;
  public readonly twitter: Locator;
  public readonly twitterVisibility: Locator;
  public readonly discord: Locator;
  public readonly discordVisibility: Locator;
  public readonly linkedin: Locator;
  public readonly linkedinVisibility: Locator;
  public readonly technologiesInput: Locator;
  public readonly lookingForAJob: Locator;

  constructor(page: Page) {
    this.page = page;

    this.setup = this.page.getByText("Set up profile");
    this.next = this.page.getByText("Next");
    this.submit = this.page.getByText("Submit");

    this.githubHandle = this.page.getByTestId("githubHandle");
    this.email = this.page.getByTestId("email");
    this.emailVisibility = this.page.getByTestId("visibilityToggle").nth(1);
    this.telegram = this.page.getByTestId("telegram");
    this.telegramVisibility = this.page.getByTestId("visibilityToggle").nth(2);
    this.whatsapp = this.page.getByTestId("whatsapp");
    this.whatsappVisibility = this.page.getByTestId("visibilityToggle").nth(3);
    this.twitter = this.page.getByTestId("twitter");
    this.twitterVisibility = this.page.getByTestId("visibilityToggle").nth(4);
    this.discord = this.page.getByTestId("discord");
    this.discordVisibility = this.page.getByTestId("visibilityToggle").nth(5);
    this.linkedin = this.page.getByTestId("linkedin");
    this.linkedinVisibility = this.page.getByTestId("visibilityToggle").nth(6);
    this.technologiesInput = this.page.getByTestId("technologiesCombobox").getByRole("combobox");
    this.lookingForAJob = this.page.locator("div").filter({ hasText: "I'm looking for a job" }).getByRole("switch");
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
}
