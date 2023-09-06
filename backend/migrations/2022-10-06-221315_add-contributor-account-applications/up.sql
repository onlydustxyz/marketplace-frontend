ALTER TABLE pending_applications
	ADD contributor_account_address TEXT;

UPDATE
	pending_applications
SET
	contributor_account_address = contributors.account
FROM
	contributors
WHERE
	pending_applications.contributor_id = contributors.id
    OR pending_applications.contributor_id = contributors.account; -- just in case a refresh has been done

ALTER TABLE pending_applications
	DROP CONSTRAINT pending_applications_pkey;

ALTER TABLE pending_applications
	ADD PRIMARY KEY (contribution_id, contributor_account_address);

ALTER TABLE pending_applications ALTER COLUMN contributor_account_address SET NOT NULL;
