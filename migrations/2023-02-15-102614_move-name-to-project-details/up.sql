ALTER TABLE project_details
    ADD COLUMN name TEXT NOT NULL default '';

UPDATE project_details
    SET name = projects.name
    FROM projects
    WHERE projects.id = project_id;

ALTER TABLE projects
    DROP COLUMN name;

-- Remove name from Created events
UPDATE events
SET
    payload = payload #- '{Created,name}'
WHERE
    aggregate_name = 'PROJECT' AND
	payload ? 'Created';
