CREATE INDEX IF NOT EXISTS "contributions_user_id_idx" ON "public"."contributions" USING BTREE ("user_id");

CREATE INDEX IF NOT EXISTS "contributions_repo_id_idx" ON "public"."contributions" USING BTREE ("repo_id");

CREATE INDEX IF NOT EXISTS "contributions_type_idx" ON "public"."contributions" USING BTREE ("type");

CREATE UNIQUE INDEX IF NOT EXISTS "projects_pending_contributors_github_user_id_project_id_idx" ON "public"."projects_pending_contributors" USING BTREE ("github_user_id","project_id");

CREATE UNIQUE INDEX IF NOT EXISTS "projects_rewarded_users_github_user_id_project_id_idx" ON "public"."projects_rewarded_users" USING BTREE ("github_user_id","project_id");