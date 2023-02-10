ALTER TABLE projects
    DROP COLUMN total_spent_amount_in_usd;

ALTER TABLE budgets
    ADD spent_amount NUMERIC NOT NULL GENERATED ALWAYS AS (initial_amount - remaining_amount) STORED;
