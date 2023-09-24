UPDATE events
set
    payload = jsonb_set(payload, '{Budget, event, Payment,event, Requested, amount, currency}', '"USD"'::JSONB)
where
    payload #> '{Budget, event, Payment,event, Requested}' IS NOT NULL;


UPDATE events
set
    payload = jsonb_set(payload, '{Budget, event, Payment,event, Processed, amount, currency}', '"USD"'::JSONB)
where
    payload #> '{Budget, event, Payment,event, Processed}' IS NOT NULL;