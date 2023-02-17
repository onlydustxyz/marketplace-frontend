ALTER TABLE project_details
    ADD COLUMN short_description TEXT DEFAULT '' NOT NULL,
    ADD COLUMN long_description TEXT DEFAULT '' NOT NULL;

UPDATE project_details SET short_description = description WHERE description IS NOT NULL;

ALTER TABLE project_details
    DROP COLUMN description;
