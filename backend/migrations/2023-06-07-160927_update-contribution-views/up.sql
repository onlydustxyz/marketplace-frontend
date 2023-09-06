DROP VIEW IF EXISTS contribution_stats;


DROP VIEW IF EXISTS contribution_counts;


CREATE OR REPLACE VIEW
    contribution_stats AS
SELECT
    github_user_id,
    project_id,
    COUNT(*) AS total_count,
    COUNT(*) FILTER (
        WHERE
            EXISTS (
                SELECT
                    1
                FROM
                    payment_requests pr
                    INNER JOIN work_items wi ON wi.payment_id = pr.id
                    AND wi.repo_id = c.repo_id
                    AND wi.issue_number = c.issue_number
                WHERE
                    pr.recipient_id = c.github_user_id
            )
    ) AS paid_count,
    COUNT(*) FILTER (
        WHERE
            NOT EXISTS (
                SELECT
                    1
                FROM
                    payment_requests pr
                    INNER JOIN work_items wi ON wi.payment_id = pr.id
                    AND wi.repo_id = c.repo_id
                    AND wi.issue_number = c.issue_number
                WHERE
                    pr.recipient_id = c.github_user_id
            )
    ) AS unpaid_count,
    MIN(created_at) AS min_date,
    MAX(created_at) AS max_date
FROM
    contributions c
GROUP BY
    github_user_id,
    project_id;


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
                    payment_requests pr
                    INNER JOIN work_items wi ON wi.payment_id = pr.id
                    AND wi.repo_id = c.repo_id
                    AND wi.issue_number = c.issue_number
                WHERE
                    pr.recipient_id = c.github_user_id
            )
    ) AS paid_count,
    COUNT(c.github_issue_id) FILTER (
        WHERE
            NOT EXISTS (
                SELECT
                    1
                FROM
                    payment_requests pr
                    INNER JOIN work_items wi ON wi.payment_id = pr.id
                    AND wi.repo_id = c.repo_id
                    AND wi.issue_number = c.issue_number
                WHERE
                    pr.recipient_id = c.github_user_id
            )
    ) AS unpaid_count
FROM
    contributions c
GROUP BY
    github_user_id,
    "year",
    "week";