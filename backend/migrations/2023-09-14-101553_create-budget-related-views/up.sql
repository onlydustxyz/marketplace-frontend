DROP VIEW api.projects;


ALTER TABLE budgets
DROP column spent_amount;


CREATE VIEW
    api.projects AS
SELECT
    p.id,
    pd.key,
    pd.name,
    pd.logo_url,
    pd.short_description,
    pd.long_description,
    pd.telegram_link AS more_info_link,
    pd.rank,
    pd.hiring,
    pd.visibility,
    usd_budget.id AS usd_budget_id,
    eth_budget.id AS eth_budget_id,
    op_budget.id AS op_budget_id,
    apt_budget.id AS apt_budget_id,
    stark_budget.id AS stark_budget_id
FROM
    projects p
    JOIN project_details pd ON pd.project_id = p.id
    LEFT JOIN budgets usd_budget ON usd_budget.id IN (
        SELECT
            budget_id
        from
            projects_budgets
        where
            project_id = p.id
    )
    AND usd_budget.currency = 'usd'::currency
    LEFT JOIN budgets eth_budget ON eth_budget.id IN (
        SELECT
            budget_id
        from
            projects_budgets
        where
            project_id = p.id
    )
    AND eth_budget.currency = 'eth'::currency
    LEFT JOIN budgets op_budget ON op_budget.id IN (
        SELECT
            budget_id
        from
            projects_budgets
        where
            project_id = p.id
    )
    AND op_budget.currency = 'op'::currency
    LEFT JOIN budgets apt_budget ON apt_budget.id IN (
        SELECT
            budget_id
        from
            projects_budgets
        where
            project_id = p.id
    )
    AND apt_budget.currency = 'apt'::currency
    LEFT JOIN budgets stark_budget ON stark_budget.id IN (
        SELECT
            budget_id
        from
            projects_budgets
        where
            project_id = p.id
    )
    AND stark_budget.currency = 'stark'::currency;


CREATE VIEW
    api.budgets AS
SELECT
    b.id,
    UPPER(b.currency::text) as currency,
    b.initial_amount,
    b.remaining_amount,
    b.initial_amount - b.remaining_amount as spent_amount
FROM
    budgets b;