import { execSync } from "child_process";
import { getEnv } from "../common";

export const dumpDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(`pg_dump --clean --exclude-schema=hdb_catalog ${DATABASE_URL} > "playwright/marketplace_db_dump"`);
};

export const restoreDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync(
    `if [ -f "playwright/marketplace_db_dump" ]; then psql ${DATABASE_URL} < "playwright/marketplace_db_dump"; fi`
  );
};

export const cleanupDB = () => {
  const DATABASE_URL = getEnv("DATABASE_URL");
  execSync('rm -f "playwright/marketplace_db_dump"');
  execSync(`psql ${DATABASE_URL} -f "playwright/commands/db/truncate.sql"`);
};
