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
  repos: Record<string, Repo>;
  users: Record<string, User>;
  sponsors: Record<string, Sponsor>;
  projects: Record<string, Project>;
  payments: Record<string, Record<number, Payment[]>>;
  signIn: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  acceptTermsAndConditions: (props?: { skipOnboardingWizzard?: boolean; skipIntro?: boolean }) => Promise<void>;
};

export const test = base.extend<PopulatedDataFixtures>({
  // eslint-disable-next-line no-empty-pattern
  repos: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_REPOS_FIXTURE_BASE_PATH);
    const repos = JSON.parse(content.toString());
    await use(repos);
  },

  // eslint-disable-next-line no-empty-pattern
  users: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_USERS_FIXTURE_BASE_PATH);
    const users = JSON.parse(content.toString());
    await use(users);
  },

  // eslint-disable-next-line no-empty-pattern
  sponsors: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_SPONSORS_FIXTURE_BASE_PATH);
    const sponsors = JSON.parse(content.toString());
    await use(sponsors);
  },

  // eslint-disable-next-line no-empty-pattern
  projects: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_PROJECTS_FIXTURE_BASE_PATH);
    const projects = JSON.parse(content.toString());
    await use(projects);
  },

  // eslint-disable-next-line no-empty-pattern
  payments: async ({}, use) => {
    const content = fs.readFileSync(GENERATED_PAYMENTS_FIXTURE_BASE_PATH);
    const payments = JSON.parse(content.toString());
    await use(payments);
  },

  signIn: async ({ page }, use) => {
    await use(async (user: User) => {
      await page.goto("/");
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
      await page.getByText("Accept terms and conditions").click();
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
