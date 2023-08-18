ALTER TABLE contributions DROP COLUMN status;

DROP TYPE contribution_status;

ALTER TABLE contributions DROP COLUMN created_at;
ALTER TABLE contributions DROP COLUMN closed_at;
