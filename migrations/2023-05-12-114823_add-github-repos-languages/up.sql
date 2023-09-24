ALTER TABLE crm_github_repos
    ADD languages JSONB NOT NULL DEFAULT '{}'::jsonb;
