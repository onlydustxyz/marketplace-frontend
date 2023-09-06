DROP table lead_contributors;


CREATE TABLE project_leads(
    project_id UUID NOT NULL REFERENCES projects(id),
    user_id UUID NOT NULL REFERENCES users(id),
    PRIMARY KEY (project_id, user_id)
)
