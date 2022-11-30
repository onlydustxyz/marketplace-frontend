CREATE TABLE budget_spenders (
    budget_id uuid NOT NULL REFERENCES budgets(id),
    user_id uuid NOT NULL,
    PRIMARY KEY (budget_id, user_id)
);
