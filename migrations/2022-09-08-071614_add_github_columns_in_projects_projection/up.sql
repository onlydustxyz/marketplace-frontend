ALTER TABLE projects
    ADD url VARCHAR,
    ADD description VARCHAR,
    ADD logo_url VARCHAR,
    DROP COLUMN last_indexed_time
