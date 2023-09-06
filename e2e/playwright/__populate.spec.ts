import { test } from "@playwright/test";
import { cleanupDB, dumpDB, DUMP_PATH, indexerRunning } from "./commands/db/db_utils";
import { populate } from "./commands/populate";
import fs from "fs";
import { sleep } from "./commands/common";

test.describe("Once and before all test suites, ", () => {
  test("cleanup and populate some data", async ({ request }) => {
    test.skip(fs.existsSync(DUMP_PATH), `DB dump already exists at ${DUMP_PATH}`);
    test.slow();

    console.time("Fixtures populated in");
    cleanupDB();
    await populate(request);
    await waitForIndexerAfterProjections(3);
    dumpDB();
    console.timeEnd("Fixtures populated in");
  });
});

const waitForIndexerAfterProjections = async (times: number) => {
  for (let cycle = 0; cycle < times; cycle++) {
    await waitForIndexer();
    await sleep(1000);
  }
};

const waitForIndexer = async () => {
  let count = indexerRunning();

  while (count > 0) {
    console.log(`Waiting for ${count} items to be indexed`);
    await sleep(1000);
    count = indexerRunning();
  }
};
