CREATE TABLE
    ignored_contributions (project_id UUID NOT NULL, contribution_id TEXT NOT NULL, PRIMARY KEY (project_id, contribution_id));


INSERT INTO
    ignored_contributions
SELECT
    project_id,
    c.id as contribution_id
FROM
    ignored_github_issues igi
    INNER JOIN github_pull_requests gpr ON igi.repo_id = gpr.repo_id
    AND igi.issue_number = gpr."number"
    INNER JOIN contributions c ON c.repo_id = gpr.repo_id
    AND c.details_id::BIGINT = gpr.id
    AND c."type" = 'pull_request'::contribution_type;


INSERT INTO
    ignored_contributions
SELECT
    project_id,
    c.id as contribution_id
FROM
    ignored_github_issues igi
    INNER JOIN github_issues gi ON igi.repo_id = gi.repo_id
    AND igi.issue_number = gi."number"
    INNER JOIN contributions c ON c.repo_id = gi.repo_id
    AND c.details_id::BIGINT = gi.id
    AND c."type" = 'issue'::contribution_type;


DROP TABLE ignored_github_issues;