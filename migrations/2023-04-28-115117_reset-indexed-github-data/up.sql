TRUNCATE "public"."github_issues" RESTART IDENTITY;

UPDATE "public"."github_repo_indexes" SET "last_indexed_time" = NULL;
