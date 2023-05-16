import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { BrowseProjectsPage } from "./pages/browse_projects_page";

test.describe("As a visitor, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can list, filter and sort projects", async ({ page, projects }) => {
    const browseProjectsPage = new BrowseProjectsPage(page);
    await browseProjectsPage.goto();

    // Projects
    await browseProjectsPage.expectProjectToBeVisible(projects.ProjectA, {
      logoSrc: "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/14623987721662397761.png",
      contributors: "3 contributors",
      repositories: "2 repositories",
    });
    await browseProjectsPage.expectProjectToBeVisible(projects.ProjectB, {
      contributors: "2 contributors",
      repositories: "1 repository",
    });

    await browseProjectsPage.expectProjectsToBeVisible(projects.Kakarot, projects.Empty);
    await browseProjectsPage.expectProjectsNotToBeVisible(projects.RepoLess);

    // Filtering
    await browseProjectsPage.expectFiltersToBeVisible("Rust", "HTML", "StarkNet", "Ether Foundation");

    // Test filter
    await browseProjectsPage.filterBy("Rust");
    await browseProjectsPage.expectProjectsToBeVisible(projects.ProjectA);
    await browseProjectsPage.expectProjectsNotToBeVisible(projects.ProjectB, projects.Empty);

    // Clear filters
    await browseProjectsPage.clearFilters();
    await browseProjectsPage.expectProjectsToBeVisible(
      projects.ProjectA,
      projects.ProjectB,
      projects.Kakarot,
      projects.Empty
    );

    // Test filter
    await browseProjectsPage.filterBy("StarkNet");
    await browseProjectsPage.expectProjectsToBeVisible(projects.ProjectA, projects.ProjectB, projects.Kakarot);
    await browseProjectsPage.expectProjectsNotToBeVisible(projects.Empty);

    await browseProjectsPage.clearFilters();

    // Test sorting
    await browseProjectsPage.sortBy("contributors");
    await expect(browseProjectsPage.projects().first().getByText(projects.Kakarot.name, { exact: true })).toBeVisible();
    await browseProjectsPage.sortBy("repositories");
    await expect(
      browseProjectsPage.projects().first().getByText(projects.ProjectA.name, { exact: true })
    ).toBeVisible();
    await browseProjectsPage.sortBy("name");
    await expect(browseProjectsPage.projects().first().getByText(projects.Empty.name, { exact: true })).toBeVisible();
  });

  test("cannot access restricted projects page", async ({ page, projects }) => {
    await page.goto(`/projects/${projects.ProjectA.id}/payments`);
    await expect(page).toHaveURL(`/projects/${projects.ProjectA.id}`);
  });
});

test.describe("As a registered user, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("cannot access restricted projects page", async ({ page, projects, users, signIn }) => {
    await signIn(users.Olivier);
    await page.goto(`/projects/${projects.ProjectA.id}/payments`);
    await expect(page).toHaveURL(`/projects/${projects.ProjectA.id}`);
  });
});
