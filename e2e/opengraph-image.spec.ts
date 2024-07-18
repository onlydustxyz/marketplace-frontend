import { expect, test } from "@playwright/test";

test("should generate generic metadata image", async ({ page }, testinfo) => {
  testinfo.snapshotSuffix = "";
  await page.goto("/opengraph-image");
  await expect(page).toHaveScreenshot();
});

test("should generate project opengraph image", async ({ page }, testinfo) => {
  testinfo.snapshotSuffix = "";
  await page.goto("/p/bretzel/opengraph-image");
  await expect(page).toHaveScreenshot();
});

// test("should generate user opengraph image", async ({ page }, testinfo) => {
//   testinfo.snapshotSuffix = "";
//   await page.goto("/u/dustyPierreO/opengraph-image");
//   await expect(page).toHaveScreenshot();
// });
