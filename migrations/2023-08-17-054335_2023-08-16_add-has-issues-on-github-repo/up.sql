ALTER TABLE github_repos
ADD COLUMN has_issues BOOLEAN  NOT NULL DEFAULT(true);
