UPDATE events
set
    payload = jsonb_set(payload, '{ Created, currency }', '"USD"'::JSONB)
where
    payload ? 'Created'
    and aggregate_name = 'BUDGET';