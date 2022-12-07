CREATE TABLE user_info(
    user_id UUID PRIMARY KEY,
    identity JSONB NOT NULL,
    location JSONB NOT NULL,
    email TEXT NOT NULL,
    payout_settings JSONB NOT NULL
)
