ALTER TABLE github_repo_indexes
DROP COLUMN indexed_at;


ALTER TABLE github_user_indexes
DROP COLUMN indexed_at;


DROP VIEW IF EXISTS api.github_repos;