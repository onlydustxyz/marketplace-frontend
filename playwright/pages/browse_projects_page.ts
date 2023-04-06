import { expect, Page } from "@playwright/test";
import { Project, User } from "../types";

export class BrowseProjectsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
  }

  async expectProjectToBeVisible(
    project: Project,
    checks?: { logoSrc?: string; contributors?: string; repositories?: string }
  ) {
    const projectLocator = this.getProjectLocator(project);
    await expect(projectLocator.getByText(project.name, { exact: true })).toBeVisible();

    if (checks?.logoSrc) {
      await expect(projectLocator.locator("img[alt='Project Logo']")).toHaveAttribute("src", checks?.logoSrc);
    }
    if (checks?.contributors) {
      await expect(projectLocator.getByText(checks?.contributors, { exact: true })).toBeVisible();
    }
    if (checks?.repositories) {
      await expect(projectLocator.getByText(checks?.repositories, { exact: true })).toBeVisible();
    }
    return projectLocator;
  }

  async expectProjectsToBeVisible(...projects: Project[]) {
    for (const project of projects) {
      await this.expectProjectToBeVisible(project);
    }
  }

  async expectProjectsNotToBeVisible(...projects: Project[]) {
    for (const project of projects) {
      const projectLocator = this.getProjectLocator(project);
      await expect(projectLocator.getByText(project.name, { exact: true })).not.toBeVisible();
    }
  }

  async expectFiltersToBeVisible(...filters: string[]) {
    for (const filter of filters) {
      await expect(this.getFilterLocator(filter)).toBeVisible();
    }
  }

  async filterBy(filter: string) {
    await this.getFilterLocator(filter).click();
  }

  async clearFilters() {
    await this.page.getByText("Clear all", { exact: true }).click();
  }

  async impersonateUser(user: User) {
    this.page.on("dialog", async dialog => {
      if (dialog.message().includes("password")) {
        await dialog.accept(process.env.HASURA_GRAPHQL_ADMIN_SECRET);
      }
      if (dialog.message().includes("user")) {
        await dialog.accept(user.id);
      }
    });
    await this.page.keyboard.press("Meta+i");
  }

  getProjectLocator(project: Project) {
    return this.page.locator(`a[href='/projects/${project.id}']`);
  }

  getFilterLocator(filter: string) {
    return this.page.getByText(filter, { exact: true });
  }
}
