ALTER TABLE payment_requests ADD hours_worked INT NOT NULL DEFAULT 0;

-- migrate events
UPDATE
    events
SET
    payload = jsonb_set(payload,
				'{Budget,event,Payment,event,Requested,duration_worked}',
				to_jsonb(3600*((payload -> 'Budget' -> 'event' -> 'Payment' -> 'event' -> 'Requested' -> 'amount' ->> 'amount')::INT / (500.0/8))::INT),
				TRUE)
WHERE
    payload -> 'Budget' -> 'event' -> 'Payment' -> 'event' ? 'Requested';
