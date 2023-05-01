import { execSync } from "child_process";
import { getEnv } from "../common";

export const DUMP_PATH = "playwright/marketplace_db_dump";

export const dumpDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(
    `pg_dump --clean --exclude-schema=hdb_catalog --exclude-table=github_repo_indexes --exclude-table=github_issues --exclude-table=crm_github_repos ${DATABASE_URL} > "${DUMP_PATH}"`,
    {
      stdio: "pipe",
    }
  );
};

export const restoreDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(`if [ -f "${DUMP_PATH}" ]; then psql ${DATABASE_URL} < "${DUMP_PATH}"; fi`, { stdio: "pipe" });
};

export const cleanupDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(`rm -f "${DUMP_PATH}" && psql ${DATABASE_URL} -f "playwright/commands/db/truncate.sql"`, {
    stdio: "pipe",
  });
};
