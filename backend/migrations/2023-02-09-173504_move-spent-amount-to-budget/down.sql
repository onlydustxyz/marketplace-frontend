ALTER TABLE projects
    ADD total_spent_amount_in_usd bigint NOT NULL DEFAULT 0;

ALTER TABLE budgets
    DROP COLUMN spent_amount;
