import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { BrowseProjectsPage } from "./pages/browse_projects_page";
import { GenericPage } from "./pages/generic_page";
import { RewardsPage } from "./pages/my_rewards_page";
import { ImpersonationPage } from "./pages/impersonation_page";

test.describe("As an admin, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can impersonate a user", async ({ page, users }) => {
    const browseProjectsPage = new BrowseProjectsPage(page);
    await browseProjectsPage.goto();

    const appPage = new GenericPage(page);
    await appPage.expectToBeAnonymous();

    const impersonationPage = new ImpersonationPage(page);
    await impersonationPage.goto(users.Olivier);
    await impersonationPage.submitForm();
    await appPage.expectToBeImpersonating(users.Olivier);

    await appPage.clickOnMenuItem("/rewards");
    const rewardsPage = new RewardsPage(page);

    await expect(rewardsPage.rewards).toHaveCount(6);
    await rewardsPage.rewards.first().click();

    await expect(rewardsPage.sidePanel).toContainText("to");
    await expect(rewardsPage.sidePanel).toContainText(users.Olivier.github.login);
    await expect(rewardsPage.sidePanel).toContainText("(you)");
  });

  test("retain the login state when impersonating", async ({
    page,
    users,
    signIn,
    logout,
    acceptTermsAndConditions,
  }) => {
    await signIn(users.Anthony);
    await acceptTermsAndConditions();
    const appPage = new GenericPage(page);
    await appPage.expectToBeLoggedInAs(users.Anthony);

    const impersonationPage = new ImpersonationPage(page);
    await impersonationPage.goto(users.Olivier);
    await impersonationPage.submitForm();
    await appPage.expectToBeImpersonating(users.Olivier);

    await logout();
    await appPage.expectToBeLoggedInAs(users.Anthony);

    await logout();
    await appPage.expectToBeAnonymous();
  });
});
