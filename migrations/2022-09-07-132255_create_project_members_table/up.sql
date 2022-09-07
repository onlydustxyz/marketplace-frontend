CREATE TABLE project_members (
    project_id TEXT NOT NULL,
    contributor_id TEXT NOT NULL,
    is_lead_contributor BOOLEAN NOT NULL,
    PRIMARY KEY (project_id, contributor_id)
);
