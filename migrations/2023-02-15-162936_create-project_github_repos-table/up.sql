CREATE TABLE project_github_repos (
  project_id UUID NOT NULL,
  github_repo_id BIGINT NOT NULL,

  PRIMARY KEY (project_id, github_repo_id)
);

INSERT INTO project_github_repos (project_id, github_repo_id) SELECT id, github_repo_id FROM projects;

ALTER TABLE projects
    DROP COLUMN github_repo_id;

-- Remove github_repo_id from Created events
UPDATE events
SET
    payload = payload #- '{Created,github_repo_id}'
WHERE
    aggregate_name = 'PROJECT' AND
	payload ? 'Created';

-- Delete GithubRepositoryUpdated events
DELETE events WHERE aggregate_name = 'PROJECT' AND payload ? 'GithubRepositoryUpdated';
