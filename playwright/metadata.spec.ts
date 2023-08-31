import { test } from "./fixtures";
import { APIRequestContext, expect } from "@playwright/test";
import { restoreDB } from "./commands/db/db_utils";

test.describe("As a cloudflare worker, I", () => {
  test.beforeEach(async () => {
    restoreDB();
  });

  test("can get the user profile from the backend to build the app metadata with SSR", async ({ request, users }) => {
    const query = `
            query GetUserForLogin($login: String!) {
                  userProfiles(where: {login: {_eq: $login}}) {
                    login
                    bio
                    avatarUrl
                  }
            }
            `;
    const user = users.Olivier;
    const variables = { login: user.github.login };
    const response = await post_graphql_request({ request: request, query: query, variables: variables });
    expect(response.ok()).toBeTruthy();
    const userProfilesBody = await response.json();
    expect(userProfilesBody).toBeDefined();
    expect(userProfilesBody.data).toBeDefined();
    expect(userProfilesBody.data.userProfiles).toBeDefined();
    expect(userProfilesBody.data.userProfiles).toHaveLength(1);
    expect(userProfilesBody.data.userProfiles[0].login).toEqual(user.github.login);
    expect(userProfilesBody.data.userProfiles[0].bio).toEqual(user.github.bio);
    expect(userProfilesBody.data.userProfiles[0].avatarUrl).toEqual(user.github.avatarUrl);
  });
});

test.describe("As a cloudflare worker, I", () => {
  test("can get the project details from the backend to build the app metadata with SSR", async ({
    request,
    projects,
  }) => {
    const query = `
            query GetProjectForKey($project_key: String!) {
                  projects(where: {key: {_eq: $project_key }}) {
                    id
                    name
                    logoUrl
                    shortDescription
                  }
            }
            `;
    const project = projects.Kakarot;
    const variables = { project_key: project.key };
    const response = await post_graphql_request({ request: request, query: query, variables: variables });
    expect(response.ok()).toBeTruthy();
    const projectDetailsBody = await response.json();
    expect(projectDetailsBody).toBeDefined();
    expect(projectDetailsBody.data).toBeDefined();
    expect(projectDetailsBody.data.projects).toBeDefined();
    expect(projectDetailsBody.data.projects).toHaveLength(1);
    expect(projectDetailsBody.data.projects[0].name).toEqual(project.name);
    expect(projectDetailsBody.data.projects[0].shortDescription).toEqual(project.shortDescription);
    expect(projectDetailsBody.data.projects[0].logoUrl).toEqual(
      "https://onlydust-app-images.s3.eu-west-1.amazonaws.com/15454819309177101334.png"
    );
  });
});

async function post_graphql_request({
  request,
  query,
  variables,
}: {
  request: APIRequestContext;
  query: string;
  variables: unknown;
}) {
  return await request.post(`${process.env.VITE_HASURA_BASE_URL}/v1/graphql`, {
    data: JSON.stringify({
      query: query,
      variables: variables,
    }),
  });
}
