CREATE OR REPLACE VIEW
    api.contributions_count AS
SELECT
    c.github_user_id,
    DATE_PART('year'::TEXT, c.created_at) AS YEAR,
    DATE_PART('week'::TEXT, c.created_at) AS week,
    COUNT(DISTINCT c.details_id) FILTER (
        WHERE
            c.type = 'issue'::contribution_type
    ) AS issue_count,
    COUNT(DISTINCT c.details_id) FILTER (
        WHERE
            c.type = 'code_review'::contribution_type
    ) AS code_review_count,
    COUNT(DISTINCT c.details_id) FILTER (
        WHERE
            c.type = 'pull_request'::contribution_type
    ) AS pull_request_count
FROM
    api.completed_contributions c
GROUP BY
    c.github_user_id,
    (DATE_PART('year'::TEXT, c.created_at)),
    (DATE_PART('week'::TEXT, c.created_at));
