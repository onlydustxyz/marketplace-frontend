UPDATE events
SET payload = jsonb_set(foo.payload, '{requested_at}', to_jsonb(foo.timestamp))
FROM (
	SELECT "timestamp", payload, "index" FROM events
	WHERE aggregate_name = 'PAYMENT' AND payload?'Requested'
) as foo
WHERE foo.index = events.index;

ALTER TABLE payment_requests
  ADD requested_at TIMESTAMP;

UPDATE payment_requests
SET requested_at=subquery.timestamp
FROM (
    SELECT "timestamp", payment_requests.id FROM payment_requests INNER JOIN (
        SELECT aggregate_id, "timestamp" FROM events WHERE aggregate_name = 'PAYMENT' AND payload?'Requested'
    ) foo ON payment_requests.id = foo.aggregate_id::UUID
) AS subquery
WHERE subquery.id = payment_requests.id;

ALTER TABLE payment_requests
ALTER COLUMN requested_at SET NOT NULL;
