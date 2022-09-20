ALTER TABLE project_members
ADD COLUMN is_lead_contributor BOOLEAN DEFAULT FALSE;

INSERT INTO project_members (project_id, contributor_account, is_lead_contributor)
(
    SELECT project_id, account, TRUE FROM lead_contributors
);

DROP TABLE lead_contributors;
