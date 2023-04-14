CREATE INDEX IF NOT EXISTS "work_items_payment_id_idx" ON "public"."work_items" ("payment_id");

CREATE INDEX IF NOT EXISTS "budgets_project_id_idx" ON "public"."budgets" ("project_id");

CREATE INDEX IF NOT EXISTS "projects_sponsors_project_id_idx" ON "public"."projects_sponsors" ("project_id");

CREATE INDEX IF NOT EXISTS "payment_requests_budget_id_idx" ON "public"."payment_requests" ("budget_id");

CREATE INDEX IF NOT EXISTS "payment_requests_requestor_id_idx" ON "public"."payment_requests" ("requestor_id");

CREATE INDEX IF NOT EXISTS "payment_requests_recipient_id_idx" ON "public"."payment_requests" ("recipient_id");

CREATE INDEX IF NOT EXISTS "project_leads_project_id_idx" ON "public"."project_leads" ("project_id");

CREATE INDEX IF NOT EXISTS "project_leads_user_id_idx" ON "public"."project_leads" ("user_id");

CREATE INDEX IF NOT EXISTS "payments_request_id_idx" ON "public"."payments" ("request_id");

CREATE INDEX IF NOT EXISTS "project_github_repos_project_id_idx" ON "public"."project_github_repos" ("project_id");

CREATE INDEX IF NOT EXISTS "project_github_repos_github_repo_id_idx" ON "public"."project_github_repos" ("github_repo_id");
