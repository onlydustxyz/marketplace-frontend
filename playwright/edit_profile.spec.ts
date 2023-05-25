import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { EditProfilePage } from "./pages/edit_profile_page";

test.describe("As an individual, I", () => {
  let editProfilePage: EditProfilePage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users }) => {
    await signIn(users.Olivier);
    editProfilePage = new EditProfilePage(page);
    await editProfilePage.goto();
  });

  test("can fill my profile form, and see it pre-filled", async ({ page, users }) => {
    const profile = users.Olivier.profile;
    expect(profile).toBeDefined();
    if (profile) {
      await editProfilePage.fillForm(profile);
      await editProfilePage.submitForm();
      page.reload();
      await editProfilePage.goto();
      await editProfilePage.expectForm(profile);
    }
  });
});

test.describe("As a company, I", () => {
  let editProfilePage: EditProfilePage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users }) => {
    await signIn(users.TokioRs);
    editProfilePage = new EditProfilePage(page);
    await editProfilePage.goto();
  });

  test("can fill my profile form, and see it pre-filled", async ({ page, users }) => {
    const profile = users.TokioRs.profile;
    expect(profile).toBeDefined();
    if (profile) {
      await editProfilePage.fillForm(profile);
      await editProfilePage.submitForm();
      page.reload();
      await editProfilePage.goto();
      await editProfilePage.expectForm(profile);
    }
  });
});
