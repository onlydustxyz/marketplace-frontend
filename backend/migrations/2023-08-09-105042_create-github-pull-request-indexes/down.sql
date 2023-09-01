DROP TABLE github_pull_request_indexes;


ALTER TABLE github_pull_requests
ALTER COLUMN closing_issue_numbers
SET NOT NULL;