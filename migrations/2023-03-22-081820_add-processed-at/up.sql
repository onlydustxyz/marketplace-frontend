UPDATE
	events
SET
	payload = jsonb_set(payload, '{Budget,event,Payment,event,Processed,processed_at}', to_jsonb (timestamp))
WHERE
	payload @? '$.Budget.event.Payment.event.Processed';

ALTER TABLE payments ADD processed_at TIMESTAMP;

UPDATE
	payments
SET
	processed_at = timestamp
FROM
	events
WHERE
	payments.id::text = payload #>> '{Budget,event,Payment,event,Processed,receipt_id}';

ALTER TABLE payments ALTER COLUMN processed_at SET NOT NULL;
