CREATE OR REPLACE VIEW
    api.projects AS
SELECT
    p.id AS id,
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