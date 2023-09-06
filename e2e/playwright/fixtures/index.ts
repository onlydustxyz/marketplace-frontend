import { Payment, Project, Repo, Sponsor, User } from "../types";
import { Page, test as base, expect } from "@playwright/test";
import fs from "fs";
import {
  GENERATED_PAYMENTS_FIXTURE_BASE_PATH,
  GENERATED_PROJECTS_FIXTURE_BASE_PATH,
  GENERATED_REPOS_FIXTURE_BASE_PATH,
  GENERATED_SPONSORS_FIXTURE_BASE_PATH,
  GENERATED_USERS_FIXTURE_BASE_PATH,
} from "../commands/populate";

type PopulatedDataFixtures = {
  users: Record<string, User>;
  signIn: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  acceptTermsAndConditions: (props?: { skipOnboardingWizzard?: boolean; skipIntro?: boolean }) => Promise<void>;
};

export const test = base.extend<PopulatedDataFixtures>({
  // eslint-disable-next-line no-empty-pattern
  users: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_USERS_FIXTURE_BASE_PATH);
    const users = JSON.parse(content.toString());
    await use(users);
  },

  signIn: async ({ page }, use) => {
    await use(async (user: User) => {
      const rnd = (Math.random() + 1).toString(36).substring(7);
      console.log(await page.content());
      await page.screenshot({ path: `playwright-report/${rnd}-before-goto.png` });
      await page.goto("/");
      await expect(page.locator("#root")).toBeVisible();
      await page.screenshot({ path: `playwright-report/${rnd}-after-goto.png` });

      await setLocalStorageTest("hasura_token", user.session, page);
      await page.reload();
      await expect(page.locator("#profile-button").getByText(user.github.login, { exact: true })).toBeVisible();
    });
  },

  logout: async ({ page }, use) => {
    await use(async () => {
      await page.getByTestId("profile-button").click();
      await page.getByTestId("logout-button").click({ force: true });
    });
  },

  acceptTermsAndConditions: async ({ page }, use) => {
    await use(async (props = {}) => {
      const { skipOnboardingWizzard, skipIntro } = props;
      if (skipOnboardingWizzard) {
        await page.getByText("skip").click();
      }

      if (!skipOnboardingWizzard && !skipIntro) {
        await page.getByText("Let’s get reading!").click();
      }

      await page.getByRole("checkbox").click();
      await page.getByText("Confirm").click();
    });
  },
});

const setLocalStorageTest = async (key: string, value: string, page: Page) => {
  await page.addInitScript(
    item => {
      window.localStorage.setItem(item.key, item.value);
    },
    { key, value }
  );
};
