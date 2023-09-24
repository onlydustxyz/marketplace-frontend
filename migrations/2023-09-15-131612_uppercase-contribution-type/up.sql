drop view api.contributions;


create view
    api.contributions as
SELECT
    c.id,
    c.user_id AS github_user_id,
    c.details_id,
    UPPER(c.type::text) as "type",
    c.repo_id,
    c.status,
    c.closed_at,
    c.created_at,
    pgr.project_id,
    CASE
        WHEN c.type = 'issue'::contribution_type THEN c.details_id::bigint
        ELSE NULL::bigint
    END AS github_issue_id,
    CASE
        WHEN c.type = 'pull_request'::contribution_type THEN c.details_id::bigint
        ELSE NULL::bigint
    END AS github_pull_request_id,
    CASE
        WHEN c.type = 'code_review'::contribution_type THEN c.details_id
        ELSE NULL::text
    END AS github_code_review_id,
    (
        EXISTS (
            SELECT
                1
            FROM
                ignored_contributions ic
            WHERE
                ic.contribution_id = c.id
                AND ic.project_id = pgr.project_id
        )
    ) AS ignored
FROM
    contributions c
    JOIN project_github_repos pgr ON pgr.github_repo_id = c.repo_id;