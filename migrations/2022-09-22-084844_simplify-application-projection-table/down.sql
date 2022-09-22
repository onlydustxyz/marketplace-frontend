ALTER TABLE pending_applications
    RENAME TO applications;

ALTER TABLE applications
    ADD COLUMN "status" TEXT NOT NULL DEFAULT 'pending';
