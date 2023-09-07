DROP VIEW api.contribution_counts;


DROP VIEW api.contribution_stats;


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
    EXISTS (
        SELECT
            1
        FROM
            ignored_contributions ic
        WHERE
            ic.contribution_id = c.id
            and ic.project_id = pgr.project_id
    ) AS ignored
FROM
    contributions c
    JOIN project_github_repos pgr ON pgr.github_repo_id = c.repo_id;


CREATE VIEW
    api.contribution_stats AS
SELECT
    c.github_user_id,
    c.project_id,
    count(*) AS total_count,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'issue'::contribution_type
    ) AS issue_count,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'code_review'::contribution_type
    ) AS code_review_count,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'pull_request'::contribution_type
    ) AS pull_request_count,
    min(c.created_at) AS min_date,
    max(c.created_at) AS max_date
FROM
    api.completed_contributions c
GROUP BY
    c.github_user_id,
    c.project_id;


CREATE VIEW
    api.contribution_counts AS
SELECT
    c.github_user_id,
    date_part('year'::text, c.created_at) AS year,
    date_part('week'::text, c.created_at) AS week,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'issue'::contribution_type
    ) AS issue_count,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'code_review'::contribution_type
    ) AS code_review_count,
    count(c.details_id) FILTER (
        WHERE
            c.type = 'pull_request'::contribution_type
    ) AS pull_request_count
FROM
    api.completed_contributions c
GROUP BY
    c.github_user_id,
    (date_part('year'::text, c.created_at)),
    (date_part('week'::text, c.created_at));