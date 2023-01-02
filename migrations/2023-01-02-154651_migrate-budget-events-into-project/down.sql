CREATE TABLE tmp_budget_project_mapping AS
SELECT
	payload -> 'Budget' -> 'event' -> 'Allocated' ->> 'id' AS budget_id,
	aggregate_id AS project_id
FROM
	events
WHERE
	payload -> 'Budget' -> 'event' ? 'Allocated';

UPDATE
	events
SET
	aggregate_name = 'BUDGET',
	aggregate_id = tmp.budget_id,
	payload = payload -> 'Budget' -> 'event'
FROM
	tmp_budget_project_mapping tmp
WHERE
	tmp.project_id = aggregate_id
	AND payload ? 'Budget'
;


UPDATE
	events
SET
	payload = jsonb_set(payload, '{Allocated,topic}', jsonb_build_object('Project', tmp.project_id))
FROM
	tmp_budget_project_mapping tmp
WHERE
	tmp.budget_id = aggregate_id
	AND payload ? 'Allocated'
;

DROP TABLE tmp_budget_project_mapping;
