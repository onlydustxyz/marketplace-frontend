CREATE TABLE github_pulls (
    id BIGINT PRIMARY KEY,
    repo_id BIGINT NOT NULL,
    issue_number BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    author_id BIGINT NOT NULL,
    merged_at TIMESTAMP
);
