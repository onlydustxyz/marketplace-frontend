ALTER TABLE pending_applications
	DROP CONSTRAINT pending_applications_pkey;

ALTER TABLE pending_applications
	ADD PRIMARY KEY (contribution_id, contributor_id);

ALTER TABLE pending_applications
	DROP COLUMN contributor_account_address;
