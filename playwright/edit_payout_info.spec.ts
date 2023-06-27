import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { EditPayoutInfoPage } from "./pages/edit_payout_info_page";

test.describe("As an individual, I", () => {
  let editPayoutInfoPage: EditPayoutInfoPage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users, acceptTermsAndConditions }) => {
    await signIn(users.Olivier);
    await acceptTermsAndConditions(true);
    editPayoutInfoPage = new EditPayoutInfoPage(page);
    await editPayoutInfoPage.goto();
  });

  test("can fill my payout info form, and see it pre-filled", async ({ page, users }) => {
    const payoutInfo = users.Olivier.payoutInfo;
    expect(payoutInfo).toBeDefined();
    if (payoutInfo) {
      await editPayoutInfoPage.fillForm(payoutInfo);
      await editPayoutInfoPage.submitForm();
      page.reload();
      await editPayoutInfoPage.goto();
      await editPayoutInfoPage.expectForm(payoutInfo);
    }
  });
});

test.describe("As a company, I", () => {
  let editPayoutInfoPage: EditPayoutInfoPage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users, acceptTermsAndConditions }) => {
    await signIn(users.TokioRs);
    await acceptTermsAndConditions();
    editPayoutInfoPage = new EditPayoutInfoPage(page);
    await editPayoutInfoPage.goto();
  });

  test("can fill my payout info form, and see it pre-filled", async ({ page, users }) => {
    const payoutInfo = users.TokioRs.payoutInfo;
    expect(payoutInfo).toBeDefined();
    if (payoutInfo) {
      await editPayoutInfoPage.fillForm(payoutInfo);
      await editPayoutInfoPage.submitForm();
      page.reload();
      await editPayoutInfoPage.goto();
      await editPayoutInfoPage.expectForm(payoutInfo);
    }
  });
});
