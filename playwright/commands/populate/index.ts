import { APIRequestContext } from "@playwright/test";
import { populateUsers } from "./populate_users";
import { populateSponsors } from "./populate_sponsors";
import { populateProjects } from "./populate_projects";
import { populatePayments } from "./populate_payments";
import { signinUsers } from "./signin_users";

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

  return { users, sponsors, projects, payments };
};
