update github_repos
set has_issues = true
where has_issues is null;

ALTER TABLE github_repos
    ALTER COLUMN has_issues SET NOT NULL;

ALTER TABLE github_repos
    ALTER COLUMN has_issues SET default (true);
