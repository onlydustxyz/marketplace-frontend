CREATE TABLE tmp_budget_project_mapping AS
SELECT
	payload -> 'Allocated' -> 'topic' ->> 'Project' AS project_id,
	aggregate_id AS budget_id
FROM
	events
WHERE
	aggregate_name = 'BUDGET'
	AND payload ? 'Allocated';

UPDATE
	events
SET
	aggregate_name = 'PROJECT',
	aggregate_id = tmp.project_id,
	payload = json_build_object(
        'Budget', json_build_object(
            'id', to_jsonb(tmp.project_id),
            'event', payload #- '{Allocated,topic}'
        )
    )
FROM
	tmp_budget_project_mapping tmp
WHERE
	tmp.budget_id = aggregate_id
	AND aggregate_name = 'BUDGET'
;

DROP TABLE tmp_budget_project_mapping;
