CREATE VIEW projects_contributors_view as
SELECT DISTINCT
	projects.id AS project_id,
	github_repos_contributors.user_id AS github_user_id
FROM
	projects,
	project_github_repos,
	github_repos_contributors
WHERE
	project_github_repos.project_id = projects.id
	AND github_repos_contributors.repo_id = project_github_repos.github_repo_id
UNION
SELECT DISTINCT
	projects.id AS project_id,
	payment_requests.recipient_id AS github_user_id
FROM
	projects,
	budgets,
	payment_requests
WHERE
	budgets.project_id = projects.id
	AND payment_requests.budget_id = budgets.id;
