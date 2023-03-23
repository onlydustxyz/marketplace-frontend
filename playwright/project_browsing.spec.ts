import { test } from "@playwright/test";
import { cleanupDB } from "./commands/db/db_utils";
import { populate } from "./commands/populate";

test.describe("As a visitor, I", () => {
  test.beforeAll(async ({ request }) => {
    cleanupDB();
    await populate(request);
  });

  test("can list projects", async ({ page }) => {
    await page.goto("http://localhost:5173");
  });
});
