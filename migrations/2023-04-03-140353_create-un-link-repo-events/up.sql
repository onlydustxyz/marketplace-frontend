INSERT INTO events(timestamp, aggregate_name, aggregate_id, payload) (
	SELECT
		NOW(),
		'PROJECT',
		project_id,
		json_build_object(
			'GithubRepoLinked', json_build_object(
				'id', project_id,
				'github_repo_id', github_repo_id
			)
		) AS payload
	FROM
		project_github_repos
);
