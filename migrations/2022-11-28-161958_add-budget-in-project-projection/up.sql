CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id),
    initial_amount NUMERIC NOT NULL,
    remaining_amount NUMERIC NOT NULL
);

-- Create budget for each project (consider half spent, or 1000 USD budget if no request yet)
INSERT INTO
    budgets (project_id, initial_amount, remaining_amount)
    SELECT
        projects.id as project_id,
        coalesce(2*sum(amount_in_usd), 1000) AS initial_amount,
        coalesce(sum(amount_in_usd), 1000) AS remaining_amount
    FROM
        projects
        LEFT JOIN payment_requests ON payment_requests.project_id = projects.id
    GROUP BY
        projects.id;
