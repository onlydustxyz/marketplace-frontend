CREATE TABLE applications(
    id UUID PRIMARY KEY,
    contribution_id TEXT NOT NULL,
    contributor_id TEXT NOT NULL,
    applied_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    "status" VARCHAR NOT NULL DEFAULT 'pending',
    CONSTRAINT unique_application UNIQUE(contribution_id, contributor_id)
);


INSERT INTO applications (id, contribution_id, contributor_id, applied_at, "status") (
    SELECT gen_random_uuid(), contribution_id, contributor_id, applied_at, 'pending' FROM pending_applications
);

DROP TABLE pending_applications;
