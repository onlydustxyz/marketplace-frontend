CREATE TYPE github_ci_checks AS ENUM('passed', 'failed');


ALTER TABLE github_pull_requests
ADD COLUMN draft BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN ci_checks github_ci_checks;