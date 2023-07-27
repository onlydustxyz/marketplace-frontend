import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { BrowseProjectsPage } from "./pages/browse_projects_page";
import { GenericPage } from "./pages/generic_page";
import { RewardsPage } from "./pages/my_rewards_page";
import { ImpersonationPage } from "./pages/impersonation_page";
import { ViewProfilePage } from "./pages/profile/view_profile";

test.describe("As an admin, I", () => {
  test.beforeAll(async () => {
    restoreDB();
  });

  test("can impersonate a user", async ({ context, page, users, signIn, logout, acceptTermsAndConditions }) => {
    await signIn(users.Anthony);
    await acceptTermsAndConditions();
    const appPage = new GenericPage(page);
    await appPage.expectToBeLoggedInAs(users.Anthony);

    const impersonationPage = new ImpersonationPage(page);
    await impersonationPage.goto(users.Olivier);
    await impersonationPage.submitForm();
    await appPage.expectToBeImpersonating(users.Olivier);

    // Look at rewards
    await appPage.clickOnMenuItem("/rewards");
    const rewardsPage = new RewardsPage(page);

    await expect(rewardsPage.rewards).toHaveCount(6);
    await rewardsPage.rewards.first().click();

    await expect(rewardsPage.sidePanel).toContainText("to");
    await expect(rewardsPage.sidePanel).toContainText(users.Olivier.github.login);
    await expect(rewardsPage.sidePanel).toContainText("(you)");

    // Edit profile of impersonated user
    new BrowseProjectsPage(page).goto();
    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();
    await expect(viewPage.login).toHaveText(users.Olivier.github.login);
    await expect(viewPage.bio).not.toHaveText("C1oYXN1cmEtdXNlci1pZCI6ImU0NjFjMDE5LWJh");

    const editPage = await viewPage.edit();
    await expect(editPage.login).toHaveText(users.Olivier.github.login);
    await editPage.bio.fill("C1oYXN1cmEtdXNlci1pZCI6ImU0NjFjMDE5LWJh");
    await editPage.save();

    await expect(viewPage.bio).toHaveText("C1oYXN1cmEtdXNlci1pZCI6ImU0NjFjMDE5LWJh");

    // Terminate impersontation
    new BrowseProjectsPage(page).goto();
    await logout();
    await appPage.expectToBeLoggedInAs(users.Anthony);

    // Check Anthony's profile has not changed
    new BrowseProjectsPage(page).goto();
    await viewPage.goto();
    await expect(viewPage.login).toHaveText(users.Anthony.github.login);
    await expect(viewPage.bio).not.toHaveText("C1oYXN1cmEtdXNlci1pZCI6ImU0NjFjMDE5LWJh");

    new BrowseProjectsPage(page).goto();
    await logout();
    await appPage.expectToBeAnonymous();
  });

  test("cannot impersonate a user without being signed in", async ({ page, users }) => {
    const impersonationPage = new ImpersonationPage(page);
    impersonationPage.goto(users.Olivier);
    await expect(page).toHaveURL("/");
  });

  test("cannot perform actions on behalf of a user without being an admin", async ({
    context,
    page,
    users,
    signIn,
    acceptTermsAndConditions,
  }) => {
    await signIn(users.Olivier);
    await acceptTermsAndConditions({ skipOnboardingWizzard: true, skipIntro: true });
    const appPage = new GenericPage(page);
    await appPage.expectToBeLoggedInAs(users.Olivier);

    const impersonationPage = new ImpersonationPage(page);
    await impersonationPage.goto(users.Anthony);
    await impersonationPage.submitForm();
    await appPage.expectToBeImpersonating(users.Anthony);

    // Edit profile of impersonated user
    new BrowseProjectsPage(page).goto();
    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();
    await expect(viewPage.login).toHaveText(users.Anthony.github.login);

    const editPage = await viewPage.edit();
    await expect(editPage.login).toHaveText(users.Anthony.github.login);
    await editPage.bio.fill("whatever");
    await editPage.save();

    await expect(page.locator("body")).toHaveText(/We've just crashed/);
  });
});
