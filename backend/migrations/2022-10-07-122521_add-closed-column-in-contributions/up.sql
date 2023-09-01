ALTER TABLE contributions ADD closed BOOLEAN NOT NULL DEFAULT false;
UPDATE
    contributions
SET
    closed = TRUE
WHERE
    status = 'ABANDONED'
