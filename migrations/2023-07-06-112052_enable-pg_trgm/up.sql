CREATE EXTENSION IF NOT EXISTS pg_trgm;


CREATE INDEX IF NOT EXISTS project_details_name_trgm_idx ON project_details USING GIN ("name" gin_trgm_ops);


CREATE INDEX IF NOT EXISTS project_details_short_description_trgm_idx ON project_details USING GIN ("short_description" gin_trgm_ops);