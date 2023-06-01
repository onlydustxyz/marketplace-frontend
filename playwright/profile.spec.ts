import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { ProfileSidePanelPage } from "./pages/profile/side_panel";

test.describe("As a signed-in user, I", () => {
  let profileSidePanelPage: ProfileSidePanelPage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users }) => {
    await signIn(users.Olivier);
    profileSidePanelPage = new ProfileSidePanelPage(page);
    await profileSidePanelPage.goto();
  });

  test("can see my profile side panel", async ({ users }) => {
    const user = users.Olivier;
    await expect(profileSidePanelPage.login).toHaveText(user.github.login);
  });
});
