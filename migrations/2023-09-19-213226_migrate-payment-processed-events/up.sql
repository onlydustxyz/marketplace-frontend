UPDATE events
SET
    payload = jsonb_set(
        payload,
        '{Processed,receipt,Ethereum}',
        (payload #> '{Processed,receipt,OnChainPayment}') - 'network'
    ) #- '{Processed,receipt,OnChainPayment}'
where
    aggregate_name = 'PAYMENT'
    and payload #> '{Processed,receipt,OnChainPayment}' is not null;


UPDATE events
SET
    payload = jsonb_set(payload, '{Processed,receipt,Sepa}', (payload #> '{Processed,receipt,FiatPayment}')) #- '{Processed,receipt,FiatPayment}'
where
    aggregate_name = 'PAYMENT'
    and payload #> '{Processed,receipt,FiatPayment}' is not null;