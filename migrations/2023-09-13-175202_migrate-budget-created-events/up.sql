INSERT INTO
    EVENTS (timestamp, aggregate_name, aggregate_id, payload) (
        SELECT
            "timestamp",
            aggregate_name,
            aggregate_id,
            jsonb_build_object(
                'BudgetLinked',
                jsonb_build_object('id', aggregate_id, 'budget_id', payload #>> '{ Budget, event, Created, id }')
            ) AS payload
        FROM
            events
        WHERE
            payload #> '{ Budget, event, Created }' IS NOT NULL
    );


UPDATE events
SET
    aggregate_name = 'BUDGET',
    aggregate_id = payload #>> '{ Budget, event, Created, id }',
    payload = payload #> '{ Budget, event }' #- '{ Created, project_id }'
where
    payload #> '{ Budget, event, Created }' IS NOT NULL;


UPDATE events
SET
    aggregate_name = 'BUDGET',
    aggregate_id = payload #>> '{ Budget, event, Allocated, id }',
    payload = payload #> '{ Budget, event }'
where
    payload #> '{ Budget, event, Allocated }' IS NOT NULL;