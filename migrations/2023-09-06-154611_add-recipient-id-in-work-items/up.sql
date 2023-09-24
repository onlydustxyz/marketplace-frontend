ALTER TABLE work_items
ADD COLUMN recipient_id BIGINT;


UPDATE work_items
SET
    recipient_id = p.recipient_id
FROM
    payment_requests p
WHERE
    p.id = payment_id;


ALTER TABLE work_items
ALTER COLUMN recipient_id
SET NOT NULL;