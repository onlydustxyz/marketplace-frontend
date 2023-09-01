ALTER TABLE github_pull_requests
DROP COLUMN draft,
DROP COLUMN ci_checks;


DROP TYPE github_ci_checks;