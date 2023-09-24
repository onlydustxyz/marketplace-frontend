DROP VIEW api.payment_stats;


ALTER TABLE payment_requests
RENAME COLUMN amount_in_usd TO amount;


ALTER TABLE payment_requests
ALTER COLUMN amount
TYPE NUMERIC;


ALTER TABLE payment_requests
ADD COLUMN currency currency;


UPDATE payment_requests
SET
    currency = 'usd'::currency;


ALTER TABLE payment_requests
ALTER COLUMN currency
SET NOT NULL;


CREATE VIEW
    api.payment_stats AS
SELECT
    p.recipient_id AS github_user_id,
    p.project_id,
    sum(p.amount) AS money_granted,
    p.currency AS currency
FROM
    payment_requests p
GROUP BY
    p.recipient_id,
    p.project_id,
    p.currency;