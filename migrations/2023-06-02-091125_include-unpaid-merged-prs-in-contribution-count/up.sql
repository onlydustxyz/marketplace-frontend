DROP VIEW IF EXISTS user_contribution_projects;


DROP VIEW IF EXISTS user_contribution_counts;


CREATE OR REPLACE VIEW
    contributions AS
SELECT
    p.recipient_id AS github_user_id,
    b.project_id,
    gi.id AS github_issue_id,
    gi.created_at,
    gi.repo_id,
    gi.issue_number
FROM
    github_issues gi
    INNER JOIN work_items w ON w.repo_id = gi.repo_id
    AND w.issue_number = gi.issue_number
    INNER JOIN payment_requests p ON p.id = w.payment_id
    INNER JOIN budgets b ON b.id = p.budget_id
UNION
SELECT
    gi.author_id AS github_user_id,
    pgr.project_id,
    gi.id AS github_issue_id,
    gi.created_at,
    gi.repo_id,
    gi.issue_number
FROM
    github_issues gi
    INNER JOIN project_github_repos pgr ON pgr.github_repo_id = gi.repo_id
WHERE
    gi.type = '"PullRequest"'::jsonb
    AND gi.status = '"Merged"'::jsonb;


CREATE OR REPLACE VIEW
    contribution_counts AS
SELECT
    c.github_user_id AS github_user_id,
    DATE_PART('year', c.created_at) AS "year",
    DATE_PART('week', c.created_at) AS "week",
    COUNT(c.github_issue_id) FILTER (
        WHERE
            EXISTS (
                SELECT
                    1
                FROM
                    work_items w
                WHERE
                    w.repo_id = c.repo_id
                    AND w.issue_number = c.issue_number
            )
    ) AS paid_count,
    COUNT(c.github_issue_id) FILTER (
        WHERE
            NOT EXISTS (
                SELECT
                    1
                FROM
                    work_items w
                WHERE
                    w.repo_id = c.repo_id
                    AND w.issue_number = c.issue_number
            )
    ) AS unpaid_count
FROM
    contributions c
GROUP BY
    github_user_id,
    "year",
    "week";


CREATE OR REPLACE VIEW
    contribution_stats AS
SELECT
    github_user_id,
    project_id,
    COUNT(*) AS COUNT,
    MIN(created_at) AS min_date,
    MAX(created_at) AS max_date
FROM
    contributions
GROUP BY
    github_user_id,
    project_id;


CREATE OR REPLACE VIEW
    payment_stats AS
SELECT
    p.recipient_id AS github_user_id,
    b.project_id AS project_id,
    SUM(p.amount_in_usd) AS money_granted
FROM
    payment_requests p
    INNER JOIN budgets b ON b.id = p.budget_id
GROUP BY
    github_user_id,
    project_id;