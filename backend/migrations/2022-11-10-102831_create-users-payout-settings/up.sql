CREATE TABLE payout_settings
(
    user_id            UUID PRIMARY KEY, -- no foreign key, so that the users projection can be refreshed independently
    eth_wallet_address TEXT
);
