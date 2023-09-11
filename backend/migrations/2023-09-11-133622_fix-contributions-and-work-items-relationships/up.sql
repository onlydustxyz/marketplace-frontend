DROP VIEW api.contributions;


CREATE VIEW
    api.contributions AS
SELECT
    c.id,
    c.user_id AS github_user_id,
    c.details_id,
    c.type,
    c.repo_id,
    c.status,
    c.closed_at,
    c.created_at,
    pgr.project_id,
    CASE
        WHEN c.type = 'issue'::contribution_type THEN c.details_id::BIGINT
        ELSE NULL
    END AS github_issue_id,
    CASE
        WHEN c.type = 'pull_request'::contribution_type THEN c.details_id::BIGINT
        ELSE NULL
    END AS github_pull_request_id,
    CASE
        WHEN c.type = 'code_review'::contribution_type THEN c.details_id
        ELSE NULL
    END AS github_code_review_id,
    EXISTS (
        SELECT
            1
        FROM
            ignored_contributions ic
        WHERE
            ic.contribution_id = c.id
            AND ic.project_id = pgr.project_id
    ) AS ignored
FROM
    contributions c
    JOIN project_github_repos pgr ON pgr.github_repo_id = c.repo_id;


CREATE VIEW
    api.work_items AS
SELECT
    w.id,
    w.type,
    w.repo_id,
    w.number,
    w.payment_id,
    w.project_id,
    w.recipient_id,
    CASE
        WHEN w.type = 'issue'::contribution_type THEN w.id::BIGINT
        ELSE NULL
    END AS github_issue_id,
    CASE
        WHEN w.type = 'pull_request'::contribution_type THEN w.id::BIGINT
        ELSE NULL
    END AS github_pull_request_id,
    CASE
        WHEN w.type = 'code_review'::contribution_type THEN w.id
        ELSE NULL
    END AS github_code_review_id
FROM
    work_items w;