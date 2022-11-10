CREATE TABLE payments (
    id              UUID PRIMARY KEY,
    amount          NUMERIC NOT NULL,
    currency_code   TEXT NOT NULL,
    recipient_id    UUID NOT NULL,
    reason          JSONB NOT NULL,
    receipt         JSONB
);
