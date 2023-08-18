CREATE TYPE contribution_status AS enum('in_progress', 'complete', 'canceled');

ALTER TABLE contributions
    ADD COLUMN status contribution_status;

UPDATE contributions
SET status = 'in_progress'
WHERE status IS NULL;

ALTER TABLE contributions
    ALTER COLUMN status SET NOT NULL;

ALTER TABLE contributions
    ADD COLUMN created_at TIMESTAMP;

UPDATE contributions
SET created_at = CURRENT_DATE
WHERE created_at IS NULL;

ALTER TABLE contributions
    ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE contributions
    ADD COLUMN closed_at TIMESTAMP;

CREATE
OR REPLACE VIEW
    api.contributions_new AS
SELECT c.user_id AS github_user_id,
       c.details_id,
       c.type,
       c.repo_id,
       c.status,
       c.closed_at,
       c.created_at,
       pgr.project_id
FROM public.contributions c
         INNER JOIN public.project_github_repos pgr ON pgr.github_repo_id = c.repo_id;

CREATE
OR REPLACE VIEW
    api.contribution_count_new AS
SELECT c.github_user_id,
       date_part('year'::text, c.created_at) AS year,
       date_part('week'::text, c.created_at) AS week,
       count(c.details_id) FILTER (
           WHERE c.type = 'issue' )          AS issue_count,
       count(c.details_id) FILTER (
           WHERE c.type = 'code_review' )    AS code_review_count,
       count(c.details_id) FILTER (
           WHERE c.type = 'pull_request' )   AS pull_request_count
FROM api.contributions_new c
GROUP BY c.github_user_id,
    (date_part('year'::text, c.created_at)),
    (date_part('week'::text, c.created_at));


CREATE VIEW
    api.contribution_stats_new AS
SELECT c.github_user_id,
       c.project_id,
       count(*)          AS total_count,
       count(c.details_id)  FILTER (
           WHERE c.type = 'issue' )        AS issue_count, count(c.details_id) FILTER (
           WHERE c.type = 'code_review' )  AS code_review_count, count(c.details_id) FILTER (
           WHERE c.type = 'pull_request' ) AS pull_request_count, min(c.created_at) AS min_date,
       max(c.created_at) AS max_date
FROM api.contributions_new c
GROUP BY c.github_user_id,
         c.project_id;
