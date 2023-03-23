import { test } from "@playwright/test";
import { cleanupDB, dumpDB, DUMP_PATH } from "./commands/db/db_utils";
import { populate } from "./commands/populate";
import fs from "fs";

test.describe("Once and before all test suites, ", () => {
  test("cleanup and populate some data", async ({ request }) => {
    test.skip(fs.existsSync(DUMP_PATH), `DB dump already exists at ${DUMP_PATH}`);

    cleanupDB();
    await populate(request);
    dumpDB();
  });
});
