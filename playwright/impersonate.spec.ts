import { test } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { BrowseProjectsPage } from "./pages/browse_projects_page";
import { GenericPage } from "./pages/generic_page";

test.describe("As an admin, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can impersonate a user", async ({ page, users }) => {
    const browseProjectsPage = new BrowseProjectsPage(page);
    await browseProjectsPage.goto();

    const appPage = new GenericPage(page);
    await appPage.expectToBeAnonymous();
    await browseProjectsPage.impersonateUser(users.Olivier);
    await appPage.expectToBeImpersonating(users.Olivier);
  });
});
