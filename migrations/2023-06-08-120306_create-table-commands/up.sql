CREATE TABLE
    commands (
        id UUID PRIMARY KEY,
        processing_count INT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP,
        metadata jsonb NOT NULL DEFAULT '{}'::jsonb
    );


ALTER TABLE events
ADD COLUMN command_id UUID;


CREATE SCHEMA api;


CREATE VIEW
    api.commands AS
SELECT
    id,
    processing_count,
    created_at,
    updated_at,
    "Project" AS project_id
FROM
    public.commands c,
    jsonb_to_recordset(c.metadata -> 'aggregates') AS m ("Project" UUID);