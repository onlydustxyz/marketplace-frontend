ALTER TABLE events ALTER COLUMN timestamp SET DEFAULT (current_timestamp AT TIME ZONE 'UTC');
