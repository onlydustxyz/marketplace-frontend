import { APIRequestContext } from "@playwright/test";
import { populateUsers } from "./populate_users";
import { populateSponsors } from "./populate_sponsors";
import { populateProjects } from "./populate_projects";
import { populatePayments } from "./populate_payments";
import { signinUsers } from "./signin_users";
import { repos } from "../../fixtures/data/repos";
import fs from "fs";

const GENERATED_FIXTURES_BASE_PATH = "./fixtures/__generated";
export const GENERATED_REPOS_FIXTURE_BASE_PATH = `${GENERATED_FIXTURES_BASE_PATH}/repos.json`;
export const GENERATED_USERS_FIXTURE_BASE_PATH = `${GENERATED_FIXTURES_BASE_PATH}/users.json`;
export const GENERATED_SPONSORS_FIXTURE_BASE_PATH = `${GENERATED_FIXTURES_BASE_PATH}/sponsors.json`;
export const GENERATED_PROJECTS_FIXTURE_BASE_PATH = `${GENERATED_FIXTURES_BASE_PATH}/projects.json`;
export const GENERATED_PAYMENTS_FIXTURE_BASE_PATH = `${GENERATED_FIXTURES_BASE_PATH}/payments.json`;

export const populate = async (request: APIRequestContext) => {
  let users = await populateUsers(request);
  console.log("Users populated");

  const sponsors = await populateSponsors();
  console.log("Sponsors populated");

  const projects = await populateProjects(users, sponsors);
  console.log("Projects populated");

  users = await signinUsers(request, users);
  console.log("Users sessions refreshed");

  const payments = await populatePayments(users, projects);
  console.log("Payments populated");

  fs.mkdirSync(GENERATED_FIXTURES_BASE_PATH, { recursive: true });
  fs.writeFileSync(GENERATED_REPOS_FIXTURE_BASE_PATH, JSON.stringify(repos));
  fs.writeFileSync(GENERATED_USERS_FIXTURE_BASE_PATH, JSON.stringify(users));
  fs.writeFileSync(GENERATED_SPONSORS_FIXTURE_BASE_PATH, JSON.stringify(sponsors));
  fs.writeFileSync(GENERATED_PROJECTS_FIXTURE_BASE_PATH, JSON.stringify(projects));
  fs.writeFileSync(GENERATED_PAYMENTS_FIXTURE_BASE_PATH, JSON.stringify(payments));

  return { users, sponsors, projects, payments, repos };
};
