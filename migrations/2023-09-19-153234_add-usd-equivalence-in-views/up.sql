DROP VIEW api.payment_stats;


CREATE VIEW
    api.payment_stats AS
SELECT
    p.recipient_id AS github_user_id,
    p.project_id as project_id,
    sum(p.amount) AS money_granted,
    UPPER(p.currency::TEXT) as currency,
    sum(p.amount) * CASE
        WHEN p.currency = 'usd'::currency THEN 1
        ELSE q.price
    END as money_granted_usd
FROM
    payment_requests p
    LEFT JOIN crypto_usd_quotes q ON q.currency = p.currency
GROUP BY
    github_user_id,
    project_id,
    p.currency,
    q.price;


DROP VIEW api.budgets;


CREATE VIEW
    api.budgets AS
WITH
    budgets_with_rates AS (
        SELECT
            b.id,
            b.currency,
            b.initial_amount,
            b.remaining_amount,
            b.initial_amount - b.remaining_amount AS spent_amount,
            CASE
                WHEN b.currency = 'usd'::currency THEN 1
                ELSE q.price
            END AS usd_rate
        FROM
            budgets b
            LEFT JOIN crypto_usd_quotes q ON b.currency = q.currency
    )
SELECT
    b.id AS id,
    UPPER(b.currency::TEXT) AS currency,
    b.initial_amount,
    b.initial_amount * b.usd_rate AS initial_amount_usd,
    b.remaining_amount,
    b.remaining_amount * b.usd_rate AS remaining_amount_usd,
    b.spent_amount,
    b.spent_amount * b.usd_rate AS spent_amount_usd
FROM
    budgets_with_rates b;


CREATE VIEW
    api.payment_requests AS
SELECT
    p.id,
    p.requestor_id,
    p.recipient_id,
    p.amount,
    p.requested_at,
    p.invoice_received_at,
    p.hours_worked,
    p.project_id,
    p.currency,
    p.amount * CASE
        WHEN p.currency = 'usd'::currency THEN 1
        ELSE q.price
    END AS amount_usd
FROM
    payment_requests p
    LEFT JOIN crypto_usd_quotes q ON q.currency = p.currency;