ALTER TABLE github_pull_requests
ADD COLUMN closing_issue_numbers JSONB NOT NULL DEFAULT '[]'::JSONB;