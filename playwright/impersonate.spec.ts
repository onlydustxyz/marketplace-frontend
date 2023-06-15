import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { restoreDB } from "./commands/db/db_utils";
import { BrowseProjectsPage } from "./pages/browse_projects_page";
import { GenericPage } from "./pages/generic_page";
import { PaymentsPage } from "./pages/my_payments_page";
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

    await appPage.clickOnMenuItem("/payments");
    const paymentsPage = new PaymentsPage(page);

    await expect(paymentsPage.payments).toHaveCount(6);
    await paymentsPage.payments.first().click();

    await expect(paymentsPage.sidePanel).toContainText("to");
    await expect(paymentsPage.sidePanel).toContainText(users.Olivier.github.login);
    await expect(paymentsPage.sidePanel).toContainText("(you)");
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
