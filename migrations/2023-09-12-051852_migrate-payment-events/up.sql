UPDATE events
SET
    aggregate_name = 'PAYMENT',
    aggregate_id = payload #>> '{ Budget, event, Payment, event, Requested, id }',
    payload = jsonb_set(
        payload #> '{ Budget, event, Payment, event }',
        '{ Requested, project_id }',
        to_jsonb(aggregate_id),
        TRUE
    )
where
    payload #> '{ Budget, event, Payment, event, Requested }' IS NOT NULL;


UPDATE events
SET
    aggregate_name = 'PAYMENT',
    aggregate_id = payload #>> '{ Budget, event, Payment, event, Cancelled, id }',
    payload = payload #> '{ Budget, event, Payment, event }'
where
    payload #> '{ Budget, event, Payment, event, Cancelled }' IS NOT NULL;


UPDATE events
SET
    aggregate_name = 'PAYMENT',
    aggregate_id = payload #>> '{ Budget, event, Payment, event, Processed, id }',
    payload = payload #> '{ Budget, event, Payment, event }'
where
    payload #> '{ Budget, event, Payment, event, Processed }' IS NOT NULL;


UPDATE events
SET
    aggregate_name = 'PAYMENT',
    aggregate_id = payload #>> '{ Budget, event, Payment, event, InvoiceReceived, id }',
    payload = payload #> '{ Budget, event, Payment, event }'
where
    payload #> '{ Budget, event, Payment, event, InvoiceReceived }' IS NOT NULL;


UPDATE events
SET
    aggregate_name = 'PAYMENT',
    aggregate_id = payload #>> '{ Budget, event, Payment, event, InvoiceRejected, id }',
    payload = payload #> '{ Budget, event, Payment, event }'
where
    payload #> '{ Budget, event, Payment, event, InvoiceRejected }' IS NOT NULL;