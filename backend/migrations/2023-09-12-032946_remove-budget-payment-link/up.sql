DROP VIEW payment_stats;


ALTER TABLE payment_requests
ADD COLUMN project_id UUID;


UPDATE payment_requests
SET
    project_id = b.project_id
FROM
    budgets b
WHERE
    b.id = budget_id;


ALTER TABLE payment_requests
ALTER COLUMN project_id
SET NOT NULL;


ALTER TABLE payment_requests
DROP COLUMN budget_id;


CREATE UNIQUE INDEX payment_requests_project_id_idx on payment_requests (project_id, id);


CREATE VIEW
    api.payment_stats AS
SELECT
    p.recipient_id AS github_user_id,
    p.project_id,
    sum(p.amount_in_usd) AS money_granted
FROM
    payment_requests p
GROUP BY
    p.recipient_id,
    p.project_id;