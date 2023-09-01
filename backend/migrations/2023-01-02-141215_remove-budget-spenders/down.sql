CREATE TABLE budget_spenders (
    budget_id uuid NOT NULL REFERENCES budgets(id),
    user_id uuid NOT NULL,
    PRIMARY KEY (budget_id, user_id)
);

INSERT INTO budget_spenders (
    SELECT
        budgets.id AS budget_id,
        project_leads.user_id
    FROM
        budgets,
        project_leads
    WHERE
        project_leads.project_id = budgets.project_id
);

INSERT INTO events (timestamp, aggregate_name, aggregate_id, payload)(
	SELECT
		e.timestamp AS timestamp,
		'BUDGET' AS aggregate_name,
		b.id AS aggregate_id,
		json_build_object('SpenderAssigned', json_build_object('id', to_jsonb(b.id), 'spender_id', e.payload -> 'LeaderAssigned' -> 'leader_id')) AS payload
	FROM
		budgets b,
        events e
	WHERE
		e.aggregate_name = 'PROJECT'
		AND e.payload -> 'LeaderAssigned' ->> 'id' = b.project_id::text
);

INSERT INTO event_deduplications (
	SELECT
		gen_random_uuid() AS deduplication_id,
        e.index AS event_index
	FROM
        events e
	WHERE
		e.aggregate_name = 'BUDGET'
		AND e.payload ? 'SpenderAssigned'
);
