ALTER TABLE work_items
ADD COLUMN id BIGINT,
ADD COLUMN "type" contribution_type,
ADD COLUMN reviewer_id BIGINT;


ALTER TABLE work_items
RENAME COLUMN issue_number TO number;


-- Extract work items in a temp table
CREATE TABLE
    temp_work_items AS
SELECT
    events.index AS event_index,
    (wi ->> 'repo_id')::BIGINT AS repo_id,
    (wi ->> 'number')::BIGINT AS "number",
    (wi ->> 'type')::TEXT AS "type",
    0 AS id
FROM
    events,
    jsonb_array_elements(payload #> '{ Budget, event, Payment, event, Requested, reason, work_items, work_items }') as wi;


UPDATE temp_work_items
SET
    id = gi.id
FROM
    github_issues gi
WHERE
    temp_work_items.repo_id = gi.repo_id
    AND temp_work_items."number" = gi."number";


UPDATE temp_work_items
SET
    id = gpr.id
FROM
    github_pull_requests gpr
WHERE
    temp_work_items.repo_id = gpr.repo_id
    AND temp_work_items."number" = gpr."number";


UPDATE work_items
SET
    id = twi.id,
    "type" = CASE
        WHEN twi.type = 'ISSUE' THEN 'issue'::contribution_type
        ELSE 'pull_request'::contribution_type
    END
FROM
    temp_work_items twi
WHERE
    work_items.repo_id = twi.repo_id
    AND work_items."number" = twi.number;


ALTER TABLE work_items
ALTER COLUMN id
SET NOT NULL;


ALTER TABLE work_items
ALTER COLUMN "type"
SET NOT NULL;


-- Update events table
WITH
    wi AS (
        SELECT
            event_index,
            jsonb_agg(
                jsonb_build_object(
                    CASE
                        WHEN twi.type = 'ISSUE' THEN 'Issue'
                        ELSE 'PullRequest'
                    END,
                    jsonb_build_object('id', twi.id, 'repo_id', twi.repo_id, 'number', twi.number)
                )
            ) AS items
        FROM
            temp_work_items twi
        GROUP BY
            event_index
    )
UPDATE events
SET
    payload = jsonb_set(
        payload,
        '{ Budget, event, Payment, event, Requested, reason }',
        jsonb_build_object('work_items', wi.items),
        FALSE
    )
FROM
    wi
WHERE
    events.index = wi.event_index;


DROP TABLE temp_work_items;