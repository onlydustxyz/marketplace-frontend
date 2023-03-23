import { APIRequestContext } from "@playwright/test";
import { populateUsers } from "./populate_users";
import { populateSponsors } from "./populate_sponsors";
import { populateProjects } from "./populate_projects";

export const populate = async (request: APIRequestContext) => {
  const users = await populateUsers(request);
  const sponsors = await populateSponsors();
  const projects = await populateProjects(users, sponsors);

  return { users, sponsors, projects };
};
