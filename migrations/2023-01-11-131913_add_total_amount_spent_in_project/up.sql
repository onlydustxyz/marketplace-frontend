ALTER TABLE projects
      ADD total_spent_amount_in_usd bigint NOT NULL DEFAULT 0;

CREATE TABLE total_spent_amount_by_project_id
AS
		SELECT
			budgets.project_id,
			SUM(amount_in_usd) AS total_spent_amount
		FROM
			payment_requests, budgets
		WHERE
			payment_requests.budget_id = budgets.id
		GROUP BY
			budgets.project_id;

UPDATE
	projects
SET
	total_spent_amount_in_usd = total_spent_amount
FROM
	total_spent_amount_by_project_id
WHERE
	id = project_id;

DROP TABLE total_spent_amount_by_project_id;

