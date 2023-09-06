DROP TABLE budget_spenders;

DELETE FROM events
WHERE aggregate_name = 'BUDGET'
	AND payload ? 'SpenderAssigned';

DELETE FROM event_deduplications
WHERE NOT EXISTS (
    SELECT
        1
    FROM
        events
    WHERE
        events.index = event_index
);
