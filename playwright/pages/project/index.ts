import { Page, expect } from "@playwright/test";
import { Project } from "../../types";
import { ProjectContributorsPage } from "./contributors";
import { ProjectOverviewPage } from "./overview";
import { ProjectRewardsPage } from "./rewards";

export class ProjectPage {
  readonly page: Page;
  readonly project: Project;
  readonly url: string;

  constructor(page: Page, project: Project) {
    this.page = page;
    this.project = project;
    this.url = `/p/${project.key}`;
  }

  goto = async () => {
    await this.page.goto(this.url);
    return this;
  };

  overview = async () => {
    await this.page.getByTestId("Overview-tab").click();
    await expect(this.page).toHaveURL(this.url);
    return new ProjectOverviewPage(this.page);
  };

  contributors = async () => {
    await this.page.getByTestId("Contributors-tab").click();
    await expect(this.page).toHaveURL(`${this.url}/contributors`);
    return new ProjectContributorsPage(this.page);
  };

  payments = async () => {
    await this.page.getByTestId("Rewards-tab").click();
    await expect(this.page).toHaveURL(`${this.url}/rewards`);
    return new ProjectRewardsPage(this.page, this.project);
  };
}
