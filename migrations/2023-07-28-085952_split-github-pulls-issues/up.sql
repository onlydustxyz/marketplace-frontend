-- Drop dependencies
drop view api.contribution_counts;


drop view api.contribution_stats;


drop view api.contributions;


-- New github_pull_requests table
CREATE TYPE github_pull_request_status AS enum('open', 'closed', 'merged');


CREATE TABLE
    github_pull_requests (
        id bigint PRIMARY KEY,
        repo_id bigint NOT NULL,
        number bigint NOT NULL,
        created_at timestamp NOT NULL,
        author_id bigint NOT NULL,
        merged_at timestamp,
        status github_pull_request_status NOT NULL,
        title text NOT NULL,
        html_url text NOT NULL,
        closed_at timestamp
    );


-- Move pulls from github_issues to github_pull_requests
INSERT INTO
    github_pull_requests (id, repo_id, number, created_at, author_id, merged_at, status, title, html_url, closed_at)
SELECT
    id,
    repo_id,
    issue_number,
    created_at,
    author_id,
    merged_at,
    status::text::github_pull_request_status,
    title,
    html_url,
    closed_at
FROM
    github_issues
WHERE
TYPE = 'pull_request'::github_issue_type;


DELETE FROM github_issues
WHERE
TYPE = 'pull_request'::github_issue_type;


-- Remove pull related values from github_issue_status enum
CREATE TYPE github_issue_status_new AS enum('open', 'completed', 'cancelled');


ALTER TABLE github_issues
DROP COLUMN merged_at;


ALTER TABLE github_issues
DROP COLUMN "type";


ALTER TABLE github_issues
RENAME COLUMN issue_number TO number;


ALTER TABLE github_issues
ALTER COLUMN status
TYPE github_issue_status_new USING (status::text::github_issue_status_new);


DROP TYPE github_issue_status;


ALTER TYPE github_issue_status_new
RENAME TO github_issue_status;


DROP TYPE github_issue_type;


-- Recreate dependencies
CREATE OR REPLACE VIEW
    api.contributions AS
SELECT
    p.recipient_id AS github_user_id,
    b.project_id,
    gi.id AS github_issue_id,
    gi.created_at,
    gi.repo_id,
    gi.number as issue_number,
    CASE
        WHEN igi.project_id IS NULL THEN FALSE
        ELSE TRUE
    END as ignored
FROM
    public.github_issues gi
    INNER JOIN public.work_items w ON w.repo_id = gi.repo_id
    AND w.issue_number = gi.number
    INNER JOIN public.payment_requests p ON p.id = w.payment_id
    INNER JOIN public.budgets b ON b.id = p.budget_id
    LEFT JOIN public.ignored_github_issues igi ON igi.project_id = b.project_id
    and igi.repo_id = w.repo_id
    and igi.issue_number = w.issue_number
UNION
SELECT
    p.recipient_id AS github_user_id,
    b.project_id,
    gp.id AS github_issue_id,
    gp.created_at,
    gp.repo_id,
    gp.number as issue_number,
    CASE
        WHEN igi.project_id IS NULL THEN FALSE
        ELSE TRUE
    END as ignored
FROM
    public.github_pull_requests gp
    INNER JOIN public.work_items w ON w.repo_id = gp.repo_id
    AND w.issue_number = gp.number
    INNER JOIN public.payment_requests p ON p.id = w.payment_id
    INNER JOIN public.budgets b ON b.id = p.budget_id
    LEFT JOIN public.ignored_github_issues igi ON igi.project_id = b.project_id
    and igi.repo_id = w.repo_id
    and igi.issue_number = w.issue_number
UNION
SELECT
    gp.author_id AS github_user_id,
    pgr.project_id,
    gp.id AS github_issue_id,
    gp.created_at,
    gp.repo_id,
    gp.number as issue_number,
    CASE
        WHEN igi.project_id IS NULL THEN FALSE
        ELSE TRUE
    END as ignored
FROM
    public.github_pull_requests gp
    INNER JOIN public.project_github_repos pgr ON pgr.github_repo_id = gp.repo_id
    LEFT JOIN public.ignored_github_issues igi ON igi.project_id = pgr.project_id
    and igi.repo_id = pgr.github_repo_id
    and igi.issue_number = gp.number
WHERE
    gp.status = 'merged'::github_pull_request_status;


create view
    api.contribution_counts as
SELECT
    c.github_user_id,
    date_part('year'::text, c.created_at) AS year,
    date_part('week'::text, c.created_at) AS week,
    count(c.github_issue_id) FILTER (
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
    count(c.github_issue_id) FILTER (
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
    ) AS unpaid_count
FROM
    api.contributions c
GROUP BY
    c.github_user_id,
    (date_part('year'::text, c.created_at)),
    (date_part('week'::text, c.created_at));


create view
    api.contribution_stats as
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
