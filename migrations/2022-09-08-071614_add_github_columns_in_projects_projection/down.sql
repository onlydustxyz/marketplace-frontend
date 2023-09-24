ALTER TABLE projects
    DROP COLUMN url,
    DROP COLUMN description,
    DROP COLUMN logo_url,
    ADD last_indexed_time TIMESTAMP
