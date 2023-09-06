DROP VIEW IF EXISTS public.contribution_counts;


DROP VIEW IF EXISTS api.contribution_counts;


DROP VIEW IF EXISTS public.contributions_stats;


DROP VIEW IF EXISTS api.contributions_stats;


DROP VIEW IF EXISTS public.contributions CASCADE;


DROP VIEW IF EXISTS api.contributions CASCADE;


CREATE OR REPLACE VIEW
    api.contributions AS
SELECT
    p.recipient_id AS github_user_id,
    b.project_id,
    gi.id AS github_issue_id,
    gi.created_at,
    gi.repo_id,
    gi.issue_number,
    CASE
        WHEN igi.project_id IS NULL THEN FALSE
        ELSE TRUE
    END as ignored
FROM
    public.github_issues gi
    INNER JOIN public.work_items w ON w.repo_id = gi.repo_id
    AND w.issue_number = gi.issue_number
    INNER JOIN public.payment_requests p ON p.id = w.payment_id
    INNER JOIN public.budgets b ON b.id = p.budget_id
    LEFT JOIN public.ignored_github_issues igi ON igi.project_id = b.project_id
    and igi.repo_id = w.repo_id
    and igi.issue_number = w.issue_number
UNION
SELECT
    gi.author_id AS github_user_id,
    pgr.project_id,
    gi.id AS github_issue_id,
    gi.created_at,
    gi.repo_id,
    gi.issue_number,
    CASE
        WHEN igi.project_id IS NULL THEN FALSE
        ELSE TRUE
    END as ignored
FROM
    public.github_issues gi
    INNER JOIN public.project_github_repos pgr ON pgr.github_repo_id = gi.repo_id
    LEFT JOIN public.ignored_github_issues igi ON igi.project_id = pgr.project_id
    and igi.repo_id = pgr.github_repo_id
    and igi.issue_number = gi.issue_number
WHERE
    gi.type = '"PullRequest"'::jsonb
    AND gi.status = '"Merged"'::jsonb;


CREATE OR REPLACE VIEW
    api.contribution_stats AS
SELECT
    c.github_user_id,
    c.project_id,
    count(*) AS total_count,
    count(*) FILTER (
        WHERE
            (
                EXISTS (
                    SELECT
                        1
                    FROM
                        payment_requests pr
                        JOIN work_items wi ON wi.payment_id = pr.id
                        AND wi.repo_id = c.repo_id
                        AND wi.issue_number = c.issue_number
                    WHERE
                        pr.recipient_id = c.github_user_id
                )
            )
    ) AS paid_count,
    count(*) FILTER (
        WHERE
            NOT (
                EXISTS (
                    SELECT
                        1
                    FROM
                        payment_requests pr
                        JOIN work_items wi ON wi.payment_id = pr.id
                        AND wi.repo_id = c.repo_id
                        AND wi.issue_number = c.issue_number
                    WHERE
                        pr.recipient_id = c.github_user_id
                )
            )
    ) AS unpaid_count,
    count(*) FILTER (
        WHERE
            NOT c.ignored
            AND NOT (
                EXISTS (
                    SELECT
                        1
                    FROM
                        payment_requests pr
                        JOIN work_items wi ON wi.payment_id = pr.id
                        AND wi.repo_id = c.repo_id
                        AND wi.issue_number = c.issue_number
                    WHERE
                        pr.recipient_id = c.github_user_id
                )
            )
    ) AS unpaid_unignored_count,
    min(c.created_at) AS min_date,
    max(c.created_at) AS max_date
FROM
    api.contributions c
GROUP BY
    c.github_user_id,
    c.project_id;


CREATE OR REPLACE VIEW
    api.contribution_counts AS
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
                    public.payment_requests pr
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
                    public.payment_requests pr
                    INNER JOIN work_items wi ON wi.payment_id = pr.id
                    AND wi.repo_id = c.repo_id
                    AND wi.issue_number = c.issue_number
                WHERE
                    pr.recipient_id = c.github_user_id
            )
    ) AS unpaid_count
FROM
    api.contributions c
GROUP BY
    github_user_id,
    "year",
    "week";