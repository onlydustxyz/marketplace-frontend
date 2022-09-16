-- Only set where payload_backup is not null because new events may have been inserted in the meantime
UPDATE events SET payload = payload_backup WHERE payload_backup IS NOT NULL;
ALTER TABLE events DROP COLUMN payload_backup;
