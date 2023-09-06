CREATE TABLE ignored_github_issues (
    project_id UUID NOT NULL REFERENCES projects(id),
    repo_id BIGINT NOT NULL,
    issue_number BIGINT NOT NULL,
    PRIMARY KEY (project_id, repo_id, issue_number)
);
