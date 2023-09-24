CREATE TABLE
    closing_issues (
        github_issue_id BIGINT NOT NULL,
        github_pull_request_id BIGINT NOT NULL,
        PRIMARY KEY (github_issue_id, github_pull_request_id)
    );


INSERT INTO
    closing_issues (github_issue_id, github_pull_request_id)
SELECT
    JSONB_ARRAY_ELEMENTS(closing_issue_numbers)::BIGINT,
    id
FROM
    github_pull_requests
WHERE
    JSONB_ARRAY_LENGTH(closing_issue_numbers) > 0;


DROP VIEW api.github_pull_requests;


CREATE VIEW
    api.github_pull_requests AS
SELECT
    pr.id,
    pr.repo_id,
    pr.number,
    pr.created_at,
    pr.author_id,
    pr.merged_at,
    UPPER(pr.status::TEXT) AS status,
    pr.title,
    pr.html_url,
    pr.closed_at,
    pr.draft,
    pr.ci_checks
FROM
    github_pull_requests pr;


ALTER TABLE github_pull_requests
DROP COLUMN closing_issue_numbers;


CREATE VIEW
    api.closing_issues AS
SELECT
    github_pull_request_id,
    github_issue_id
FROM
    closing_issues;


CREATE VIEW
    api.closed_by_pull_requests AS
SELECT
    github_pull_request_id,
    github_issue_id
FROM
    closing_issues;
