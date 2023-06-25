import { execSync } from "child_process";
import { getEnv } from "../common";

export const DUMP_PATH = "playwright/marketplace_db_dump";

export const dumpDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(
    `pg_dump --disable-triggers --data-only --exclude-table=public.__diesel_schema_migrations --exclude-table=auth.migrations --exclude-table=auth.providers --exclude-table=auth.roles --exclude-schema=hdb_catalog ${DATABASE_URL} > "${DUMP_PATH}"`,
    {
      stdio: "pipe",
    }
  );
};

export const restoreDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  cleanupDB();
  execSync(`if [ -f "${DUMP_PATH}" ]; then psql ${DATABASE_URL} < "${DUMP_PATH}"; fi`, { stdio: "pipe" });
};

export const cleanupDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(`psql ${DATABASE_URL} -f "playwright/commands/db/truncate.sql"`, { stdio: "pipe" });
};

export const indexerRunning = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  const count = execSync(`xargs -0 psql ${DATABASE_URL} -AXqtc < ./playwright/commands/db/indexer_running.sql`, {
    stdio: "pipe",
  });

  return parseInt(count.toString());
};
