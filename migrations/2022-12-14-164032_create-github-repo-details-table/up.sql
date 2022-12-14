CREATE TABLE github_repo_details (
    id BIGINT PRIMARY KEY,
    owner TEXT NOT NULL,
    name TEXT NOT NULL,
    languages JSONB NOT NULL
);
