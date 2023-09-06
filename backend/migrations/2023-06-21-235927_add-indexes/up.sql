CREATE UNIQUE INDEX IF NOT EXISTS "github_repos_contributors_user_id_repo_id_idx" ON public.github_repos_contributors (user_id, repo_id);


CREATE INDEX IF NOT EXISTS "github_issues_repo_id_issue_number_idx" ON public.github_issues (repo_id, issue_number);


CREATE INDEX IF NOT EXISTS "github_issues_type_status_idx" ON public.github_issues ("type", "status");


CREATE INDEX IF NOT EXISTS "github_issues_created_at_idx" ON public.github_issues (created_at);


CREATE INDEX IF NOT EXISTS "github_issues_author_id_idx" ON public.github_issues (author_id);


CREATE UNIQUE INDEX IF NOT EXISTS "projects_contributors_github_user_id_project_id_idx" ON public.projects_contributors (github_user_id, project_id);


CREATE UNIQUE INDEX IF NOT EXISTS "pending_project_leader_invitation_github_user_id_project_id_idx" ON public.pending_project_leader_invitations (github_user_id, project_id);


CREATE UNIQUE INDEX IF NOT EXISTS "project_leads_user_id_project_id_idx" ON public.project_leads (user_id, project_id);


CREATE UNIQUE INDEX IF NOT EXISTS "project_github_repos_github_repo_id_project_id_idx" ON public.project_github_repos (github_repo_id, project_id);


CREATE INDEX IF NOT EXISTS "applications_project_id_applicant_id_idx" ON public.applications (project_id, applicant_id);


CREATE INDEX IF NOT EXISTS "project_details_rank_idx" ON public.project_details ("rank" DESC);


CREATE INDEX IF NOT EXISTS "project_details_name_idx" ON public.project_details ("name" ASC);


DROP INDEX IF EXISTS work_items_payment_id_idx,
projects_sponsors_project_id_idx,
project_leads_project_id_idx,
project_leads_user_id_idx,
project_github_repos_github_repo_id_idx,
project_github_repos_project_id_idx;