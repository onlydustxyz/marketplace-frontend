CREATE TYPE contribution_status AS ENUM('in_progress', 'complete', 'canceled');


ALTER TABLE contributions
ADD COLUMN status contribution_status;


UPDATE contributions
SET
    status = 'in_progress'
WHERE
    status IS NULL;


ALTER TABLE contributions
ALTER COLUMN status
SET NOT NULL;


ALTER TABLE contributions
ADD COLUMN created_at TIMESTAMP;


UPDATE contributions
SET
    created_at = CURRENT_DATE
WHERE
    created_at IS NULL;


ALTER TABLE contributions
ALTER COLUMN created_at
SET NOT NULL;


ALTER TABLE contributions
ADD COLUMN closed_at TIMESTAMP;


CREATE OR REPLACE VIEW
    api.contributions_v2 AS
SELECT
    c.user_id AS github_user_id,
    c.details_id,
    c.type,
    c.repo_id,
    c.status,
    c.closed_at,
    c.created_at,
    pgr.project_id
FROM
    public.contributions c
    INNER JOIN public.project_github_repos pgr ON pgr.github_repo_id = c.repo_id;


CREATE OR REPLACE VIEW
    api.contribution_count_v2 AS
SELECT
    c.github_user_id,
    DATE_PART('year'::TEXT, c.created_at) AS YEAR,
    DATE_PART('week'::TEXT, c.created_at) AS week,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'issue'
    ) AS issue_count,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'code_review'
    ) AS code_review_count,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'pull_request'
    ) AS pull_request_count
FROM
    api.contributions_v2 c
GROUP BY
    c.github_user_id,
    (DATE_PART('year'::TEXT, c.created_at)),
    (DATE_PART('week'::TEXT, c.created_at));


CREATE VIEW
    api.contribution_stats_v2 AS
SELECT
    c.github_user_id,
    c.project_id,
    COUNT(*) AS total_count,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'issue'
    ) AS issue_count,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'code_review'
    ) AS code_review_count,
    COUNT(c.details_id) FILTER (
        WHERE
            c.type = 'pull_request'
    ) AS pull_request_count,
    MIN(c.created_at) AS min_date,
    MAX(c.created_at) AS max_date
FROM
    api.contributions_v2 c
GROUP BY
    c.github_user_id,
    c.project_id;


ALTER TABLE projects_contributors
DROP COLUMN link_count;


CREATE TABLE
    projects_rewarded_users (
        project_id UUID NOT NULL,
        github_user_id BIGINT NOT NULL,
        reward_count INT NOT NULL,
        PRIMARY KEY (project_id, github_user_id)
    );