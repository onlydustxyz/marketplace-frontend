ALTER TABLE project_details
    ADD COLUMN description TEXT;

UPDATE project_details SET description = short_description;

ALTER TABLE project_details
    DROP COLUMN short_description,
    DROP COLUMN long_description;
