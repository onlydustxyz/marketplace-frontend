import { test } from "./fixtures";
import { expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";
import { ViewProfilePage } from "./pages/profile/view_profile";
import { retry } from "./commands/common";
import { OnboardingWizzardPage } from "./pages/profile/onboarding_wizzard";

test.describe("As a signed-in user, I", () => {
  test.beforeEach(async ({ signIn, users, acceptTermsAndConditions }) => {
    restoreDB();
    await signIn(users.Olivier);
    await acceptTermsAndConditions({ skipOnboardingWizzard: true });
  });

  test("can see my profile side panel", async ({ context, page, users }) => {
    const user = users.Olivier;
    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();
    await expect(viewPage.login).toHaveText(user.github.login);
  });

  test("can change my avatar", async ({ context, page, users }) => {
    const user = users.Olivier;
    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();
    const editPage = await viewPage.edit();
    await expect(editPage.login).toHaveText(user.github.login);
    await expect(editPage.avatar).toHaveAttribute("src", "https://avatars.githubusercontent.com/u/595505?v=4");
    await editPage.avatarFileInput.setInputFiles("playwright/fixtures/fox.png");
    await expect(editPage.avatar).toHaveAttribute(
      "src",
      "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/781526099633208489.webp",
      { timeout: 10000 }
    );
  });

  test("can edit my profile side panel", async ({ context, page, users }) => {
    const user = users.Olivier;
    await expect(page.getByText("profile completion")).toBeVisible();

    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();

    expect(viewPage.completionScore).toHaveCount(2);

    // ======= Edit profile
    const editPage = await viewPage.edit();
    expect(viewPage.completionScore).toBeVisible();

    await expect(editPage.login).toHaveText(user.github.login);
    await editPage.location.fill("Vence, France");
    await editPage.bio.fill("Fullstack developer, SOLID maximalist");
    await editPage.website.fill("https://ofux.com/my_profile");

    // Contact informations
    await expect(editPage.githubHandle).toHaveValue(user.github.login);
    await expect(editPage.githubHandle).toBeDisabled();
    await expect(editPage.email).toHaveValue(user.email);
    await expect(editPage.email).toBeDisabled();
    await expect(editPage.emailVisibility).toHaveAttribute("data-state", "off");
    await editPage.emailVisibility.click({ force: true });
    await expect(editPage.emailVisibility).toHaveAttribute("data-state", "on");
    await editPage.telegram.fill("olifu");
    await expect(editPage.telegramVisibility).toHaveAttribute("data-state", "on");
    await editPage.whatsapp.fill("+33612345678");
    await expect(editPage.whatsappVisibility).toHaveAttribute("data-state", "on");
    await editPage.twitter.fill("olivier");
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "on");
    await editPage.twitterVisibility.click();
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "off");
    await editPage.discord.fill("olifu");
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "on");
    await editPage.discordVisibility.click();
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "off");
    await editPage.linkedin.fill("olivierfu");
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
    await expect(viewPage.completionScore).not.toBeVisible();
    await expect(viewPage.login).toHaveText(user.github.login);
    await retry(
      () => viewPage.location.textContent(),
      location => location === "Vence, France"
    );
    await expect(viewPage.location).toHaveText("Vence, France");
    await expect(viewPage.bio).toHaveText("Fullstack developer, SOLID maximalist");

    // Contact informations
    await expect(viewPage.github).toBeVisible();
    await expect(viewPage.telegram).toBeVisible();
    await expect(viewPage.twitter).not.toBeVisible();
    await expect(viewPage.discord).not.toBeVisible();
    await expect(viewPage.linkedin).toBeVisible();
    await expect(viewPage.email).toBeVisible();

    // Technologies
    await expect(viewPage.technology("Pascal")).toBeVisible();
    await expect(viewPage.technology("Haskell")).toBeVisible();
    await expect(viewPage.technology("Ruby")).toBeVisible();
    await expect(viewPage.technology("COBOL")).toBeVisible();
    await expect(viewPage.technology("C++")).not.toBeVisible();

    const publicProfilePage = await viewPage.openPublicProfile();
    await expect(publicProfilePage.location).toHaveText("Vence, France");
    await expect(publicProfilePage.bio).toHaveText("Fullstack developer, SOLID maximalist");

    // Contact informations
    await expect(publicProfilePage.github).toBeVisible();
    await expect(publicProfilePage.telegram).toBeVisible();
    await expect(publicProfilePage.whatsapp).toBeVisible();
    await expect(publicProfilePage.twitter).not.toBeVisible();
    await expect(publicProfilePage.discord).not.toBeVisible();
    await expect(publicProfilePage.linkedin).toBeVisible();
    await expect(publicProfilePage.email).toBeVisible();

    // Technologies
    await expect(publicProfilePage.technology("Pascal")).toBeVisible();
    await expect(publicProfilePage.technology("Haskell")).toBeVisible();
    await expect(publicProfilePage.technology("Ruby")).toBeVisible();
    await expect(publicProfilePage.technology("COBOL")).toBeVisible();
    await expect(publicProfilePage.technology("C++")).not.toBeVisible();

    // ======= Check informations are pre-filled
    await viewPage.edit();
    await expect(editPage.completionScore).not.toBeVisible();
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
    await expect(editPage.telegram).toHaveValue("olifu");
    await expect(editPage.telegramVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.whatsapp).toHaveValue("+33612345678");
    await expect(editPage.whatsappVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.twitter).toHaveValue("olivier");
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.discord).toHaveValue("olifu");
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.linkedin).toHaveValue("olivierfu");
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

    await expect(page.getByText("profile completion")).not.toBeVisible();
  });
});

