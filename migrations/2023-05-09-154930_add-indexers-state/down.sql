ALTER TABLE github_repo_indexes
    DROP COLUMN repo_indexer_state,
    DROP COLUMN issues_indexer_state;

ALTER TABLE github_user_indexes
    DROP COLUMN user_indexer_state,
    DROP COLUMN contributors_indexer_state;
