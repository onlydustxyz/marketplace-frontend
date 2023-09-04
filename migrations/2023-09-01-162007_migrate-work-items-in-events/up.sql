-- Extract work items in a temp table
CREATE TABLE
    temp_work_items AS
SELECT
    events.index as event_index,
    (work_items ->> 'repo_id')::BIGINT as repo_id,
    (work_items ->> 'issue_number')::BIGINT as issue_number,
    'ISSUE' as issue_type
FROM
    events,
    jsonb_array_elements(payload #> '{ Budget, event, Payment, event, Requested, reason, work_items }') as work_items;


-- Override type as PULL_REQUEST based on presence in github_pull_requests table
UPDATE temp_work_items
SET
    issue_type = 'PULL_REQUEST'
WHERE
    EXISTS (
        SELECT
            1
        FROM
            github_pull_requests gpr
        WHERE
            temp_work_items.repo_id = gpr.repo_id
            AND temp_work_items.issue_number = gpr."number"
    );


-- Update events table
WITH
    work_items AS (
        SELECT
            event_index,
            jsonb_agg(jsonb_build_object('type', twi.issue_type, 'repo_id', twi.repo_id, 'number', twi.issue_number)) AS work_items
        FROM
            temp_work_items twi
        GROUP BY
            event_index
    )
UPDATE events
SET
    payload = jsonb_set(
        payload,
        '{ Budget, event, Payment, event, Requested, reason, work_items }',
        jsonb_build_object('work_items', work_items.work_items),
        FALSE
    )
FROM
    work_items
WHERE
    events.index = work_items.event_index;


DROP TABLE temp_work_items;