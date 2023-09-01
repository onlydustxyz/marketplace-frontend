ALTER TABLE payments
    ALTER COLUMN id DROP DEFAULT,
    ADD reason JSONB NOT NULL,
    ADD recipient_id UUID NOT NULL,
    ALTER COLUMN receipt DROP NOT NULL,
    DROP COLUMN request_id;

ALTER TABLE payment_requests
    ALTER COLUMN id DROP DEFAULT;
