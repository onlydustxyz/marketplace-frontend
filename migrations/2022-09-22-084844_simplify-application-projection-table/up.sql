DELETE FROM applications
    WHERE "status" != 'pending';

ALTER TABLE applications
    DROP COLUMN "status";

ALTER TABLE applications
    RENAME TO pending_applications;
