-- Requested
WITH
    requested_payments AS (
        SELECT
            "timestamp",
            (payload #> '{Requested, amount, amount}') as amount,
            (payload #>> '{Requested, project_id}')::UUID as project_id,
            aggregate_id::UUID AS id
        FROM
            events
        WHERE
            aggregate_name = 'PAYMENT'
            AND payload ? 'Requested'
    ),
    projects_budgets AS (
        SELECT
            (payload #>> '{ BudgetLinked, budget_id }')::UUID as budget_id,
            aggregate_id::UUID AS project_id
        FROM
            events
        WHERE
            aggregate_name = 'PROJECT'
            AND payload ? 'BudgetLinked'
    )
INSERT INTO
    events (timestamp, aggregate_name, aggregate_id, payload) (
        SELECT
            rp.timestamp AS "timestamp",
            'BUDGET' AS aggregate_name,
            pb.budget_id AS aggregate_id,
            jsonb_build_object('Spent', jsonb_build_object('id', pb.budget_id, 'amount', rp.amount)) as payload
        FROM
            requested_payments rp
            JOIN projects_budgets pb ON rp.project_id = pb.project_id
    );


-- Cancelled
WITH
    requested_payments AS (
        SELECT
            (payload #>> '{Requested, amount, amount}')::bigint as amount,
            (payload #>> '{Requested, project_id}')::UUID as project_id,
            aggregate_id::UUID AS id
        FROM
            events
        WHERE
            aggregate_name = 'PAYMENT'
            AND payload ? 'Requested'
    ),
    cancelled_payments AS (
        SELECT
            "timestamp",
            aggregate_id::UUID AS id
        FROM
            events
        WHERE
            aggregate_name = 'PAYMENT'
            AND payload ? 'Cancelled'
    ),
    projects_budgets AS (
        SELECT
            (payload #>> '{ BudgetLinked, budget_id }')::UUID as budget_id,
            aggregate_id::UUID AS project_id
        FROM
            events
        WHERE
            aggregate_name = 'PROJECT'
            AND payload ? 'BudgetLinked'
    )
INSERT INTO
    events (timestamp, aggregate_name, aggregate_id, payload) (
        SELECT
            cp.timestamp AS "timestamp",
            'BUDGET' AS aggregate_name,
            pb.budget_id AS aggregate_id,
            jsonb_build_object('Spent', jsonb_build_object('id', pb.budget_id, 'amount', (- rp.amount)::text)) as payload
        FROM
            requested_payments rp
            JOIN cancelled_payments cp ON cp.id = rp.id
            JOIN projects_budgets pb ON rp.project_id = pb.project_id
    );