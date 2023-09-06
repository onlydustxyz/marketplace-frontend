DROP VIEW IF EXISTS projects_contributors_view;


CREATE TABLE
    projects_contributors (
        project_id UUID NOT NULL,
        github_user_id BIGINT NOT NULL,
        link_count INT NOT NULL,
        PRIMARY KEY (project_id, github_user_id)
    );