ALTER TABLE payments
    ALTER COLUMN id SET DEFAULT gen_random_uuid(),
    DROP COLUMN reason,
    DROP COLUMN recipient_id,
    ALTER COLUMN receipt SET NOT NULL,
    ADD request_id UUID REFERENCES payment_requests(id);

ALTER TABLE payment_requests
    ALTER COLUMN id SET DEFAULT gen_random_uuid();