test.describe("As a new user on the platform, I", () => {
  let wizzard: OnboardingWizzardPage;

  test.beforeEach(async ({ page, signIn, users }) => {
    restoreDB();
    await signIn(users.Olivier);
    wizzard = new OnboardingWizzardPage(page);
  });

  test("can be onboarded", async ({ page, context, users, acceptTermsAndConditions }) => {
    const user = users.Olivier;

    // ======= On boarding wizzard
    await wizzard.setup.click();

    // Technologies
    await wizzard.addTechnology("Pascal");
    await wizzard.addTechnology("C++");
    await wizzard.addTechnology("Haskell");
    await wizzard.addTechnology("Ruby");
    await wizzard.addTechnology("COBOL");
    await wizzard.removeTechnology("C++");
    await wizzard.next.click();

    // Weekly time allocation
    await wizzard.weeklyTimeAllocation("1 to 3 days").click();
    await wizzard.lookingForAJob.click();
    await wizzard.next.click();

    // Contact informations
    await expect(wizzard.githubHandle).toHaveValue(user.github.login);
    await expect(wizzard.githubHandle).toBeDisabled();
    await expect(wizzard.email).toHaveValue(user.email);
    await expect(wizzard.email).toBeDisabled();
    await expect(wizzard.emailVisibility).toHaveAttribute("data-state", "off");
    await wizzard.emailVisibility.click({ force: true });
    await expect(wizzard.emailVisibility).toHaveAttribute("data-state", "on");
    await wizzard.telegram.fill("olifu");
    await expect(wizzard.telegramVisibility).toHaveAttribute("data-state", "on");
    await wizzard.whatsapp.fill("+33612345678");
    await expect(wizzard.whatsappVisibility).toHaveAttribute("data-state", "on");
    await wizzard.twitter.fill("olivier");
    await expect(wizzard.twitterVisibility).toHaveAttribute("data-state", "on");
    await wizzard.twitterVisibility.click();
    await expect(wizzard.twitterVisibility).toHaveAttribute("data-state", "off");
    await wizzard.discord.fill("olifu");
    await expect(wizzard.discordVisibility).toHaveAttribute("data-state", "on");
    await wizzard.discordVisibility.click();
    await expect(wizzard.discordVisibility).toHaveAttribute("data-state", "off");
    await wizzard.linkedin.fill("olivierfu");
    await expect(wizzard.linkedinVisibility).toHaveAttribute("data-state", "on");
    await wizzard.submit.click();

    // Accept T&C
    await acceptTermsAndConditions({ skipIntro: true });

    // ======= Check informations are visible in public profile
    const viewPage = new ViewProfilePage(page, context);
    await viewPage.goto();

    await expect(viewPage.login).toHaveText(user.github.login);

    // Contact informations
    await expect(viewPage.github).toBeVisible();
    await expect(viewPage.telegram).toBeVisible();
    await expect(viewPage.whatsapp).toBeVisible();
    await expect(viewPage.twitter).not.toBeVisible();
    await expect(viewPage.discord).not.toBeVisible();
    await expect(viewPage.linkedin).toBeVisible();
    await expect(viewPage.email).toBeVisible();

    // Technologies
    await expect(viewPage.technology("Pascal")).toBeVisible();
    await expect(viewPage.technology("Haskell")).toBeVisible();
    await expect(viewPage.technology("Ruby")).toBeVisible();
    await expect(viewPage.technology("COBOL")).toBeVisible();
    await expect(viewPage.technology("C++")).not.toBeVisible();

    // ======= Check informations are pre-filled
    const editPage = await viewPage.edit();

    // Contact informations
    await expect(editPage.githubHandle).toHaveValue(user.github.login);
    await expect(editPage.githubHandle).toBeDisabled();
    await expect(editPage.email).toHaveValue(user.email);
    await expect(editPage.email).toBeDisabled();
    await expect(editPage.emailVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.telegram).toHaveValue("olifu");
    await expect(editPage.telegramVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.whatsapp).toHaveValue("+33612345678");
    await expect(editPage.whatsappVisibility).toHaveAttribute("data-state", "on");
    await expect(editPage.twitter).toHaveValue("olivier");
    await expect(editPage.twitterVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.discord).toHaveValue("olifu");
    await expect(editPage.discordVisibility).toHaveAttribute("data-state", "off");
    await expect(editPage.linkedin).toHaveValue("olivierfu");
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
