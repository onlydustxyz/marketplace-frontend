CREATE VIEW
    api.github_issues AS
SELECT
    id,
    repo_id,
    number,
    created_at,
    author_id,
    UPPER(status::TEXT) AS status,
    title,
    html_url,
    closed_at,
    assignee_ids,
    comments_count
FROM
    github_issues;


CREATE VIEW
    api.github_pull_requests AS
SELECT
    id,
    repo_id,
    number,
    created_at,
    author_id,
    merged_at,
    UPPER(status::TEXT) AS status,
    title,
    html_url,
    closed_at,
    draft,
    ci_checks,
    closing_issue_numbers
FROM
    github_pull_requests;


CREATE VIEW
    api.github_pull_request_reviews AS
SELECT
    id,
    pull_request_id,
    reviewer_id,
    UPPER(status::TEXT) AS status,
    outcome,
    submitted_at
FROM
    github_pull_request_reviews;