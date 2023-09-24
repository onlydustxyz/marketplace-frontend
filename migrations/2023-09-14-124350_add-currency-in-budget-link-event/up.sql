UPDATE events
SET
    payload = jsonb_set(payload, '{ BudgetLinked, currency }', '"USD"'::JSONB)
WHERE
    aggregate_name = 'PROJECT'
    and payload ? 'BudgetLinked';