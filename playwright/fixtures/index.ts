import { Payment, Project, Sponsor, User } from "../types";
import { test as base } from "@playwright/test";
import fs from "fs";
import {
  GENERATED_PAYMENTS_FIXTURE_BASE_PATH,
  GENERATED_PROJECTS_FIXTURE_BASE_PATH,
  GENERATED_SPONSORS_FIXTURE_BASE_PATH,
  GENERATED_USERS_FIXTURE_BASE_PATH,
} from "../commands/populate";

type PopulatedDataFixtures = {
  users: Record<string, User>;
  sponsors: Record<string, Sponsor>;
  projects: Record<string, Project>;
  payments: Record<string, Record<number, Payment[]>>;
};

export const test = base.extend<PopulatedDataFixtures>({
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
});
