CREATE TYPE contribution_status AS enum('in_progress', 'complete', 'canceled');

ALTER TABLE contributions
    ADD COLUMN status contribution_status;

UPDATE contributions
SET status = 'in_progress'
WHERE status IS NULL;

ALTER TABLE contributions
    ALTER COLUMN status SET NOT NULL;

