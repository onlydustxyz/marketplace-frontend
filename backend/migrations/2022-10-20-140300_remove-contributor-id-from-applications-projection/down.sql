ALTER TABLE pending_applications RENAME TO pending_applications_temp;

CREATE TABLE pending_applications (
    contribution_id text NOT NULL,
    contributor_id text NOT NULL,
    applied_at timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'::text),
    contributor_account_address text NOT NULL,
    PRIMARY KEY(contribution_id, contributor_account_address)
);

INSERT INTO pending_applications(contribution_id, contributor_id, applied_at, contributor_account_address) (
    SELECT contribution_id, contributor_account_address, applied_at, contributor_account_address
    FROM pending_applications_temp
);

DROP TABLE pending_applications_temp;
