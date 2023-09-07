ALTER TABLE github_repo_indexes
ADD COLUMN indexed_at TIMESTAMP;


ALTER TABLE github_user_indexes
ADD COLUMN indexed_at TIMESTAMP;