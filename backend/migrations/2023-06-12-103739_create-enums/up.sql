DROP VIEW IF EXISTS api.contribution_counts;


DROP VIEW IF EXISTS api.contributions_stats;


DROP VIEW IF EXISTS api.contributions CASCADE;


create type github_issue_type as enum('pull_request', 'issue');


create type github_issue_status as enum('open', 'closed', 'merged', 'completed', 'cancelled');


create type project_visibility as enum('public', 'private');


alter table github_issues
alter column "type"
drop default,
alter column "status"
drop default,
alter column "title"
drop default,
alter column "html_url"
drop default;


alter table project_details
alter column "visibility"
drop default;


alter table github_issues
alter column "type"
type github_issue_type using CASE
    WHEN "type" = '"PullRequest"'::JSONB THEN 'pull_request'::github_issue_type
    WHEN "type" = '"Issue"'::JSONB THEN 'issue'::github_issue_type
END;


alter table github_issues
alter column "status"
type github_issue_status using CASE
    WHEN "status" = '"Open"'::JSONB THEN 'open'::github_issue_status
    WHEN "status" = '"Closed"'::JSONB THEN 'closed'::github_issue_status
    WHEN "status" = '"Merged"'::JSONB THEN 'merged'::github_issue_status
    WHEN "status" = '"Completed"'::JSONB THEN 'completed'::github_issue_status
    WHEN "status" = '"Cancelled"'::JSONB THEN 'cancelled'::github_issue_status
END;


alter table project_details
alter column "visibility"
type project_visibility using CASE
    WHEN "visibility" = '"Public"'::JSONB THEN 'public'::project_visibility
    WHEN "visibility" = '"Private"'::JSONB THEN 'private'::project_visibility
END;


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
    gi.type = 'pull_request'::github_issue_type
    AND gi.status = 'merged'::github_issue_status;


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