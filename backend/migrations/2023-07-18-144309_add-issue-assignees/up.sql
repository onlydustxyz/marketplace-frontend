ALTER TABLE github_issues
ADD COLUMN assignee_ids JSONB NOT NULL DEFAULT '[]';