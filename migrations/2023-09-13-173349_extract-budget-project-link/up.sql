CREATE TABLE
    projects_budgets (project_id UUID, budget_id UUID, PRIMARY KEY (project_id, budget_id));


INSERT INTO
    projects_budgets (
        SELECT
            project_id,
            id AS budget_id
        FROM
            budgets
        WHERE
            project_id IS NOT NULL
    );


ALTER TABLE budgets
DROP COLUMN project_id;