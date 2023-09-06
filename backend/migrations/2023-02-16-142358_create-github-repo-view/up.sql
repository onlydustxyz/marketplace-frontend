CREATE VIEW project_github_repo_view AS
  SELECT project_id, github_repo_details.*
    FROM project_github_repos LEFT JOIN github_repo_details
      ON project_github_repos.github_repo_id = github_repo_details.id;
