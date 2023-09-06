UPDATE events
SET payload = payload #- '{requested_at}';

ALTER TABLE payment_requests
  DROP COLUMN requested_at;
