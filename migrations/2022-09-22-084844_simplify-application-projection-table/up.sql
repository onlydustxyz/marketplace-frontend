CREATE TABLE pending_applications(
    contribution_id TEXT NOT NULL,
    contributor_id TEXT NOT NULL,
    applied_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    PRIMARY KEY(contribution_id, contributor_id)
);

INSERT INTO pending_applications (contribution_id, contributor_id, applied_at) (
    SELECT contribution_id, contributor_id, applied_at FROM applications
    WHERE "status" = 'pending'
);

DROP TABLE applications;
