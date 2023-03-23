import { test } from "@playwright/test";
import { populate } from "./commands/populate";

test.describe("As a visitor, I", () => {
  test.beforeAll(async ({ context }) => {
    await populate(context.request);
  });

  test("can list projects", async ({ page, browser, context }) => {
    await page.goto("http://localhost:5173");
  });
});
