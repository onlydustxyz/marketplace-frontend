import { test } from "@playwright/test";
import { cleanupDB, dumpDB, DUMP_PATH } from "./commands/db/db_utils";
import { populate } from "./commands/populate";
import fs from "fs";
import { sleep } from "./commands/common";

test.describe("Once and before all test suites, ", () => {
  test("cleanup and populate some data", async ({ request }) => {
    test.skip(fs.existsSync(DUMP_PATH), `DB dump already exists at ${DUMP_PATH}`);

    console.time("Fixtures populated in");
    cleanupDB();
    await populate(request);
    await sleep(2000); // Wait for github indexer to complete
    dumpDB();
    console.timeEnd("Fixtures populated in");
  });
});
