CREATE TABLE
    ignored_github_issues (
        project_id UUID NOT NULL,
        repo_id BIGINT NOT NULL,
        issue_number BIGINT NOT NULL,
        PRIMARY KEY (project_id, repo_id, issue_id)
    );


INSERT INTO
    ignored_github_issues
SELECT
    project_id,
    gpr.repo_id as repo_id,
    gpr.number as issue_number
FROM
    ignored_contributions ic
    INNER JOIN contributions c ON c.id = ic.contribution_id
    and c.type = 'pull_request'::contribution_type
    INNER JOIN github_pull_requests gpr on c.details_id::BIGINT = gpr.id;


INSERT INTO
    ignored_github_issues
SELECT
    project_id,
    gi.repo_id as repo_id,
    gi.number as issue_number
FROM
    ignored_contributions ic
    INNER JOIN contributions c ON c.id = ic.contribution_id
    and c.type = 'issue'::contribution_type
    INNER JOIN github_issues gi on c.details_id::BIGINT = gi.id;


DROP TABLE ignored_contributions;