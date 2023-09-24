ALTER TABLE github_repos
    ALTER COLUMN has_issues DROP NOT NULL;

ALTER TABLE github_repos
    ALTER COLUMN has_issues DROP default;
