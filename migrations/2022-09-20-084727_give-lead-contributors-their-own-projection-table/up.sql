CREATE TABLE lead_contributors(
    project_id TEXT NOT NULL,
    contributor_account TEXT NOT NULL,
    PRIMARY KEY (project_id, contributor_account)
);

INSERT INTO lead_contributors (project_id, contributor_account)
(
    SELECT project_id, contributor_account FROM project_members
    WHERE is_lead_contributor = TRUE
);

DELETE FROM project_members
WHERE is_lead_contributor = TRUE;

ALTER TABLE project_members
DROP COLUMN is_lead_contributor;
