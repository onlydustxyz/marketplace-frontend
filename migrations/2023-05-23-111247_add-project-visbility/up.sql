ALTER TABLE project_details
    ADD visibility JSONB NOT NULL DEFAULT to_jsonb('Public'::text);
