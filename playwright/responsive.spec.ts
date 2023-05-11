import { test as base } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { Page, devices, expect } from "@playwright/test";
import { BrowseProjectsPage } from "./pages/browse_projects_page";

const iPhone = devices["iPhone 13"];

const test = base.extend<{ mobilePage: Page }>({
  mobilePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...iPhone,
    });

    const mobilePage = await context.newPage();
    await use(mobilePage);
  },
});

test.describe("In a mobile browser, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can see the browse projects page", async ({ mobilePage, projects }) => {
    const browseProjectsPage = new BrowseProjectsPage(mobilePage);
    await browseProjectsPage.goto();

    await expect(mobilePage.getByText(projects.ProjectA.name, { exact: true })).toBeVisible();
    await expect(mobilePage).toHaveScreenshot();
  });
});
