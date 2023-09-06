-- add id column in github_pull_request_reviews as primary key
ALTER TABLE github_pull_request_reviews
DROP CONSTRAINT github_pull_request_reviews_pkey;


ALTER TABLE github_pull_request_reviews
ADD COLUMN id TEXT;


UPDATE github_pull_request_reviews
SET
    id = encode(sha256(row (pull_request_id, reviewer_id)::text::bytea), 'hex');


ALTER table github_pull_request_reviews
ADD PRIMARY KEY (ID);


ALTER TABLE work_items
DROP COLUMN reviewer_id;


-- Drop the views
DROP VIEW IF EXISTS api.contribution_counts;


DROP VIEW IF EXISTS api.contribution_stats;


DROP VIEW IF EXISTS api.contributions;


DROP VIEW IF EXISTS api.completed_contributions;


-- Update the details id type
ALTER TABLE contributions
ALTER COLUMN details_id
TYPE TEXT;


-- Update the work_items id type
ALTER TABLE work_items
ALTER COLUMN id
TYPE TEXT;


-- Recreate the views
CREATE VIEW
    api.contributions AS
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


CREATE VIEW
    api.completed_contributions AS
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
    INNER JOIN public.project_github_repos pgr ON pgr.github_repo_id = c.repo_id
WHERE
    c.status = 'complete'::contribution_status;


CREATE VIEW
    api.contribution_counts AS
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
    api.completed_contributions c
GROUP BY
    c.github_user_id,
    (DATE_PART('year'::TEXT, c.created_at)),
    (DATE_PART('week'::TEXT, c.created_at));


CREATE VIEW
    api.contribution_stats AS
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
    api.completed_contributions c
GROUP BY
    c.github_user_id,
    c.project_id;