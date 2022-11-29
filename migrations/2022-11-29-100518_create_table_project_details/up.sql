CREATE TABLE project_details (
    project_id UUID PRIMARY KEY,
    github_repo_id BIGINT NOT NULL,
    description TEXT,
    telegram_link TEXT
);
