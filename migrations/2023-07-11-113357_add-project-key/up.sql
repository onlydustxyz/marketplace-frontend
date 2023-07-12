ALTER TABLE project_details
ADD COLUMN key TEXT NOT NULL GENERATED ALWAYS AS (LOWER(REPLACE(REGEXP_REPLACE(name, '[^a-zA-Z0-9_\-\ ]+', '', 'g'), ' ', '-'))) STORED;


CREATE UNIQUE INDEX project_details_key on project_details (key);


DROP VIEW api.projects;


CREATE OR REPLACE VIEW
    api.projects AS
SELECT
    p.id AS id,
    pd.key AS key,
    pd.name AS name,
    pd.logo_url AS logo_url,
    pd.short_description AS short_description,
    pd.long_description AS long_description,
    pd.telegram_link AS more_info_link,
    pd.rank AS rank,
    pd.hiring AS hiring,
    pd.visibility AS visibility
FROM
    projects p
    INNER JOIN project_details pd ON pd.project_id = p.id;