import { APIRequestContext } from "@playwright/test";
import { populateUsers } from "./populate_users";
import { signinUsers } from "./signin_users";
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

  users = await signinUsers(request, users);
  console.log("Users sessions refreshed");

  fs.mkdirSync(GENERATED_FIXTURES_BASE_PATH, { recursive: true });
  fs.writeFileSync(GENERATED_USERS_FIXTURE_BASE_PATH, JSON.stringify(users));
  return { users };
};
