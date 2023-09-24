CREATE TABLE github_repos_contributors (
    repo_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    PRIMARY KEY (repo_id, user_id)
);
