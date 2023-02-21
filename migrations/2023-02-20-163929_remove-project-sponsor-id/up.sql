ALTER TABLE projects_sponsors
    DROP COLUMN id,
    ADD PRIMARY KEY(project_id, sponsor_id)
;
