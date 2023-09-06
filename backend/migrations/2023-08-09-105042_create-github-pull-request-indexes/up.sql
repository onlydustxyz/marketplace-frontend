ALTER TABLE github_pull_requests
ALTER COLUMN closing_issue_numbers
DROP NOT NULL;


CREATE TABLE
    github_pull_request_indexes (pull_request_id BIGINT PRIMARY KEY, pull_request_indexer_state JSONB);