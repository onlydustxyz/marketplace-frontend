CREATE TYPE currency AS ENUM('usd', 'eth', 'op', 'apt', 'stark');


ALTER TABLE budgets
ADD COLUMN currency currency;


UPDATE budgets
set
    currency = 'usd'::currency;


ALTER TABLE budgets
ALTER COLUMN currency
SET NOT NULL;


CREATE UNIQUE INDEX budget_currency_idx ON budgets (currency, id);