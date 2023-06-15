import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { ViewProfilePage } from "./pages/profile/view_profile";

test.describe("As a signed-in user, I", () => {
  let profileSidePanelPage: ViewProfilePage;

  test.beforeAll(async () => {
    restoreDB();
  });

  test.beforeEach(async ({ page, signIn, users }) => {
    await signIn(users.Olivier);
    profileSidePanelPage = new ViewProfilePage(page);
    await profileSidePanelPage.goto();
  });

  test("can see my profile side panel", async ({ users }) => {
    const user = users.Olivier;
    await expect(profileSidePanelPage.login).toHaveText(user.github.login);
  });

  test("can edit my profile side panel", async ({ users }) => {
    const user = users.Olivier;
    // ======= Edit profile
    const editPage = await profileSidePanelPage.edit();
    await expect(editPage.login).toHaveText(user.github.login);
    await editPage.location.fill("Vence, France");
    await editPage.bio.fill("Fullstack developer, SOLID maximalist");
    await editPage.website.fill("https://ofux.com/my_profile");

    // Contact informations
    await expect(editPage.githubHandle).toHaveValue(user.github.login);
    await expect(editPage.githubHandle).toBeDisabled();
    await expect(editPage.email).toHaveValue(user.email);
    await expect(editPage.email).toBeDisabled();
    await expect(editPage.emailVisibility).toHaveAttribute("data-state", "on");
    await editPage.telegram.fill("t.me/fu");
    await expect(editPage.telegramVisibility).toHaveAttribute("data-state", "on");
    await editPage.twitter.fill("https://twitter.com/olivier");
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "on");
    await editPage.twitterVisibility.click();
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "off");
    await editPage.discord.fill("fu#666");
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "on");
    await editPage.discordVisibility.click();
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "off");
    await editPage.linkedin.fill("https://linkedin.com/in/olivier.fu");
    await expect(editPage.linkedinVisibility).toHaveAttribute("data-state", "on");

    // Technologies
    await editPage.addTechnology("Pascal");
    await editPage.addTechnology("C++");
    await editPage.addTechnology("Haskell");
    await editPage.addTechnology("Ruby");
    await editPage.addTechnology("COBOL");
    await editPage.removeTechnology("C++");

    // Weekly time allocation
    await editPage.weeklyTimeAllocation("1 to 3 days").click();
    await editPage.lookingForAJob.click();

    // Save
    await expect(editPage.dirtyTag).toHaveText("Unsaved changes");
    await editPage.save();

    // ======= Check informations are visible in public profile
    // TODO

    // ======= Check informations are pre-filled
    await profileSidePanelPage.edit();
    await expect(editPage.login).toHaveText(user.github.login);
    await expect(editPage.location).toHaveValue("Vence, France");
    await expect(editPage.bio).toHaveValue("Fullstack developer, SOLID maximalist");
    await expect(editPage.website).toHaveValue("https://ofux.com/my_profile");

    // Contact informations
    await expect(editPage.githubHandle).toHaveValue(user.github.login);
    await expect(editPage.githubHandle).toBeDisabled();
    await expect(editPage.email).toHaveValue(user.email);
    await expect(editPage.email).toBeDisabled();
    await expect(editPage.emailVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.telegram).toHaveValue("t.me/fu");
    await expect(editPage.telegramVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.twitter).toHaveValue("https://twitter.com/olivier");
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.discord).toHaveValue("fu#666");
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.linkedin).toHaveValue("https://linkedin.com/in/olivier.fu");
    await expect(editPage.linkedinVisibility).toHaveAttribute("data-state", "on");

    // Technologies
    await expect(editPage.selectedTechnology("Pascal")).toBeVisible();
    await expect(editPage.selectedTechnology("Haskell")).toBeVisible();
    await expect(editPage.selectedTechnology("Ruby")).toBeVisible();
    await expect(editPage.selectedTechnology("COBOL")).toBeVisible();
    await expect(editPage.selectedTechnology("C++")).not.toBeVisible();

    // Weekly time allocation
    await expect(editPage.weeklyTimeAllocation("1 to 3 days")).toHaveAttribute("data-headlessui-state", /selected/);
    await expect(editPage.lookingForAJob).toBeChecked();

    // Close
    await expect(editPage.dirtyTag).toHaveText("All changes saved");
    await editPage.closeButton.click();
  });
});
