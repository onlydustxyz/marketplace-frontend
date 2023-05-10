ALTER TABLE github_repo_indexes
    ADD COLUMN repo_indexer_state jsonb,
    ADD COLUMN issues_indexer_state jsonb;

ALTER TABLE github_user_indexes
    ADD COLUMN user_indexer_state jsonb;
