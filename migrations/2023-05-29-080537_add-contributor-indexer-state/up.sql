ALTER TABLE github_user_indexes
ADD COLUMN contributor_indexer_state JSONB;


UPDATE github_user_indexes
SET
    user_indexer_state = NULL;