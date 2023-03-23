import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";

test.describe("As a visitor, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can filter projects by technology", async ({ page, projects }) => {
    await page.goto("http://localhost:5173");

    // Projects
    const projectALocator = page.locator(`a[href='/projects/${projects.ProjectA.id}']`);
    const projectBLocator = page.locator(`a[href='/projects/${projects.ProjectB.id}']`);
    const kakarotLocator = page.locator(`a[href='/projects/${projects.Kakarot.id}']`);
    const emptyProjectLocator = page.locator(`a[href='/projects/${projects.Empty.id}']`);

    await expect(projectALocator.getByText(projects.ProjectA.name, { exact: true })).toBeVisible();
    await expect(projectBLocator.getByText(projects.ProjectB.name, { exact: true })).toBeVisible();
    await expect(kakarotLocator.getByText(projects.Kakarot.name, { exact: true })).toBeVisible();
    await expect(emptyProjectLocator.getByText(projects.Empty.name, { exact: true })).toBeVisible();

    await expect(projectALocator.locator("img[alt='Project Logo']")).toHaveAttribute(
      "src",
      "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14623987721662397761.png"
    );
    await expect(projectALocator.getByText("3 contributors", { exact: true })).toBeVisible();
    await expect(projectALocator.getByText("2 repositories", { exact: true })).toBeVisible();

    await expect(projectBLocator.getByText("2 contributors", { exact: true })).toBeVisible();
    await expect(projectBLocator.getByText("1 repository", { exact: true })).toBeVisible();

    // Filtering
    const rustFilterLocator = page.getByText("Rust", { exact: true });
    await expect(rustFilterLocator).toBeVisible();
    await expect(page.getByText("HTML", { exact: true })).toBeVisible();

    // Test filter
    await rustFilterLocator.click();
    await expect(projectALocator.getByText(projects.ProjectA.name, { exact: true })).toBeVisible();
    await expect(projectBLocator.getByText(projects.ProjectB.name, { exact: true })).not.toBeVisible();
    await expect(emptyProjectLocator.getByText(projects.Empty.name, { exact: true })).not.toBeVisible();

    // Clear filters
    await page.getByText("Clear all", { exact: true }).click();
    await expect(projectALocator.getByText(projects.ProjectA.name, { exact: true })).toBeVisible();
    await expect(projectBLocator.getByText(projects.ProjectB.name, { exact: true })).toBeVisible();
    await expect(kakarotLocator.getByText(projects.Kakarot.name, { exact: true })).toBeVisible();
    await expect(emptyProjectLocator.getByText(projects.Empty.name, { exact: true })).toBeVisible();
  });
});
