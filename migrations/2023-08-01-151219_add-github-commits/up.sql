CREATE TABLE
    github_pull_request_commits (
        sha TEXT PRIMARY KEY,
        pull_request_id BIGINT NOT NULL,
        html_url TEXT NOT NULL,
        author_id BIGINT NOT NULL
    );


CREATE INDEX github_pull_request_commits_pull_request on github_pull_request_commits (pull_request_id);