
DROP table project_leads;


CREATE TABLE lead_contributors(
    project_id TEXT NOT NULL,
    contributor_id UUID NOT NULL,
    PRIMARY KEY (project_id, contributor_id)
)
